import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGeoData } from "@/lib/geo";
import { sendResumeDownloadNotification } from "@/lib/email";

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const ipAddress = getClientIP(request);
    const userAgent = request.headers.get("user-agent") || undefined;
    const referer = request.headers.get("referer") || undefined;

    const geoData = await getGeoData(ipAddress);

    const download = await prisma.resumeDownload.create({
      data: {
        ipAddress,
        country: geoData.country,
        location: geoData.location,
        userAgent,
        referer,
      },
    });

    const emailResult = await sendResumeDownloadNotification({
      ipAddress,
      country: geoData.country,
      location: geoData.location,
      userAgent,
      downloadedAt: download.downloadedAt,
    });

    if (emailResult.success) {
      await prisma.resumeDownload.update({
        where: { id: download.id },
        data: { emailSent: true },
      });
    }

    return NextResponse.json({
      success: true,
      downloadId: download.id,
      emailSent: emailResult.success,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
