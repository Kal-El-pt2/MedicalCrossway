'use client'
import { Task, PHASES, Status } from '@/lib/types'

interface Props {
  task: Task
  selected: boolean
  onClick: () => void
  onStatusChange: (status: Status) => void
}

const STATUS_CYCLE: Status[] = ['todo', 'progress', 'complete']

export default function TaskNode({ task, selected, onClick, onStatusChange }: Props) {
  const phase = PHASES[task.phase]

  function cycleStatus(e: React.MouseEvent) {
    e.stopPropagation()
    const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(task.status) + 1) % STATUS_CYCLE.length]
    onStatusChange(next)
  }

  const statusStyle: Record<Status, React.CSSProperties> = {
    complete: { background: '#E1F5EE', color: '#0F6E56' },
    progress: { background: '#FAEEDA', color: '#633806' },
    todo:     { background: '#2a2a2a', color: '#888' },
  }

  const statusLabel: Record<Status, string> = {
    complete: '✓ Complete',
    progress: '⧗ In progress',
    todo:     '○ To do',
  }

  return (
    <div
      onClick={onClick}
      style={{
        width: 180,
        borderRadius: 10,
        border: `1.5px solid ${selected ? phase.color : phase.border}`,
        background: '#1a1a1a',
        cursor: 'pointer',
        boxShadow: selected ? `0 0 0 3px ${phase.border}` : 'none',
        transition: 'transform .15s, box-shadow .15s',
        transform: selected ? 'translateY(-2px)' : 'none',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '10px 12px 8px',
        background: phase.bg,
      }}>
        <div style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: 1,
          textTransform: 'uppercase',
          color: phase.color,
          marginBottom: 5,
        }}>
          {phase.label}
        </div>
        <div style={{
          fontSize: 13,
          fontWeight: 500,
          lineHeight: 1.4,
          color: '#111',
        }}>
          {task.title}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 10px 8px',
        background: '#1a1a1a',
        gap: 6,
      }}>
        <span
          onClick={cycleStatus}
          style={{
            fontSize: 10,
            fontWeight: 500,
            padding: '3px 8px',
            borderRadius: 10,
            cursor: 'pointer',
            ...statusStyle[task.status],
          }}
        >
          {statusLabel[task.status]}
        </span>
        {task.parallelTasks.length > 0 && (
          <span style={{
            fontSize: 9,
            padding: '2px 6px',
            borderRadius: 8,
            background: '#FAEEDA',
            color: '#633806',
            fontWeight: 500,
          }}>
            parallel
          </span>
        )}
      </div>
    </div>
  )
}