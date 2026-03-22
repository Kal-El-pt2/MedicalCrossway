import { prisma } from '@/lib/db'
import { Task } from '@/lib/types'
import GraphCanvas from '@/components/GraphCanvas'

export default async function JourneyPage() {
  const raw = await prisma.task.findMany({ orderBy: { createdAt: 'asc' } })

  const tasks: Task[] = raw.map(t => ({
    ...t,
    phase: t.phase as Task['phase'],
    status: t.status as Task['status'],
    requirements:  JSON.parse(t.requirements as string),
    nextTasks:     JSON.parse(t.nextTasks as string),
    parallelTasks: JSON.parse(t.parallelTasks as string),
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }))

  return <GraphCanvas initialTasks={tasks} />
}