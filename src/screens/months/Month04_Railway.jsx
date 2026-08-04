import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Stars from '../../components/particles/Stars'
import GoldenDust from '../../components/particles/GoldenDust'
import Fireflies from '../../components/particles/Fireflies'
import LotusPetals from '../../components/particles/LotusPetals'
import FloatingHearts from '../../components/particles/FloatingHearts'
import GlowButton from '../../components/ui/GlowButton'
import useGameStore from '../../store/useGameStore'

const POEMS = [
  '"నువ్వు లేని జీవితం అర్థం లేనిది..." 💛',
  '"Every smile of yours lights my whole world." ✨',
  '"నీ కళ్ళలో నాకు స్వర్గం కనిపిస్తుంది..." 🌸',
  '"నీ నవ్వు చూస్తే మనసు పూల తోటలా అవుతుంది..." 🌺',
  '"నువ్వు ఉన్నావు కాబట్టే ఈ లోకం అందంగా ఉంది..." 🌙'
];

const RewardScreen = ({ emoji, unlockText, monthNum, onClaim }) => {
  const [claimed, setClaimed] = useState(false)
  const poem = useMemo(() => POEMS[Math.floor(Math.random() * POEMS.length)], [])
  return (
    <div style={{ position:'relative', zIndex:5, minHeight:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 24px', textAlign:'center' }}>
      <motion.div initial={{scale:0,rotate:-180}} animate={{scale:1,rotate:0}} transition={{type:'spring',bounce:0.5}} style={{ fontSize:'clamp(70px,20vw,90px)', marginBottom:'20px', filter:`drop-shadow(0 0 20px gold)`, animation:'float 3s ease-in-out infinite' }}>{emoji}</motion.div>
      <motion.h2 className="font-display text-gold" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3}} style={{fontSize:'clamp(24px,7vw,34px)',marginBottom:'8px'}}>Chapter Complete! ✨</motion.h2>
      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.6}} style={{maxWidth:'300px',padding:'18px 20px',background:'rgba(255,215,0,0.08)',border:'1px solid rgba(255,215,0,0.3)',borderRadius:'16px',marginBottom:'24px'}}>
        <div style={{fontSize:'11px',color:'rgba(255,215,0,0.6)',letterSpacing:'0.1em',marginBottom:'8px',fontFamily:"'Inter',sans-serif"}}>💌 LOVE POEM</div>
        <p style={{fontFamily:"'Dancing Script',cursive",fontSize:'18px',color:'rgba(255,215,0,0.9)',lineHeight:1.6}}>{poem}</p>
      </motion.div>
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.9}}>
        {!claimed ? <GlowButton variant="gold" size="lg" onClick={() => { setClaimed(true); onClaim() }}>{unlockText}</GlowButton>
        : <p style={{color:'#FFD700',fontFamily:"'Dancing Script',cursive",fontSize:'22px'}}>Opening next chapter... 🌸</p>}
      </motion.div>
    </div>
  )
}

const IntroScreen = ({ onStart }) => {
  return (
    <div style={{ position:'relative', zIndex:5, minHeight:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 24px', textAlign:'center' }}>
      <motion.div animate={{y:[0,-10,0]}} transition={{duration:3, repeat:Infinity, ease:"easeInOut"}} style={{ fontSize: '80px', marginBottom: '20px', filter: 'drop-shadow(0 0 15px #29B6F6)' }}>
        🚂
      </motion.div>
      <motion.h1 className="font-display text-gold" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} style={{ fontSize: '36px', marginBottom: '8px' }}>The Love Express</motion.h1>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
        Board the magical train, Lavanya...
      </motion.p>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} style={{ fontSize: '20px', color: '#29B6F6', fontFamily: "'Dancing Script', cursive", marginBottom: '30px' }}>
        "ప్రేమ రైలులో కలిసి ప్రయాణిద్దాం..."
      </motion.p>

      <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{delay:0.6}} style={{ background: 'rgba(41,182,246,0.1)', border: '1px solid rgba(41,182,246,0.3)', borderRadius: '20px', padding: '20px', maxWidth: '320px', width: '100%', marginBottom: '30px', textAlign: 'left' }}>
        <h3 style={{ color: '#29B6F6', fontSize: '16px', marginBottom: '12px', fontFamily: "'Inter', sans-serif" }}>HOW TO PLAY</h3>
        <ul style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', lineHeight: '1.6', paddingLeft: '0', listStyle: 'none', margin: 0 }}>
          <li style={{marginBottom:'8px'}}>🚂 1. The Love Express is ready to depart</li>
          <li style={{marginBottom:'8px'}}>🎟️ 2. Tap the ticket when the train reaches each station</li>
          <li style={{marginBottom:'8px'}}>🌄 3. 3 stations, 3 memories to collect</li>
          <li>✨ 4. Complete the journey to unlock May!</li>
        </ul>
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}>
        <GlowButton variant="gold" onClick={onStart}>🎟️ Board the Train</GlowButton>
      </motion.div>
    </div>
  )
}

