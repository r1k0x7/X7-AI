import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      newUsersToday,
      activeUsers,
      totalChats,
      totalImages,
      totalDocuments,
      revenue,
      usageToday,
      errorLogs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: today } } }),
      prisma.user.count({ where: { lastLoginAt: { gte: thisWeek } } }),
      prisma.chat.count(),
      prisma.image.count(),
      prisma.document.count(),
      prisma.payment.aggregate({ where: { status: "completed" }, _sum: { amount: true } }),
      prisma.usageStat.aggregate({
        where: { date: { gte: today } },
        _sum: { count: true, tokens: true },
      }),
      prisma.errorLog.count({ where: { createdAt: { gte: today } } }),
    ]);

    // Plan distribution
    const planDistribution = await prisma.user.groupBy({
      by: ["plan"],
      _count: { id: true },
    });

    // Daily usage for chart
    const dailyUsage = await prisma.usageStat.groupBy({
      by: ["date"],
      where: { date: { gte: thisMonth } },
      _sum: { count: true, tokens: true },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({
      overview: {
        totalUsers,
        newUsersToday,
        activeUsers,
        totalChats,
        totalImages,
        totalDocuments,
        totalRevenue: revenue._sum.amount || 0,
        requestsToday: usageToday._sum.count || 0,
        tokensToday: usageToday._sum.tokens || 0,
        errorsToday: errorLogs,
      },
      planDistribution: planDistribution.map((p) => ({
        plan: p.plan,
        count: p._count.id,
      })),
      dailyUsage: dailyUsage.map((d) => ({
        date: d.date,
        requests: d._sum.count || 0,
        tokens: d._sum.tokens || 0,
      })),
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
                            }
      
