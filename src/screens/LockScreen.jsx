import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Stars from '../components/particles/Stars'
import GoldenDust from '../components/particles/GoldenDust'
import Fireflies from '../components/particles/Fireflies'
import GlowButton from '../components/ui/GlowButton'
import useGameStore from '../store/useGameStore'

// ── Ornate Lock SVG ────────────────────────────────────────
const LockIcon = ({ unlocked = false }) => (
  <motion.svg
    width="52"
    height="60"
    viewBox="0 0 52 60"
    animate={unlocked ? { y: [-2, -10, -2], rotate: [0, -15, 0] } : {}}
    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'loop' }}
  >
    <defs>
      <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
    {/* Shackle */}
    {!unlocked && (
      <path
        d="M14 28 V18 A12 12 0 0 1 38 18 V28"
        stroke="url(#lockGrad)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    )}
    {unlocked && (
      <path
        d="M14 28 V18 A12 12 0 0 1 38 18 V14"
        stroke="url(#lockGrad)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity={0.6}
      />
    )}
    {/* Body */}
    <rect
      x="6" y="27" width="40" height="30" rx="6"
      fill="url(#lockGrad)"
      opacity="0.9"
    />
    {/* Keyhole */}
    <circle cx="26" cy="39" r="5" fill="#0A0015" />
    <rect x="23" y="39" width="6" height="8" rx="1" fill="#0A0015" />
    {/* Ornate top */}
    <rect x="8" y="27" width="36" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
  </motion.svg>
)

const LockScreen = () => {
  const navigate = useNavigate()
  const validateDate = useGameStore((s) => s.validateDate)
  const isDateValidated = useGameStore((s) => s.isDateValidated)

  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [status, setStatus] = useState('idle')   // idle | error | success
  const [errorMsg, setErrorMsg] = useState('')
  const [unlockPhase, setUnlockPhase] = useState(0)

  const dayRef = useRef(null)
  const monthRef = useRef(null)
  const yearRef = useRef(null)

  // If already validated, go straight to world
  useEffect(() => {
    if (isDateValidated) navigate('/world', { replace: true })
  }, [isDateValidated, navigate])

  const handleDayChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2)
    setDay(val)
    if (val.length === 2) monthRef.current?.focus()
  }

  const handleMonthChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2)
    setMonth(val)
    if (val.length === 2) yearRef.current?.focus()
  }

  const handleYearChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4)
    setYear(val)
  }

  const handleUnlock = () => {
    if (!day || !month || !year) {
      setStatus('error')
      setErrorMsg('Enter the complete date, my love 🌸')
      setTimeout(() => setStatus('idle'), 800)
      return
    }

    const valid = validateDate(day, month, year)
    if (valid) {
      setStatus('success')
      setUnlockPhase(1)
      // Navigate after animation
      setTimeout(() => setUnlockPhase(2), 800)
      setTimeout(() => navigate('/door'), 2000)
    } else {
      setStatus('error')
      setErrorMsg('That date is not quite right... think again 💭')
      setTimeout(() => setStatus('idle'), 900)
    }
  }

  const inputStyle = {
    background: 'rgba(255,215,0,0.06)',
    border: '1px solid rgba(255,215,0,0.25)',
    borderRadius: '14px',
    color: '#FFD700',
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '28px',
    fontWeight: 600,
    textAlign: 'center',
    padding: '14px 0',
    width: '100%',
    letterSpacing: '0.05em',
    caretColor: '#FFD700',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    outline: 'none',
    WebkitAppearance: 'none',
  }

  const inputFocusStyle = {
    borderColor: 'rgba(255,215,0,0.6)',
    boxShadow: '0 0 20px rgba(255,215,0,0.2)',
  }

  return (
    <div className="screen sky-night" style={{ overflow: 'hidden' }}>
      {/* ── Background ─────────────────────────── */}
      <Stars count={70} />
      <GoldenDust count={25} />
      <Fireflies count={10} />

      {/* Purple haze */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(155,93,229,0.15) 0%, transparent 70%)',
      }} />

      {/* ── Unlock Flash Overlay ────────────────── */}
      <AnimatePresence>
        {unlockPhase >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 100,
              background: 'radial-gradient(circle, rgba(255,215,0,0.9), rgba(255,215,0,0.3), transparent)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Main Content ───────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        height: '100%', padding: '24px',
      }}>

        {/* Card */}
        <motion.div
          animate={status === 'error' ? { x: [0, -12, 12, -10, 10, -6, 6, 0] } : {}}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            maxWidth: '360px',
            padding: '36px 28px 32px',
            background: 'rgba(10, 0, 21, 0.7)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: status === 'success'
              ? '1px solid rgba(255,215,0,0.6)'
              : status === 'error'
              ? '1px solid rgba(255,80,80,0.5)'
              : '1px solid rgba(255,215,0,0.18)',
            borderRadius: '28px',
            boxShadow: status === 'success'
              ? '0 0 60px rgba(255,215,0,0.4), 0 0 120px rgba(255,215,0,0.15)'
              : '0 20px 60px rgba(0,0,0,0.6)',
            transition: 'border-color 0.4s, box-shadow 0.4s',
          }}
        >
          {/* Lock Icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <LockIcon unlocked={status === 'success'} />
          </div>

          {/* Title */}
          <h1
            className="font-display text-gold"
            style={{ textAlign: 'center', fontSize: '26px', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.02em' }}
          >
            The Sacred Key
          </h1>
          <p style={{ textAlign: 'center', color: 'rgba(255,215,0,0.5)', fontFamily: "'Dancing Script', cursive", fontSize: '16px', marginBottom: '28px' }}>
            ఒక తేదీ మాత్రమే తెలుసు...
          </p>

          {/* Date Input Row */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
            {/* DD */}
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', textAlign: 'center', fontSize: '11px', color: 'rgba(255,215,0,0.4)', marginBottom: '6px', letterSpacing: '0.1em' }}>
                DD
              </label>
              <input
                ref={dayRef}
                type="tel"
                placeholder="05"
                value={day}
                onChange={handleDayChange}
                maxLength={2}
                inputMode="numeric"
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,215,0,0.25)'
                  e.target.style.boxShadow = 'none'
                }}
                style={{
                  ...inputStyle,
                  borderColor: status === 'error' ? 'rgba(255,80,80,0.5)' : undefined,
                }}
              />
            </div>

            {/* Separator */}
            <div style={{ color: 'rgba(255,215,0,0.4)', fontSize: '24px', fontFamily: "'Cormorant Garamond', serif", paddingTop: '22px' }}>
              /
            </div>

            {/* MM */}
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', textAlign: 'center', fontSize: '11px', color: 'rgba(255,215,0,0.4)', marginBottom: '6px', letterSpacing: '0.1em' }}>
                MM
              </label>
              <input
                ref={monthRef}
                type="tel"
                placeholder="08"
                value={month}
                onChange={handleMonthChange}
                maxLength={2}
                inputMode="numeric"
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,215,0,0.25)'
                  e.target.style.boxShadow = 'none'
                }}
                style={{
                  ...inputStyle,
                  borderColor: status === 'error' ? 'rgba(255,80,80,0.5)' : undefined,
                }}
              />
            </div>

            {/* Separator */}
            <div style={{ color: 'rgba(255,215,0,0.4)', fontSize: '24px', fontFamily: "'Cormorant Garamond', serif", paddingTop: '22px' }}>
              /
            </div>

            {/* YYYY */}
            <div style={{ flex: 1.8 }}>
              <label style={{ display: 'block', textAlign: 'center', fontSize: '11px', color: 'rgba(255,215,0,0.4)', marginBottom: '6px', letterSpacing: '0.1em' }}>
                YYYY
              </label>
              <input
                ref={yearRef}
                type="tel"
                placeholder="2008"
                value={year}
                onChange={handleYearChange}
                maxLength={4}
                inputMode="numeric"
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,215,0,0.25)'
                  e.target.style.boxShadow = 'none'
                }}
                style={{
                  ...inputStyle,
                  borderColor: status === 'error' ? 'rgba(255,80,80,0.5)' : undefined,
                }}
              />
            </div>
          </div>

          {/* Hint */}
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '12px', marginBottom: '24px' }}>
            Enter the date that holds all magic ✨
          </p>

          {/* Error message */}
          <AnimatePresence>
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  textAlign: 'center',
                  color: 'rgba(255, 120, 120, 0.9)',
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '16px',
                  marginBottom: '16px',
                }}
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Success message */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: 'center',
                  color: '#FFD700',
                  fontSize: '18px',
                  marginBottom: '16px',
                  fontFamily: "'Dancing Script', cursive",
                }}
              >
                ✨ The doors are opening, Lavanya...
              </motion.p>
            )}
          </AnimatePresence>

          {/* Unlock Button */}
          <GlowButton
            id="unlock-btn"
            variant={status === 'success' ? 'gold' : 'gold'}
            size="md"
            fullWidth
            onClick={handleUnlock}
            disabled={status === 'success'}
          >
            {status === 'success' ? '🌸 Opening...' : '🔓 Unlock'}
          </GlowButton>
        </motion.div>

        {/* Back to splash */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/')}
          style={{
            marginTop: '24px',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '13px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.05em',
          }}
        >
          ← Back
        </motion.button>
      </div>
    </div>
  )
}

export default LockScreen
