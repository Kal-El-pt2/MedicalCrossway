import { prisma } from '@/lib/db';
import { TaskLinkedList } from '@/lib/taskLinkedList';
import { Task } from '@/lib/types';
import GraphCanvas from '@/components/GraphCanvas';

export default async function JourneyPage() {
  const raw = await prisma.task.findMany({
    orderBy: { createdAt: 'asc' },
  });

  // Cast Prisma result → your Task type
  const tasks = raw as unknown as Task[];

  // Build the linked list server-side
  const list = TaskLinkedList.fromArray(tasks);

  return (
    <main style={{ height: '100vh', overflow: 'hidden' }}>
      <GraphCanvas initialTasks={list.toArray()} />
    </main>
  );
}