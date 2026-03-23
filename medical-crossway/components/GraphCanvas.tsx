'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { Task, Phase, PHASES, Status } from '@/lib/types'
import TaskNode from './TaskNode'
import DetailPanel from './DetailPanel'
import PhaseFilter from './PhaseFilter'

const NODE_W = 180, NODE_H = 100, COL_W = 260, PAD_X = 40, PAD_Y = 100, ROW_H = 130
const PHASE_ORDER: Phase[] = ['premed', 'mcat', 'medschool', 'residency', 'surgery']

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

interface Props { initialTasks: Task[] }

export default function GraphCanvas({ initialTasks }: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activePhase, setActivePhase] = useState<Phase | 'all'>('all')
  const svgRef = useRef<SVGSVGElement>(null)

  const visible = activePhase === 'all' ? tasks : tasks.filter(t => t.phase === activePhase)
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

  // Draw SVG edges
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
        <path key={`next-${t.id}-${nid}`}
          d={`M${cx1},${p1.y + NODE_H} C${cx1},${my} ${cx2},${my} ${cx2},${p2.y}`}
          fill="none" stroke="var(--color-text-tertiary)" strokeWidth={1.2}
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
        <line key={`par-${t.id}-${pid}`}
          x1={cx1} y1={p1.y + NODE_H} x2={cx2} y2={p2.y}
          stroke="#BA7517" strokeWidth={1} strokeDasharray="4 3"
          markerEnd="url(#arr-par)"
        />
      )
    })
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', borderBottom: '0.5px solid var(--color-border-tertiary)',
        flexShrink: 0, gap: 12, flexWrap: 'wrap',
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text-primary)', letterSpacing: -0.3 }}>
          Medical <span style={{ color: '#3C3489' }}>Crossway</span>
        </h1>
        <PhaseFilter active={activePhase} onChange={p => { setActivePhase(p); setSelectedId(null) }} />
      </div>

      {/* Main */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Canvas */}
        <div style={{
          flex: 1, overflow: 'auto', position: 'relative',
          background: 'var(--color-background-tertiary)',
          backgroundImage: 'radial-gradient(circle, var(--color-border-tertiary) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}>
          <div style={{ position: 'relative', width: canvasW, height: canvasH, minWidth: '100%', minHeight: '100%' }}>
            {/* Edges */}
            <svg ref={svgRef} style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none' }}
              width={canvasW} height={canvasH}>
              <defs>
                <marker id="arr-next" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </marker>
                <marker id="arr-par" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="#BA7517" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </marker>
              </defs>
              {edges}
            </svg>

            {/* Nodes */}
            {visible.map(t => {
              const pos = positions[t.id]
              return (
                <div key={t.id} style={{ position: 'absolute', left: pos.x, top: pos.y }}>
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
        </div>

        {/* Detail panel */}
        {selectedTask && (
          <DetailPanel
            task={selectedTask}
            allTasks={tasks}
            onClose={closeDetail}
            onStatusChange={updateStatus}
            onNavigate={id => setSelectedId(id)}
          />
        )}
      </div>

      {/* Legend */}
      <div style={{
        padding: '8px 16px', borderTop: '0.5px solid var(--color-border-tertiary)',
        display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', flexShrink: 0,
        fontSize: 11, color: 'var(--color-text-secondary)',
      }}>
        <span>→ Next task</span>
        <span style={{ color: '#BA7517' }}>⇢ Parallel</span>
        <span style={{ marginLeft: 'auto' }}>
          <span style={{ color: '#1D9E75' }}>● </span>Complete
          <span style={{ color: '#BA7517', marginLeft: 10 }}>● </span>In progress
          <span style={{ color: 'var(--color-border-secondary)', marginLeft: 10 }}>● </span>To do
        </span>
      </div>
    </div>
  )
}