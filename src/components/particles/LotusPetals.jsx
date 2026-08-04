import React, { useMemo } from 'react'

const PETAL_SHAPES = [
  // Lotus petal shapes as clip-paths
  '50% 0%, 100% 50%, 50% 100%, 0% 50%',
  '50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%',
  '50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%',
]

const LotusPetals = ({ count = 20, style = {} }) => {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: Math.random() * 6 + 8,
      size: Math.random() * 14 + 10,
      shapeIdx: i % 3,
      // Pink to rose-purple spectrum
      hue: Math.random() * 40 + 310, // 310-350: pink/rose
      opacity: Math.random() * 0.5 + 0.4,
      drift: (Math.random() - 0.5) * 60,
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
      {petals.map((petal) => (
        <div
          key={petal.id}
          style={{
            position: 'absolute',
            left: `${petal.left}%`,
            top: '-30px',
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            background: `radial-gradient(ellipse at 40% 30%, hsla(${petal.hue}, 90%, 90%, ${petal.opacity + 0.2}), hsla(${petal.hue}, 80%, 65%, ${petal.opacity}))`,
            clipPath: `polygon(${PETAL_SHAPES[petal.shapeIdx]})`,
            animation: `petal-fall ${petal.duration}s ${petal.delay}s linear infinite`,
            filter: `drop-shadow(0 0 4px hsla(${petal.hue}, 80%, 80%, 0.5))`,
            '--drift': `${petal.drift}px`,
          }}
        />
      ))}
    </div>
  )
}

export default LotusPetals
