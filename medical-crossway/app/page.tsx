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

const pct = (svgX: number, svgY: number) => ({
  left: `${(svgX / 1200) * 100}%`,
  top: `${(svgY / 750) * 100}%`,
})

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
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className={s.speech}>
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

            <svg className={s.mapSvg} viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">

              {/* SKY */}
              <rect width="1200" height="330" fill="#87CEEB" />
              <ellipse cx="190" cy="75" rx="62" ry="26" fill="white" opacity="0.85" />
              <ellipse cx="235" cy="70" rx="46" ry="22" fill="white" opacity="0.85" />
              <ellipse cx="150" cy="73" rx="42" ry="20" fill="white" opacity="0.85" />
              <ellipse cx="680" cy="52" rx="58" ry="23" fill="white" opacity="0.8" />
              <ellipse cx="724" cy="47" rx="42" ry="19" fill="white" opacity="0.8" />
              <ellipse cx="638" cy="50" rx="40" ry="18" fill="white" opacity="0.8" />
              <circle cx="1140" cy="58" r="38" fill="#FDD835" />

              {/* UPPER GRASS */}
              <rect y="310" width="1200" height="50" fill="#5D8A3C" />

         
              {/* ROAD 1 */}
              <rect x="0" y="360" width="1034" height="60" fill="#B5A48A" />
              <line x1="0" y1="390" x2="1034" y2="390" stroke="#D4C9B0" strokeWidth="2" strokeDasharray="18 12" />

              {/* GRASS FILL right of Road 1 */}
              <rect x="1034" y="360" width="166" height="60" fill="#6B9E48" />

              {/* MIDDLE GRASS */}
              <rect y="420" width="1200" height="65" fill="#6B9E48" />
              <rect x="406" y="440" width="7" height="34" fill="#5C4033" /><ellipse cx="409" cy="437" rx="17" ry="19" fill="#4CAF50" />
              <rect x="866" y="444" width="7" height="30" fill="#5C4033" /><ellipse cx="869" cy="441" rx="17" ry="19" fill="#56A042" />

             
              {/* ROAD 2 */}
              <rect x="0" y="485" width="1034" height="60" fill="#B5A48A" />
              <line x1="0" y1="515" x2="1034" y2="515" stroke="#D4C9B0" strokeWidth="2" strokeDasharray="18 12" />

              {/* GRASS FILL right of Road 2 */}
              <rect x="1034" y="485" width="166" height="60" fill="#6B9E48" />

              {/* LOWER GRASS */}
              <rect y="545" width="1200" height="205" fill="#5D8A3C" />
              <rect x="366" y="575" width="7" height="36" fill="#5C4033" /><ellipse cx="369" cy="572" rx="17" ry="20" fill="#4CAF50" />
              <rect x="946" y="585" width="7" height="34" fill="#5C4033" /><ellipse cx="949" cy="582" rx="17" ry="20" fill="#56A042" />
              <rect x="1120" y="595" width="7" height="30" fill="#5C4033" /><ellipse cx="1123" cy="592" rx="16" ry="18" fill="#4CAF50" />

              {/* CONNECTOR A — between Road 1 and Road 2, right side */}
              <rect x="986" y="420" width="48" height="65" fill="#A8977E" />
              <line x1="1010" y1="422" x2="1010" y2="483" stroke="#D4C9B0" strokeWidth="2" strokeDasharray="14 10" />

              {/* CONNECTOR B — between Road 1 and Road 2, centre */}
              <rect x="686" y="420" width="48" height="65" fill="#A8977E" />
              <line x1="710" y1="422" x2="710" y2="483" stroke="#D4C9B0" strokeWidth="2" strokeDasharray="14 10" />

              {/* CONNECTOR C — from Road 2 down to bottom */}
              <rect x="586" y="545" width="48" height="105" fill="#A8977E" />
              <line x1="610" y1="547" x2="610" y2="645" stroke="#D4C9B0" strokeWidth="2" strokeDasharray="14 10" />

              {/* CONNECTOR D — from sky down to Road 1 */}
              <rect x="586" y="295" width="48" height="65" fill="#A8977E" />
              <line x1="610" y1="300" x2="610" y2="355" stroke="#D4C9B0" strokeWidth="2" strokeDasharray="14 10" />

            </svg>

            {/* ── OVERLAY NODES ── */}
            <div className={s.nodesLayer}>

              {/* TITLE + LIGHTHOUSE */}
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

              {/* ALLIED HEALTH */}
              <div className={s.alliedRow}>
                {[
                  { label: 'Dentistry', color: '#9C27B0' },
                  { label: 'Nursing', color: '#E91E63' },
                  { label: 'Homeopathy', color: '#4CAF50' },
                  { label: 'Chiropractic', color: '#FF9800' },
                  { label: 'Ayurveda', color: '#009688' },
                  { label: 'Veterinary', color: '#2196F3' },
                ].map(({ label, color }) => (
                  <div key={label} className={s.alliedItem}>
                    <div className={s.alliedHouse} style={{ '--house-color': color } as React.CSSProperties} />
                    <span className={s.alliedLabel}>{label}</span>
                  </div>
                ))}
              </div>

              {/* MBBS ABROAD — sky, above connector D */}
              <div className={s.node} style={pct(950, 360)}>
                <div style={{ transform: 'scaleX(-1)' }}>
                  <Plane size={110} />
                </div>
                <span className={s.nodeTitle}>MBBS Abroad</span>
                <span className={s.nodeSub}>Russia · Philippines · more</span>
              </div>

              {/* HIGH SCHOOL — left, Road 1 */}
              <div className={s.node} style={pct(266, 390)}>
                <School size={100} />
                <span className={s.nodeTitle}>High School</span>
                <span className={s.nodeSub}>Any medicine · PCB</span>
              </div>

              {/* MBBS INDIA — middle grass, between connectors B and A */}
              <div className={s.node} style={pct(818, 462)}>
                <University size={90} />
                <span className={s.nodeTitle}>MBBS</span>
                <span className={s.nodeSub}>Medical college · NEET UG</span>
              </div>

              {/* FMGE — middle grass, right of connector A */}
              <div className={s.node} style={pct(1100, 452)}>
                <div className={s.fmgeBox}>
                  <div className={s.fmgeStripe} />
                  <div className={s.fmgeTextWrap}>
                    <span className={s.fmgeTitle}>FMGE · Back to India</span>
                    <span className={s.fmgeSub}>Re-enter Indian medical system</span>
                  </div>
                </div>
              </div>

              {/* PG / RESIDENCY HOSPITAL — left, Road 2 */}
              <div className={s.node} style={pct(266, 515)}>
                <Hospital size={100} />
                <span className={s.nodeTitle}>PG / Residency</span>
                <span className={s.nodeSub}>MD · MS · NEET PG</span>
              </div>

              {/* RESIDENCY ABROAD — bottom of connector C */}
              <div className={s.node} style={pct(610, 680)}>
                <Plane size={100} />
                <span className={s.nodeTitle}>Residency Abroad</span>
                <span className={s.nodeSub}>USMLE · PLAB · AMC · more</span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}