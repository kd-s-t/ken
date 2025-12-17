import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalVisitors,
      totalInteractions,
      totalDownloads,
      visitorsByCountry,
      interactionsByType,
      recentVisitors,
      recentInteractions,
      downloadsByDate,
    ] = await Promise.all([
      prisma.visitor.count(),
      prisma.interaction.count(),
      prisma.resumeDownload.count(),
      prisma.visitor.groupBy({
        by: ["country"],
        _count: {
          country: true,
        },
        where: {
          country: {
            not: null,
          },
        },
      }),
      prisma.interaction.groupBy({
        by: ["type"],
        _count: {
          type: true,
        },
      }),
      prisma.visitor.findMany({
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          ipAddress: true,
          country: true,
          location: true,
          visitStart: true,
          duration: true,
        },
      }),
      prisma.interaction.findMany({
        take: 20,
        orderBy: {
          timestamp: "desc",
        },
        select: {
          id: true,
          type: true,
          action: true,
          element: true,
          timestamp: true,
          country: true,
        },
      }),
      prisma.resumeDownload.groupBy({
        by: ["downloadedAt"],
        _count: {
          downloadedAt: true,
        },
        orderBy: {
          downloadedAt: "desc",
        },
        take: 30,
      }),
    ]);

    const avgDuration = await prisma.visitor.aggregate({
      _avg: {
        duration: true,
      },
      where: {
        duration: {
          not: null,
        },
      },
    });

    return NextResponse.json({
      totalVisitors,
      totalInteractions,
      totalDownloads,
      avgDuration: avgDuration._avg.duration || 0,
      visitorsByCountry: visitorsByCountry.map((v) => ({
        country: v.country || "Unknown",
        count: v._count.country,
      })),
      interactionsByType: interactionsByType.map((i) => ({
        type: i.type,
        count: i._count.type,
      })),
      recentVisitors,
      recentInteractions,
      downloadsByDate: downloadsByDate.map((d) => ({
        date: d.downloadedAt.toISOString().split("T")[0],
        count: d._count.downloadedAt,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
