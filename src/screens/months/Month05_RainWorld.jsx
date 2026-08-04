import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Stars from '../../components/particles/Stars';
import GoldenDust from '../../components/particles/GoldenDust';
import useGameStore from '../../store/useGameStore';
import GlowButton from '../../components/ui/GlowButton';

const LOVE_POEMS = [
  '"నువ్వు లేని జీవితం అర్థం లేనిది..." 💛',
  '"Every smile of yours lights my whole world." ✨',
  '"నీ కళ్ళలో నాకు స్వర్గం కనిపిస్తుంది..." 🌸',
  '"నీ నవ్వు చూస్తే మనసు పూల తోటలా అవుతుంది..." 🌺',
  '"నువ్వు ఉన్నావు కాబట్టే ఈ లోకం అందంగా ఉంది..." 🌙'
];

const RainLines = () => (
  <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
    {Array.from({ length: 25 }, (_, i) => (
      <div key={i} style={{
        position: 'absolute', 
        left: `${i * 4 + 2}%`, 
        top: 0,
        width: '2px', 
        height: `${Math.random() * 80 + 50}px`,
        background: 'linear-gradient(180deg, transparent, rgba(0,225,255,0.6), transparent)',
        animation: `petal-fall ${Math.random() * 0.9 + 0.5}s ${Math.random() * 2}s linear infinite`,
      }} />
    ))}
  </div>
);

