import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Stars from '../components/particles/Stars'
import GoldenDust from '../components/particles/GoldenDust'

// ── Ornate Door SVG ────────────────────────────────────────
const DoorSVG = ({ glowing }) => (
  <svg width="200" height="300" viewBox="0 0 200 300" style={{ overflow: 'visible' }}>
    <defs>
      <linearGradient id="wood" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#2E0F00" />
        <stop offset="25%"  stopColor="#5C1E00" />
        <stop offset="50%"  stopColor="#7B2D00" />
        <stop offset="75%"  stopColor="#5C1E00" />
        <stop offset="100%" stopColor="#2E0F00" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#FFD700" />
        <stop offset="50%"  stopColor="#FFA500" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
      <linearGradient id="doorGlow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="rgba(255,200,80,0.6)" />
        <stop offset="100%" stopColor="rgba(255,120,20,0.0)" />
      </linearGradient>
      <filter id="glow2">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    {/* Stone frame */}
    <rect x="0" y="20" width="200" height="278" rx="6" fill="#0e0604"/>
    <rect x="2" y="22" width="196" height="274" rx="5" fill="none" stroke="url(#gold)" strokeWidth="2"/>

    {/* Arched top ornament */}
    <path d="M8 22 Q100 0 192 22" stroke="url(#gold)" strokeWidth="2.5" fill="none"/>

    {/* Door body */}
    <rect x="12" y="26" width="176" height="268" rx="4" fill="url(#wood)"/>

    {/* Wood grain */}
    {[60, 100, 140, 180, 220, 260].map((y, i) => (
      <line key={i} x1="12" y1={y} x2="188" y2={y+4} stroke="rgba(0,0,0,0.12)" strokeWidth="1.5"/>
    ))}

    {/* Top panel */}
    <rect x="22" y="36" width="156" height="80" rx="5" fill="rgba(0,0,0,0.22)"/>
    <rect x="26" y="40" width="148" height="72" rx="4" fill="rgba(80,30,5,0.35)"/>
    <rect x="26" y="40" width="148" height="72" rx="4" fill="none" stroke="url(#gold)" strokeWidth="1.5" opacity="0.75"/>

    {/* Lotus in top panel */}
    <text x="100" y="88" textAnchor="middle" fontSize="36" filter="url(#glow2)">🌸</text>

    {/* Middle rail */}
    <rect x="12" y="126" width="176" height="7" fill="rgba(0,0,0,0.3)"/>
    <rect x="12" y="126" width="176" height="7" fill="none" stroke="url(#gold)" strokeWidth="1" opacity="0.5"/>

    {/* Bottom left panel */}
    <rect x="22" y="142" width="70" height="140" rx="4" fill="rgba(0,0,0,0.18)"/>
    <rect x="26" y="146" width="62" height="132" rx="3" fill="rgba(80,30,5,0.25)"/>
    <rect x="26" y="146" width="62" height="132" rx="3" fill="none" stroke="url(#gold)" strokeWidth="1.2" opacity="0.5"/>

    {/* Bottom right panel */}
    <rect x="108" y="142" width="70" height="140" rx="4" fill="rgba(0,0,0,0.18)"/>
    <rect x="112" y="146" width="62" height="132" rx="3" fill="rgba(80,30,5,0.25)"/>
    <rect x="112" y="146" width="62" height="132" rx="3" fill="none" stroke="url(#gold)" strokeWidth="1.2" opacity="0.5"/>

    {/* Door knob */}
    <circle cx="152" cy="215" r="11" fill="url(#gold)" filter="url(#glow2)"/>
    <circle cx="152" cy="215" r="7"  fill="#B8860B"/>
    <circle cx="150" cy="213" r="3"  fill="rgba(255,255,200,0.55)"/>

    {/* Left hinge */}
    <rect x="12" y="60"  width="10" height="26" rx="2.5" fill="url(#gold)"/>
    <rect x="12" y="230" width="10" height="26" rx="2.5" fill="url(#gold)"/>

    {/* Light seeping from edges */}
    <rect x="12" y="26" width="2"   height="268" fill="rgba(255,200,80,0.45)"/>
    <rect x="186" y="26" width="2"  height="268" fill="rgba(255,200,80,0.15)"/>
    <rect x="12" y="26" width="176" height="2"   fill="rgba(255,200,80,0.3)"/>
    <rect x="12" y="292" width="176" height="2"  fill="rgba(255,200,80,0.1)"/>

    {/* Inner light overlay */}
    <rect x="12" y="26" width="176" height="268" rx="4" fill="url(#doorGlow)" opacity={glowing ? 0.5 : 0.15}
      style={{ transition: 'opacity 0.5s' }}
    />
  </svg>
)

