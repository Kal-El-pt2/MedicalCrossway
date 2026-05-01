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

                  {/* ── ROADS ── */}
                  <g stroke="#B5A48A" strokeWidth="35" fill="none" strokeLinecap="round" opacity="0.8">
                    <path d={R1} /><path d={R2} /><path d={R3} />
                    <path d={R4} /><path d={R5} /><path d={R6} />
                    <path d={R8} /><path d={R7} />
                  </g>
                  <g fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="10 8" opacity="0.6">
                    <path d={R1} /><path d={R2} /><path d={R3} /><path d={R4} /><path d={R5} /><path d={R6} /><path d={R8} /><path d={R7} />
                  </g>

                  {/* ── TREES & BUSHES ── */}
                  <g opacity="0.92">

                    {/* Top-right open sky — between main road and airport */}
                    <Tree x={820} y={100} large />
                    <Tree x={862} y={110} />
                    <Bush x={845} y={148} />
                    <Bush x={882} y={148} />
                    <Tree x={910} y={110} />
                    <Bush x={930} y={150} />

                    {/* Far-right strip — right of airport & FMGE road */}
                    <Tree x={1100} y={390} large />
                    <Bush x={1130} y={430} />
                    <Tree x={1160} y={410} />

                    {/* Center gap — island between R2 fork and MBBS India */}
                    <Tree x={510} y={310} />
                    <Bush x={540} y={345} />
                    <Tree x={568} y={298} large />
                    <Bush x={552} y={348} />

                    
                    {/* Bottom strip — wide open area between R6 and bottom edge */}
                    <Tree x={680} y={660} large />
                    <Bush x={715} y={695} />
                    <Tree x={755} y={652} />
                    <Bush x={790} y={685} />
                    <Tree x={830} y={645} large />
                    <Bush x={865} y={680} />
                    <Tree x={905} y={658} />
                    <Bush x={940} y={690} />
                    <Tree x={975} y={648} large />
                    <Bush x={1010} y={680} />

                    {/* Bottom-left — gap between PG Residency and PG Abroad nodes */}
                    <Bush x={220} y={580} />
                    <Tree x={258} y={558} />
                    <Bush x={290} y={585} />
                    <Tree x={325} y={560} large />
                    <Bush x={355} y={590} />


                    {/* Mid-left — between school and PG nodes vertically */}
                    <Tree x={80} y={380} large />
                    <Bush x={112} y={415} />
                    <Tree x={145} y={390} />
                    <Bush x={80} y={450} />

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

function Tree({ x, y, large }: { x: number; y: number; large?: boolean }) {
  const h = large ? 42 : 30
  const w = large ? 28 : 20
  return (
    <g>
      {/* Trunk */}
      <rect
        x={x - 3}
        y={y + h * 0.58}
        width={6}
        height={h * 0.42}
        fill="#7a5c38"
        rx="1"
      />
      {/* Back (darker) crown layer */}
      <polygon
        points={`${x},${y} ${x - w},${y + h * 0.72} ${x + w},${y + h * 0.72}`}
        fill="#1b4332"
      />
      {/* Front (lighter) crown layer */}
      <polygon
        points={`${x},${y + h * 0.18} ${x - w * 0.88},${y + h * 0.88} ${x + w * 0.88},${y + h * 0.88}`}
        fill="#2d6a4f"
      />
      {/* Top highlight layer */}
      <polygon
        points={`${x},${y + h * 0.32} ${x - w * 0.65},${y + h * 0.72} ${x + w * 0.65},${y + h * 0.72}`}
        fill="#40916c"
      />
    </g>
  )
}

function Bush({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse cx={x - 8} cy={y + 3} rx={11} ry={8}  fill="#1b4332" />
      <ellipse cx={x + 7} cy={y + 4} rx={12} ry={7}  fill="#2d6a4f" />
      <ellipse cx={x}     cy={y}     rx={13} ry={9}  fill="#52b788" />
      <ellipse cx={x - 5} cy={y - 2} rx={7}  ry={5}  fill="#74c69d" />
    </g>
  )
}