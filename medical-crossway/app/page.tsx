'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CountryCard from '@/components/CountryCard'
import s from './LandingPage.module.css'
import { Cinzel, Inter } from 'next/font/google'

const cinzel = Cinzel({ subsets: ['latin'], weight: ['700', '800'] })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] })

type Country = { code: string; name: string; flag: string; description: string; available: boolean }
type Phase = 'lamp' | 'speech' | 'countries' | 'roadmap'
type RoadmapDetail = { t: string; s: string }
type RoadmapStep = { id: string; dot: string; color: string; bg: string; title: string; meta: string; tags: string[], branches?: RoadmapBranch[], detail?: { emoji: string; title: string; sub: string; items: RoadmapDetail[] } }
type RoadmapBranch = {
  id: string; title: string; meta: string; color: string;
  side?: 'left' | 'right'
  detail?: { emoji: string; title: string; sub: string; items: RoadmapDetail[] }
}

const COUNTRIES: Country[] = [
  { code: 'in', name: 'India', flag: '🇮🇳', description: 'MBBS pathway via NEET', available: true },
  { code: 'us', name: 'United States', flag: '🇺🇸', description: 'MD pathway via USMLE', available: true },
]

const ROADMAPS: Record<string, RoadmapStep[]> = {
  in: [
    {
      id: 'school', dot: '12', color: '#d97706', bg: '#fffbeb',
      title: 'High School', meta: 'Class 11 & 12 · PCB', tags: ['Biology', 'NEET Prep'],
      detail: {
        emoji: '🏫', title: 'School → medicine',
        sub: 'Everything you need before you even start preparing',
        items: [
          { t: 'Why medicine?', s: 'Is it right for you' },
          { t: 'PCB vs PCMB', s: 'Which stream to pick' },
          { t: 'NEET timeline', s: 'Class 11 to exam day' },
          { t: 'Coaching guide', s: 'Classroom vs self-study' },
          { t: 'Other paths', s: 'Pharma, dentistry, more' },
        ]
      },
      branches: [
        {
          id: 'abroad', side: 'right', title: 'MBBS Abroad', meta: 'Russia, Philippines, etc.', color: '#4f46e5',
          detail: {
            emoji: '✈️', title: 'MBBS abroad',
            sub: 'Study medicine outside India — NMC approved pathways',
            items: [
              { t: 'Russia', s: 'Top colleges, cost, life' },
              { t: 'Philippines', s: 'English medium, USMLE path' },
              { t: 'Georgia', s: 'EU-recognised degrees' },
              { t: 'Kazakhstan', s: 'Affordable, NMC listed' },
              { t: 'China', s: 'Budget option, what to know' },
              { t: 'Ukraine', s: 'Post-war update & options' },
              { t: 'Bangladesh', s: 'Closest, easiest option' },
              { t: 'Compare all', s: 'Cost · duration · risk' },
            ]
          },
        },
        {
          id: 'nursing', side: 'left', title: 'Nursing', meta: 'BSc, GNM & allied health', color: '#be185d',
          detail: {
            emoji: '🩺', title: 'Nursing & allied health',
            sub: 'A huge world beyond MBBS',
            items: [
              { t: 'BSc Nursing', s: 'Entrance & top colleges' },
              { t: 'GNM', s: 'Vs BSc — what to choose' },
              { t: 'Nursing abroad', s: 'UK, Canada, Gulf pathways' },
              { t: 'Physiotherapy', s: 'BPT entrance & career' },
              { t: 'Radiology', s: 'BMRIT & imaging careers' },
              { t: 'Occupational therapy', s: 'BOT guide' },
            ]
          },
        }
      ]
    },
    {
      id: 'mbbs', dot: 'MB', color: '#059669', bg: '#ecfdf5',
      title: 'Medical College', meta: '5.5 Years MBBS', tags: ['Internship', 'Anatomy'],
      branches: [
        {
          id: 'abroad', side: 'right', title: 'MBBS Abroad', meta: 'Russia, Philippines, etc.', color: '#4f46e5',
          detail: {
            emoji: '✈️', title: 'MBBS abroad',
            sub: 'Study medicine outside India — NMC approved pathways',
            items: [
              { t: 'Russia', s: 'Top colleges, cost, life' },
              { t: 'Philippines', s: 'English medium, USMLE path' },
              { t: 'Georgia', s: 'EU-recognised degrees' },
              { t: 'Kazakhstan', s: 'Affordable, NMC listed' },
              { t: 'China', s: 'Budget option, what to know' },
              { t: 'Ukraine', s: 'Post-war update & options' },
              { t: 'Bangladesh', s: 'Closest, easiest option' },
              { t: 'Compare all', s: 'Cost · duration · risk' },
            ]
          },
        }
      ]
    },
    { id: 'neetpg', dot: 'PG', color: '#4f46e5', bg: '#eef2ff', title: 'Postgrad Entry', meta: 'NEET PG Exam', tags: ['Surgery Rank'] },
    { id: 'ms', dot: 'MS', color: '#be185d', bg: '#fdf2f8', title: 'Residency', meta: '3 Years MS Surgery', tags: ['Hospital'] },
  ],
  us: [
    { id: 'undergrad', dot: 'BA', color: '#d97706', bg: '#fffbeb', title: 'Undergrad', meta: 'Pre-med 4 years', tags: ['GPA', 'MCAT'] },
    { id: 'match', dot: 'MR', color: '#4f46e5', bg: '#eef2ff', title: 'The Match', meta: 'Residency Match', tags: ['Residency', 'USMLE'] },
  ]
}

