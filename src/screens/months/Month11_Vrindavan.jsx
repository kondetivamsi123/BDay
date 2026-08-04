import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Stars from '../../components/particles/Stars'
import GoldenDust from '../../components/particles/GoldenDust'
import Fireflies from '../../components/particles/Fireflies'
import LotusPetals from '../../components/particles/LotusPetals'
import GlowButton from '../../components/ui/GlowButton'
import useGameStore from '../../store/useGameStore'

export default function Month11_Vrindavan() {
  // Fixed syntax and targets
  const navigate = useNavigate()
  const { completeMonth } = useGameStore()
  const [phase, setPhase] = useState('intro') // intro -> play -> reward
  const [bloomed, setBloomed] = useState([false, false, false])
  const TARGET_COUNT = 3
  
  const allBloomed = bloomed.every(b => b)
  const numBloomed = bloomed.filter(Boolean).length

  useEffect(() => {
    if (allBloomed && phase === 'play') {
      const timer = setTimeout(() => {
        setPhase('reward')
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [allBloomed, phase])

  const handleLotusTap = (index) => {
    if (!bloomed[index]) {
      const newBloomed = [...bloomed]
      newBloomed[index] = true
      setBloomed(newBloomed)
    }
  }

  const handleComplete = () => {
    completeMonth(11)
    navigate('/world')
  }

  return (
    <div className="sky-night" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a1a15' }}>
      <Stars count={40} />
      <GoldenDust count={20} />
      <Fireflies count={15} />
      <LotusPetals count={15} />

      <motion.button 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.45 }} 
        onClick={() => navigate('/world')} 
        style={{ position: 'fixed', top: '18px', left: '18px', zIndex: 20, color: 'rgba(255,255,255,0.7)', fontSize: '13px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50px', padding: '8px 18px', cursor: 'pointer', backdropFilter: 'blur(10px)', fontFamily: "'Inter',sans-serif" }}
      >
        ← World Map
      </motion.button>

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10, padding: '20px' }}
          >
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
              <span style={{ fontSize: '64px', filter: 'drop-shadow(0 0 20px rgba(139,195,74,0.6))' }}>🪷</span>
            </motion.div>
            <h1 className="font-display text-gold" style={{ fontSize: '36px', marginTop: '16px', marginBottom: '8px', color: '#8BC34A' }}>Vrindavan Garden</h1>
            <p className="font-script" style={{ fontSize: '24px', color: '#C8E6C9', marginBottom: '32px' }}>"వృందావన వనంలో నీతో తిరుగాడాలని ఉంది..."</p>
            
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(139,195,74,0.3)', marginBottom: '32px', maxWidth: '320px', backdropFilter: 'blur(10px)' }}>
              <p style={{ color: '#fff', fontSize: '15px', marginBottom: '12px', textAlign: 'left' }}>1) 🪷 3 lotus flowers float on a sacred lake</p>
              <p style={{ color: '#fff', fontSize: '15px', marginBottom: '12px', textAlign: 'left' }}>2) 👆 Tap each lotus to make it bloom fully</p>
              <p style={{ color: '#fff', fontSize: '15px', marginBottom: '12px', textAlign: 'left' }}>3) 🦚 Watch the peacock dance as they bloom</p>
              <p style={{ color: '#fff', fontSize: '15px', textAlign: 'left' }}>4) ✨ Bloom all 3 to unlock December!</p>
            </div>

            <GlowButton onClick={() => setPhase('play')} color="#8BC34A">
              🪷 Enter the Garden
            </GlowButton>
          </motion.div>
        )}

        {phase === 'play' && (
          <motion.div
            key="play"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 70%, rgba(0,100,80,0.3) 0%, rgba(0,50,40,0.2) 50%, transparent 80%)', zIndex: 1 }} />
            
            <div style={{ position: 'absolute', top: '80px', zIndex: 5, textAlign: 'center' }}>
              <p style={{ color: '#8BC34A', fontSize: '18px', fontWeight: 'bold' }}>🪷 {numBloomed} / {TARGET_COUNT} Bloomed</p>
            </div>

            <motion.div
              style={{ position: 'absolute', top: '120px', zIndex: 5, fontSize: '80px' }}
              animate={{ 
                scale: 1 + numBloomed * 0.1,
                rotate: allBloomed ? [0, -10, 10, -10, 10, 0] : 0
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              🦚
            </motion.div>

            <div style={{ 
              position: 'absolute', bottom: 0, width: '100%', height: '250px', 
              background: 'linear-gradient(180deg, rgba(0,120,100,0.25), rgba(0,60,50,0.4))', 
              borderRadius: '50% 50% 0 0 / 80px 80px 0 0', 
              zIndex: 2, overflow: 'hidden'
            }}>
              <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', transform: 'skewX(-20deg)' }} 
              />
            </div>

            <div style={{ position: 'absolute', bottom: '70px', width: '300px', height: '120px', zIndex: 10, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', padding: '10px' }}>
              {bloomed.map((isBloomed, i) => (
                <motion.div
                  key={i}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}
                  onClick={() => handleLotusTap(i)}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence>
                    {isBloomed && (
                      <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ position: 'absolute', width: '40px', height: '40px', border: '2px solid #FF69B4', borderRadius: '50%' }}
                      />
                    )}
                  </AnimatePresence>
                  
                  <motion.div
                    animate={{ scale: isBloomed ? 1.2 : 0.8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    style={{ fontSize: '44px', filter: isBloomed ? 'drop-shadow(0 0 10px rgba(255,105,180,0.8))' : 'none', opacity: isBloomed ? 1 : 0.6 }}
                  >
                    {isBloomed ? '🪷' : '🌿'}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'reward' && (
          <motion.div
            key="reward"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10, padding: '20px' }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} style={{ position: 'absolute', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(139,195,74,0.2) 0%, transparent 70%)', zIndex: -1 }} />
            
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
              <span style={{ fontSize: '100px', filter: 'drop-shadow(0 0 30px rgba(139,195,74,0.8))' }}>🪷</span>
            </motion.div>
            
            <h2 className="font-display text-gold" style={{ fontSize: '32px', margin: '24px 0 16px', color: '#8BC34A' }}>Garden in Full Bloom</h2>
            <p className="font-script" style={{ fontSize: '26px', color: '#C8E6C9', marginBottom: '40px' }}>"నువ్వు ఉన్నావు కాబట్టే ఈ లోకం అందంగా ఉంది..." 🌙</p>
            
            <GlowButton onClick={handleComplete} color="#8BC34A">
              📜 Unlock December Portal
            </GlowButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
