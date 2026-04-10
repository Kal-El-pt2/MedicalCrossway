'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CountryCard from '@/components/CountryCard'
import s from './LandingPage.module.css'

// ─── Types & Data ───────────────────────────────────────────────────────────

type Country = { code: string; name: string; flag: string; description: string; available: boolean }
type Phase = 'lamp' | 'speech' | 'countries' | 'roadmap'
type RoadmapStep = { id: string; dot: string; color: string; bg: string; title: string; meta: string; tags: string[], branches?: RoadmapBranch[] }
type RoadmapBranch = { id: string, title: string, meta: string, color: string }

const COUNTRIES: Country[] = [
  { code: 'in', name: 'India', flag: '🇮🇳', description: 'MBBS pathway via NEET', available: true },
  { code: 'us', name: 'United States', flag: '🇺🇸', description: 'MD pathway via USMLE', available: true },
]

const ROADMAPS: Record<string, RoadmapStep[]> = {
  in: [
    {
      id: 'school',
      dot: '12',
      color: '#d97706',
      bg: '#fffbeb',
      title: 'High School',
      meta: 'Class 11 & 12 · PCB',
      tags: ['Biology', 'NEET Prep'],
      branches: [
        {
          id: 'abroad',
          title: 'MBBS Abroad',
          meta: 'Russia, Philippines, etc.',
          color: '#4f46e5'
        }
      ]
    },
    { id: 'mbbs', dot: 'MB', color: '#059669', bg: '#ecfdf5', title: 'Medical College', meta: '5.5 Years MBBS', tags: ['Internship', 'Anatomy'] },
    { id: 'neetpg', dot: 'PG', color: '#4f46e5', bg: '#eef2ff', title: 'Postgrad Entry', meta: 'NEET PG Exam', tags: ['Surgery Rank'] },
    { id: 'ms', dot: 'MS', color: '#be185d', bg: '#fdf2f8', title: 'Residency', meta: '3 Years MS Surgery', tags: ['Hospital'] },
  ],
  us: [
    { id: 'undergrad', dot: 'BA', color: '#d97706', bg: '#fffbeb', title: 'Undergrad', meta: 'Pre-med 4 years', tags: ['GPA', 'MCAT'] },
    { id: 'match', dot: 'MR', color: '#4f46e5', bg: '#eef2ff', title: 'The Match', meta: 'Residency Match', tags: ['Residency', 'USMLE'] },
  ]
}


// ─── Lamp SVG Character ─────────────────────────────────────────────────────

function LampSvg({ size = 72 }: { size?: number }) {
  // Scaling factor to maintain proportions
  const h = Math.round(size * (100 / 52));
  return (
    <svg width={size} height={h} viewBox="0 0 52 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow at bottom */}
      <ellipse cx="26" cy="94" rx="14" ry="5" fill="#000" opacity="0.08" />

      {/* Main Pillar (Body) */}
      <path d="M18 40 H34 V82 C34 88 31 92 26 92 C21 92 18 88 18 82 V40Z" fill="#F9F7F2" stroke="#d1c8bd" strokeWidth="1" />

      {/* Red Stripes on Pillar */}
      <rect x="18.5" y="52" width="15" height="8" fill="rgb(229, 115, 115)" />
      <rect x="18.5" y="72" width="15" height="8" fill="#E57373" />

      {/* Yellow Head (The Light) */}
      <rect x="13" y="28" width="26" height="18" rx="7" fill="#FFD54F" stroke="#F57F17" strokeWidth="1.5" />

      {/* Small Window/Eye in Head */}
      <circle cx="26" cy="37" r="5" fill="#FFFDE7" stroke="#F57F17" strokeWidth="1" />

      {/* Roof (Gray Triangle) */}
      <path d="M11 28 L26 12 L41 28 H11Z" fill="#A8A29E" stroke="#78716C" strokeWidth="1" />

      {/* Medical Cross on Top */}
      <rect x="24" y="0" width="4" height="11" rx="1" fill="#EF5350" />
      <rect x="20.5" y="3.5" width="11" height="4" rx="1" fill="#EF5350" />
    </svg>
  )
}

// ─── Illustrative Step Icons ────────────────────────────────────────────────

const SchoolIcon = ({ color }: { color: string }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><path d="M3 21h18M10 21V11m4 10V11M2 11l10-9 10 9" /></svg>
)
const HospitalIcon = ({ color }: { color: string }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM12 7v10M7 12h10" /></svg>
)
const PlaneIcon = ({ color }: { color: string }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill={color}><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg>
)

// ─── Component Helpers ──────────────────────────────────────────────────────
function branchVars(branch: RoadmapBranch): React.CSSProperties {
  return {
    '--branch-color': branch.color,
  } as React.CSSProperties
}

