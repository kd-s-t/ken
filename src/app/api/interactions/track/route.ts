import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGeoData } from "@/lib/geo";

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
    const body = await request.json();
    const { type, action, element, metadata, sessionId } = body;

    if (!type || !action || !sessionId) {
      return NextResponse.json(
        { error: "type, action, and sessionId are required" },
        { status: 400 }
      );
    }

    const ipAddress = getClientIP(request);
    const userAgent = request.headers.get("user-agent") || undefined;
    const referer = request.headers.get("referer") || undefined;
    const url = request.headers.get("referer") || request.url || undefined;

    const geoData = await getGeoData(ipAddress);

    const interaction = await prisma.interaction.create({
      data: {
        type,
        action,
        element: element || undefined,
        metadata: metadata ? JSON.stringify(metadata) : undefined,
        ipAddress,
        country: geoData.country,
        location: geoData.location,
        sessionId,
        userAgent,
        referer,
        url,
      },
    });

    return NextResponse.json({ success: true, interactionId: interaction.id });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
