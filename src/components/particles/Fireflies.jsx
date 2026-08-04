import React, { useMemo } from 'react'

const FIREFLY_ANIMATIONS = ['firefly-1', 'firefly-2', 'firefly-3']

const Fireflies = ({ count = 18, style = {} }) => {
  const flies = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      top: Math.random() * 80 + 10,
      size: Math.random() * 4 + 3,
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 5,
      animIdx: i % 3,
      // Slight color variation: yellow-green to yellow
      hue: Math.random() * 40 + 60,
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
      {flies.map((fly) => (
        <div
          key={fly.id}
          style={{
            position: 'absolute',
            left: `${fly.left}%`,
            top: `${fly.top}%`,
            width: `${fly.size}px`,
            height: `${fly.size}px`,
          }}
        >
          {/* Glow halo */}
          <div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '50%',
              background: `radial-gradient(circle, hsla(${fly.hue}, 100%, 80%, 0.4), transparent 70%)`,
              animation: `${FIREFLY_ANIMATIONS[fly.animIdx]} ${fly.duration}s ${fly.delay}s ease-in-out infinite`,
            }}
          />
          {/* Core */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: `hsl(${fly.hue}, 100%, 85%)`,
              boxShadow: `0 0 ${fly.size * 2}px hsl(${fly.hue}, 100%, 80%), 0 0 ${fly.size * 4}px hsla(${fly.hue}, 100%, 70%, 0.5)`,
              animation: `${FIREFLY_ANIMATIONS[fly.animIdx]} ${fly.duration}s ${fly.delay}s ease-in-out infinite`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default Fireflies