const PlayScreen = ({ onComplete }) => {
  const [collected, setCollected] = useState([])
  const [activeStation, setActiveStation] = useState(1)

  const stations = [
    { id: 1, name: "Memory Lane 💛", emoji: "🏡", desc: "Where our story began..." },
    { id: 2, name: "Lavanya's Dream 🌸", emoji: "🌺", desc: "A garden of beautiful moments" },
    { id: 3, name: "Forever Station ❤️", emoji: "⭐", desc: "Our eternal destination" }
  ]

  const collectTicket = (id) => {
    if (!collected.includes(id)) {
      setCollected(prev => [...prev, id])
      if (id < 3) {
        setTimeout(() => setActiveStation(id + 1), 2000)
      }
    }
  }

  useEffect(() => {
    if (collected.length === 3) {
      const timer = setTimeout(() => {
        onComplete()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [collected.length, onComplete])

  return (
    <div style={{ position:'relative', zIndex:5, minHeight:'100%', display:'flex', flexDirection:'column', padding:'80px 20px 40px', maxWidth:'400px', margin:'0 auto' }}>
      
      <div style={{ alignSelf:'center', background:'rgba(0,0,0,0.5)', border:'1px solid rgba(41,182,246,0.3)', borderRadius:'30px', padding:'8px 20px', marginBottom:'30px' }}>
        <span style={{ color:'#29B6F6', fontFamily:"'Inter', sans-serif", fontSize:'16px', fontWeight:'bold' }}>{collected.length}/3 Tickets Collected</span>
      </div>

      <div style={{ position:'absolute', top:'130px', left:0, right:0, overflow:'hidden', height:'60px' }}>
        <motion.div
          animate={{ x: ['-20vw', '120vw'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ fontSize: '40px', filter: 'drop-shadow(0 0 10px rgba(41,182,246,0.5))' }}
        >
          🚂
        </motion.div>
        <div style={{ width:'100%', height:'2px', background:'rgba(41,182,246,0.3)', marginTop:'5px', borderBottom:'1px dashed #29B6F6' }} />
      </div>

      <div style={{ marginTop: '80px', display:'flex', flexDirection:'column', gap:'30px' }}>
        {stations.map((st) => {
          const isActive = activeStation === st.id
          const isCollected = collected.includes(st.id)

          return (
            <div key={st.id} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px',
              padding: '20px', position: 'relative', opacity: isActive || isCollected ? 1 : 0.4
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '30px' }}>{st.emoji}</span>
                <h3 style={{ color: '#fff', fontSize: '20px', margin: 0, fontFamily: "'Dancing Script', cursive" }}>{st.name}</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: '0 0 16px 0', fontFamily: "'Inter', sans-serif" }}>{st.desc}</p>
              
              {isActive && !isCollected && (
                <motion.div whileTap={{ scale: 0.95 }} onClick={() => collectTicket(st.id)}
                  className="pulse-glow"
                  style={{
                    background: 'linear-gradient(45deg, rgba(255,215,0,0.8), rgba(255,165,0,0.8))',
                    border: '2px dashed #FFF', borderRadius: '8px', padding: '12px',
                    textAlign: 'center', cursor: 'pointer', color: '#000', fontWeight: 'bold', fontFamily: "'Inter', sans-serif"
                  }}
                >
                  🎟️ TAP TO COLLECT
                </motion.div>
              )}

              {isCollected && (
                <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}}
                  style={{
                    background: 'rgba(76,175,80,0.2)', border: '1px solid #4CAF50', borderRadius: '8px',
                    padding: '12px', textAlign: 'center', color: '#4CAF50', fontWeight: 'bold', fontFamily: "'Inter', sans-serif"
                  }}
                >
                  ✅ Ticket Collected
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Month04 = () => {
  const navigate = useNavigate()
  const completeMonth = useGameStore(s => s.completeMonth)
  const [phase, setPhase] = useState('intro')

  return (
    <div className="screen sky-night" style={{ overflowY: 'auto' }}>
      <Stars count={70}/><GoldenDust count={25}/><Fireflies count={10}/>
      
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(41,182,246,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} onClick={() => navigate('/world')}
        style={{ position: 'fixed', top: '18px', left: '18px', zIndex: 20, color: 'rgba(255,255,255,0.5)',
          fontSize: '13px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50px', padding: '8px 16px', cursor: 'pointer', backdropFilter: 'blur(10px)', fontFamily: "'Inter', sans-serif" }}>
        ← World Map
      </motion.button>

      <AnimatePresence mode="wait">
        {phase === 'intro' && <motion.div key="intro" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{height:'100%'}}><IntroScreen onStart={() => setPhase('play')} /></motion.div>}
        {phase === 'play' && <motion.div key="play" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} style={{height:'100%'}}><PlayScreen onComplete={() => setPhase('reward')} /></motion.div>}
        {phase === 'reward' && <motion.div key="reward" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} style={{height:'100%'}}><RewardScreen emoji="🎟️" unlockText="🌧️ Unlock May Portal" monthNum={4} onClaim={() => { completeMonth(4); setTimeout(() => navigate('/world'), 1800) }} /></motion.div>}
      </AnimatePresence>
    </div>
  )
}
export default Month04
