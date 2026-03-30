/**
 * WaveDivider — Variation 1: "Deeper Teal"
 *
 * 3 wave layers: deep-back (teal 0.40), mid (teal 0.20), front (destination)
 * More irregular, organic bezier curves — varying crest heights
 * Taller container (h-24 / md:h-32) for more breathing room
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
      className="relative h-24 md:h-32 overflow-hidden"
      aria-hidden="true"
      style={{ background: top }}
    >
      <style>{`
        @keyframes wave-back {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave-flow-fwd {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-wave-back {
          animation: wave-back 20s linear infinite;
        }
        .animate-wave-front {
          animation: wave-flow-fwd 15s linear infinite reverse;
        }
      `}</style>

      {/* Layer 1 — deep back, slow reverse, visible teal */}
      <svg
        viewBox="0 0 2880 96"
        className="absolute bottom-0 h-full animate-wave-back"
        style={{ width: '200%' }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,62 C200,28 460,88 720,58 C980,28 1180,82 1440,58
             C1700,28 1900,88 2160,58 C2420,28 2660,82 2880,58
             L2880,96 L0,96 Z"
          fill="#0E7490"
          fillOpacity="0.40"
        />
      </svg>

      {/* Layer 2 — mid, slightly faster, organic offset */}
      <svg
        viewBox="0 0 2880 96"
        className="absolute bottom-0 h-full"
        style={{
          width: '200%',
          animation: 'wave-flow-fwd 15s linear infinite',
        }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,68 C160,42 380,90 600,66 C820,42 1060,86 1280,64
             C1500,42 1720,90 1940,66 C2160,42 2400,88 2620,66
             L2880,66 L2880,96 L0,96 Z"
          fill="#0E7490"
          fillOpacity="0.20"
        />
      </svg>

      {/* Layer 3 — front, destination fill */}
      <svg
        viewBox="0 0 2880 96"
        className="absolute bottom-0 h-full animate-wave-front"
        style={{ width: '200%' }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,72 C140,46 320,92 520,70 C720,46 940,90 1140,68
             C1340,46 1560,92 1760,70 C1960,46 2180,90 2400,70
             C2580,50 2740,88 2880,70 L2880,96 L0,96 Z"
          fill={bot}
        />
      </svg>
    </div>
  )
}
