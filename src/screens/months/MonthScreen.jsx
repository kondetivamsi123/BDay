import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import Stars from '../../components/particles/Stars'
import GoldenDust from '../../components/particles/GoldenDust'
import FloatingHearts from '../../components/particles/FloatingHearts'

const MONTH_DATA = {
  2: {
    emoji: '🪔', name: 'February', theme: 'Diya Night', color: '#FF6B35',
    telugu: '"తొమ్మిది దీపాలు వెలిగించు, ఆ వెలుతురులో నీ ముఖం చూస్తాను..."',
    instructions: [
      { icon: '🪔', text: '9 sacred diyas are placed in the temple' },
      { icon: '👆', text: 'Tap each unlit diya to light it up' },
      { icon: '🔥', text: 'Watch the fire glow and spread warmth' },
      { icon: '✨', text: 'Light all 9 to complete the ritual & unlock March!' },
    ],
  },
  3: {
    emoji: '🌳', name: 'March', theme: 'Wish Tree', color: '#66BB6A',
    telugu: '"కలల చెట్టు నీ స్పర్శ కోసం ఎదురు చూస్తోంది..."',
    instructions: [
      { icon: '🌳', text: 'A magical Wish Tree stands in the forest' },
      { icon: '🍃', text: 'Tap each glowing leaf on the tree' },
      { icon: '💫', text: 'Each leaf reveals a floating wish or poem' },
      { icon: '✨', text: 'Read all the wishes to unlock April!' },
    ],
  },
  4: {
    emoji: '🚂', name: 'April', theme: 'Rail Journey', color: '#29B6F6',
    telugu: '"ప్రేమ రైలులో కలిసి ప్రయాణిద్దాం..."',
    instructions: [
      { icon: '🚂', text: 'Board the magical Love Express train' },
      { icon: '🎟️', text: 'Tap the ticket that appears at each station' },
      { icon: '🌄', text: 'Watch beautiful love-filled landscapes scroll by' },
      { icon: '✨', text: 'Complete the journey to unlock May!' },
    ],
  },
  5: {
    emoji: '🌧️', name: 'May', theme: 'Rain World', color: '#00BCD4',
    telugu: '"వర్షంలో నీతో తడవడం నాకు ఇష్టం..."',
    instructions: [
      { icon: '🌧️', text: 'Tap the clouds to make magical rain fall' },
      { icon: '☂️', text: 'Move the umbrella to catch falling love notes' },
      { icon: '🌈', text: 'Collect enough notes to reveal the rainbow' },
      { icon: '✨', text: 'Find the rainbow to unlock June!' },
    ],
  },
  6: {
    emoji: '🦋', name: 'June', theme: 'Collection', color: '#E91E63',
    telugu: '"నీ కళ్ళు చూసినప్పుడు హృదయం సీతాకోకచిలుక అవుతుంది..."',
    instructions: [
      { icon: '❤️', text: 'Hearts 💕, lotus 🪷, butterflies 🦋 are floating around' },
      { icon: '👆', text: 'Tap them quickly before they fly away!' },
      { icon: '⏱️', text: 'Beat the timer — collect as many as possible' },
      { icon: '✨', text: 'Hit the target score to unlock July!' },
    ],
  },
  7: {
    emoji: '📻', name: 'July', theme: 'Vintage Radio', color: '#AB47BC',
    telugu: '"మన పాట అక్కడ ఎక్కడో వినిపిస్తోంది..."',
    instructions: [
      { icon: '📻', text: 'An old vintage radio sits before you' },
      { icon: '🔘', text: 'Drag the knob left/right to tune the frequency' },
      { icon: '🎵', text: 'Find the magical frequency to unlock our song' },
      { icon: '✨', text: 'Tune in to the right station to unlock August!' },
    ],
  },
  8: {
    emoji: '🎂', name: 'August', theme: 'Birthday Palace', color: '#FF4081',
    telugu: '"నీ పుట్టినరోజు కోసం స్వర్గాన్ని అలంకరించాను..."',
    instructions: [
      { icon: '🎂', text: 'A grand birthday cake glows just for you, Lavanya' },
      { icon: '🕯️', text: 'Tap each unlit candle one by one to light them' },
      { icon: '🎆', text: 'Watch fireworks light the sky as you celebrate' },
      { icon: '✨', text: 'Light all candles to unlock September!' },
    ],
  },
  9: {
    emoji: '🏮', name: 'September', theme: 'Lantern Festival', color: '#FF9800',
    telugu: '"నీ కోరిక రాసి ఆకాశానికి పంపు..."',
    instructions: [
      { icon: '✍️', text: 'Type your secret wish into the glowing lantern' },
      { icon: '🏮', text: 'Tap "Release" and watch it float to the night sky' },
      { icon: '⭐', text: 'Your lantern joins thousands of stars above' },
      { icon: '✨', text: 'Your wish reaches the cosmos — unlock October!' },
    ],
  },
  10: {
    emoji: '💎', name: 'October', theme: 'Treasure Chamber', color: '#FFC107',
    telugu: '"నీ నవ్వే నాకు అత్యంత విలువైన నిధి..."',
    instructions: [
      { icon: '🔐', text: 'An ancient treasure chest is locked tight' },
      { icon: '🔄', text: 'Rotate the combination lock dial carefully' },
      { icon: '💎', text: 'Find the right combination to crack it open' },
      { icon: '✨', text: 'Open the chest to reveal gifts & unlock November!' },
    ],
  },
  11: {
    emoji: '🪷', name: 'November', theme: 'Vrindavan Garden', color: '#8BC34A',
    telugu: '"వృందావన వనంలో నీతో తిరుగాడాలని ఉంది..."',
    instructions: [
      { icon: '🪷', text: 'Lotus flowers float on a sacred, glowing lake' },
      { icon: '👆', text: 'Tap each lotus to make it bloom fully open' },
      { icon: '🦚', text: 'Watch the peacock dance as each flower blooms' },
      { icon: '✨', text: 'Bloom all lotus flowers to unlock December!' },
    ],
  },
  12: {
    emoji: '📜', name: 'December', theme: 'Ancient Library', color: '#B8860B',
    telugu: '"ఈ పుస్తకంలో నీకు రాసిన మాటలు ఉన్నాయి..."',
    instructions: [
      { icon: '📜', text: 'An ancient diary sits sealed with golden wax' },
      { icon: '💛', text: 'Tap the wax seal gently to break it open' },
      { icon: '💌', text: 'Read the heartfelt letter written just for you, Lavanya' },
      { icon: '🌟', text: 'This unlocks the Grand Finale — the biggest surprise!' },
    ],
  },
}

