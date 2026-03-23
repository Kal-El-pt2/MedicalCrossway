import Link from 'next/link'
import CountryCard from '@/components/CountryCard'

const COUNTRIES = [
  {
    code: 'us',
    name: 'United States',
    flag: '🇺🇸',
    description: 'MD pathway via USMLE, residency match, and fellowship',
    available: true,
  },
  {
    code: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    description: 'MBChB pathway via Foundation Programme and specialty training',
    available: false,
  },
  {
    code: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    description: 'MD pathway via MCCQE, CaRMS match, and residency',
    available: false,
  },
  {
    code: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    description: 'MBBS pathway via AMC exam and specialist college training',
    available: false,
  },
  {
    code: 'in',
    name: 'India',
    flag: '🇮🇳',
    description: 'MBBS pathway via NEET, PG entrance, and surgical training',
    available: false,
  },
]

export default function LandingPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--color-background-tertiary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 56, maxWidth: 560 }}>
        <div style={{
          display: 'inline-block',
          fontSize: 11, fontWeight: 600, letterSpacing: 2,
          textTransform: 'uppercase',
          color: '#3C3489',
          background: '#EEEDFE',
          padding: '4px 14px', borderRadius: 20,
          marginBottom: 20,
        }}>
          Medical Education Tracker
        </div>
        <h1 style={{
          fontSize: 48, fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1.15, letterSpacing: -1.5,
          marginBottom: 16,
        }}>
          Medical{' '}
          <span style={{ color: '#3C3489' }}>Crossway</span>
        </h1>
        <p style={{
          fontSize: 16, lineHeight: 1.7,
          color: 'var(--color-text-secondary)',
          maxWidth: 440, margin: '0 auto',
        }}>
          Track every step of your journey from high school graduation
          to becoming a surgeon. Select your country to get started.
        </p>
      </div>

      {/* Country grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
        width: '100%',
        maxWidth: 800,
      }}>
        {COUNTRIES.map(country => (
          country.available ? (
            <Link
              key={country.code}
              href={`/journey/${country.code}`}
              style={{ textDecoration: 'none' }}
            >
              <CountryCard country={country} />
            </Link>
          ) : (
            <div key={country.code} style={{ cursor: 'not-allowed' }}>
              <CountryCard country={country} />
            </div>
          )
        ))}
      </div>

      {/* Footer */}
      <p style={{
        marginTop: 48, fontSize: 12,
        color: 'var(--color-text-tertiary)',
        textAlign: 'center',
      }}>
        More countries coming soon · Built for medical students worldwide
      </p>
    </main>
  )
}
  