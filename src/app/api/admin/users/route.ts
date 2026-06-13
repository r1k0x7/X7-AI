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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const plan = searchParams.get("plan");

    const where: any = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }
    if (status) where.status = status;
    if (plan) where.plan = plan;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          avatar: true,
          role: true,
          plan: true,
          status: true,
          createdAt: true,
          lastLoginAt: true,
          _count: {
            select: {
              chats: true,
              images: true,
              documents: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Admin Users Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, status, plan, role } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (plan) updateData.plan = plan;
    if (role) updateData.role = role;

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Admin PATCH Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
  }
                                                        
