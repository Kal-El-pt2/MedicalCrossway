export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(
  _req: Request,
  { params }: RouteParams 
) {
  // 1. Await params in Next.js 15
  const { id } = await params;

  const task = await prisma.task.findUnique({ where: { id } });
  
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // 2. Prisma automatically parses JSONB columns into JS Arrays/Objects.
  // No need for JSON.parse()
  return NextResponse.json(task);
}

export async function PATCH(
  req: Request,
  { params }: RouteParams
) {
  // 1. Await params
  const { id } = await params;
  const body = await req.json();

  // 2. Prisma handles JS objects/arrays directly for Json columns.
  // Simply pass the body or specific fields.
  try {
    const task = await prisma.task.update({ 
      where: { id }, 
      data: body 
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: RouteParams
) {
  // 1. Await params
  const { id } = await params;

  try {
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ deleted: true });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 400 });
  }
}