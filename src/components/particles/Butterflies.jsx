import React, { useMemo } from 'react'

// SVG Butterfly component
const ButterflyIcon = ({ color1, color2, size }) => (
  <svg
    width={size}
    height={size * 0.7}
    viewBox="0 0 60 42"
    style={{ filter: `drop-shadow(0 0 4px ${color1}80)` }}
  >
    {/* Left wings */}
    <ellipse cx="18" cy="14" rx="16" ry="10" fill={color1} opacity="0.85" />
    <ellipse cx="16" cy="28" rx="12" ry="8" fill={color2} opacity="0.75" />
    {/* Right wings */}
    <ellipse cx="42" cy="14" rx="16" ry="10" fill={color1} opacity="0.85" />
    <ellipse cx="44" cy="28" rx="12" ry="8" fill={color2} opacity="0.75" />
    {/* Body */}
    <ellipse cx="30" cy="21" rx="3" ry="10" fill="#2a0a0a" opacity="0.9" />
    {/* Antennae */}
    <line x1="28" y1="12" x2="22" y2="4" stroke="#2a0a0a" strokeWidth="1" opacity="0.8" />
    <circle cx="22" cy="4" r="1.5" fill="#2a0a0a" opacity="0.8" />
    <line x1="32" y1="12" x2="38" y2="4" stroke="#2a0a0a" strokeWidth="1" opacity="0.8" />
    <circle cx="38" cy="4" r="1.5" fill="#2a0a0a" opacity="0.8" />
  </svg>
)

const BUTTERFLY_COLORS = [
  ['#FFB347', '#FF7F50'],   // orange-coral
  ['#DA70D6', '#9B5DE5'],   // orchid-purple
  ['#00CED1', '#20B2AA'],   // teal
  ['#FFD700', '#FFA500'],   // gold-amber
  ['#FF69B4', '#FF1493'],   // hot pink
  ['#7FFFD4', '#40E0D0'],   // aquamarine
]

const Butterflies = ({ count = 7, style = {} }) => {
  const butterflies = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 75 + 5,
      top: Math.random() * 60 + 10,
      size: Math.random() * 20 + 25,
      delay: Math.random() * 8,
      duration: Math.random() * 8 + 10,
      colorPair: BUTTERFLY_COLORS[i % BUTTERFLY_COLORS.length],
      wingSpeed: Math.random() * 0.2 + 0.1,
    }))
  }, [count])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        ...style,
      }}
    >
      {butterflies.map((b) => (
        <div
          key={b.id}
          style={{
            position: 'absolute',
            left: `${b.left}%`,
            top: `${b.top}%`,
            animation: `butterfly-fly ${b.duration}s ${b.delay}s ease-in-out infinite`,
          }}
        >
          {/* Wing flapping via inner scale */}
          <div
            style={{
              animation: `wing-flap ${b.wingSpeed + 0.15}s ease-in-out infinite`,
              transformOrigin: 'center',
            }}
          >
            <ButterflyIcon
              color1={b.colorPair[0]}
              color2={b.colorPair[1]}
              size={b.size}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Butterflies
