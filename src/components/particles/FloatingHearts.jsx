import React, { useMemo } from 'react'

const FloatingHearts = ({ count = 12, style = {} }) => {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      bottom: Math.random() * 20,
      size: Math.random() * 16 + 10,
      delay: Math.random() * 10,
      duration: Math.random() * 4 + 5,
      // Rose to crimson
      hue: Math.random() * 40 + 330, // 330-370 (0-10): pink/red
      opacity: Math.random() * 0.4 + 0.3,
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
      {hearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: 'absolute',
            left: `${h.left}%`,
            bottom: `${h.bottom}%`,
            fontSize: `${h.size}px`,
            lineHeight: 1,
            animation: `heart-float ${h.duration}s ${h.delay}s ease-in infinite`,
            opacity: h.opacity,
            filter: `drop-shadow(0 0 6px hsla(${h.hue % 360}, 80%, 70%, 0.6))`,
            userSelect: 'none',
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  )
}

export default FloatingHearts
