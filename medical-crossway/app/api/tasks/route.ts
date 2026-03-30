export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'asc' },
  });

  // REMOVED: JSON.parse
  // Prisma automatically returns JSONB columns as JavaScript arrays/objects.
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const task = await prisma.task.create({
      data: {
        // If your ID is not auto-generated (e.g., 'hs-grad'), include it here:
        id: body.id, 
        title: body.title,
        description: body.description,
        phase: body.phase,
        status: body.status ?? 'todo',
        
        // FIX 1: Add the required country link
        // This matches the 'us' code we used in the SQL/Seed script
        countryCode: body.countryCode ?? 'us',

        // FIX 2: Pass arrays directly. DO NOT use JSON.stringify.
        // Prisma handles the conversion to JSONB for you.
        requirements:  body.requirements  ?? [],
        nextTasks:     body.nextTasks     ?? [],
        parallelTasks: body.parallelTasks ?? [],
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}