function LighthouseSvg({ size = 72 }: { size?: number }) {
  const h = Math.round(size * (400 / 300))
  return (
    <svg width={size} height={h} viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 1. Ground shadow */}
      <ellipse cx="150" cy="385" rx="100" ry="10" fill="#9B7D6A" opacity="0.45" />

      {/* 8. Top cross (MOVED BEHIND TOWER) */}
      <g transform="translate(150 30)">
        <rect x="-6" y="-22" width="12" height="44" rx="4" fill="#DC2626" />
        <rect x="-22" y="-6" width="44" height="12" rx="4" fill="#DC2626" />
      </g>

      {/* 2. Tower body */}
      <path d="M80 385 L108 160 L192 160 L220 385 Z" fill="#E8E6E2" />
      <path d="M80 385 L108 160 L122 160 L94 385 Z" fill="#C8C5C0" />

      {/* 3. Tower collar */}
      <path d="M95 160 L80 150 L220 150 L205 160 Z" fill="#E8E6E2" />
      <path d="M95 160 L80 150 L97 150 L112 160 Z" fill="#C8C5C0" />

      {/* 4. Platform */}
      <rect x="90" y="115" width="120" height="38" fill="white" />
      <rect x="90" y="115" width="25" height="38" fill="#C8C5C0" />

      {/* 5. Railings */}
      <rect x="80" y="148" width="140" height="5" rx="1" fill="#3C3841" />
      <rect x="85" y="132" width="130" height="5" rx="1" fill="#3C3841" />
      <path
        d="M98 134v16 M113 134v16 M128 134v16 M143 134v16 M158 134v16 M173 134v16 M188 134v16 M203 134v16"
        stroke="#3C3841"
        strokeWidth="5"
      />

      {/* 6. Lantern room */}
      <rect x="105" y="65" width="90" height="50" fill="white" />
      <rect x="105" y="65" width="18" height="50" fill="#C8C5C0" />

      {/* Lantern cross */}
      <g transform="translate(150 90)">
        <rect x="-6" y="-22" width="12" height="44" rx="4" fill="#DC2626" />
        <rect x="-22" y="-6" width="44" height="12" rx="4" fill="#DC2626" />
      </g>

      {/* Window frame verticals */}
      <rect x="115" y="65" width="4" height="50" fill="#3C3841" />
      <rect x="181" y="65" width="4" height="50" fill="#3C3841" />

      {/* 7. Roof */}
      <path d="M130 45 L170 45 L205 65 L95 65 Z" fill="#3C3841" />
      <path d="M130 45 L145 45 L145 65 L95 65 Z" fill="#2D2A31" />

      {/* Door and window */}
      <path d="M140 385 L140 360 Q140 350 150 350 Q160 350 160 360 L160 385 Z" fill="#3C3841" />
      <path d="M142 245 L142 233 Q142 227 150 227 Q158 227 158 233 L158 245 Z" fill="#3C3841" />
    </svg>
  )
}

const SchoolIcon = ({ color }: { color: string }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><path d="M3 21h18M10 21V11m4 10V11M2 11l10-9 10 9" /></svg>
)
const HospitalIcon = ({ color }: { color: string }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM12 7v10M7 12h10" /></svg>
)
const PlaneIcon = ({ color }: { color: string }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill={color}><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg>
)

function stepVars(step: RoadmapStep): React.CSSProperties {
  return {
    '--step-color': step.color,
    '--tag-bg': `color-mix(in srgb, ${step.color} 10%, white)`,
    '--tag-border': `color-mix(in srgb, ${step.color} 20%, transparent)`,
  } as React.CSSProperties
}

