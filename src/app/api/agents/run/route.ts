import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/redis";
import { routeAIRequest } from "@/lib/ai-router";
import { z } from "zod";

const agentSchema = z.object({
  agentId: z.string(),
  task: z.string().min(1).max(10000),
  context: z.record(z.any()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitKey = `agent:${session.user.id}`;
    const { allowed, remaining } = await rateLimit(rateLimitKey, 100, 3600);
    if (!allowed) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const body = await req.json();
    const validated = agentSchema.parse(body);

    const agent = await prisma.agent.findUnique({
      where: { id: validated.agentId, userId: session.user.id },
    });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    if (!agent.isActive) {
      return NextResponse.json({ error: "Agent is inactive" }, { status: 400 });
    }

    // Create task
    const task = await prisma.agentTask.create({
      data: {
        agentId: validated.agentId,
        name: validated.task.slice(0, 100),
        status: "RUNNING",
        input: validated.context || {},
        startedAt: new Date(),
      },
    });

    // Process with AI based on agent type
    const config = agent.config as any;
    const systemPrompt = config?.systemPrompt || getDefaultSystemPrompt(agent.type);

    const response = await routeAIRequest({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: validated.task },
      ],
      model: config?.model || "gpt-5",
      temperature: config?.temperature || 0.7,
    });

    // Update task
    await prisma.agentTask.update({
      where: { id: task.id },
      data: {
        status: "COMPLETED",
        output: { result: response.content },
        completedAt: new Date(),
      },
    });

    await prisma.agent.update({
      where: { id: agent.id },
      data: { runCount: { increment: 1 } },
    });

    return NextResponse.json({
      taskId: task.id,
      result: response.content,
      model: response.model,
      remaining,
    });
  } catch (error) {
    console.error("Agent API Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function getDefaultSystemPrompt(type: string): string {
  const prompts: Record<string, string> = {
    MARKETING: "You are an expert marketing AI agent. Create compelling marketing strategies, content, and campaigns.",
    TRADING: "You are an expert trading AI agent. Analyze markets, identify opportunities, and provide trading insights.",
    RESEARCH: "You are an expert research AI agent. Conduct thorough research, synthesize information, and provide comprehensive reports.",
    CODING: "You are an expert coding AI agent. Write, debug, and optimize code across multiple languages and frameworks.",
    CUSTOMER_SERVICE: "You are an expert customer service AI agent. Provide helpful, empathetic, and effective customer support.",
    CUSTOM: "You are a versatile AI agent capable of handling a wide range of tasks with expertise and precision.",
  };
  return prompts[type] || prompts.CUSTOM;
      }
      
