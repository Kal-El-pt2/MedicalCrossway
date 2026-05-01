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

const pct = (x: number, y: number) => ({
  left: `${(x / 1200) * 100}%`,
  top: `${(y / 750) * 100}%`,
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

  const sz = isMobile ? 0.5 : 0.85

  // ── ROAD PATH DEFINITIONS ──
  
  // 1. Top Section: School (x:60) -> Curve -> MBBS Abroad (x:900)
  const topRoad = "M 60 130 C 60 400, 250 400, 400 400 L 1010 400";
  
  // 2. Allied Cluster Branch: Starts exactly at center of top road (y:400)
  const alliedRoad = "M 330 400 L 330 485";

  // 3. The Drops: University and FMGE roads
  const universityDrop = "M 730 400 L 730 620";
  const fmgeDrop = "M 1020 400 L 1020 620";
  
  // 4. The Combined Horizontal Road
  const mergerLine = "M 1020 620 L 600 620";
  
  // 5. Final Branch A: To PG India (Hospital)
  const branchIndia = "M 600 620 L 100 620";
  
  // 6. Final Branch B: To PG Abroad (Airport 2)
  const branchAbroad = "M 600 620 Q 600 705 450 725 L 100 725";

  return (
    <main className={s.main}>
      <AnimatePresence mode="wait">
        
        {/* ── INTRO PHASE ── */}
        {(phase === 'lamp' || phase === 'speech') && (
          <motion.div key="intro" className={s.introContainer} exit={{ opacity: 0 }}>
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
          <motion.div key="roadmap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={s.mapWrapper}>
            
            <div className={s.titleRow}>
              <motion.div layoutId="lighthouse-icon">
                <Lighthouse size={isMobile ? 35 : 55} />
              </motion.div>
              <h1 className={`${s.title} ${cinzel.className}`}>
                <span className={s.textSlate}>MEDICAL </span>
                <span className={s.textRed}>CROSS</span>
                <span className={s.textSlate}>WAY</span>
              </h1>
            </div>

            <div className={s.mapCanvas}>
              <svg className={s.mapSvg} viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice">
                
                {/* ── SOLID ROADS (BROWN) ── */}
                <g stroke="#B5A48A" strokeWidth="60" fill="none" strokeLinecap="round">
                  <path d={topRoad} />
                  <path d={alliedRoad} />
                  <path d={universityDrop} strokeLinecap="butt" /> {/* Butt prevents overlap bulge */}
                  <path d={fmgeDrop} />
                  <path d={mergerLine} strokeLinecap="butt" />
                  <path d={branchIndia} />
                  <path d={branchAbroad} />
                </g>

                {/* ── DASHED MARKINGS (CENTER LINES) ── */}
                <g fill="none" stroke="#D4C9B0" strokeWidth="2" strokeDasharray="15 10">
                   <path d={topRoad} />
                   <path d={alliedRoad} />
                   <path d={universityDrop} />
                   <path d={fmgeDrop} />
                   <path d={mergerLine} />
                   <path d={branchIndia} />
                   <path d={branchAbroad} />
                </g>
              </svg>

              <div className={s.nodesLayer}>
                {/* School */}
                <Node pos={pct(5, 55)}>
                  <School size={150 * sz} />
                  <span className={s.nodeTitle}>High School</span>
                </Node>

                {/* Allied Cluster (Aligned to alliedRoad end) */}
                <div className={s.alliedCluster} style={pct(330, 530)}>
                   <div className={s.houseRow}>
                     <div className={s.alliedItem}><div className={s.alliedHouse} /><span className={s.alliedLabel}>Nursing</span></div>
                     <div className={s.alliedItem}><div className={s.alliedHouse} style={{background:'#e67e22'} as any} /><span className={s.alliedLabel}>Dentist</span></div>
                   </div>
                   <div className={s.houseRow}>
                     <div className={s.alliedItem}><div className={s.alliedHouse} style={{background:'#27ae60'} as any} /><span className={s.alliedLabel}>Ayurveda</span></div>
                   </div>
                </div>

                {/* Airport 1: MBBS Abroad */}
                <Node pos={pct(900, 257)}>
                  <Plane size={200 * sz} />
                  <span className={s.nodeTitle}>MBBS Abroad</span>
                </Node>

                {/* University: MBBS India */}
                <Node pos={pct(755, 440)}>
                  <University size={150 * sz} />
                  <span className={s.nodeTitle}>MBBS India</span>
                </Node>

                {/* FMGE Toll */}
                <Node pos={pct(1040, 540)}>
                  <div className={s.fmgeBox}>
                    <div className={s.fmgeStripe} />
                    <div className={s.fmgeTextWrap}><span className={s.fmgeTitle}>FMGE TOLL</span></div>
                  </div>
                </Node>

                {/* HOSPITAL: PG Residency (India) */}
                <Node pos={pct(10, 545)}>
                  <Hospital size={150 * sz} />
                  <span className={s.nodeTitle}>PG Residency</span>
                </Node>

                {/* AIRPORT 2: PG Abroad */}
                <Node pos={pct(10, 625)}>
                  <Plane size={200 * sz} />
                  <span className={s.nodeTitle}>PG Abroad</span>
                </Node>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function Node({ pos, children }: { pos: any, children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className={s.node} style={pos}>
      {children}
    </motion.div>
  )
}