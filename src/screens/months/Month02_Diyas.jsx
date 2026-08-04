import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Stars from '../../components/particles/Stars'
import GoldenDust from '../../components/particles/GoldenDust'
import Fireflies from '../../components/particles/Fireflies'
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
      <motion.div animate={{y:[0,-10,0]}} transition={{duration:3, repeat:Infinity, ease:"easeInOut"}} style={{ fontSize: '80px', marginBottom: '20px', filter: 'drop-shadow(0 0 15px #FF6B35)' }}>
        🪔
      </motion.div>
      <motion.h1 className="font-display text-gold" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} style={{ fontSize: '36px', marginBottom: '8px' }}>Diya Night</motion.h1>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
        Light the sacred diyas, Lavanya...
      </motion.p>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} style={{ fontSize: '20px', color: '#FF6B35', fontFamily: "'Dancing Script', cursive", marginBottom: '30px' }}>
        "మూడు దీపాలు వెలిగించు..."
      </motion.p>

      <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{delay:0.6}} style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: '20px', padding: '20px', maxWidth: '320px', width: '100%', marginBottom: '30px', textAlign: 'left' }}>
        <h3 style={{ color: '#FF6B35', fontSize: '16px', marginBottom: '12px', fontFamily: "'Inter', sans-serif" }}>HOW TO PLAY</h3>
        <ul style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', lineHeight: '1.6', paddingLeft: '0', listStyle: 'none', margin: 0 }}>
          <li style={{marginBottom:'8px'}}>🪔 1. 3 sacred diyas are placed before you</li>
          <li style={{marginBottom:'8px'}}>👆 2. Tap each unlit diya to light it</li>
          <li style={{marginBottom:'8px'}}>🔥 3. Watch the flame glow and spread warmth</li>
          <li>✨ 4. Light all 3 to unlock March!</li>
        </ul>
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}>
        <GlowButton variant="gold" onClick={onStart}>🕯️ Light the Diyas</GlowButton>
      </motion.div>
    </div>
  )
}

const PlayScreen = ({ onComplete }) => {
  const [litDiyas, setLitDiyas] = useState(new Set())
  const TARGET_COUNT = 3

  const toggleDiya = (id) => {
    if (litDiyas.has(id)) return
    const newLit = new Set(litDiyas)
    newLit.add(id)
    setLitDiyas(newLit)
  }

  useEffect(() => {
    if (litDiyas.size === TARGET_COUNT) {
      const timer = setTimeout(() => {
        onComplete()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [litDiyas.size, onComplete])

  return (
    <div style={{ position:'relative', zIndex:5, minHeight:'100%', display:'flex', flexDirection:'column', alignItems:'center', padding:'80px 20px 40px', maxWidth:'400px', margin:'0 auto' }}>
      
      <div style={{ background:'rgba(0,0,0,0.5)', border:'1px solid rgba(255,107,53,0.3)', borderRadius:'30px', padding:'8px 20px', marginBottom:'40px' }}>
        <span style={{ color:'#FF6B35', fontFamily:"'Inter', sans-serif", fontSize:'16px', fontWeight:'bold' }}>{litDiyas.size}/{TARGET_COUNT} Lit</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'15px', width:'100%' }}>
        {[...Array(3)].map((_, i) => {
          const isLit = litDiyas.has(i)
          return (
            <motion.div key={i} whileTap={{ scale: 0.88 }} onClick={() => toggleDiya(i)}
              style={{
                width: '100%', height: '120px',
                background: isLit ? 'radial-gradient(circle, rgba(255,107,53,0.35) 0%, transparent 100%)' : 'rgba(255,107,53,0.08)',
                border: isLit ? '1px solid rgba(255,107,53,0.7)' : '1px solid rgba(255,107,53,0.2)',
                borderRadius: '14px',
                boxShadow: isLit ? '0 0 25px rgba(255,107,53,0.6), 0 0 50px rgba(255,107,53,0.25)' : 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', position: 'relative', overflow: 'hidden'
              }}
            >
              {isLit && (
                <>
                  <motion.div animate={{y:[-30, -60], opacity:[1,0]}} transition={{duration:1, repeat:Infinity, ease:"linear"}} style={{position:'absolute', width:'3px', height:'3px', background:'#FFD700', borderRadius:'50%', left:'30%'}} />
                  <motion.div animate={{y:[-30, -55], opacity:[1,0]}} transition={{duration:1.2, repeat:Infinity, ease:"linear", delay:0.2}} style={{position:'absolute', width:'4px', height:'4px', background:'#FF6B35', borderRadius:'50%', left:'50%'}} />
                  <motion.div animate={{y:[-30, -65], opacity:[1,0]}} transition={{duration:1.1, repeat:Infinity, ease:"linear", delay:0.4}} style={{position:'absolute', width:'2px', height:'2px', background:'#FFF', borderRadius:'50%', left:'70%'}} />
                </>
              )}
              
              <span style={{ fontSize: '44px', opacity: isLit ? 1 : 0.4, filter: isLit ? 'drop-shadow(0 0 10px #FF6B35)' : 'none', animation: isLit ? 'flicker 2s infinite' : 'none' }}>
                {isLit ? '🔥' : '🪔'}
              </span>
              <span style={{ fontSize: '12px', color: isLit ? '#FF6B35' : 'rgba(255,107,53,0.5)', marginTop: '8px', fontFamily: "'Inter', sans-serif" }}>
                Diya {i + 1}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const Month02 = () => {
  const navigate = useNavigate()
  const completeMonth = useGameStore(s => s.completeMonth)
  const [phase, setPhase] = useState('intro') 

  return (
    <div className="screen sky-night" style={{ overflowY: 'auto' }}>
      <Stars count={70}/><GoldenDust count={25}/><Fireflies count={10}/>
      
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(255,107,53,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} onClick={() => navigate('/world')}
        style={{ position: 'fixed', top: '18px', left: '18px', zIndex: 20, color: 'rgba(255,255,255,0.5)',
          fontSize: '13px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50px', padding: '8px 16px', cursor: 'pointer', backdropFilter: 'blur(10px)', fontFamily: "'Inter', sans-serif" }}>
        ← World Map
      </motion.button>

      <AnimatePresence mode="wait">
        {phase === 'intro' && <motion.div key="intro" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{height:'100%'}}><IntroScreen onStart={() => setPhase('play')} /></motion.div>}
        {phase === 'play' && <motion.div key="play" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} style={{height:'100%'}}><PlayScreen onComplete={() => setPhase('reward')} /></motion.div>}
        {phase === 'reward' && <motion.div key="reward" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} style={{height:'100%'}}><RewardScreen emoji="🔥" unlockText="🌳 Unlock March Portal" monthNum={2} onClaim={() => { completeMonth(2); setTimeout(() => navigate('/world'), 1800) }} /></motion.div>}
      </AnimatePresence>
    </div>
  )
}
export default Month02
