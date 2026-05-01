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
import RoadmapBackground from '@/components/RoadmapBackground'

const cinzel = Cinzel({ subsets: ['latin'], weight: ['700', '800'] })

type Phase = 'lamp' | 'speech' | 'roadmap'

// This helper now uses CSS variables defined in the module.css
// It calculates the position relative to the dynamic map size
const pct = (x: number, y: number) => ({
  left: `calc((${x} / 1200) * var(--map-width))`,
  top: `calc((${y} / 750) * var(--map-height))`,
})

export default function LandingPage() {
  const [phase, setPhase] = useState<Phase>('lamp')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('speech'), 800)
    const t2 = setTimeout(() => setPhase('roadmap'), 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const sz = isMobile ? 0.45 : 0.65

  // Road Paths
  const R1 = "M 80 140 C 60 240, 240 240, 240 240 L 890 240";
  const R2 = "M 330 240 C 420 240, 480 300, 480 325";
  const R3 = "M 730 240 L 730 350";
  const R4 = "M 1020 280 L 1020 620";
  const R5 = "M 730 485 L 730 620";
  const R6 = "M 1020 620 L 600 620";
  const R7 = "M 600 620 Q 600 705 450 725 L 160 725";
  const R8 = "M 600 620 L 160 620";

  return (
    <main className={s.main}>
      <AnimatePresence mode="wait">

        {/* ── INTRO PHASE (Same as before) ── */}
        {(phase === 'lamp' || phase === 'speech') && (
          <motion.div key="intro" className={s.introContainer} exit={{ opacity: 0, transition: { duration: 0.8 } }}>
            <motion.div layoutId="lighthouse-icon">
              <Lighthouse size={isMobile ? 120 : 180} />
            </motion.div>
            <AnimatePresence>
              {phase === 'speech' && (
                <motion.div initial={{ opacity: 0, y: 20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} className={s.speech}>
                  <p className={s.speechText}>{"Hi! I'm here to "}<b>shine a light</b>{" on your path."}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── ROADMAP PHASE ── */}
        {phase === 'roadmap' && (
          <motion.div key="roadmap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={s.roadmapWrapper}>
            <RoadmapBackground />

            <header className={s.titleRow}>
              <motion.div layoutId="lighthouse-icon">
                <Lighthouse size={isMobile ? 35 : 55} />
              </motion.div>
              <h1 className={`${s.title} ${cinzel.className}`}>
                <span className={s.textSlate}>MEDICAL </span>
                <span className={s.textRed}>CROSS</span>
                <span className={s.textSlate}>WAY</span>
              </h1>
            </header>

            <div className={s.mapWrapper}>
              <div className={s.mapCanvas}>
                <svg className={s.mapSvg} viewBox="0 0 1200 750" preserveAspectRatio="none">
                  <g stroke="#B5A48A" strokeWidth="35" fill="none" strokeLinecap="round" opacity="0.8">
                    <path d={R1} /><path d={R2} /><path d={R3} />
                    <path d={R4} /><path d={R5}  /><path d={R6} />
                    <path d={R8} /><path d={R7} />
                  </g>
                  <g fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="10 8" opacity="0.6">
                    <path d={R1} /><path d={R2} /><path d={R3} /><path d={R4} /><path d={R5} /><path d={R6} /><path d={R8} /><path d={R7} />
                  </g>
                </svg>

                <div className={s.nodesLayer}>
                  <Node pos={pct(0, 70)}>
                    <School size={160 * sz} />
                    <span className={s.nodeTitle}>High School</span>
                  </Node>

                  <div className={s.alliedCluster} style={pct(580, 415) as any}>
                    <div className={s.alliedHousesGroup}>
                      <div className={s.houseRow}>
                        <div className={s.alliedItem}><div className={s.alliedHouse} style={{ background: '#9b59b6' }} /><span className={s.alliedLabel}>Nursing</span></div>
                        <div className={s.alliedItem}><div className={s.alliedHouse} style={{ background: '#e67e22' }} /><span className={s.alliedLabel}>Dentist</span></div>
                      </div>
                      <div className={s.houseRow}>
                        <div className={s.alliedItem}><div className={s.alliedHouse} style={{ background: '#27ae60' }} /><span className={s.alliedLabel}>Ayurveda</span></div>
                      </div>
                    </div>
                    <span className={s.nodeTitle}>Allied Sciences</span>
                  </div>

                  <Node pos={pct(930, 120)} className={s.airportNode}>
                    <Plane size={220 * sz} />
                    <span className={s.nodeTitle}>MBBS Abroad</span>
                  </Node>

                  <Node pos={pct(670, 350)}>
                    <University size={160 * sz} />
                    <span className={s.nodeTitle}>MBBS India</span>
                  </Node>

                  <Node pos={pct(1020, 560)}>
                    <div className={s.fmgeBox}>
                      <div className={s.fmgeStripe} />
                      <div className={s.fmgeTextWrap}><span className={s.fmgeTitle}>FMGE TOLL</span></div>
                    </div>
                  </Node>

                  <Node pos={pct(10, 520)}>
                    <Hospital size={160 * sz} />
                    <span className={s.nodeTitle}>PG Residency</span>
                  </Node>

                  <Node pos={pct(10, 635)} className={s.airportNode}>
                    <Plane size={180 * sz} />
                    <span className={s.nodeTitle}>PG Abroad</span>
                  </Node>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function Node({ pos, children, className }: { pos: any, children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${s.node} ${className || ''}`}
      style={pos}
    >
      {children}
    </motion.div>
  )
}