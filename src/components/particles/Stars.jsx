import React, { useMemo } from 'react'

// Twinkling star field
const Stars = ({ count = 80, style = {} }) => {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 6,
      duration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.6 + 0.2,
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
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            background: star.size > 2
              ? 'radial-gradient(circle, #FFF8DC, #FFD700)'
              : '#ffffff',
            animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
            boxShadow: star.size > 2
              ? `0 0 ${star.size * 3}px rgba(255, 215, 0, 0.5)`
              : `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.6)`,
          }}
        />
      ))}
    </div>
  )
}

export default Stars
