import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 16, textAlign: 'center',
      background: 'var(--color-background-tertiary)',
    }}>
      <div style={{ fontSize: 48 }}>🌍</div>
      <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--color-text-primary)' }}>
        Coming soon
      </h1>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', maxWidth: 320 }}>
        We&apos;re working on adding this country&apos;s medical journey. Check back soon!
      </p>
      <Link href="/" style={{
        marginTop: 8, fontSize: 13, fontWeight: 500,
        color: '#534AB7', textDecoration: 'none',
      }}>
        ← Back to home
      </Link>
    </main>
  )
}