const MonthScreen = ({ monthId: propMonthId }) => {
  const navigate = useNavigate()
  const { monthId: paramId } = useParams()
  const id = propMonthId ?? parseInt(paramId, 10)
  const data = MONTH_DATA[id]
  if (!data) return null

  return (
    <div className="screen sky-night" style={{ overflowY: 'auto' }}>
      <Stars count={70} />
      <GoldenDust count={25} style={{ opacity: 0.5 }} />
      <FloatingHearts count={8} />

      {/* Color theme haze */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: `radial-gradient(ellipse 70% 55% at 50% 30%, ${data.color}22 0%, transparent 70%)`,
      }} />

      {/* Back button */}
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

      <div style={{
        position: 'relative', zIndex: 5,
        minHeight: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', padding: '70px 24px 40px',
      }}>

        {/* Chapter tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: `${data.color}18`, border: `1px solid ${data.color}35`,
            borderRadius: '50px', padding: '6px 16px', marginBottom: '20px',
            fontSize: '11px', color: data.color, letterSpacing: '0.1em',
            fontFamily: "'Inter', sans-serif", fontWeight: 600,
          }}
        >
          🗓️ {data.name.toUpperCase()} · CHAPTER {id}
        </motion.div>

        {/* Big emoji */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
          style={{
            fontSize: 'clamp(72px, 20vw, 100px)', lineHeight: 1, marginBottom: '18px',
            filter: `drop-shadow(0 0 20px ${data.color}) drop-shadow(0 0 40px ${data.color}88)`,
            animation: 'float 3.5s ease-in-out infinite',
          }}
        >
          {data.emoji}
        </motion.div>

        {/* Theme name */}
        <motion.h1
          className="font-display"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 'clamp(24px, 7.5vw, 38px)', color: data.color,
            textAlign: 'center', marginBottom: '18px',
            textShadow: `0 0 30px ${data.color}60`,
          }}
        >
          {data.theme}
        </motion.h1>

        {/* How to Play preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            width: '100%', maxWidth: '340px',
            background: `${data.color}0D`, border: `1px solid ${data.color}25`,
            borderRadius: '18px', padding: '16px 18px', marginBottom: '20px',
          }}
        >
          <div style={{
            fontSize: '11px', color: data.color, letterSpacing: '0.1em',
            marginBottom: '12px', fontFamily: "'Inter', sans-serif", fontWeight: 700,
          }}>
            🎮 HOW TO PLAY (Preview)
          </div>
          {data.instructions.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                marginBottom: i < data.instructions.length - 1 ? '10px' : '0',
              }}
            >
              <div style={{
                minWidth: '24px', height: '24px', borderRadius: '50%',
                background: `${data.color}20`, border: `1px solid ${data.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <span style={{
                fontSize: '14px', color: 'rgba(255,255,255,0.75)',
                fontFamily: "'Inter', sans-serif", lineHeight: 1.45,
              }}>
                <span style={{ marginRight: '6px' }}>{step.icon}</span>
                {step.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Telugu quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{
            padding: '14px 20px', background: `${data.color}0A`,
            border: `1px solid ${data.color}20`, borderRadius: '14px',
            maxWidth: '300px', textAlign: 'center',
            color: `${data.color}bb`, fontFamily: "'Dancing Script', cursive",
            fontSize: '17px', lineHeight: 1.5, marginBottom: '28px',
          }}
        >
          {data.telugu}
        </motion.div>

        {/* Coming soon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '50px', padding: '10px 28px',
            color: 'rgba(255,255,255,0.4)', fontSize: '13px', letterSpacing: '0.1em',
            fontFamily: "'Inter', sans-serif",
          }}>
            🔜 Coming in Phase {id <= 3 ? '2' : id <= 6 ? '3' : id <= 9 ? '4' : '5'}
          </div>
          <p style={{
            fontSize: '14px', color: 'rgba(255,255,255,0.25)',
            fontFamily: "'Dancing Script', cursive",
          }}>
            "మంచి విషయాలు ఆగమే వస్తాయి..." 🌸
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default MonthScreen
