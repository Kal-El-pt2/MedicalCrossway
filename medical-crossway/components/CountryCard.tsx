'use client'

type Country = {
  code: string
  name: string
  flag: string
  description: string
  available: boolean
}

export default function CountryCard({ country }: { country: Country }) {
  return (
    <div
      style={{
        background: 'var(--color-background-primary)',
        border: `1.5px solid ${country.available ? '#CECBF6' : 'var(--color-border-tertiary)'}`,
        borderRadius: 14,
        padding: '20px 20px 18px',
        transition: 'transform .15s, box-shadow .15s',
        opacity: country.available ? 1 : 0.6,
        position: 'relative',
        height: '100%',
      }}
      onMouseEnter={e => {
        if (!country.available) return
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-3px)'
        el.style.boxShadow = '0 8px 24px rgba(83,74,183,0.12)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'none'
        el.style.boxShadow = 'none'
      }}
    >
      {!country.available && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            background: 'var(--color-background-secondary)',
            color: 'var(--color-text-tertiary)',
            padding: '3px 8px',
            borderRadius: 10,
          }}
        >
          Coming soon
        </div>
      )}

      <div style={{ fontSize: 36, marginBottom: 12 }}>{country.flag}</div>

      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: 6,
        }}
      >
        {country.name}
      </div>

      <div
        style={{
          fontSize: 12,
          lineHeight: 1.5,
          color: 'var(--color-text-secondary)',
        }}
      >
        {country.description}
      </div>

      {country.available && (
        <div
          style={{
            marginTop: 16,
            fontSize: 12,
            color: '#534AB7',
            fontWeight: 500,
          }}
        >
          Start journey →
        </div>
      )}
    </div>
  )
}