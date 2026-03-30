'use client'

import { Phase, PHASES } from '@/lib/types'

interface Props {
  active: Phase | 'all'
  onChange: (phase: Phase | 'all') => void
}

export default function PhaseFilter({ active, onChange }: Props) {
  const phases = [
    { key: 'all', label: 'All phases', className: 'phase-all' },
    ...Object.entries(PHASES).map(([key, val]) => ({
      key,
      label: val.label,
      className: `phase-${key}`, // 👈 class-based color system
    })),
  ]

  return (
    <div
      className="
        flex flex-wrap gap-2
        p-1.5 rounded-2xl
        bg-white/5 border border-white/10
        backdrop-blur-md
      "
      role="group"
      aria-label="Filter by medical phase"
    >
      {phases.map(p => {
        const isActive = active === p.key

        return (
          <button
            type="button"
            key={p.key}
            onClick={() => onChange(p.key as Phase | 'all')}
            aria-pressed={isActive} // 👈 Fixed here
            className={`
              phase-btn
              ${p.className}

              relative text-xs font-medium px-3 py-1.5 rounded-xl
              transition-all duration-200

              ${isActive
                ? "phase-active text-white shadow-lg scale-[1.02]"
                : "text-[var(--text-secondary)] hover:text-white"
              }
            `}
          >
            {p.label}
          </button>
        )
      })}
    </div>
  )
}