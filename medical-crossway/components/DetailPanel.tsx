'use client'
import { Task, PHASES, Status } from '@/lib/types'

interface SectionProps {
  title: string
  ids: string[]
  allTasks: Task[]
  onNavigate: (id: string) => void
}

function Section({ title, ids, allTasks, onNavigate }: SectionProps) {
  const tasks = ids.map(id => allTasks.find(t => t.id === id)).filter(Boolean) as Task[]
  if (!tasks.length) return null
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: .5, textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 6 }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {tasks.map(t => (
          <span
            key={t.id}
            onClick={() => onNavigate(t.id)}
            style={{
              fontSize: 11, padding: '3px 9px', borderRadius: 10, cursor: 'pointer',
              background: 'var(--color-background-secondary)',
              color: 'var(--color-text-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
            }}
          >
            {t.title}
          </span>
        ))}
      </div>
    </div>
  )
}

interface Props {
  task: Task | null
  allTasks: Task[]
  onClose: () => void
  onStatusChange: (id: string, status: Status) => void
  onNavigate: (id: string) => void
}

const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: 'todo',     label: '○ To do' },
  { value: 'progress', label: '⧗ In progress' },
  { value: 'complete', label: '✓ Complete' },
]

const statusActive: Record<Status, React.CSSProperties> = {
  complete: { background: '#E1F5EE', color: '#0F6E56', borderColor: '#9FE1CB' },
  progress: { background: '#FAEEDA', color: '#633806', borderColor: '#FAC775' },
  todo:     { background: 'var(--color-background-info)', color: 'var(--color-text-info)', borderColor: 'var(--color-border-info)' },
}

export default function DetailPanel({ task, allTasks, onClose, onStatusChange, onNavigate }: Props) {
  if (!task) return null

  const phase = PHASES[task.phase]

  return (
    <div style={{
      width: 280, flexShrink: 0,
      borderLeft: '0.5px solid var(--color-border-tertiary)',
      background: 'var(--color-background-primary)',
      overflowY: 'auto', padding: 16, position: 'relative',
    }}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 10, right: 10,
          width: 22, height: 22, borderRadius: '50%',
          border: '0.5px solid var(--color-border-secondary)',
          background: 'var(--color-background-secondary)',
          cursor: 'pointer', fontSize: 13, color: 'var(--color-text-secondary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        ×
      </button>

      <div style={{ paddingRight: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: .5, textTransform: 'uppercase', color: phase.color, marginBottom: 4 }}>
          {phase.label}
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 12, lineHeight: 1.3 }}>
          {task.title}
        </h2>
      </div>

      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
        {STATUS_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => onStatusChange(task.id, opt.value)}
            style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 10, cursor: 'pointer',
              border: '0.5px solid var(--color-border-tertiary)',
              background: 'var(--color-background-secondary)',
              color: 'var(--color-text-secondary)',
              transition: 'all .12s',
              ...(task.status === opt.value ? statusActive[opt.value] : {}),
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 8 }}>
        {task.description}
      </p>

      <Section title="Requirements"   ids={task.requirements} allTasks={allTasks} onNavigate={onNavigate} />
      <Section title="Next tasks"     ids={task.nextTasks}     allTasks={allTasks} onNavigate={onNavigate} />
      <Section title="Parallel tasks" ids={task.parallelTasks} allTasks={allTasks} onNavigate={onNavigate} />
    </div>
  )
}