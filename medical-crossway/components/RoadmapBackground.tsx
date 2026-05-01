import React from 'react'
import s from './RoadmapBackground.module.css'

export default function RoadmapBackground() {
  return (
    <div className={s.bgWrapper}>
      <svg 
        viewBox="0 0 1440 800" 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMidYMid slice"
        className={s.svg}
      >
        <defs>
          {/* Sky gradient */}
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3FA9F5" />
            <stop offset="100%" stopColor="#BFE9FF" />
          </linearGradient>

          {/* Sun glow */}
          <radialGradient id="sunGlow" cx="0.88" cy="0.18" r="0.22">
            <stop offset="0%" stopColor="#FFE082" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFE082" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFE082" stopOpacity="0" />
          </radialGradient>

          {/* Field gradient (softer Ghibli look) */}
          <linearGradient id="field" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B7E4A8" />
            <stop offset="100%" stopColor="#7BC47F" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="1440" height="800" fill="url(#sky)" />
        <rect width="1440" height="800" fill="url(#sunGlow)" />

        {/* Sun */}
        <circle cx="1240" cy="140" r="55" fill="#FFE082" opacity="0.9" />

        {/* Back hill (raised) */}
        <path 
          d="M0 200 C 200 170, 400 240, 600 210 C 800 180, 1000 240, 1200 210 C 1300 195, 1440 210, 1440 210 L1440 800 L0 800 Z"
          fill="#A5D6A7" 
          opacity="0.25" 
        />

        {/* Front hill (raised) */}
        <path 
          d="M0 260 C 250 220, 500 290, 750 260 C 1000 230, 1200 290, 1440 260 L1440 800 L0 800 Z"
          fill="#A5D6A7" 
          opacity="0.35" 
        />

        {/* Bushes (adjusted up) */}
        <g fill="#81C784" opacity="0.8">
          <circle cx="40" cy="270" r="25" />
          <circle cx="70" cy="280" r="20" />
          <circle cx="100" cy="285" r="18" />
        </g>

        <g fill="#81C784" opacity="0.8">
          <circle cx="1320" cy="300" r="18" />
          <circle cx="1350" cy="295" r="22" />
          <circle cx="1380" cy="300" r="20" />
        </g>

        {/* MAIN FIELD (now dominant) */}
        <rect x="0" y="260" width="1440" height="540" fill="url(#field)" />

      </svg>
    </div>
  )
}