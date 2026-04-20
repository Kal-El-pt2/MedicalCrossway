'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import s from './LandingPage.module.css'
import { Cinzel } from 'next/font/google'
import School from '@/components/School';
import Hospital from '@/components/Hospital';
import Lighthouse from '@/components/Lighthouse';
import Plane from '@/components/Plane';
import './globals.css';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['700', '800'] })

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
      branches: [
        { id: 'abroad', side: 'right', title: 'MBBS Abroad', meta: 'Russia, Philippines, etc.', color: '#4f46e5' },
        { id: 'nursing', side: 'left', title: 'Nursing', meta: 'BSc, GNM & allied health', color: '#be185d' }
      ]
    },
    {
      id: 'mbbs', dot: 'MB', color: '#059669', bg: '#ecfdf5',
      title: 'Medical College', meta: '5.5 Years MBBS', tags: ['Internship', 'Anatomy'],
      branches: [
        { id: 'abroad', side: 'right', title: 'MBBS Abroad', meta: 'Russia, Philippines, etc.', color: '#4f46e5' }
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

function StepRow({ step }: { step: RoadmapStep; index: number }) {
  const getIcon = () => {
    if (step.id === 'school' || step.id === 'undergrad') return <School size={56} />;
    if (step.id === 'mbbs') return <Hospital />;
    if (step.id === 'match') return <Plane size={56} />;
    return <Hospital />;
  };

  const leftBranches = step.branches?.filter(b => b.side === 'left') ?? [];
  const rightBranches = step.branches?.filter(b => (b.side ?? 'right') === 'right') ?? [];

  return (
    <div
      className={s.stepRow}
      style={
        {
          '--step-color': step.color,
        } as React.CSSProperties & { '--step-color': string }
      }
    >
      <div className={s.stepInner}>
        <div className={s.dot}>{getIcon()}</div>

        <div className={s.card}>
          <div className={s.cardTitle}>{step.title}</div>
          <div className={s.cardMeta}>{step.meta}</div>

          <div className={s.tagList}>
            {step.tags?.map(tag => (
              <span key={tag} className={s.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ BRANCHES FIXED */}
      {step.branches && (
        <div className={s.branchRow}>
          <div className={s.branchRightCol}>
            {rightBranches.map(branch => (
              <svg key={branch.id} viewBox="0 0 420 140" className={s.branchSvg}>
                {/* curved path */}
                <path
                  d="M 0 0 C 0 50, 30 90, 80 108 C 110 120, 140 126, 160 126"
                  stroke="#d1c8bd"
                  strokeWidth="32"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* branch card */}
                <rect
                  x="160"
                  y="108"
                  width="150"
                  height="48"
                  rx="14"
                  fill="white"
                  stroke={branch.color}
                  strokeWidth="2.5"
                />

                {/* ✅ Plane icon for MBBS Abroad */}
                {branch.title === 'MBBS Abroad' && (
                  <foreignObject x="170" y="112" width="32" height="32">
                    <Plane size={28} />
                  </foreignObject>
                )}

                {/* text shifted right to make space for icon */}
                <text
                  x="210"
                  y="135"
                  fontSize="13"
                  fontWeight="700"
                  fill={branch.color}
                >
                  {branch.title}
                </text>
              </svg>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  const [phase, setPhase] = useState<Phase>('lamp')
  const [selectedCountry, setSelected] = useState<Country | null>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('speech'), 800)
    const t2 = setTimeout(() => {
      setSelected(COUNTRIES[0]);
      setPhase('roadmap');
    }, 2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <main className={s.main}>
      <div className={s.hero}>
        <div className={s.titleRow}>
          {(phase === 'roadmap' || phase === 'countries') && <Lighthouse size={100} />}
          <h1 className={`${s.title} ${cinzel.className}`}>
            <span className={s.textSlate}>MEDICAL </span>
            <span className={s.textRed}>CROSS</span>
            <span className={s.textSlate}>WAY</span>
          </h1>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'roadmap' && selectedCountry && (
          <motion.div key="roadmap" className={s.roadmapSection}>
            <button className={s.backBtn} onClick={() => setPhase('countries')}>← Change Country</button>
            {ROADMAPS[selectedCountry.code].map((step, i) => (
              <StepRow key={step.id} step={step} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}