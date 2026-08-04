import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Stars from '../components/particles/Stars'
import Fireflies from '../components/particles/Fireflies'
import Butterflies from '../components/particles/Butterflies'
import GoldenDust from '../components/particles/GoldenDust'
import FloatingHearts from '../components/particles/FloatingHearts'
import GlowButton from '../components/ui/GlowButton'
import useGameStore from '../store/useGameStore'

// ─── Month Data + Instructions ─────────────────────────────
const MONTHS = [
  {
    id: 1, name: 'January', emoji: '🔑', theme: 'Hidden Key',
    color: '#FFD700', glow: 'rgba(255,215,0,0.5)',
    instructions: [
      '🌸 20 flower tiles are hidden in the garden',
      '👆 Tap each tile one by one to search',
      '🔑 One secret tile hides the golden key',
      '✨ Find the key to unlock February!',
    ],
  },
  {
    id: 2, name: 'February', emoji: '🪔', theme: 'Diya Night',
    color: '#FF6B35', glow: 'rgba(255,107,53,0.5)',
    instructions: [
      '🪔 9 sacred diyas are placed in the temple',
      '👆 Tap each unlit diya to light it up',
      '🔥 Watch the flame glow and spread warmth',
      '✨ Light all 9 diyas to unlock March!',
    ],
  },
  {
    id: 3, name: 'March', emoji: '🌳', theme: 'Wish Tree',
    color: '#66BB6A', glow: 'rgba(102,187,106,0.5)',
    instructions: [
      '🌳 A magical Wish Tree stands before you',
      '🍃 Tap the glowing leaves one by one',
      '💫 Each leaf reveals a floating dream or message',
      '✨ Discover all wishes to unlock April!',
    ],
  },
  {
    id: 4, name: 'April', emoji: '🚂', theme: 'Rail Journey',
    color: '#29B6F6', glow: 'rgba(41,182,246,0.5)',
    instructions: [
      '🚂 Board the magical Love Express train',
      '🎟️ Collect the ticket that appears at each station',
      '🌄 Watch beautiful landscapes pass by',
      '✨ Complete the journey to unlock May!',
    ],
  },
  {
    id: 5, name: 'May', emoji: '🌧️', theme: 'Rain World',
    color: '#00BCD4', glow: 'rgba(0,188,212,0.5)',
    instructions: [
      '🌧️ Tap the falling bubbles to catch love notes',
      '👆 Click or tap 3 glowing bubbles',
      '🌈 Collect 3 notes to reveal the rainbow!',
      '✨ Find the rainbow to unlock June!',
    ],
  },
  {
    id: 6, name: 'June', emoji: '🦋', theme: 'Collection',
    color: '#E91E63', glow: 'rgba(233,30,99,0.5)',
    instructions: [
      '❤️ Hearts, lotus 🪷, and butterflies 🦋 are floating',
      '👆 Tap them quickly before they fly away',
      '⏱️ Collect as many as possible before time runs out',
      '✨ Beat the target score to unlock July!',
    ],
  },
  {
    id: 7, name: 'July', emoji: '📻', theme: 'Vintage Radio',
    color: '#AB47BC', glow: 'rgba(171,71,188,0.5)',
    instructions: [
      '📻 An old vintage radio sits before you',
      '👆 Click the channel button to tune the radio',
      '🎵 Tune to 143.0 FM to play our love song',
      '✨ Simple 1-click tune to unlock August!',
    ],
  },
  {
    id: 8, name: 'August', emoji: '🎂', theme: 'Birthday Palace',
    color: '#FF4081', glow: 'rgba(255,64,129,0.5)',
    instructions: [
      '🎂 A grand birthday cake waits for you, Lavanya',
      '🕯️ Tap each candle one by one to light them up',
      '🎆 Watch fireworks light the sky as you celebrate',
      '✨ Light all candles to unlock September!',
    ],
  },
  {
    id: 9, name: 'September', emoji: '🏮', theme: 'Lantern Festival',
    color: '#FF9800', glow: 'rgba(255,152,0,0.5)',
    instructions: [
      '✍️ Type your secret wish into the glowing lantern',
      '🏮 Tap "Release" to let it fly into the night sky',
      '⭐ Watch it join the stars above',
      '✨ Your wish reaches the stars to unlock October!',
    ],
  },
  {
    id: 10, name: 'October', emoji: '💎', theme: 'Treasure Chamber',
    color: '#FFC107', glow: 'rgba(255,193,7,0.5)',
    instructions: [
      '🔐 An ancient treasure chest sits locked',
      '🔄 Rotate the combination lock dial carefully',
      '💎 Find the right combination to crack it open',
      '✨ Open the chest to unlock November!',
    ],
  },
  {
    id: 11, name: 'November', emoji: '🪷', theme: 'Vrindavan Garden',
    color: '#8BC34A', glow: 'rgba(139,195,74,0.5)',
    instructions: [
      '🪷 Lotus flowers float on a sacred lake',
      '👆 Tap each lotus to make it bloom fully',
      '🦚 Watch the peacock dance as flowers bloom',
      '✨ Bloom them all to unlock December!',
    ],
  },
  {
    id: 12, name: 'December', emoji: '📜', theme: 'Ancient Library',
    color: '#B8860B', glow: 'rgba(184,134,11,0.5)',
    instructions: [
      '📜 An ancient diary sealed with wax awaits',
      '💛 Tap the wax seal to break it and open the diary',
      '💌 Read the letter written just for you, Lavanya',
      '🌟 This unlocks the Grand Finale — a special surprise!',
    ],
  },
]

