import { prisma } from '@/lib/db'
import { Task } from '@/lib/types'
// 1. Import the Task type from Prisma and alias it
import { Task as PrismaTask } from '@prisma/client' 
import GraphCanvas from '@/components/GraphCanvas'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

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
  if (Array.isArray(value)) return value as string[] // Prisma Json type cast
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

  // 'raw' is automatically typed as PrismaTask[] by Prisma
  const raw = await prisma.task.findMany({
    where: { countryCode: country },
    orderBy: { createdAt: 'asc' },
  })

  if (!raw || raw.length === 0) {
    notFound()
  }

  // 2. Explicitly type 't' as 'PrismaTask'
  const tasks: Task[] = raw.map((t: PrismaTask) => ({
    ...t,
    // Cast Enums/Unions to your local Task type definitions
    phase: t.phase as Task['phase'],
    status: t.status as Task['status'],
    requirements: safeParseArray(t.requirements),
    nextTasks: safeParseArray(t.nextTasks),
    parallelTasks: safeParseArray(t.parallelTasks),
    // Convert Dates to strings for Client Components
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }))

  return (
    <main className="min-h-screen">
      <GraphCanvas initialTasks={tasks} country={country} />
    </main>
  )
}