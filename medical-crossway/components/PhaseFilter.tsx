'use client'
import { Phase, PHASES } from '@/lib/types'

interface Props {
  active: Phase | 'all'
  onChange: (phase: Phase | 'all') => void
}

export default function PhaseFilter({ active, onChange }: Props) {
  const phases = [
    { key: 'all', label: 'All phases' },
    ...Object.entries(PHASES).map(([key, val]) => ({ key, label: val.label })),
  ]

  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {phases.map(p => (
        <button
          key={p.key}
          onClick={() => onChange(p.key as Phase | 'all')}
          style={{
            fontSize: 11,
            fontWeight: 500,
            padding: '4px 12px',
            borderRadius: 20,
            border: '0.5px solid transparent',
            cursor: 'pointer',
            background: active === p.key
              ? p.key === 'all'
                ? 'var(--color-text-primary)'
                : PHASES[p.key as Phase]?.color
              : 'var(--color-background-secondary)',
            color: active === p.key ? '#fff' : 'var(--color-text-secondary)',
            transition: 'all .15s',
          }}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}