// ─── Portal Info Modal ─────────────────────────────────────
const PortalModal = ({ month, isCompleted, onEnter, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.82)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.78, y: 40, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.85, y: 20, opacity: 0 }}
      transition={{ type: 'spring', bounce: 0.35, duration: 0.55 }}
      onClick={(e) => e.stopPropagation()}
      style={{
        width: '100%', maxWidth: '350px',
        background: 'rgba(8, 0, 18, 0.97)',
        border: `1px solid ${month.color}45`,
        borderRadius: '26px',
        padding: '28px 22px 24px',
        boxShadow: `0 0 50px ${month.color}25, 0 20px 60px rgba(0,0,0,0.7)`,
      }}
    >
      {/* Glow top ring */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '2px',
        background: `linear-gradient(90deg, transparent, ${month.color}, transparent)`,
        borderRadius: '2px',
      }} />

      {/* Emoji */}
      <div style={{
        textAlign: 'center', fontSize: '64px', marginBottom: '14px',
        filter: `drop-shadow(0 0 16px ${month.color})`,
        animation: 'float 3.5s ease-in-out infinite',
        lineHeight: 1,
      }}>
        {month.emoji}
      </div>

      {/* Chapter tag */}
      <div style={{
        textAlign: 'center', marginBottom: '4px',
        fontSize: '10px', color: month.color,
        letterSpacing: '0.12em', fontFamily: "'Inter', sans-serif", fontWeight: 600,
      }}>
        CHAPTER {month.id} · {month.name.toUpperCase()}
        {isCompleted && ' · ✅ COMPLETED'}
      </div>

      {/* Theme title */}
      <h2 style={{
        textAlign: 'center', fontFamily: "'Cormorant Garamond', serif",
        fontSize: '26px', color: '#fff', fontWeight: 600,
        letterSpacing: '0.02em', marginBottom: '20px',
      }}>
        {month.theme}
      </h2>

      {/* Divider */}
      <div style={{
        width: '100%', height: '1px', marginBottom: '16px',
        background: `linear-gradient(90deg, transparent, ${month.color}40, transparent)`,
      }} />

      {/* How to Play */}
      <div style={{
        background: `${month.color}0E`,
        border: `1px solid ${month.color}22`,
        borderRadius: '14px',
        padding: '14px 16px',
        marginBottom: '20px',
      }}>
        <div style={{
          fontSize: '11px', color: month.color,
          letterSpacing: '0.1em', marginBottom: '12px',
          fontFamily: "'Inter', sans-serif", fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          🎮 HOW TO PLAY
        </div>
        {month.instructions.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: '8px',
              fontSize: '14px', color: 'rgba(255,255,255,0.82)',
              marginBottom: i < month.instructions.length - 1 ? '9px' : '0',
              lineHeight: 1.45,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Enter button */}
      <GlowButton
        id={`enter-month-${month.id}`}
        variant="gold"
        size="md"
        fullWidth
        onClick={onEnter}
        style={{ marginBottom: '12px' }}
      >
        {isCompleted ? '🔄 Play Again' : `✨ Enter Chapter ${month.id}`}
      </GlowButton>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          width: '100%', background: 'none', border: 'none',
          cursor: 'pointer', color: 'rgba(255,255,255,0.3)',
          fontSize: '13px', letterSpacing: '0.05em',
          fontFamily: "'Inter', sans-serif",
          padding: '4px',
        }}
      >
        ← Back to World Map
      </button>
    </motion.div>
  </motion.div>
)

