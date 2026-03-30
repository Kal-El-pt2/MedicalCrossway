import { prisma } from '@/lib/db'
import { Task } from '@/lib/types'
import GraphCanvas from '@/components/GraphCanvas'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const SUPPORTED_COUNTRIES = ['us'] as const

type Country = typeof SUPPORTED_COUNTRIES[number]

/* 🔥 ADD IT HERE */
export function generateStaticParams() {
  return SUPPORTED_COUNTRIES.map(country => ({
    country,
  }))
}

/* Optional but recommended */
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

  if (Array.isArray(value)) return value   // ✅ already parsed

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

  const raw = await prisma.task.findMany({
    where: { countryCode: country },
    orderBy: { createdAt: 'asc' },
  })

  if (!raw.length) {
    notFound()
  }

  const tasks: Task[] = raw.map(t => ({
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