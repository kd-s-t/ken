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
  
  return request.ip || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { sessionId, action } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    const ipAddress = getClientIP(request);
    const userAgent = request.headers.get("user-agent") || undefined;
    const referer = request.headers.get("referer") || undefined;

    if (action === "start") {
      let geoData = { country: undefined, location: undefined };
      try {
        geoData = await getGeoData(ipAddress);
      } catch (error) {
      }

      try {
        const visitor = await prisma.visitor.create({
          data: {
            ipAddress,
            sessionId,
            country: geoData.country,
            location: geoData.location,
            userAgent,
            referer,
          },
        });

        return NextResponse.json({ success: true, visitorId: visitor.id });
      } catch (error) {
        return NextResponse.json(
          { error: "Failed to create visitor record" },
          { status: 500 }
        );
      }
    }

    if (action === "end") {
      const { visitorId } = body;

      if (!visitorId) {
        return NextResponse.json({ error: "Visitor ID required" }, { status: 400 });
      }

      try {
        const visitor = await prisma.visitor.findUnique({
          where: { id: visitorId },
        });

        if (!visitor) {
          return NextResponse.json({ error: "Visitor not found" }, { status: 404 });
        }

        const visitEnd = new Date();
        const duration = Math.floor((visitEnd.getTime() - visitor.visitStart.getTime()) / 1000);

        await prisma.visitor.update({
          where: { id: visitorId },
          data: {
            visitEnd,
            duration,
          },
        });

        return NextResponse.json({ success: true, duration });
      } catch (error) {
        return NextResponse.json(
          { error: "Failed to update visitor record" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