// ─── Single Portal ─────────────────────────────────────────
const Portal = ({ month, unlocked, completed, isNext, onClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: month.id * 0.06, duration: 0.5, type: 'spring', bounce: 0.3 }}
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
  >
    {/* Portal circle */}
    <motion.button
      id={`portal-month-${month.id}`}
      onClick={onClick}
      whileTap={{ scale: unlocked ? 0.88 : 1 }}
      style={{
        position: 'relative',
        width: '80px', height: '80px',
        borderRadius: '50%',
        border: unlocked
          ? `2px solid ${month.color}`
          : '2px solid rgba(255,255,255,0.1)',
        background: unlocked
          ? `radial-gradient(circle at 35% 35%, ${month.color}22 0%, ${month.color}08 60%, transparent 100%)`
          : 'rgba(0,0,0,0.4)',
        cursor: unlocked ? 'pointer' : 'default',
        padding: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: unlocked
          ? `0 0 20px ${month.glow}, 0 0 40px ${month.glow.replace('0.5', '0.2')}`
          : 'none',
        animation: isNext ? 'portal-pulse 2.5s ease-in-out infinite' : 'none',
        '--color': month.glow,
        overflow: 'hidden',
        transition: 'box-shadow 0.3s',
      }}
    >
      {/* Spinning ring */}
      {unlocked && (
        <div style={{
          position: 'absolute', inset: '-4px', borderRadius: '50%',
          border: `1px solid ${month.color}`,
          borderTopColor: 'transparent', borderRightColor: 'transparent',
          animation: 'spin-slow 6s linear infinite',
          opacity: 0.4, pointerEvents: 'none',
        }} />
      )}

      {/* Completed checkmark */}
      {completed && (
        <div style={{
          position: 'absolute', top: '-4px', right: '-4px',
          width: '20px', height: '20px', borderRadius: '50%',
          background: '#FFD700',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', boxShadow: '0 0 10px rgba(255,215,0,0.6)', zIndex: 5,
        }}>
          ✓
        </div>
      )}

      {/* Lock overlay */}
      {!unlocked && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 3, backdropFilter: 'blur(4px)',
        }}>
          <span style={{ fontSize: '22px', opacity: 0.5 }}>🔒</span>
        </div>
      )}

      {/* Emoji */}
      <span style={{
        fontSize: unlocked ? '26px' : '22px',
        filter: unlocked ? `drop-shadow(0 0 8px ${month.color})` : 'grayscale(1) opacity(0.3)',
        zIndex: 2, lineHeight: 1,
      }}>
        {month.emoji}
      </span>

      {/* Number */}
      <span style={{
        fontSize: '10px', fontFamily: "'Inter', sans-serif", fontWeight: 600,
        color: unlocked ? month.color : 'rgba(255,255,255,0.2)',
        letterSpacing: '0.05em', zIndex: 2,
      }}>
        {String(month.id).padStart(2, '0')}
      </span>
    </motion.button>

    {/* Labels */}
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: '11px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
        color: unlocked ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
        letterSpacing: '0.02em', lineHeight: 1.2,
      }}>
        {month.name}
      </div>
      <div style={{
        fontSize: '9px', fontFamily: "'Inter', sans-serif",
        color: unlocked ? month.color : 'rgba(255,255,255,0.2)',
        opacity: 0.8, marginTop: '2px',
      }}>
        {month.theme}
      </div>
    </div>
  </motion.div>
)

