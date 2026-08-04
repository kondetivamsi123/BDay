import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Stars from '../../components/particles/Stars'
import GoldenDust from '../../components/particles/GoldenDust'
import Fireflies from '../../components/particles/Fireflies'
import LotusPetals from '../../components/particles/LotusPetals'
import GlowButton from '../../components/ui/GlowButton'
import useGameStore from '../../store/useGameStore'

const TOTAL_CELLS = 20  // 4×5 grid
const COLS = 4

const POEMS = [
  '"నువ్వు లేని జీవితం అర్థం లేనిది..." 💛',
  '"Every smile of yours lights my whole world." ✨',
  '"నీ కళ్ళలో నాకు స్వర్గం కనిపిస్తుంది..." 🌸',
  '"You are my favourite hello and hardest goodbye." ❤️',
  '"నీ నవ్వు చూస్తే మనసు పూల తోటలా అవుతుంది..." 🌺',
]

// ── Instruction Step ─────────────────────────────────────
const InstructionScreen = ({ onStart }) => (
  <div style={{
    position: 'relative', zIndex: 5,
    minHeight: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '32px 24px',
  }}>
    {/* Back */}
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      style={{
        position: 'absolute', top: '20px', left: '20px',
        color: 'rgba(255,255,255,0.5)', fontSize: '13px',
        background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.05em',
      }}
    >
      {/* intentionally no navigate — user enters from modal which already shows instructions */}
    </motion.button>

    {/* Chapter badge */}
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)',
        borderRadius: '50px', padding: '6px 18px', marginBottom: '24px',
        fontSize: '11px', color: 'rgba(255,215,0,0.75)', letterSpacing: '0.1em',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      🗓️ JANUARY · CHAPTER I
    </motion.div>

    {/* Big key icon */}
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', bounce: 0.5, duration: 0.9 }}
      style={{
        fontSize: 'clamp(80px, 22vw, 110px)', lineHeight: 1,
        marginBottom: '20px',
        filter: 'drop-shadow(0 0 24px rgba(255,215,0,0.8)) drop-shadow(0 0 50px rgba(255,215,0,0.4))',
        animation: 'float 3.5s ease-in-out infinite',
      }}
    >
      🔑
    </motion.div>

    {/* Title */}
    <motion.h1
      className="font-display text-gold"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{ fontSize: 'clamp(26px, 8vw, 38px)', marginBottom: '8px', textAlign: 'center' }}
    >
      The Hidden Key
    </motion.h1>

    <motion.p
      className="font-script"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      style={{
        fontSize: 'clamp(16px, 4.5vw, 22px)',
        color: 'rgba(255,179,209,0.85)', marginBottom: '28px', textAlign: 'center',
      }}
    >
      A golden key is hidden in the garden 🌸
    </motion.p>

    {/* How to Play card */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      style={{
        width: '100%', maxWidth: '340px',
        background: 'rgba(255,215,0,0.07)',
        border: '1px solid rgba(255,215,0,0.22)',
        borderRadius: '20px',
        padding: '20px 18px',
        marginBottom: '28px',
      }}
    >
      {/* Section label */}
      <div style={{
        fontSize: '11px', color: 'rgba(255,215,0,0.7)',
        letterSpacing: '0.12em', fontFamily: "'Inter', sans-serif",
        fontWeight: 700, marginBottom: '14px',
        display: 'flex', alignItems: 'center', gap: '6px',
      }}>
        🎮 HOW TO PLAY
      </div>

      {/* Steps */}
      {[
        { icon: '🌸', text: '20 flower tiles are scattered in the magical garden' },
        { icon: '👆', text: 'Tap each tile one by one to search through them' },
        { icon: '🔑', text: 'Exactly one tile hides the hidden golden key' },
        { icon: '✨', text: 'Find the key to earn a love poem & unlock February!' },
      ].map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 + i * 0.1 }}
          style={{
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            marginBottom: i < 3 ? '12px' : '0',
          }}
        >
          {/* Step number bubble */}
          <div style={{
            minWidth: '26px', height: '26px', borderRadius: '50%',
            background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', flexShrink: 0, marginTop: '1px',
          }}>
            {i + 1}
          </div>
          <div>
            <span style={{ fontSize: '15px', marginRight: '6px' }}>{step.icon}</span>
            <span style={{
              fontSize: '14px', color: 'rgba(255,255,255,0.82)',
              fontFamily: "'Inter', sans-serif", lineHeight: 1.45,
            }}>
              {step.text}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>

    {/* Animated demo hint */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        marginBottom: '24px',
        color: 'rgba(255,215,0,0.45)',
        fontSize: '13px', fontFamily: "'Inter', sans-serif",
      }}
    >
      <motion.span
        animate={{ scale: [1, 1.3, 1], y: [0, -4, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        👆
      </motion.span>
      Tap the tiles below to search!
    </motion.div>

    {/* Start button */}
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', bounce: 0.4 }}
    >
      <GlowButton
        id="start-search-btn"
        variant="gold"
        size="lg"
        onClick={onStart}
      >
        🔍 Start the Search
      </GlowButton>
    </motion.div>
  </div>
)

// ── Puzzle Screen ─────────────────────────────────────────
const PuzzleScreen = ({ onFound }) => {
  // Randomize key position per session
  const keyCell = useMemo(() => Math.floor(Math.random() * TOTAL_CELLS), [])
  const [searchedCells, setSearchedCells] = useState(new Set())
  const [found, setFound] = useState(false)
  const [foundCell, setFoundCell] = useState(null)

  const handleTap = (idx) => {
    if (found || searchedCells.has(idx)) return
    setSearchedCells((prev) => new Set([...prev, idx]))

    if (idx === keyCell) {
      setFound(true)
      setFoundCell(idx)
      setTimeout(() => onFound(), 1200)
    }
  }

  return (
    <div style={{
      position: 'relative', zIndex: 5,
      minHeight: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 16px 40px',
    }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '16px', width: '100%' }}
      >
        <h1 className="font-display text-gold" style={{ fontSize: 'clamp(22px, 7vw, 32px)', marginBottom: '4px' }}>
          🔑 Search the Garden
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.55)', fontSize: '14px',
          fontFamily: "'Inter', sans-serif",
        }}>
          Tap each tile • One hides the golden key
        </p>
      </motion.div>

      {/* Hint bar */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.18)',
          borderRadius: '50px', padding: '8px 18px', marginBottom: '20px',
          fontSize: '13px', color: 'rgba(255,215,0,0.7)',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
          👆
        </motion.span>
        Tap the flower tiles to search!
      </motion.div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gap: '10px',
          width: '100%', maxWidth: '320px',
          marginBottom: '20px',
        }}
      >
        {Array.from({ length: TOTAL_CELLS }).map((_, idx) => {
          const isSearched = searchedCells.has(idx)
          const isKeyFound = idx === foundCell && found

          return (
            <motion.button
              key={idx}
              id={`tile-${idx}`}
              whileTap={!isSearched && !found ? { scale: 0.82, rotate: Math.random() > 0.5 ? 5 : -5 } : {}}
              animate={isKeyFound ? {
                scale: [1, 1.4, 1.2],
                rotate: [0, 15, -15, 0],
                boxShadow: ['0 0 0px transparent', '0 0 40px rgba(255,215,0,0.9)', '0 0 20px rgba(255,215,0,0.5)'],
              } : {}}
              onClick={() => handleTap(idx)}
              style={{
                width: '100%', aspectRatio: '1',
                borderRadius: '14px',
                background: isKeyFound
                  ? 'rgba(255,215,0,0.25)'
                  : isSearched
                  ? 'rgba(255,255,255,0.03)'
                  : 'rgba(255,215,0,0.07)',
                border: isKeyFound
                  ? '2px solid rgba(255,215,0,0.8)'
                  : isSearched
                  ? '1px solid rgba(255,255,255,0.06)'
                  : '1px solid rgba(255,215,0,0.2)',
                cursor: isSearched || found ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.25s, border 0.25s, box-shadow 0.25s',
                boxShadow: isKeyFound ? '0 0 30px rgba(255,215,0,0.6)' : 'none',
              }}
            >
              {isKeyFound ? (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.9))' }}
                >
                  🔑
                </motion.span>
              ) : isSearched ? (
                <span style={{ fontSize: '11px', opacity: 0.2 }}>✦</span>
              ) : (
                <span style={{ opacity: 0.35 }}>🌸</span>
              )}
            </motion.button>
          )
        })}
      </motion.div>

      {/* Progress counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          color: 'rgba(255,255,255,0.35)', fontSize: '12px',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ width: `${(searchedCells.size / TOTAL_CELLS) * 80}px`, maxWidth: '80px', height: '3px', background: 'rgba(255,215,0,0.4)', borderRadius: '3px', transition: 'width 0.3s', minWidth: '4px' }} />
        Searched {searchedCells.size}/{TOTAL_CELLS} tiles
      </motion.div>

      {/* Telugu encouragement */}
      {searchedCells.size > 10 && !found && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.6, y: 0 }}
          style={{
            marginTop: '16px', fontSize: '14px',
            color: 'rgba(255,215,0,0.6)',
            fontFamily: "'Dancing Script', cursive",
            textAlign: 'center',
          }}
        >
          "దొరుకుతుంది... కొంచెం వెతుకు!" 🌸
        </motion.p>
      )}
    </div>
  )
}

