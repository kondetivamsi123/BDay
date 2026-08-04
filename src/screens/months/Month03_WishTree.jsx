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

const WISHES = [
  '"నేను నిన్ను ప్రేమిస్తున్నాను 💛"',
  '"To the moon and back ❤️"',
  '"నీతో ఉంటే జీవితం అందంగా ఉంది 🌸"'
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
      <motion.div animate={{y:[0,-10,0]}} transition={{duration:3, repeat:Infinity, ease:"easeInOut"}} style={{ fontSize: '80px', marginBottom: '20px', filter: 'drop-shadow(0 0 15px #66BB6A)' }}>
        🌳
      </motion.div>
      <motion.h1 className="font-display text-gold" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} style={{ fontSize: '36px', marginBottom: '8px' }}>The Wish Tree</motion.h1>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
        Touch the magical leaves, Lavanya...
      </motion.p>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} style={{ fontSize: '20px', color: '#66BB6A', fontFamily: "'Dancing Script', cursive", marginBottom: '30px' }}>
        "మూడు ఆకులు తాకు..."
      </motion.p>

      <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{delay:0.6}} style={{ background: 'rgba(102,187,106,0.1)', border: '1px solid rgba(102,187,106,0.3)', borderRadius: '20px', padding: '20px', maxWidth: '320px', width: '100%', marginBottom: '30px', textAlign: 'left' }}>
        <h3 style={{ color: '#66BB6A', fontSize: '16px', marginBottom: '12px', fontFamily: "'Inter', sans-serif" }}>HOW TO PLAY</h3>
        <ul style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', lineHeight: '1.6', paddingLeft: '0', listStyle: 'none', margin: 0 }}>
          <li style={{marginBottom:'8px'}}>🌳 1. A magical Wish Tree stands before you</li>
          <li style={{marginBottom:'8px'}}>🍃 2. Tap each glowing leaf on the tree</li>
          <li style={{marginBottom:'8px'}}>💫 3. Each leaf reveals a floating love message</li>
          <li>✨ 4. Reveal all 3 wishes to unlock April!</li>
        </ul>
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}>
        <GlowButton variant="gold" onClick={onStart}>🍃 Touch the Leaves</GlowButton>
      </motion.div>
    </div>
  )
}

const PlayScreen = ({ onComplete }) => {
  const [revealedWishes, setRevealedWishes] = useState(new Set())
  const [activeWish, setActiveWish] = useState(null)
  const TARGET_COUNT = 3

  const leafPositions = [
    { top: '15%', left: '25%' }, { top: '5%', left: '50%' }, { top: '15%', left: '75%' }
  ]

  const handleLeafTap = (id) => {
    if (revealedWishes.has(id)) return
    const newRevealed = new Set(revealedWishes)
    newRevealed.add(id)
    setRevealedWishes(newRevealed)
    setActiveWish({ id, text: WISHES[id], pos: leafPositions[id] })
    setTimeout(() => {
      setActiveWish(prev => (prev && prev.id === id ? null : prev))
    }, 2500)
  }

  useEffect(() => {
    if (revealedWishes.size === TARGET_COUNT) {
      const timer = setTimeout(() => {
        onComplete()
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [revealedWishes.size, onComplete])

  return (
    <div style={{ position:'relative', zIndex:5, minHeight:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 20px', maxWidth:'400px', margin:'0 auto', overflow: 'hidden' }}>
      
      <div style={{ position:'absolute', top:'60px', background:'rgba(0,0,0,0.5)', border:'1px solid rgba(102,187,106,0.3)', borderRadius:'30px', padding:'8px 20px' }}>
        <span style={{ color:'#66BB6A', fontFamily:"'Inter', sans-serif", fontSize:'16px', fontWeight:'bold' }}>{revealedWishes.size}/{TARGET_COUNT} Wishes Revealed</span>
      </div>

      <div style={{ position:'relative', width:'300px', height:'300px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'40px' }}>
        <motion.div animate={{scale:[1, 1.05, 1]}} transition={{duration:4, repeat:Infinity, ease:"easeInOut"}} style={{ fontSize: '120px', filter: 'drop-shadow(0 0 30px rgba(102,187,106,0.4))' }}>
          🌳
        </motion.div>

        {leafPositions.map((pos, i) => {
          const isRevealed = revealedWishes.has(i)
          return (
            <motion.div key={i} whileTap={{ scale: 1.5 }}
              onClick={() => handleLeafTap(i)}
              initial={{ scale: 1 }}
              animate={isRevealed ? { scale: 1 } : { scale: [1, 1.1, 1] }}
              transition={!isRevealed ? { duration: 2, repeat: Infinity, delay: i * 0.2 } : { type: 'spring' }}
              style={{
                position: 'absolute', top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)',
                width: '60px', height: '60px', borderRadius: '50%',
                background: isRevealed ? 'rgba(174,213,129,0.4)' : 'rgba(102,187,106,0.2)',
                border: isRevealed ? '1px solid rgba(174,213,129,0.8)' : '1px solid rgba(102,187,106,0.5)',
                boxShadow: isRevealed ? '0 0 15px rgba(174,213,129,0.6)' : '0 0 10px rgba(102,187,106,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10
              }}
            >
              <span style={{ fontSize: '28px', opacity: isRevealed ? 0.5 : 1 }}>🍃</span>
            </motion.div>
          )
        })}

        <AnimatePresence>
          {activeWish && (
            <motion.div key={activeWish.id}
              initial={{ opacity: 0, top: activeWish.pos.top, left: activeWish.pos.left, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], top: `calc(${activeWish.pos.top} - 80px)`, scale: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              style={{
                position: 'absolute', transform: 'translate(-50%, -50%)',
                background: 'rgba(255,255,255,0.95)', padding: '10px 16px', borderRadius: '20px',
                color: '#2e7d32', fontFamily: "'Dancing Script', cursive", fontSize: '20px',
                whiteSpace: 'nowrap', zIndex: 20, boxShadow: '0 5px 15px rgba(0,0,0,0.2)', pointerEvents: 'none'
              }}
            >
              {activeWish.text}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

const Month03 = () => {
  const navigate = useNavigate()
  const completeMonth = useGameStore(s => s.completeMonth)
  const [phase, setPhase] = useState('intro')

  return (
    <div className="screen sky-night" style={{ overflowY: 'auto' }}>
      <Stars count={70}/><GoldenDust count={25}/><Fireflies count={10}/>
      
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(102,187,106,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} onClick={() => navigate('/world')}
        style={{ position: 'fixed', top: '18px', left: '18px', zIndex: 20, color: 'rgba(255,255,255,0.5)',
          fontSize: '13px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50px', padding: '8px 16px', cursor: 'pointer', backdropFilter: 'blur(10px)', fontFamily: "'Inter', sans-serif" }}>
        ← World Map
      </motion.button>

      <AnimatePresence mode="wait">
        {phase === 'intro' && <motion.div key="intro" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{height:'100%'}}><IntroScreen onStart={() => setPhase('play')} /></motion.div>}
        {phase === 'play' && <motion.div key="play" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} style={{height:'100%'}}><PlayScreen onComplete={() => setPhase('reward')} /></motion.div>}
        {phase === 'reward' && <motion.div key="reward" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} style={{height:'100%'}}><RewardScreen emoji="🌳" unlockText="🚂 Unlock April Portal" monthNum={3} onClaim={() => { completeMonth(3); setTimeout(() => navigate('/world'), 1800) }} /></motion.div>}
      </AnimatePresence>
    </div>
  )
}
export default Month03
