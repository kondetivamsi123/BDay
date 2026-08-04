import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

let heartIdCounter = 0

const TouchHearts = () => {
  const [hearts, setHearts] = useState([])

  const spawnHeart = useCallback((x, y) => {
    const id = ++heartIdCounter
    const emojis = ['❤️', '💕', '🌸', '✨', '💖', '🌺']
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    setHearts((prev) => [...prev, { id, x, y, emoji }])
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id))
    }, 1200)
  }, [])

  useEffect(() => {
    const handleTouch = (e) => {
      Array.from(e.changedTouches).forEach((touch) => {
        spawnHeart(touch.clientX, touch.clientY)
      })
    }
    const handleClick = (e) => {
      // Only fire on actual taps, not button clicks that navigate
      if (e.target.closest('button') || e.target.closest('a')) {
        // Still show heart but maybe smaller
      }
      spawnHeart(e.clientX, e.clientY)
    }

    document.addEventListener('touchstart', handleTouch, { passive: true })
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('touchstart', handleTouch)
      document.removeEventListener('click', handleClick)
    }
  }, [spawnHeart])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, scale: 0, x: '-50%', y: '-50%' }}
            animate={{
              opacity: 0,
              scale: 1.8,
              y: '-160%',
              x: `calc(-50% + ${(Math.random() - 0.5) * 40}px)`,
              rotate: (Math.random() - 0.5) * 30,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: h.x,
              top: h.y,
              fontSize: `${Math.random() * 12 + 18}px`,
              pointerEvents: 'none',
              userSelect: 'none',
              lineHeight: 1,
            }}
          >
            {h.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TouchHearts
