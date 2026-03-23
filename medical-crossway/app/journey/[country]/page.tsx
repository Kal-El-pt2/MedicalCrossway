import { prisma } from '@/lib/db'
import { Task } from '@/lib/types'
import GraphCanvas from '@/components/GraphCanvas'
import { notFound } from 'next/navigation'

const SUPPORTED_COUNTRIES = ['us']

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params // ✅ FIX

  if (!SUPPORTED_COUNTRIES.includes(country)) {
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
    requirements: t.requirements as string[],
    nextTasks: t.nextTasks as string[],
    parallelTasks: t.parallelTasks as string[],
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }))

  return <GraphCanvas initialTasks={tasks} country={country} />
}