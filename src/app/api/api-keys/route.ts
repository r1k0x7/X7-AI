import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/redis";
import { randomBytes } from "crypto";
import { z } from "zod";

const keySchema = z.object({
  name: z.string().min(1).max(100),
  permissions: z.array(z.string()).optional(),
  rateLimit: z.number().min(1).max(10000).optional(),
  expiresAt: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const keys = await prisma.apiKey.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        prefix: true,
        permissions: true,
        rateLimit: true,
        usageCount: true,
        lastUsedAt: true,
        expiresAt: true,
        isActive: true,
        createdAt: true,
      },
    });

    return NextResponse.json(keys);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitKey = `apikey:create:${session.user.id}`;
    const { allowed } = await rateLimit(rateLimitKey, 10, 3600);
    if (!allowed) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const body = await req.json();
    const validated = keySchema.parse(body);

    const keyValue = `x7_${randomBytes(32).toString("hex")}`;
    const prefix = keyValue.slice(0, 8);

    const apiKey = await prisma.apiKey.create({
      data: {
        userId: session.user.id,
        name: validated.name,
        key: keyValue,
        prefix,
        permissions: validated.permissions || ["chat", "image"],
        rateLimit: validated.rateLimit || 100,
        expiresAt: validated.expiresAt ? new Date(validated.expiresAt) : null,
      },
      select: {
        id: true,
        name: true,
        prefix: true,
        permissions: true,
        rateLimit: true,
        isActive: true,
        createdAt: true,
      },
    });

    // Return the full key only once
    return NextResponse.json({
      ...apiKey,
      key: keyValue, // Only shown once
    });
  } catch (error) {
    console.error("API Key POST Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const keyId = searchParams.get("id");

    if (!keyId) {
      return NextResponse.json({ error: "Key ID required" }, { status: 400 });
    }

    await prisma.apiKey.deleteMany({
      where: { id: keyId, userId: session.user.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
      }
      
