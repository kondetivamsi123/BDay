import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

const COMBO_TEXTS = ["Nice! 🌟", "Wow! ✨", "Amazing! 💕", "Beautiful! 🦋"];

export default function Month06_Collection() {
  const navigate = useNavigate();
  const { completeMonth } = useGameStore();
  const [phase, setPhase] = useState('intro');
  
  const [timeLeft, setTimeLeft] = useState(40);
  const [score, setScore] = useState(0);
  const [items, setItems] = useState([]);
  const [comboText, setComboText] = useState(null);
  const TARGET_SCORE = 3; // Changed from 25 to 3 as requested!
  
  const poem = useMemo(() => LOVE_POEMS[Math.floor(Math.random() * LOVE_POEMS.length)], []);

  const spawnItem = useCallback(() => {
    const types = [
      { t: '❤️', w: 0.4 },
      { t: '🪷', w: 0.3 },
      { t: '🦋', w: 0.3 }
    ];
    const r = Math.random();
    let type = '❤️';
    if (r > 0.4 && r <= 0.7) type = '🪷';
    else if (r > 0.7) type = '🦋';

    return {
      id: Date.now() + Math.random(),
      type,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 70,
      size: 36 + Math.random() * 15,
      duration: 3 + Math.random() * 3
    };
  }, []);

  // Initialize items
  useEffect(() => {
    if (phase === 'play' && items.length === 0) {
      const initial = Array.from({ length: 8 }, () => spawnItem());
      setItems(initial);
    }
  }, [phase, spawnItem, items.length]);

  // Timer
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

  // Check win
  useEffect(() => {
    if (score >= TARGET_SCORE && phase === 'play') {
      setTimeout(() => setPhase('reward'), 1000);
    }
  }, [score, phase]);

  const collectItem = (id) => {
    if (timeLeft === 0 || score >= TARGET_SCORE) return;
    
    setItems(prev => prev.filter(item => item.id !== id));
    setScore(prev => prev + 1);
    
    // Combo text
    const text = COMBO_TEXTS[Math.floor(Math.random() * COMBO_TEXTS.length)];
    setComboText({ text, id: Date.now() });
  };

  const handleStart = () => {
    setPhase('play');
    setScore(0);
    setTimeLeft(40);
    setItems([]);
  };

  // Progress bar color
  const progressColor = timeLeft > 20 ? '#E91E63' : timeLeft > 10 ? '#FF9800' : '#F44336';
  const progressWidth = `${(timeLeft / 40) * 100}%`;

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(233,30,99,0.15) 0%, #0a0510 70%)',
      backgroundColor: '#05020a',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      <Stars count={40} />
      <GoldenDust />

      <motion.button 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.45 }} 
        onClick={() => navigate('/world')}
        style={{ 
          position: 'fixed', top: '18px', left: '18px', zIndex: 30, 
          color: 'rgba(255,255,255,0.7)', fontSize: '13px', 
          background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,215,0,0.3)',
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
              animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: '72px', marginBottom: '16px', filter: 'drop-shadow(0 0 20px rgba(233, 30, 99, 0.4))' }}
            >
              🦋
            </motion.div>
            <h1 className="font-display" style={{ fontSize: '36px', marginBottom: '8px', color: '#E91E63', textShadow: '0 2px 10px rgba(233, 30, 99, 0.3)' }}>
              The Collection
            </h1>
            <p className="font-script" style={{ fontSize: '24px', color: '#e2e8f0', marginBottom: '40px', padding: '0 20px' }}>
              "నీ కళ్ళు చూసినప్పుడు హృదయం సీతాకోకచిలుక అవుతుంది..."
            </p>

            <div className="glass" style={{
              background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '24px',
              border: '1px solid rgba(233, 30, 99, 0.2)', marginBottom: '40px', maxWidth: '320px', textAlign: 'left'
            }}>
              <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#cbd5e1' }}>1) ❤️ 🪷 🦋 are floating around</p>
              <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#cbd5e1' }}>2) 👆 Tap them to collect</p>
              <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#cbd5e1' }}>3) ⏱️ Works smoothly on PC & Mobile</p>
              <p style={{ margin: 0, fontSize: '15px', color: '#cbd5e1' }}>4) ✨ Collect 3 items to win!</p>
            </div>

            <GlowButton onClick={handleStart} color="#E91E63">
              🦋 Start Collecting!
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
            {/* Timer Bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: progressWidth, backgroundColor: progressColor }}
                transition={{ duration: 1, ease: 'linear' }}
                style={{ height: '100%' }}
              />
            </div>

            {/* Score */}
            <div style={{ position: 'absolute', top: '30px', left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 20 }}>
              <div style={{
                background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(233,30,99,0.4)',
                padding: '10px 24px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px',
                backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(233,30,99,0.3)'
              }}>
                <span style={{ fontSize: '24px' }}>🦋</span>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: score >= TARGET_SCORE ? '#4CAF50' : 'white' }}>
                  {score} / {TARGET_SCORE}
                </span>
              </div>
            </div>

            {/* Combo Text */}
            <AnimatePresence>
              {comboText && (
                <motion.div
                  key={comboText.id}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: -20, scale: 1.2 }}
                  exit={{ opacity: 0, y: -40, scale: 0.8 }}
                  onAnimationComplete={() => setComboText(null)}
                  style={{
                    position: 'absolute', top: '40%', left: '0', right: '0',
                    textAlign: 'center', fontSize: '32px', fontWeight: 'bold',
                    color: '#E91E63', textShadow: '0 2px 10px rgba(255,255,255,0.5)',
                    pointerEvents: 'none', zIndex: 25, fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {comboText.text}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Items */}
            {items.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: [0, 15, -15, 0],
                  y: [0, -20, 10, -15, 0]
                }}
                transition={{ 
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  x: { duration: item.duration, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: item.duration * 1.2, repeat: Infinity, ease: 'easeInOut' }
                }}
                onClick={() => collectItem(item.id)}
                onMouseDown={() => collectItem(item.id)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  collectItem(item.id);
                }}
                style={{
                  position: 'absolute',
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(233, 30, 99, 0.25)',
                  border: '2px solid rgba(233, 30, 99, 0.6)',
                  boxShadow: '0 0 15px rgba(233, 30, 99, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  zIndex: 15,
                  touchAction: 'none'
                }}
                whileHover={{ scale: 1.3, boxShadow: '0 0 25px rgba(233, 30, 99, 0.8)' }}
                whileTap={{ scale: 1.5, opacity: 0 }}
              >
                {item.type}
              </motion.div>
            ))}

            {/* Game Over */}
            {timeLeft === 0 && score < TARGET_SCORE && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', zIndex: 30, backdropFilter: 'blur(5px)'
              }}>
                <h2 style={{ fontSize: '28px', marginBottom: '16px', color: '#E91E63' }}>So close!</h2>
                <p style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '24px' }}>You collected {score} items</p>
                <GlowButton onClick={handleStart} color="#E91E63">
                  ↻ Try Again
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
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity }}
              style={{ fontSize: '80px', marginBottom: '24px' }}
            >
              🦋
            </motion.div>
            <h2 className="font-display text-gold" style={{ fontSize: '32px', marginBottom: '24px' }}>
              Wonderful! ✨
            </h2>
            <p className="font-script" style={{ fontSize: '24px', color: '#e2e8f0', marginBottom: '40px', maxWidth: '300px', lineHeight: 1.5 }}>
              {poem}
            </p>
            <GlowButton onClick={() => {
              completeMonth(6);
              navigate('/world');
            }} color="#E91E63">
              📻 Unlock July Portal
            </GlowButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
