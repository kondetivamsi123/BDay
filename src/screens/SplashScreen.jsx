import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Stars from '../components/particles/Stars'
import Fireflies from '../components/particles/Fireflies'
import LotusPetals from '../components/particles/LotusPetals'
import GoldenDust from '../components/particles/GoldenDust'
import FloatingHearts from '../components/particles/FloatingHearts'
import GlowButton from '../components/ui/GlowButton'

// Staggered letter animation
const AnimatedTitle = ({ text, delay = 0 }) => {
  const letters = text.split('')
  return (
    <>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.04,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </>
  )
}

const SplashScreen = () => {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    // Phase 0: background loads immediately
    const t1 = setTimeout(() => setPhase(1), 400)   // icon appears
    const t2 = setTimeout(() => setPhase(2), 900)   // title appears
    const t3 = setTimeout(() => setPhase(3), 2200)  // subtitle + button
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div
      className="screen sky-night"
      style={{ overflow: 'hidden' }}
    >
      {/* ── Particle Layers ──────────────────────────── */}
      <Stars count={90} />
      <GoldenDust count={35} />
      <Fireflies count={16} />
      <LotusPetals count={18} />
      <FloatingHearts count={10} />

      {/* ── Radial glow backdrop ─────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(155,93,229,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Main Content ─────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '24px 28px',
          gap: '0px',
        }}
      >
        {/* Decorative top line */}
        {phase >= 1 && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              width: '120px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.6), transparent)',
              marginBottom: '24px',
            }}
          />
        )}

        {/* Lotus / Flower Icon */}
        {phase >= 1 && (
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.0, type: 'spring', bounce: 0.5 }}
            style={{
              fontSize: 'clamp(64px, 18vw, 90px)',
              lineHeight: 1,
              marginBottom: '20px',
              filter: 'drop-shadow(0 0 20px rgba(255,107,157,0.6))',
              animation: 'float 4s ease-in-out infinite',
            }}
          >
            🌸
          </motion.div>
        )}

        {/* Main Title */}
        {phase >= 2 && (
          <h1
            className="font-display text-gold"
            style={{
              fontSize: 'clamp(28px, 8.5vw, 54px)',
              textAlign: 'center',
              lineHeight: 1.15,
              letterSpacing: '0.02em',
              marginBottom: '10px',
              textShadow: '0 0 40px rgba(255,215,0,0.3)',
            }}
          >
            <AnimatedTitle text="The 12 Doors of Love" delay={0} />
          </h1>
        )}

        {/* Divider */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '10px 0 12px',
            }}
          >
            <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,107,157,0.5))' }} />
            <span style={{ color: 'rgba(255,107,157,0.7)', fontSize: '14px' }}>✦</span>
            <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, rgba(255,107,157,0.5), transparent)' }} />
          </motion.div>
        )}

        {/* Subtitle */}
        {phase >= 3 && (
          <motion.p
            className="font-script"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              fontSize: 'clamp(18px, 5.5vw, 28px)',
              color: 'rgba(255, 179, 209, 0.92)',
              textAlign: 'center',
              marginBottom: '6px',
              textShadow: '0 0 20px rgba(255,107,157,0.3)',
            }}
          >
            A journey crafted for Lavanya 💕
          </motion.p>
        )}

        {/* Telugu Quote */}
        {phase >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            style={{
              fontSize: 'clamp(12px, 3.5vw, 15px)',
              color: 'rgba(255, 215, 0, 0.55)',
              textAlign: 'center',
              fontStyle: 'italic',
              marginBottom: '40px',
              letterSpacing: '0.02em',
            }}
          >
            "నీ కోసం తయారైన ఒక ప్రేమ లోకం..."
          </motion.p>
        )}

        {/* CTA Button */}
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: 'spring', bounce: 0.3 }}
            style={{ animation: 'pulse-glow 2.5s ease-in-out infinite' }}
          >
            <GlowButton
              id="begin-journey-btn"
              variant="gold"
              size="lg"
              onClick={() => navigate('/lock')}
            >
              ✨ Begin the Journey
            </GlowButton>
          </motion.div>
        )}

        {/* Bottom signature */}
        {phase >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            style={{
              position: 'absolute',
              bottom: 'max(24px, env(safe-area-inset-bottom))',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.08em',
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            ~ From Vamsi Krishna, with all my love ~
          </motion.p>
        )}
      </div>
    </div>
  )
}

export default SplashScreen
