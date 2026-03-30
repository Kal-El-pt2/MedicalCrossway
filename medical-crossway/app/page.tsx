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
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden">

      {/* 🌟 HERO GLOW */}
      <div className="absolute top-[-120px] w-[600px] h-[600px]
        bg-[radial-gradient(circle,rgba(108,99,255,0.25),transparent_70%)]
        blur-3xl opacity-60 pointer-events-none"
      />

      {/* Hero */}
      <div className="text-center max-w-xl mb-14 relative z-10">

        {/* Badge */}
        <div className="
          inline-block text-[10px] font-semibold tracking-widest uppercase
          text-[var(--accent-primary)]
          bg-[rgba(108,99,255,0.1)]
          px-4 py-1 rounded-full mb-5
          border border-[rgba(108,99,255,0.2)]
        ">
          Medical Education Tracker
        </div>

        {/* Title */}
        <h1 className="
          text-5xl font-bold leading-tight tracking-tight mb-4
          bg-gradient-to-r from-white via-[#c7c7ff] to-[var(--accent-primary)]
          text-transparent bg-clip-text
        ">
          Medical Crossway
        </h1>

        {/* Divider */}
        <div className="w-20 h-1 mx-auto mb-6 rounded-full 
          bg-gradient-to-r from-[var(--accent-primary)] to-transparent"
        />

        {/* Subtitle */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Track every step of your journey from high school graduation
          to becoming a surgeon. Select your country to get started.
        </p>
      </div>

      {/* 🌟 GRID LIGHTING */}
      <div className="relative w-full max-w-4xl">

        <div className="absolute inset-0 
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_70%)]
          pointer-events-none"
        />

        {/* Grid */}
        <div className="
          grid gap-5 relative z-10
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        ">
          {COUNTRIES.map(country => (
            country.available ? (
              <Link key={country.code} href={`/journey/${country.code}`}>
                <CountryCard country={country} />
              </Link>
            ) : (
              <CountryCard key={country.code} country={country} />
            )
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-14 text-xs text-[var(--text-tertiary)] text-center">
        More countries coming soon · Built for medical students worldwide
      </p>
    </main>
  )
}