import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.findUnique({ where: { id: params.id } });
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({
    ...task,
    requirements:  JSON.parse(task.requirements as string),
    nextTasks:     JSON.parse(task.nextTasks as string),
    parallelTasks: JSON.parse(task.parallelTasks as string),
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const data: Record<string, unknown> = { ...body };
  if (body.requirements)  data.requirements  = JSON.stringify(body.requirements);
  if (body.nextTasks)     data.nextTasks     = JSON.stringify(body.nextTasks);
  if (body.parallelTasks) data.parallelTasks = JSON.stringify(body.parallelTasks);

  const task = await prisma.task.update({ where: { id: params.id }, data });
  return NextResponse.json(task);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.task.delete({ where: { id: params.id } });
  return NextResponse.json({ deleted: true });
}