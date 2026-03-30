/**
 * WaveDivider — Smooth organic waves between sections
 *
 * 3 SVG wave layers with gentle bezier curves, staggered animation speeds,
 * and a taller container for a natural, flowing transition.
 */

const colorMap: Record<string, string> = {
  navy:        '#0A1628',
  'off-white': '#F8FAFC',
  'teal-wash': '#F0FDFA',
  teal:        '#0E7490',
  'near-black':'#030912',
}

interface Props {
  from: keyof typeof colorMap
  to:   keyof typeof colorMap
}

export default function WaveDivider({ from, to }: Props) {
  const top = colorMap[from] ?? colorMap.navy
  const bot = colorMap[to]   ?? colorMap['off-white']

  return (
    <div
      className="relative w-full overflow-hidden"
      aria-hidden="true"
      style={{ background: top, height: 'clamp(80px, 12vw, 160px)' }}
    >
      {/* Layer 1 — deep back, slowest, subtle teal wash */}
      <svg
        viewBox="0 0 1440 200"
        className="absolute bottom-0 w-[200%] h-full"
        preserveAspectRatio="none"
        style={{ animation: 'waveDrift 25s linear infinite' }}
      >
        <path
          d="M0,120 C120,80 240,160 360,130 C480,100 600,155 720,125
             C840,95 960,160 1080,128 C1200,96 1320,150 1440,120
             L1440,200 L0,200 Z"
          fill="#0E7490"
          fillOpacity="0.25"
        />
      </svg>

      {/* Layer 2 — mid layer, medium speed, offset rhythm */}
      <svg
        viewBox="0 0 1440 200"
        className="absolute bottom-0 w-[200%] h-full"
        preserveAspectRatio="none"
        style={{ animation: 'waveDrift 18s linear infinite reverse' }}
      >
        <path
          d="M0,140 C100,105 220,165 380,135 C540,105 660,170 820,140
             C980,110 1100,168 1260,138 C1340,122 1400,155 1440,140
             L1440,200 L0,200 Z"
          fill="#0E7490"
          fillOpacity="0.15"
        />
      </svg>

      {/* Layer 3 — front, destination color, fastest */}
      <svg
        viewBox="0 0 1440 200"
        className="absolute bottom-0 w-[200%] h-full"
        preserveAspectRatio="none"
        style={{ animation: 'waveDrift 14s linear infinite' }}
      >
        <path
          d="M0,155 C80,125 200,175 340,150 C480,125 580,170 720,148
             C860,126 1000,172 1140,150 C1280,128 1380,165 1440,150
             L1440,200 L0,200 Z"
          fill={bot}
        />
      </svg>

      <style>{`
        @keyframes waveDrift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wave-layer { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
