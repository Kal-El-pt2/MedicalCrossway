export default function Lighthouse({ size = 72 }: { size?: number }){
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