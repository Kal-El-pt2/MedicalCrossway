import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'asc' },
  });
  const parsed = tasks.map(t => ({
    ...t,
    requirements:  JSON.parse(t.requirements as string),
    nextTasks:     JSON.parse(t.nextTasks as string),
    parallelTasks: JSON.parse(t.parallelTasks as string),
  }));
  return NextResponse.json(parsed);
}

export async function POST(req: Request) {
  const body = await req.json();
  const task = await prisma.task.create({
    data: {
      title:         body.title,
      description:   body.description,
      phase:         body.phase,
      status:        body.status ?? 'todo',
      requirements:  JSON.stringify(body.requirements  ?? []),
      nextTasks:     JSON.stringify(body.nextTasks     ?? []),
      parallelTasks: JSON.stringify(body.parallelTasks ?? []),
    },
  });
  return NextResponse.json(task, { status: 201 });
}