const DoorAnimation = () => {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('idle')   // idle | tapped | opening | flash

  // Auto-skip fallback after 10s (in case user doesn't tap)
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (phase === 'idle') handleTap()
    }, 8000)
    return () => clearTimeout(fallback)
  }, [phase])

  const handleTap = () => {
    if (phase !== 'idle') return
    setPhase('tapped')

    setTimeout(() => setPhase('opening'), 400)
    setTimeout(() => setPhase('flash'), 1800)
    setTimeout(() => navigate('/world'), 2600)
  }

  return (
    <motion.div
      className="screen"
      style={{
        background: '#020005',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: phase === 'idle' ? 'pointer' : 'default',
      }}
      onClick={handleTap}
    >
      {/* ── Stars ─────────────────────────────── */}
      <Stars count={60} />
      <GoldenDust count={20} />

      {/* ── Background glow behind door ───────── */}
      <motion.div
        animate={{
          opacity: phase === 'opening' ? [0.5, 1, 1] : phase === 'tapped' ? 0.6 : 0.3,
          scale:   phase === 'opening' ? [1, 1.6, 2.2] : 1,
        }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          width: '300px', height: '380px',
          background: 'radial-gradient(ellipse, rgba(255,190,60,0.55) 0%, rgba(255,130,30,0.2) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(18px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Door ──────────────────────────────── */}
      <motion.div
        animate={
          phase === 'tapped'
            ? { scale: [1, 1.04, 1], filter: ['brightness(1)', 'brightness(1.8)', 'brightness(1.3)'] }
            : phase === 'opening'
            ? {
                scaleX: [1, 0.6, 0.2, 0],
                filter: ['brightness(1.3)', 'brightness(2)', 'brightness(4)'],
                originX: 0,
              }
            : {}
        }
        transition={{ duration: phase === 'opening' ? 1.6 : 0.4, ease: 'easeInOut' }}
        style={{
          position: 'relative', zIndex: 5,
          transformOrigin: 'left center',
          cursor: phase === 'idle' ? 'pointer' : 'default',
        }}
      >
        <DoorSVG glowing={phase !== 'idle'} />
      </motion.div>

      {/* ── Light burst when opening ───────────── */}
      <AnimatePresence>
        {phase === 'opening' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.9, 0.7, 0.4], scale: [0.4, 1.5, 2.5, 4] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8 }}
            style={{
              position: 'absolute',
              width: '360px', height: '440px',
              background: 'radial-gradient(ellipse, rgba(255,220,100,0.8) 0%, rgba(255,160,40,0.35) 35%, transparent 70%)',
              borderRadius: '50%', filter: 'blur(10px)',
              zIndex: 10, pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── White flash before navigate ────────── */}
      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute', inset: 0,
              background: '#fffbe6',
              zIndex: 50, pointerEvents: 'none',
            }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* ── "Tap to open" instruction ─────────── */}
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '15%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          >
            {/* Bouncing tap icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: '32px' }}
            >
              👆
            </motion.div>

            {/* Pulsing text */}
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(16px, 5vw, 22px)',
                color: 'rgba(255, 215, 0, 0.85)',
                textAlign: 'center',
                textShadow: '0 0 20px rgba(255,215,0,0.4)',
                letterSpacing: '0.04em',
              }}
            >
              Tap the door to open it ✨
            </motion.p>

            <p style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '15px',
              color: 'rgba(255,215,0,0.45)',
              textAlign: 'center',
            }}>
              "తలుపు తట్టు, మ్యాజిక్ జరుగుతుంది..."
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Opening message ────────────────────── */}
      <AnimatePresence>
        {(phase === 'tapped' || phase === 'opening') && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', bottom: '15%',
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(18px, 5vw, 24px)',
              color: 'rgba(255, 215, 0, 0.9)',
              textAlign: 'center',
              zIndex: 20,
              textShadow: '0 0 20px rgba(255,215,0,0.5)',
              pointerEvents: 'none',
            }}
          >
            The world of love awaits, Lavanya... 🌸
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default DoorAnimation