export default function Month05_RainWorld() {
  const navigate = useNavigate();
  const { completeMonth } = useGameStore();
  const [phase, setPhase] = useState('intro');
  
  const [timeLeft, setTimeLeft] = useState(45);
  const [score, setScore] = useState(0);
  const [items, setItems] = useState([]);
  const TARGET_SCORE = 3; // Changed from 10 to 3 as requested!
  
  const poem = useMemo(() => LOVE_POEMS[Math.floor(Math.random() * LOVE_POEMS.length)], []);

  // Timer logic
  useEffect(() => {
    let timer;
    if (phase === 'play' && timeLeft > 0 && score < TARGET_SCORE) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && phase === 'play') {
      if (score >= TARGET_SCORE) {
        setTimeout(() => setPhase('reward'), 800);
      }
    }
    return () => clearInterval(timer);
  }, [phase, timeLeft, score]);

  // Spawner logic with large hitboxes
  useEffect(() => {
    let spawner;
    if (phase === 'play' && timeLeft > 0 && score < TARGET_SCORE) {
      spawner = setInterval(() => {
        const types = ['💌', '💌', '❤️', '🌸', '💖'];
        const type = types[Math.floor(Math.random() * types.length)];
        const newItem = {
          id: Date.now() + Math.random(),
          type,
          x: 8 + Math.random() * 80,
          duration: 3.5 + Math.random() * 2, // Slower fall for easy clicking on PC & Mobile
        };
        setItems(prev => [...prev.slice(-12), newItem]); // Max 12 active items
      }, 700);
    }
    return () => clearInterval(spawner);
  }, [phase, timeLeft, score]);

  // Win condition
  useEffect(() => {
    if (score >= TARGET_SCORE && phase === 'play') {
      setTimeout(() => setPhase('reward'), 1200);
    }
  }, [score, phase]);

  const collectItem = (id, type) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setScore(prev => prev + 1);
  };

  const handleStart = () => {
    setPhase('play');
    setScore(0);
    setTimeLeft(45);
    setItems([]);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(180deg, #03081a 0%, #001f3f 50%, #002b28 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      <Stars count={50} />
      <GoldenDust />
      {phase === 'play' && <RainLines />}

      <motion.button 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.45 }} 
        onClick={() => navigate('/world')}
        style={{ 
          position: 'fixed', top: '18px', left: '18px', zIndex: 30, 
          color: 'rgba(255,255,255,0.7)', fontSize: '13px', 
          background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,225,255,0.3)',
          borderRadius: '50px', padding: '8px 18px', cursor: 'pointer', 
          backdropFilter: 'blur(10px)' 
        }}
      >
        ← World Map
      </motion.button>

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10
            }}
          >
            <motion.div 
              animate={{ y: [0, -12, 0] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: '76px', marginBottom: '16px', filter: 'drop-shadow(0 0 25px rgba(0, 225, 255, 0.6))' }}
            >
              🌧️
            </motion.div>
            <h1 className="font-display" style={{ fontSize: '36px', marginBottom: '8px', color: '#00E5FF', textShadow: '0 2px 15px rgba(0, 225, 255, 0.5)' }}>
              Rain World
            </h1>
            <p className="font-script" style={{ fontSize: '24px', color: '#e2e8f0', marginBottom: '32px' }}>
              "వర్షంలో నీతో తడవడం నాకు ఇష్టం..."
            </p>

            <div className="glass" style={{
              background: 'rgba(0, 30, 60, 0.5)', padding: '24px', borderRadius: '24px',
              border: '1px solid rgba(0, 225, 255, 0.3)', marginBottom: '36px', maxWidth: '340px', textAlign: 'left',
              backdropFilter: 'blur(12px)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#e2e8f0' }}>1) 🌧️ Love notes & hearts fall from sky</p>
              <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#e2e8f0' }}>2) 👆 Click or Tap bubbles to collect them</p>
              <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#e2e8f0' }}>3) ☂️ Works smoothly on PC mouse & Mobile touch</p>
              <p style={{ margin: 0, fontSize: '15px', color: '#e2e8f0' }}>4) 🌈 Collect 3 notes to see the Rainbow!</p>
            </div>

            <GlowButton onClick={handleStart} color="#00E5FF">
              🌧️ Start Rain Game
            </GlowButton>
          </motion.div>
        )}

        {phase === 'play' && (
          <motion.div
            key="play"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, zIndex: 10 }}
          >
            {/* Rainbow */}
            <AnimatePresence>
              {score >= TARGET_SCORE && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5 }}
                  style={{
                    position: 'fixed', top: '-140px', left: '-50%',
                    width: '200%', height: '220px', borderRadius: '50%',
                    background: 'linear-gradient(180deg, transparent 30%, rgba(255,0,0,0.4), rgba(255,165,0,0.4), rgba(255,255,0,0.4), rgba(0,255,0,0.4), rgba(0,225,255,0.4), rgba(148,0,211,0.4))',
                    pointerEvents: 'none', zIndex: 2, filter: 'blur(3px)'
                  }}
                />
              )}
            </AnimatePresence>

            {/* HUD */}
            <div style={{ position: 'absolute', top: '24px', right: '20px', left: '160px', display: 'flex', justifyContent: 'flex-end', gap: '12px', zIndex: 25 }}>
              <div style={{
                background: 'rgba(0,10,30,0.7)', border: '1px solid rgba(0,225,255,0.4)',
                padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{ fontSize: '18px' }}>⏱️</span>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: timeLeft <= 10 ? '#ef4444' : '#00E5FF' }}>{timeLeft}s</span>
              </div>
              <div style={{
                background: 'rgba(0,10,30,0.7)', border: '1px solid rgba(0,225,255,0.4)',
                padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{ fontSize: '18px' }}>💌</span>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#FFD700' }}>{score} / {TARGET_SCORE}</span>
              </div>
            </div>

            {/* Tap instruction badge */}
            <div style={{
              position: 'absolute', top: '70px', left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(0,225,255,0.15)', border: '1px solid rgba(0,225,255,0.3)',
              borderRadius: '20px', padding: '6px 16px', fontSize: '12px', color: '#00E5FF',
              pointerEvents: 'none', zIndex: 20
            }}>
              👆 Click or Tap 3 glowing bubbles!
            </div>

            {/* Large, super-clickable items */}
            {items.map(item => (
              <motion.div
                key={item.id}
                initial={{ y: -60, x: `${item.x}vw`, scale: 0.8, opacity: 0 }}
                animate={{ y: '90vh', scale: 1, opacity: 1 }}
                transition={{ duration: item.duration, ease: 'linear' }}
                onAnimationComplete={() => setItems(prev => prev.filter(i => i.id !== item.id))}
                onClick={() => collectItem(item.id, item.type)}
                onMouseDown={() => collectItem(item.id, item.type)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  collectItem(item.id, item.type);
                }}
                whileHover={{ scale: 1.25, boxShadow: '0 0 30px rgba(0,225,255,0.9)' }}
                whileTap={{ scale: 1.4, opacity: 0 }}
                style={{
                  position: 'absolute',
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, rgba(0,225,255,0.35), rgba(0,50,100,0.6))',
                  border: '2px solid rgba(0,225,255,0.7)',
                  boxShadow: '0 0 20px rgba(0,225,255,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  zIndex: 15,
                  touchAction: 'none'
                }}
              >
                {item.type}
              </motion.div>
            ))}

            {/* Game Over / Retry */}
            {timeLeft === 0 && score < TARGET_SCORE && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', zIndex: 30, backdropFilter: 'blur(8px)'
              }}>
                <h2 style={{ fontSize: '28px', marginBottom: '24px', color: '#00E5FF' }}>Almost! Try again 🌸</h2>
                <GlowButton onClick={handleStart} color="#00E5FF">
                  ↻ Retry
                </GlowButton>
              </div>
            )}
          </motion.div>
        )}

        {phase === 'reward' && (
          <motion.div
            key="reward"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 10
            }}
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} 
              transition={{ duration: 3, repeat: Infinity }}
              style={{ fontSize: '84px', marginBottom: '24px', filter: 'drop-shadow(0 0 30px rgba(0,225,255,0.7))' }}
            >
              🌈
            </motion.div>
            <h2 className="font-display text-gold" style={{ fontSize: '32px', marginBottom: '24px' }}>
              Beautiful! ✨
            </h2>
            <p className="font-script" style={{ fontSize: '24px', color: '#e2e8f0', marginBottom: '40px', maxWidth: '320px', lineHeight: 1.5 }}>
              {poem}
            </p>
            <GlowButton onClick={() => {
              completeMonth(5);
              navigate('/world');
            }} color="#00E5FF">
              🦋 Unlock June Portal
            </GlowButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
