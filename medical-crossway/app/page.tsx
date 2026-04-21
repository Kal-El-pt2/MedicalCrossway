'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import s from './LandingPage.module.css'
import { Cinzel } from 'next/font/google'
import School from '@/components/School'
import Hospital from '@/components/Hospital'
import Lighthouse from '@/components/Lighthouse'
import Plane from '@/components/Plane'
import University from '@/components/University'

const cinzel = Cinzel({ subsets: ['latin'], weight: ['700', '800'] })

type Phase = 'lamp' | 'speech' | 'roadmap'

const CLINICS = [
  { title: 'Dentistry', color: '#9c27b0' },
  { title: 'Nursing', color: '#e91e63' },
  { title: 'Homeopathy', color: '#4caf50' },
  { title: 'Chiropractic', color: '#ff9800' },
  { title: 'Ayurveda', color: '#009688' },
  { title: 'Veterinary', color: '#2196f3' },
]

export default function LandingPage() {
  const [phase, setPhase] = useState<Phase>('lamp')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('speech'), 800)
    const t2 = setTimeout(() => setPhase('roadmap'), 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <main className={s.main}>
      <AnimatePresence mode="wait">

        {/* ── INTRO PHASE ── */}
        {(phase === 'lamp' || phase === 'speech') && (
          <motion.div key="intro" className={s.introContainer} exit={{ opacity: 0, y: -20 }}>
            <motion.div layoutId="lighthouse">
              <Lighthouse size={180} />
            </motion.div>
            {phase === 'speech' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={s.speech}
              >
                <p className={s.speechText}>
                  {"Hi! I'm here to "}<b>shine a light</b>{" on your path."}<br />
                  {"Let's look at your journey to becoming a doctor."}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── ROADMAP PHASE ── */}
        {phase === 'roadmap' && (
          <motion.div key="roadmap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={s.mapCanvas}>

            {/* ── SVG: full-screen background with roads ── */}
            <svg className={s.mapSvg} viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c4e8f5" />
                  <stop offset="45%" stopColor="#d8eef5" />
                  <stop offset="100%" stopColor="#ddd5c0" />
                </linearGradient>
              </defs>

              {/* Sky background */}
              <rect width="1000" height="600" fill="url(#skyGrad)" />

              {/* ── Ground colour bands ── */}
              {/* Between lane 1 and lane 2 */}
              <rect x="0" y="265" width="1000" height="124" fill="#7cb752" />
              {/* Below lane 2 */}
              <rect x="0" y="430" width="1000" height="170" fill="#7cb752" />

              {/* ── Grass strips ── */}
              <ellipse cx="500" cy="236" rx="520" ry="18" fill="#a5c97a" opacity="0.55" />
              <ellipse cx="500" cy="430" rx="520" ry="18" fill="#a5c97a" opacity="0.48" />
              <ellipse cx="500" cy="598" rx="520" ry="14" fill="#8fbb5e" opacity="0.32" />

              {/* ══════════════════════════════
                  LANE 1 — left→right  y≈255
              ══════════════════════════════ */}
              <path d="M0,258 Q500,250 1000,258" stroke="#b4a98f" strokeWidth="46" fill="none" />
              <path d="M0,258 Q500,250 1000,258" stroke="#c5b99a" strokeWidth="40" fill="none" />
              <path d="M0,258 Q500,250 1000,258" stroke="#d4c9b0" strokeWidth="3" fill="none" strokeDasharray="28 18" />

              {/* Clinic branch — exits lane1 at x≈280, sweeps up-left */}
              <path d="M280,255 Q265,215 255,175"
                stroke="#b4a98f" strokeWidth="30" fill="none" />
              <path d="M280,255 Q265,215 255,175"
                stroke="#c5b99a" strokeWidth="24" fill="none" />
              <path d="M280,255 Q265,215 255,175"
                stroke="#d4c9b0" strokeWidth="3" fill="none" strokeDasharray="18 12" />
              {/* MBBS Abroad dashed fork — upper right from lane 1 */}
              <path d="M800,256 Q850,210 890,165"
                stroke="#b4a98f" strokeWidth="18" fill="none" strokeDasharray="15 9" />

              {/* ══════════════════════════════
                  RIGHT HAIRPIN  y255→y410
              ══════════════════════════════ */}
              <path d="M1000,258 Q1030,335 1000,412"
                stroke="#b4a98f" strokeWidth="46" fill="none" />
              <path d="M1000,258 Q1030,335 1000,412"
                stroke="#c5b99a" strokeWidth="40" fill="none" />

              {/* ══════════════════════════════
                  LANE 2 — right→left  y≈412
              ══════════════════════════════ */}
              <path d="M1000,412 Q500,404 0,412" stroke="#b4a98f" strokeWidth="46" fill="none" />
              <path d="M1000,412 Q500,404 0,412" stroke="#c5b99a" strokeWidth="40" fill="none" />
              <path d="M1000,412 Q500,404 0,412" stroke="#d4c9b0" strokeWidth="3" fill="none" strokeDasharray="28 18" />

              {/* Residency Abroad dashed fork — upper right from lane 2 */}
              <path d="M500,412 Q500,455 450,470 Q400,485 385,530"
                stroke="#b4a98f" strokeWidth="18" fill="none" strokeDasharray="15 9" />

              {/* FMGE marker dot */}
              <circle cx="500" cy="408" r="9" fill="#263238" />
              <circle cx="500" cy="408" r="4.5" fill="#80cbc4" />

              {/* ── Trees between lanes ── */}
              <circle cx="360" cy="342" r="17" fill="#6ab04c" />
              <circle cx="350" cy="339" r="12" fill="#7cb752" />
              <rect x="358" y="354" width="4" height="14" fill="#795548" />

              <circle cx="520" cy="346" r="14" fill="#6ab04c" />
              <rect x="518" y="356" width="4" height="12" fill="#795548" />

              {/* ── Trees below lane 2 ── */}
              <circle cx="200" cy="510" r="17" fill="#6ab04c" />
              <rect x="198" y="522" width="4" height="14" fill="#795548" />

              <circle cx="600" cy="506" r="14" fill="#6ab04c" />
              <rect x="598" y="516" width="4" height="12" fill="#795548" />
            </svg>

            {/* ── Title + lighthouse ── */}
            <div className={s.titleRow}>
              <motion.div layoutId="lighthouse" transition={{ type: 'spring', stiffness: 70 }}>
                <Lighthouse size={58} />
              </motion.div>
              <h1 className={`${s.title} ${cinzel.className}`}>
                <span className={s.textSlate}>MEDICAL </span>
                <span className={s.textRed}>CROSS</span>
                <span className={s.textSlate}>WAY</span>
              </h1>
            </div>

            {/* ── Sun ── */}
            <div className={s.sun} />

            {/* ── CLINICS — top, right of title ── */}
            <div className={s.clinicsRow}>
              {CLINICS.map(c => (
                <div key={c.title} className={s.clinicItem}
                  style={{ '--clinic-color': c.color } as React.CSSProperties}>
                  <div className={s.clinicBuilding} />
                  <span className={s.clinicName}>{c.title}</span>
                </div>
              ))}
            </div>

            {/* ── HIGH SCHOOL — left, lane 1 ── */}
            <div className={s.highSchool}>
              <School size={140} />
              <span className={s.landmarkTitle}>High school</span>
              <span className={s.landmarkSub}>why medicine · PCB</span>
            </div>

            {/* ── MBBS ABROAD — upper right ── */}
            <div className={s.mbbsAbroad}>
              <span className={s.abroadTitle}>MBBS abroad</span>
              <span className={s.abroadSub}>Russia · Philippines · more</span>
              <Plane size={120} />
            </div>

            {/* ── MBBS HOSPITAL — right, in hairpin ── */}
            <div className={s.mbbsBuilding}>
              <University size={120} />
              <span className={s.landmarkTitle} style={{ color: '#1a237e' }}>MBBS</span>
              <span className={s.landmarkSub}>Medical college · NEET UG</span>
            </div>

            {/* ── RESIDENCY ABROAD — right, lane 2 branch ── */}
            <div className={s.residencyAbroad}>
              <span className={s.abroadTitle} style={{ color: '#1b5e20' }}>Residency abroad</span>
              <span className={s.abroadSub} style={{ color: '#388e3c' }}>USMLE · PLAB · AMC · more</span>
              <Plane size={120} />
            </div>

            {/* ── FMGE — mid lane 2 ── */}
            <div className={s.fmgeLabel}>
              <span className={s.fmgeTitle}>FMGE · Back to India</span>
              <span className={s.fmgeSub}>Re-enter Indian medical system</span>
            </div>

            {/* ── PG HOSPITAL — left, lane 2 ── */}
            <div className={s.pgBuilding}>
              <Hospital size={120} />
              <span className={s.landmarkTitle} style={{ color: '#4f46e5' }}>PG / Residency</span>
              <span className={s.landmarkSub}>MD / MS · NEET PG</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}