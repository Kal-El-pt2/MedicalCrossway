import { prisma } from '@/lib/db'
import { Task } from '@/lib/types'
import GraphCanvas from '@/components/GraphCanvas'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// 1. Extract the type directly from the prisma call result
// This avoids the "no exported member Task" error entirely.
type PrismaTask = Awaited<ReturnType<typeof prisma.task.findMany>>[number];

const SUPPORTED_COUNTRIES = ['us'] as const
type Country = typeof SUPPORTED_COUNTRIES[number]

export function generateStaticParams() {
  return SUPPORTED_COUNTRIES.map(country => ({
    country,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  return {
    title: `Medical Pathway in ${country.toUpperCase()}`,
    description: `Step-by-step guide to becoming a doctor in ${country}.`,
  }
}

function safeParseArray(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value as string[]
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch {
      return []
    }
  }
  return []
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params

  if (!SUPPORTED_COUNTRIES.includes(country as Country)) {
    notFound()
  }

  // Prisma automatically types 'raw' based on your schema
  const raw = await prisma.task.findMany({
    where: { countryCode: country },
    orderBy: { createdAt: 'asc' },
  })

  if (!raw || raw.length === 0) {
    notFound()
  }

  // 2. Use the extracted 'PrismaTask' type here
  const tasks: Task[] = raw.map((t: PrismaTask) => ({
    ...t,
    phase: t.phase as Task['phase'],
    status: t.status as Task['status'],
    requirements: safeParseArray(t.requirements),
    nextTasks: safeParseArray(t.nextTasks),
    parallelTasks: safeParseArray(t.parallelTasks),
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }))

  return (
    <main className="min-h-screen">
      <GraphCanvas initialTasks={tasks} country={country} />
    </main>
  )
}