// ── Reward Screen ─────────────────────────────────────────
const RewardScreen = ({ onClaim, claimed }) => {
  const poem = useMemo(() => POEMS[Math.floor(Math.random() * POEMS.length)], [])

  return (
    <div style={{
      position: 'relative', zIndex: 5,
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '32px 24px',
      textAlign: 'center',
    }}>

      {/* Key burst */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.9 }}
        style={{
          fontSize: 'clamp(70px, 20vw, 90px)', lineHeight: 1,
          marginBottom: '20px',
          filter: 'drop-shadow(0 0 24px rgba(255,215,0,0.9)) drop-shadow(0 0 50px rgba(255,215,0,0.4))',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        🔑
      </motion.div>

      {/* Pulsing ring */}
      <div style={{
        position: 'absolute', width: '140px', height: '140px',
        borderRadius: '50%', border: '2px solid rgba(255,215,0,0.3)',
        animation: 'pulse-ring 1.8s ease-out infinite',
        pointerEvents: 'none', top: '14%',
      }} />

      <motion.h2
        className="font-display text-gold"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ fontSize: 'clamp(26px, 8vw, 36px)', marginBottom: '8px' }}
      >
        You Found It! ✨
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          fontFamily: "'Dancing Script', cursive", fontSize: '18px',
          color: 'rgba(255,179,209,0.85)', marginBottom: '24px',
        }}
      >
        The golden key is yours, Lavanya 🌸
      </motion.p>

      {/* Love poem reward */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.7, type: 'spring', bounce: 0.3 }}
        style={{
          maxWidth: '300px', padding: '20px 22px',
          background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.3)',
          borderRadius: '18px', marginBottom: '28px',
        }}
      >
        <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.6)', letterSpacing: '0.1em', marginBottom: '10px', fontFamily: "'Inter', sans-serif" }}>
          💌 YOUR REWARD
        </div>
        <p style={{
          fontFamily: "'Dancing Script', cursive", fontSize: '18px',
          color: 'rgba(255,215,0,0.9)', lineHeight: 1.6,
        }}>
          {poem}
        </p>
      </motion.div>

      {/* Claim / unlock */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {!claimed ? (
          <GlowButton id="unlock-february-btn" variant="gold" size="lg" onClick={onClaim}>
            🌸 Unlock February Portal
          </GlowButton>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              color: '#FFD700', fontFamily: "'Dancing Script', cursive",
              fontSize: '22px',
            }}
          >
            Returning to world... 🌸
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────
const Month01_HiddenKey = () => {
  const navigate = useNavigate()
  const completeMonth = useGameStore((s) => s.completeMonth)

  // phase: 'intro' → 'puzzle' → 'reward' → back
  const [phase, setPhase] = useState('intro')
  const [claimed, setClaimed] = useState(false)

  const handleClaim = () => {
    completeMonth(1)
    setClaimed(true)
    setTimeout(() => navigate('/world'), 2200)
  }

  return (
    <div className="screen sky-night" style={{ overflowY: 'auto' }}>
      {/* ── Particles ─────────────────────────── */}
      <Stars count={70} />
      <GoldenDust count={30} />
      <Fireflies count={12} />
      <LotusPetals count={14} />

      {/* Golden haze */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(255,215,0,0.1) 0%, transparent 70%)',
      }} />

      {/* Back button (always visible) */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        onClick={() => navigate('/world')}
        style={{
          position: 'fixed', top: '18px', left: '18px', zIndex: 20,
          color: 'rgba(255,255,255,0.5)', fontSize: '13px',
          background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50px', padding: '8px 16px',
          cursor: 'pointer', letterSpacing: '0.05em',
          backdropFilter: 'blur(10px)', fontFamily: "'Inter', sans-serif",
        }}
      >
        ← World Map
      </motion.button>

      {/* ── Phase Rendering ───────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            style={{ minHeight: '100%' }}
          >
            <InstructionScreen onStart={() => setPhase('puzzle')} />
          </motion.div>
        )}

        {phase === 'puzzle' && (
          <motion.div
            key="puzzle"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            style={{ minHeight: '100%' }}
          >
            <PuzzleScreen onFound={() => setPhase('reward')} />
          </motion.div>
        )}

        {phase === 'reward' && (
          <motion.div
            key="reward"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ minHeight: '100%' }}
          >
            <RewardScreen onClaim={handleClaim} claimed={claimed} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Month01_HiddenKey
