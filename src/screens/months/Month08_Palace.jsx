import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Stars from '../../components/particles/Stars';
import GoldenDust from '../../components/particles/GoldenDust';
import GlowButton from '../../components/ui/GlowButton';
import useGameStore from '../../store/useGameStore';

const LOVE_POEMS = [
  '"నువ్వు లేని జీవితం అర్థం లేనిది..." 💛',
  '"Every smile of yours lights my whole world." ✨',
  '"నీ కళ్ళలో నాకు స్వర్గం కనిపిస్తుంది..." 🌸',
  '"నీ నవ్వు చూస్తే మనసు పూల తోటలా అవుతుంది..." 🌺',
  '"నువ్వు ఉన్నావు కాబట్టే ఈ లోకం అందంగా ఉంది..." 🌙'
];

export default function Month08_Palace() {
  const navigate = useNavigate();
  const { completeMonth } = useGameStore();
  const [phase, setPhase] = useState('intro');
  const [litCandles, setLitCandles] = useState(new Array(3).fill(false));
  const [showCrown, setShowCrown] = useState(false);
  const TARGET_CANDLES = 3; // Changed from 12 to 3!

  const numLit = litCandles.filter(Boolean).length;

  useEffect(() => {
    if (numLit === TARGET_CANDLES) {
      setShowCrown(true);
      const timer = setTimeout(() => {
        setPhase('reward');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [numLit]);

  const lightCandle = (idx) => {
    if (!litCandles[idx]) {
      const newCandles = [...litCandles];
      newCandles[idx] = true;
      setLitCandles(newCandles);
    }
  };

  const handleComplete = () => {
    completeMonth(8);
    navigate('/world');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: phase === 'play' 
        ? 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,64,129,0.2) 0%, rgba(255,215,0,0.08) 60%, #0a0a0a 100%)'
        : '#0a0a0a',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif"
    }}>
      <Stars />
      <GoldenDust />

      <motion.button 
        initial={{opacity:0}} 
        animate={{opacity:0.45}} 
        onClick={()=>navigate('/world')} 
        style={{
          position:'fixed', top:'18px', left:'18px', zIndex:20,
          color:'rgba(255,255,255,0.5)', fontSize:'13px',
          background:'rgba(0,0,0,0.4)', border:'1px solid rgba(255,255,255,0.1)',
          borderRadius:'50px', padding:'8px 16px', cursor:'pointer',
          backdropFilter:'blur(10px)'
        }}>
        ← World Map
      </motion.button>

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ textAlign: 'center', zIndex: 10, padding: '20px', maxWidth: '400px' }}
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ fontSize: '72px', marginBottom: '20px' }}
            >
              🎂
            </motion.div>
            <motion.h1 
              animate={{ textShadow: ['0 0 10px #FF4081', '0 0 20px #FFD700', '0 0 10px #FF4081'] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ fontSize: '32px', marginBottom: '10px', background: 'linear-gradient(45deg, #FF4081, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Playfair Display', serif" }}
            >
              Birthday Palace
            </motion.h1>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#FFD700', fontFamily: "'Dancing Script', cursive" }}>
              Happy Birthday Lavanya! 🎂
            </h2>
            <p style={{ fontSize: '18px', marginBottom: '30px', fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>
              "మూడు దీపాలు వెలిగించు..."
            </p>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', marginBottom: '30px', border: '1px solid rgba(255,64,129,0.2)' }}>
              <p style={{ margin: '5px 0' }}>1) 🎂 A royal birthday cake glows for you</p>
              <p style={{ margin: '5px 0' }}>2) 🕯️ Tap all 3 candles to light them up</p>
              <p style={{ margin: '5px 0' }}>3) 🎆 Watch fireworks fill the sky</p>
              <p style={{ margin: '5px 0' }}>4) 👑 Earn your crown, birthday queen!</p>
            </div>
            <GlowButton onClick={() => setPhase('play')} color="#FF4081">
              🎂 Light the Cake!
            </GlowButton>
          </motion.div>
        )}

        {phase === 'play' && (
          <motion.div 
            key="play"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, width: '100%' }}
          >
            <div style={{ fontSize: '20px', color: '#FFD700', marginBottom: '40px', fontWeight: 'bold' }}>
              🕯️ {numLit}/{TARGET_CANDLES} Candles Lit
            </div>

            <div style={{ position: 'relative', marginTop: '80px' }}>
              <AnimatePresence>
                {showCrown && (
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.5 }}
                    animate={{ opacity: 1, y: -70, scale: 1.5 }}
                    style={{ position: 'absolute', top: 0, left: '50%', translateX: '-50%', fontSize: '44px', zIndex: 20, textShadow: '0 0 20px #FFD700' }}
                  >
                    👑
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cake Top Tier */}
              <div style={{ position: 'relative', width: '150px', height: '50px', background: 'linear-gradient(180deg,#FF80AB,#AD1457)', borderRadius: '12px 12px 8px 8px', margin: '0 auto', zIndex: 3, boxShadow: 'inset 0 5px 10px rgba(255,255,255,0.3)' }}>
                {/* 3 Candles */}
                <div style={{ position: 'absolute', top: '-30px', left: 0, width: '100%', height: '30px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-end' }}>
                  {litCandles.map((isLit, i) => (
                    <div key={i} onClick={() => lightCandle(i)} style={{ width: '10px', height: '30px', background: '#FFF9C4', position: 'relative', cursor: 'pointer', borderRadius: '4px' }}>
                      {isLit && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                          style={{ position: 'absolute', top: '-18px', left: '-2px', width: '14px', height: '20px', background: 'radial-gradient(ellipse at center, #FFEB3B 0%, #FF9800 100%)', borderRadius: '50%', boxShadow: '0 0 15px #FF9800' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tier */}
              <div style={{ position: 'relative', width: '210px', height: '70px', background: 'linear-gradient(180deg,#FF69B4,#C2185B)', borderRadius: '0 0 14px 14px', margin: '-5px auto 0', zIndex: 1, boxShadow: 'inset 0 5px 10px rgba(255,255,255,0.3), 0 10px 20px rgba(0,0,0,0.5)' }} />
            </div>
          </motion.div>
        )}

        {phase === 'reward' && (
          <motion.div 
            key="reward"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', zIndex: 10, padding: '20px', maxWidth: '400px' }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ fontSize: '64px', marginBottom: '10px', filter: 'drop-shadow(0 0 20px #FFD700)' }}
            >
              👑
            </motion.div>
            <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#FFD700', fontFamily: "'Playfair Display', serif" }}>
              Happy Birthday, Lavanya!
            </h2>
            <div style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,64,129,0.1))', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,215,0,0.3)', marginBottom: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <p style={{ fontSize: '20px', lineHeight: '1.6', fontStyle: 'italic', color: '#fff', marginBottom: '15px' }}>
                "నీకు పుట్టినరోజు శుభాకాంక్షలు! - Vamsi 💛"
              </p>
              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.5), transparent)', margin: '20px 0' }} />
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)' }}>
                {LOVE_POEMS[Math.floor(Math.random() * LOVE_POEMS.length)]}
              </p>
            </div>
            <GlowButton onClick={handleComplete} color="#FFD700">
              🏮 Unlock September Portal
            </GlowButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
