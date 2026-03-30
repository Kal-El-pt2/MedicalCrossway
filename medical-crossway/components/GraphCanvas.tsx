'use client'

import { useRef, useState } from 'react'
import { Task, Phase, PHASES, Status } from '@/lib/types'
import TaskNode from './TaskNode'
import DetailPanel from './DetailPanel'
import PhaseFilter from './PhaseFilter'
import Link from 'next/link'

const NODE_W = 180, NODE_H = 100, COL_W = 260, PAD_X = 40, PAD_Y = 100, ROW_H = 130
const PHASE_ORDER: Phase[] = ['premed', 'mcat', 'medschool', 'residency', 'surgery']

const COUNTRY_NAMES: Record<string, string> = {
  us: '🇺🇸 United States',
  uk: '🇬🇧 United Kingdom',
  ca: '🇨🇦 Canada',
  au: '🇦🇺 Australia',
  in: '🇮🇳 India',
}

function layoutNodes(tasks: Task[]) {
  const cols: Record<string, { x: number; rows: Task[] }> = {}
  PHASE_ORDER.forEach((p, i) => { cols[p] = { x: PAD_X + i * COL_W, rows: [] } })
  tasks.forEach(t => { if (cols[t.phase]) cols[t.phase].rows.push(t) })

  const positions: Record<string, { x: number; y: number }> = {}
  Object.values(cols).forEach(col => {
    col.rows.forEach((t, ri) => {
      positions[t.id] = { x: col.x, y: PAD_Y + ri * ROW_H }
    })
  })

  return positions
}

interface Props {
  initialTasks: Task[]
  country: string
}

export default function GraphCanvas({ initialTasks, country }: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activePhase, setActivePhase] = useState<Phase | 'all'>('all')
  const svgRef = useRef<SVGSVGElement>(null)

  const visible = activePhase === 'all'
    ? tasks
    : tasks.filter(t => t.phase === activePhase)

  const positions = layoutNodes(visible)
  const visibleIds = new Set(visible.map(t => t.id))
  const selectedTask = tasks.find(t => t.id === selectedId) ?? null

  const canvasW = Math.max(...Object.values(positions).map(p => p.x), 0) + NODE_W + PAD_X
  const canvasH = Math.max(...Object.values(positions).map(p => p.y), 0) + NODE_H + PAD_Y

  async function updateStatus(id: string, status: Status) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))

    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
  }

  function selectNode(id: string) {
    setSelectedId(prev => prev === id ? null : id)
  }

  function closeDetail() {
    setSelectedId(null)
  }

  const edges: React.ReactNode[] = []

  visible.forEach(t => {
    const p1 = positions[t.id]
    if (!p1) return

    const cx1 = p1.x + NODE_W / 2

    t.nextTasks.forEach(nid => {
      if (!visibleIds.has(nid)) return
      const p2 = positions[nid]
      if (!p2) return

      const cx2 = p2.x + NODE_W / 2
      const my = (p1.y + NODE_H + p2.y) / 2

      edges.push(
        <path
          key={`next-${t.id}-${nid}`}
          d={`M${cx1},${p1.y + NODE_H} C${cx1},${my} ${cx2},${my} ${cx2},${p2.y}`}
          fill="none"
          stroke="var(--text-tertiary)"
          strokeWidth={1.2}
          markerEnd="url(#arr-next)"
        />
      )
    })

    t.parallelTasks.forEach(pid => {
      if (!visibleIds.has(pid)) return
      const p2 = positions[pid]
      if (!p2 || p2.y <= p1.y) return

      const cx2 = p2.x + NODE_W / 2

      edges.push(
        <line
          key={`par-${t.id}-${pid}`}
          x1={cx1}
          y1={p1.y + NODE_H}
          x2={cx2}
          y2={p2.y}
          stroke="#BA7517"
          strokeWidth={1}
          strokeDasharray="4 3"
          markerEnd="url(#arr-par)"
        />
      )
    })
  })

  return (
    <div className="flex flex-col h-screen overflow-hidden">

      {/* ================= HEADER ================= */}
      <header className="
        flex items-center justify-between
        px-4 py-3 border-b border-white/10
        flex-wrap gap-3
      ">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xs text-[var(--text-tertiary)] hover:underline">
            ← Home
          </Link>

          <span className="text-[var(--text-tertiary)]">/</span>

          <h1 className="text-lg font-semibold tracking-tight">
            Medical <span className="text-[var(--accent-primary)]">Crossway</span>
          </h1>

          <span className="text-xs text-[var(--text-secondary)] ml-2">
            {COUNTRY_NAMES[country]}
          </span>
        </div>

        <PhaseFilter
          active={activePhase}
          onChange={p => {
            setActivePhase(p)
            setSelectedId(null)
          }}
        />
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex flex-1 overflow-hidden">

        {/* Canvas */}
        <section className="
          flex-1 overflow-auto relative
          bg-[var(--bg-secondary)]
          [background-image:radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)]
          [background-size:24px_24px]
        ">
          <div
            className="relative min-w-full min-h-full"
            style={{ width: canvasW, height: canvasH }}
          >
            <svg
              ref={svgRef}
              className="absolute top-0 left-0 pointer-events-none"
              width={canvasW}
              height={canvasH}
            >
              <defs>
                <marker id="arr-next" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" />
                </marker>

                <marker id="arr-par" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="#BA7517" strokeWidth="1.5" />
                </marker>
              </defs>

              {edges}
            </svg>

            {visible.map(t => {
              const pos = positions[t.id]

              return (
                <div
                  key={t.id}
                  className="absolute"
                  style={{ left: pos.x, top: pos.y }}
                >
                  <TaskNode
                    task={t}
                    selected={selectedId === t.id}
                    onClick={() => selectNode(t.id)}
                    onStatusChange={status => updateStatus(t.id, status)}
                  />
                </div>
              )
            })}
          </div>
        </section>

        {/* Detail Panel */}
        {selectedTask && (
          <DetailPanel
            task={selectedTask}
            allTasks={tasks}
            onClose={closeDetail}
            onStatusChange={updateStatus}
            onNavigate={id => setSelectedId(id)}
          />
        )}
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="
        px-4 py-2 border-t border-white/10
        flex items-center gap-4 flex-wrap text-xs
        text-[var(--text-secondary)]
      ">
        <span>→ Next task</span>
        <span className="text-[#BA7517]">⇢ Parallel</span>

        <span className="ml-auto">
          <span className="text-green-400">● </span>Complete
          <span className="text-yellow-400 ml-3">● </span>In progress
          <span className="text-gray-500 ml-3">● </span>To do
        </span>
      </footer>

    </div>
  )
}