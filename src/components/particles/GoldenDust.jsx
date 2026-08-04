import React, { useMemo } from 'react'

const GoldenDust = ({ count = 40, style = {} }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      bottom: Math.random() * 30, // Start from lower portion
      size: Math.random() * 4 + 1.5,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
      // Gold to amber gradient
      hue: Math.random() * 30 + 35, // 35-65: gold/amber
      opacity: Math.random() * 0.5 + 0.3,
      shape: Math.random() > 0.6 ? 'diamond' : 'circle',
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
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            transform: p.shape === 'diamond' ? 'rotate(45deg)' : 'none',
            background: `radial-gradient(circle, hsl(${p.hue}, 100%, 90%), hsl(${p.hue}, 90%, 60%))`,
            boxShadow: `0 0 ${p.size * 2}px hsl(${p.hue}, 100%, 70%)`,
            animation: `dust-rise ${p.duration}s ${p.delay}s ease-in infinite`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}

export default GoldenDust