// ─── Progress Bar ──────────────────────────────────────────
const ProgressBar = ({ completed }) => (
  <div style={{ width: '100%', maxWidth: '320px', padding: '0 4px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif" }}>
        Journey Progress
      </span>
      <span style={{ fontSize: '12px', color: '#FFD700', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
        {completed}/12
      </span>
    </div>
    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(completed / 12) * 100}%` }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #9B5DE5, #FF6B9D, #FFD700)',
          borderRadius: '4px',
          boxShadow: '0 0 8px rgba(255,215,0,0.4)',
        }}
      />
    </div>
  </div>
)

// ─── World Map Screen ──────────────────────────────────────
const WorldMap = () => {
  const navigate = useNavigate()
  const isMonthUnlocked = useGameStore((s) => s.isMonthUnlocked)
  const isMonthCompleted = useGameStore((s) => s.isMonthCompleted)
  const completedMonths = useGameStore((s) => s.completedMonths)
  const showToast = useGameStore((s) => s.showToast)
  const resetAll = useGameStore((s) => s.resetAll)

  const [selectedMonth, setSelectedMonth] = useState(null)

  const handlePortalClick = (month) => {
    const unlocked = isMonthUnlocked(month.id)
    if (unlocked) {
      setSelectedMonth(month)   // ← Show instruction modal first!
    } else {
      const needMonth = month.id - 1
      showToast(`🔒 Complete "${MONTHS[needMonth - 1]?.name}" first ✨`)
    }
  }

  const handleEnter = () => {
    if (selectedMonth) {
      navigate(`/month/${selectedMonth.id}`)
      setSelectedMonth(null)
    }
  }

  const handleReset = () => {
    if (window.confirm("Do you want to reset all unlocked doors and start fresh from Month 1?")) {
      resetAll()
      showToast("🔄 Progress reset! Start from Month 1 ✨")
    }
  }

  const nextMonth = MONTHS.find((m) => isMonthUnlocked(m.id) && !isMonthCompleted(m.id))

  return (
    <div className="screen sky-garden" style={{ overflowY: 'auto' }}>
      {/* ── Particles ─────────────────────────── */}
      <Stars count={60} />
      <GoldenDust count={20} />
      <Fireflies count={10} />
      <Butterflies count={5} />
      <FloatingHearts count={6} />

      {/* Purple haze */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(155,93,229,0.25) 0%, transparent 70%)',
      }} />

      {/* ── Portal Info Modal ──────────────────── */}
      <AnimatePresence>
        {selectedMonth && (
          <PortalModal
            month={selectedMonth}
            isCompleted={isMonthCompleted(selectedMonth.id)}
            onEnter={handleEnter}
            onClose={() => setSelectedMonth(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Scrollable Content ────────────────── */}
      <div style={{
        position: 'relative', zIndex: 5,
        minHeight: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', padding: '28px 16px 40px',
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '20px', width: '100%' }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', maxWidth: '340px', margin: '0 auto 8px' }}>
            <button
              onClick={handleReset}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,215,0,0.3)',
                borderRadius: '50px',
                padding: '5px 14px',
                color: 'rgba(255,215,0,0.8)',
                fontSize: '11px',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              🔄 Reset Progress
            </button>
          </div>

          <h1 className="font-display text-gold" style={{
            fontSize: 'clamp(22px, 7vw, 36px)',
            letterSpacing: '0.03em', marginBottom: '4px',
            textShadow: '0 0 30px rgba(255,215,0,0.3)',
          }}>
            The 12 Doors of Love
          </h1>
          <p className="font-script" style={{
            fontSize: 'clamp(14px, 4vw, 18px)',
            color: 'rgba(255,179,209,0.8)', marginBottom: '6px',
          }}>
            Choose your chapter, Lavanya 🌸
          </p>

          {/* Tap hint */}
          <motion.p
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              fontSize: '11px', color: 'rgba(255,215,0,0.55)',
              fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em',
              marginBottom: '14px',
            }}
          >
            👆 Tap a glowing portal to see how to play
          </motion.p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ProgressBar completed={completedMonths.length} />
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            width: '100%', maxWidth: '300px', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.3), rgba(255,107,157,0.3), transparent)',
            marginBottom: '24px',
          }}
        />

        {/* Portal Grid 3×4 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px 12px',
          width: '100%', maxWidth: '310px',
        }}>
          {MONTHS.map((month) => (
            <Portal
              key={month.id}
              month={month}
              unlocked={isMonthUnlocked(month.id)}
              completed={isMonthCompleted(month.id)}
              isNext={nextMonth?.id === month.id}
              onClick={() => handlePortalClick(month)}
            />
          ))}
        </div>

        {/* Telugu hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            marginTop: '28px',
            color: 'rgba(255,215,0,0.35)',
            textAlign: 'center',
            fontFamily: "'Dancing Script', cursive",
            fontSize: '15px',
          }}
        >
          "ప్రతి తలుపు వెనక ఒక మ్యాజిక్..."
        </motion.p>

        {/* Touch hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ delay: 2, duration: 2.5, repeat: 3 }}
          style={{
            marginTop: '8px', fontSize: '11px',
            color: 'rgba(255,107,157,0.5)',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.05em',
          }}
        >
          Touch anywhere for ❤️
        </motion.p>
      </div>
    </div>
  )
}

export default WorldMap
