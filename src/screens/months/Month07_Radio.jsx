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

export default function Month07_Radio() {
  const navigate = useNavigate();
  const { completeMonth } = useGameStore();
  const [phase, setPhase] = useState('intro');
  const [currentFreq, setCurrentFreq] = useState('--- . ---');
  const [isFound, setIsFound] = useState(false);
  
  const poem = useMemo(() => LOVE_POEMS[Math.floor(Math.random() * LOVE_POEMS.length)], []);

  const handleTuneClick = (freqText, isTarget) => {
    setCurrentFreq(freqText);
    if (isTarget) {
      setIsFound(true);
      setTimeout(() => {
        setPhase('reward');
      }, 1800);
    }
  };

  const handleStart = () => {
    setPhase('play');
    setCurrentFreq('--- . ---');
    setIsFound(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(171,71,188,0.2) 0%, #08030a 70%)',
      backgroundColor: '#08030a',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      <Stars count={30} />
      <GoldenDust />

      <motion.button 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.45 }} 
        onClick={() => navigate('/world')}
        style={{ 
          position: 'fixed', top: '18px', left: '18px', zIndex: 30, 
          color: 'rgba(255,255,255,0.7)', fontSize: '13px', 
          background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(171,71,188,0.3)',
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
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: '72px', marginBottom: '16px', filter: 'drop-shadow(0 0 20px rgba(171, 71, 188, 0.4))' }}
            >
              📻
            </motion.div>
            <h1 className="font-display" style={{ fontSize: '36px', marginBottom: '8px', color: '#AB47BC', textShadow: '0 2px 10px rgba(171, 71, 188, 0.3)' }}>
              Vintage Radio
            </h1>
            <p className="font-script" style={{ fontSize: '24px', color: '#e2e8f0', marginBottom: '40px', padding: '0 20px' }}>
              "మన పాట అక్కడ ఎక్కడో వినిపిస్తోంది..."
            </p>

            <div className="glass" style={{
              background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '24px',
              border: '1px solid rgba(171, 71, 188, 0.2)', marginBottom: '40px', maxWidth: '320px', textAlign: 'left'
            }}>
              <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#cbd5e1' }}>1) 📻 An old vintage radio sits before you</p>
              <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#cbd5e1' }}>2) 👆 Click the channels below to tune</p>
              <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#cbd5e1' }}>3) 🎵 Tune to 143.0 FM to play our love song</p>
              <p style={{ margin: 0, fontSize: '15px', color: '#cbd5e1' }}>4) ✨ Simple button click to unlock August!</p>
            </div>

            <GlowButton onClick={handleStart} color="#AB47BC">
              📻 Turn on the Radio
            </GlowButton>
          </motion.div>
        )}

        {phase === 'play' && (
          <motion.div
            key="play"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'absolute', inset: 0, zIndex: 10, display: 'flex', 
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '20px'
            }}
          >
            {/* Radio SVG / Body */}
            <div style={{
              width: '290px', height: '180px', 
              background: 'linear-gradient(135deg, #4a2800, #2d1600)', 
              border: '3px solid #8B6914', borderRadius: '20px', 
              position: 'relative', display: 'flex', alignItems: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 2px 10px rgba(255,255,255,0.1)',
              marginBottom: '30px'
            }}>
              {/* Antenna */}
              <div style={{ position: 'absolute', top: '-60px', right: '30px', width: '4px', height: '60px', background: '#ccc', borderRadius: '2px 2px 0 0' }} />
              
              {/* Speaker */}
              <div style={{
                width: '100px', height: '130px', background: 'rgba(0,0,0,0.4)', 
                borderRadius: '8px', marginLeft: '15px', display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', padding: '10px',
                boxSizing: 'border-box'
              }}>
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} style={{ width: '100%', paddingTop: '100%', background: 'rgba(100,60,0,0.6)', borderRadius: '50%' }} />
                ))}
              </div>

              {/* Display Panel */}
              <div style={{
                flex: 1, height: '70px', margin: '0 15px',
                background: '#0a1a0a', border: '2px solid #3a8a3a',
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 0 10px rgba(0,255,0,0.2)'
              }}>
                <span style={{ 
                  color: isFound ? '#FFD700' : '#00ff41', 
                  fontFamily: 'monospace', fontSize: '22px', fontWeight: 'bold',
                  textShadow: `0 0 10px ${isFound ? 'rgba(255,215,0,0.9)' : 'rgba(0,255,65,0.6)'}` 
                }}>
                  {currentFreq}
                </span>
              </div>
            </div>

            {/* Visualizer Bars */}
            <div style={{ display: 'flex', gap: '4px', height: '35px', alignItems: 'flex-end', marginBottom: '30px' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: isFound ? `${Math.random() * 30 + 10}px` : '4px',
                    backgroundColor: isFound ? '#FFD700' : '#AB47BC'
                  }}
                  transition={{ duration: 0.2, repeat: isFound ? Infinity : 0, repeatType: 'reverse' }}
                  style={{ width: '8px', borderRadius: '4px' }}
                />
              ))}
            </div>

            {/* Simple Channel Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '300px' }}>
              <button
                onClick={() => handleTuneClick('98.3 FM', false)}
                style={{
                  padding: '12px', borderRadius: '16px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(171,71,188,0.3)',
                  color: '#fff', fontSize: '15px', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
                }}
              >
                📻 Channel 98.3 FM
              </button>

              <button
                onClick={() => handleTuneClick('104.5 FM', false)}
                style={{
                  padding: '12px', borderRadius: '16px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(171,71,188,0.3)',
                  color: '#fff', fontSize: '15px', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
                }}
              >
                📻 Channel 104.5 FM
              </button>

              <GlowButton
                onClick={() => handleTuneClick('143.0 ❤️', true)}
                color="#FFD700"
              >
                📻 Tune to 143.0 FM ❤️
              </GlowButton>
            </div>

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
              transition={{ duration: 4, repeat: Infinity }}
              style={{ fontSize: '80px', marginBottom: '24px' }}
            >
              📻
            </motion.div>
            <h2 className="font-display text-gold" style={{ fontSize: '32px', marginBottom: '24px' }}>
              Perfect Tune! ❤️
            </h2>
            <p className="font-script" style={{ fontSize: '24px', color: '#e2e8f0', marginBottom: '40px', maxWidth: '300px', lineHeight: 1.5 }}>
              {poem}
            </p>
            <GlowButton onClick={() => {
              completeMonth(7);
              navigate('/world');
            }} color="#AB47BC">
              🎂 Unlock August Portal
            </GlowButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
