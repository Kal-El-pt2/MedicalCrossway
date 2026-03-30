'use client'

import { Task, PHASES, Status } from '@/lib/types'

interface Props {
  task: Task
  selected: boolean
  onClick: () => void
  onStatusChange: (status: Status) => void
}

const STATUS_CYCLE: Status[] = ['todo', 'progress', 'complete']

const STATUS_CLASSES: Record<Status, string> = {
  complete: 'bg-green-100 text-green-700',
  progress: 'bg-yellow-100 text-yellow-700',
  todo: 'bg-white/5 text-[var(--text-secondary)] border border-white/10',
}

const STATUS_LABEL: Record<Status, string> = {
  complete: '✓ Complete',
  progress: '⧗ In progress',
  todo: '○ To do',
}

export default function TaskNode({ task, selected, onClick, onStatusChange }: Props) {
  const phase = PHASES[task.phase]

  function cycleStatus(e: React.MouseEvent) {
    e.stopPropagation()
    const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(task.status) + 1) % STATUS_CYCLE.length]
    onStatusChange(next)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-[180px] text-left rounded-xl overflow-hidden
        border transition-all duration-150

        ${selected
          ? 'ring-2 ring-[var(--accent-primary)] -translate-y-1'
          : 'border-white/10 hover:-translate-y-0.5'
        }

        bg-[rgba(255,255,255,0.02)]
      `}
    >
      {/* 🔥 HEADER (RESTORED STRONG IDENTITY) */}
      <div
        className="px-3 py-2 border-b border-black/10"
        style={{
          background: phase.bg,
        }}
      >
        <div
          className="text-[9px] font-semibold tracking-widest uppercase mb-1"
          style={{ color: phase.color }}
        >
          {phase.label}
        </div>

        <div className="text-sm font-medium leading-snug text-black">
          {task.title}
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between px-3 py-2 gap-2">
        <button
          type="button"
          onClick={cycleStatus}
          className={`
            text-[10px] font-medium px-2.5 py-1 rounded-full
            transition
            ${STATUS_CLASSES[task.status]}
          `}
        >
          {STATUS_LABEL[task.status]}
        </button>

        {task.parallelTasks.length > 0 && (
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">
            parallel
          </span>
        )}
      </div>
    </button>
  )
}