function stepVars(step: RoadmapStep): React.CSSProperties {
  return {
    '--step-color': step.color,
    '--tag-bg': `color-mix(in srgb, ${step.color} 10%, white)`,
    '--tag-border': `color-mix(in srgb, ${step.color} 20%, transparent)`,
  } as React.CSSProperties
}

function StepRow({ step, index }: { step: RoadmapStep; index: number }) {
  const getIcon = () => {
    if (step.id === 'school' || step.id === 'undergrad') return <SchoolIcon color={step.color} />
    if (step.id === 'match' || step.id === 'abroad') return <PlaneIcon color={step.color} />
    return <HospitalIcon color={step.color} />
  }

  return (
    <div className={s.stepRow} style={stepVars(step)}>
      <div className={s.stepInner}>
        <div className={s.dot}>{getIcon()}</div>
        <div className={s.card}>
          <div className={s.cardTitle}>{step.title}</div>
          <div className={s.cardMeta}>{step.meta}</div>
          <div className={s.tagList}>
            {step.tags.map(tag => <span key={tag} className={s.tag}>{tag}</span>)}
          </div>
        </div>
      </div>

      {step.branches && step.branches.map((branch) => (
        <div key={branch.id} className={s.branchContainer}>
          <svg
            viewBox="0 0 420 140"
            className={s.branchSvg}
            preserveAspectRatio="xMinYMin meet"
            style={{ overflow: 'visible' }}
          >
            {/* Road surface — solid tan fill */}
            <path
              d="M 0 0 C 0 50, 60 90, 150 108 C 220 120, 290 126, 340 126"
              stroke="#d1c8bd"
              strokeWidth="32"
              fill="none"
              strokeLinecap="round"
            />
            {/* Centre dashes — on top of road surface */}
            <path
              d="M 0 0 C 0 50, 60 90, 150 108 C 220 120, 290 126, 340 126"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="butt"
              strokeDasharray="8 8"
            />
            {/* Branch card */}
            <rect x="292" y="108" width="120" height="44" rx="12"
              fill="white" stroke={branch.color} strokeWidth="2.5" />
            <text x="304" y="126" fontSize="12" fontWeight="800" fill={branch.color}>
              {branch.title}
            </text>
            <text x="304" y="142" fontSize="10" fill="#718096">
              {branch.meta}
            </text>
          </svg>
        </div>
      ))}
    </div>
  )
}
// ─── Main Component ─────────────────────────────────────────────────────────

export default function LandingPage() {
  const [phase, setPhase] = useState<Phase>('lamp')
  const [selectedCountry, setSelected] = useState<Country | null>(
    COUNTRIES.find(c => c.code === 'in') ?? null
  )

  useEffect(() => {
//    const t1 = setTimeout(() => setPhase('speech'), 800)
//  const t2 = setTimeout(() => setPhase('countries'), 4500)
//    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const showHeroLamp = phase === 'countries' || phase === 'roadmap'

  return (
    <main className={s.main}>
      <div className={s.glowBlob} />

      <div className={s.hero}>
        <div className={s.titleRow}>
          <AnimatePresence>
            {showHeroLamp && (
              <motion.div
                layoutId="lamp"
                key="lamp-small"
                className={s.lampHero}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <LampSvg size={32} />
              </motion.div>
            )}
          </AnimatePresence>
          <h1 className={s.title}>Medical Crossway</h1>
        </div>
        <p className={s.subtitle}>
          {phase === 'roadmap' ? `Pathway for ${selectedCountry?.name}` : "Charting your journey to become a surgeon."}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* Intro Lamp Character */}
        {(phase === 'lamp' || phase === 'speech') && (
          <motion.div
            layoutId="lamp"
            key="lamp-big"
            className={s.lampCenter}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
          >
            <LampSvg size={80} />
          </motion.div>
        )}

        {/* Speech Bubble */}
        {phase === 'speech' && (
          <motion.div key="speech" className={s.speech} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
            <p className={s.speechText}>
              Hi! I&apos;m here to <b>shine a light</b> on your path. <br /> Select a country to see the roadmap to surgery.
            </p>
          </motion.div>
        )}

        {/* Country Grid */}
        {phase === 'countries' && (
          <motion.div key="countries" className={s.countryGrid} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {COUNTRIES.map(c => (
              <div key={c.code} onClick={() => { setSelected(c); setPhase('roadmap') }} className={s.clickable}>
                <CountryCard country={c} />
              </div>
            ))}
          </motion.div>
        )}

        {/* Roadmap View */}
        {phase === 'roadmap' && selectedCountry && (
          <motion.div key="roadmap" className={s.roadmapSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            {/* This button is now positioned absolutely to the left */}
            <button className={s.backBtn} onClick={() => { setPhase('countries'); setSelected(null) }}>
              ← Change Country
            </button>

            {ROADMAPS[selectedCountry.code].map((step, i) => (
              <StepRow key={step.id} step={step} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className={s.footer}>Built for future surgeons worldwide</footer>
    </main>
  )
}