function StepRow({ step }: { step: RoadmapStep; index: number }) {
  const getIcon = () => {
    if (step.id === 'school' || step.id === 'undergrad') return <SchoolIcon color={step.color} />
    if (step.id === 'match' || step.id === 'abroad') return <PlaneIcon color={step.color} />
    return <HospitalIcon color={step.color} />
  }

  const leftBranches = step.branches?.filter(b => b.side === 'left') ?? []
  const rightBranches = step.branches?.filter(b => (b.side ?? 'right') === 'right') ?? []
  const hasBranches = (step.branches?.length ?? 0) > 0

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

      {hasBranches && (
        <div className={s.branchRow}>
          <div className={s.branchLeft}>
            {leftBranches.map(branch => (
              <svg key={branch.id} viewBox="0 0 420 140" className={s.branchSvg}
                preserveAspectRatio="xMinYMin meet" style={{ overflow: 'visible' }}>
                <path d="M 420 0 C 420 50, 390 90, 340 108 C 310 120, 280 126, 260 126"
                  stroke="#d1c8bd" strokeWidth="32" fill="none" strokeLinecap="round" />
                <path d="M 420 0 C 420 50, 390 90, 340 108 C 310 120, 280 126, 260 126"
                  stroke="rgba(255,255,255,0.55)" strokeWidth="3" fill="none"
                  strokeLinecap="butt" strokeDasharray="8 8" />
                <rect x="140" y="108" width="120" height="44" rx="12"
                  fill="white" stroke={branch.color} strokeWidth="2.5" />
                <text x="152" y="126" fontSize="12" fontWeight="800" fill={branch.color}>
                  {branch.title}
                </text>
                <text x="152" y="142" fontSize="10" fill="#718096">{branch.meta}</text>
              </svg>
            ))}
          </div>

          <div className={s.branchSpacer} />

          <div className={s.branchRightCol}>
            {rightBranches.map(branch => (
              <svg key={branch.id} viewBox="0 0 420 140" className={s.branchSvg}
                preserveAspectRatio="xMinYMin meet" style={{ overflow: 'visible' }}>
                <path d="M 0 0 C 0 50, 30 90, 80 108 C 110 120, 140 126, 160 126"
                  stroke="#d1c8bd" strokeWidth="32" fill="none" strokeLinecap="round" />
                <path d="M 0 0 C 0 50, 30 90, 80 108 C 110 120, 140 126, 160 126"
                  stroke="rgba(255,255,255,0.55)" strokeWidth="3" fill="none"
                  strokeLinecap="butt" strokeDasharray="8 8" />
                <rect x="160" y="108" width="120" height="44" rx="12"
                  fill="white" stroke={branch.color} strokeWidth="2.5" />
                <text x="172" y="126" fontSize="12" fontWeight="800" fill={branch.color}>
                  {branch.title}
                </text>
                <text x="172" y="142" fontSize="10" fill="#718096">{branch.meta}</text>
              </svg>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default function LandingPage() {
  const [phase, setPhase] = useState<Phase>('lamp')
  const [selectedCountry, setSelected] = useState<Country | null>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('speech'), 800)
    const t2 = setTimeout(() => {
      setSelected(COUNTRIES.find(c => c.code === 'in') ?? null)
      setPhase('roadmap')
    }, 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const showHeroLamp = phase === 'countries' || phase === 'roadmap'

  return (
    <main className={s.main}>
      <div className={s.glowBlob} />
      <div className={s.hero}>
        <div className={s.titleRow}>
          <AnimatePresence>
            {showHeroLamp && (
              <motion.div layoutId="lamp" key="lamp-small" className={s.lampHero}
                initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
                {/* INCREASED SIZE TO 80 */}
                <LighthouseSvg size={80} />
              </motion.div>
            )}
          </AnimatePresence>
          <h1 className={`${s.title} ${cinzel.className}`}>
            <span className={s.textSlate}>MEDICAL </span>
            <span className={s.textRed}>CROSS</span>
            <span className={s.textSlate}>WAY</span>
          </h1>
        </div>
        <p className={s.subtitle}>
          {phase === 'roadmap' ? `Pathway for ${selectedCountry?.name}` : "Charting your journey to become a surgeon."}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {(phase === 'lamp' || phase === 'speech') && (
          <motion.div layoutId="lamp" key="lamp-big" className={s.lampCenter}
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}>
            {/* INCREASED SIZE TO 160 */}
            <LighthouseSvg size={160} />
          </motion.div>
        )}

        {phase === 'speech' && (
          <motion.div key="speech" className={s.speech}
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
            <p className={s.speechText}>
              Hi! I&apos;m here to <b>shine a light</b> on your path. <br /> Select a country to see the roadmap to surgery.
            </p>
          </motion.div>
        )}

        {phase === 'countries' && (
          <motion.div key="countries" className={s.countryGrid}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {COUNTRIES.map(c => (
              <div key={c.code} onClick={() => { setSelected(c); setPhase('roadmap') }} className={s.clickable}>
                <CountryCard country={c} />
              </div>
            ))}
          </motion.div>
        )}

        {phase === 'roadmap' && selectedCountry && (
          <motion.div key="roadmap" className={s.roadmapSection}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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