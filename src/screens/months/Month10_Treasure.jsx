import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Stars from '../../components/particles/Stars';
import GoldenDust from '../../components/particles/GoldenDust';
import GlowButton from '../../components/ui/GlowButton';
import useGameStore from '../../store/useGameStore';

export default function Month10_Treasure() {
  const navigate = useNavigate();
  const { completeMonth } = useGameStore();
  const [phase, setPhase] = useState('intro');
  const [combo, setCombo] = useState([0, 0, 0, 0]);
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);
  const [chestOpen, setChestOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const targetCombo = [0, 5, 0, 8];

  const handleUp = (idx) => {
    const newCombo = [...combo];
    newCombo[idx] = (newCombo[idx] + 1) % 10;
    setCombo(newCombo);
    setErrorMsg('');
  };

  const handleDown = (idx) => {
    const newCombo = [...combo];
    newCombo[idx] = (newCombo[idx] - 1 + 10) % 10;
    setCombo(newCombo);
    setErrorMsg('');
  };

  const handleOpen = () => {
    if (combo.join('') === targetCombo.join('')) {
      setChestOpen(true);
      setTimeout(() => {
        setPhase('reward');
      }, 2500);
    } else {
      setShake(true);
      setErrorMsg('ఏదో తప్పు... మళ్ళీ ప్రయత్నించు');
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleComplete = () => {
    completeMonth(10);
    navigate('/world');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a00',
      background: 'radial-gradient(ellipse at center, #332200 0%, #0a0a0a 100%)',
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
              💎
            </motion.div>
            <h1 style={{ fontSize: '32px', marginBottom: '10px', background: 'linear-gradient(45deg, #FFC107, #FF9800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Playfair Display', serif" }}>
              Treasure Chamber
            </h1>
            <p style={{ fontSize: '20px', marginBottom: '30px', fontStyle: 'italic', color: '#FFD54F' }}>
              "నీ నవ్వే నాకు అత్యంత విలువైన నిధి..."
            </p>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', marginBottom: '30px', border: '1px solid rgba(255,193,7,0.2)' }}>
              <p style={{ margin: '5px 0' }}>1) 🔐 An ancient treasure chest is locked</p>
              <p style={{ margin: '5px 0' }}>2) 🔄 Rotate the dial to enter combination</p>
              <p style={{ margin: '5px 0' }}>3) 💡 Hint: it's a special date...</p>
              <p style={{ margin: '5px 0' }}>4) 💎 Open the chest to reveal treasures!</p>
            </div>
            <GlowButton onClick={() => setPhase('play')} color="#FFC107">
              🔐 Enter the Chamber
            </GlowButton>
          </motion.div>
        )}

        {phase === 'play' && (
          <motion.div 
            key="play"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, width: '100%', padding: '20px' }}
          >
            {/* Treasure Chest */}
            <div style={{ position: 'relative', width: '180px', height: '120px', perspective: '1000px', marginBottom: '60px', marginTop: '40px' }}>
              {/* Chest Body */}
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '80px', background: 'linear-gradient(180deg, #5D4037, #3E2723)', borderRadius: '0 0 10px 10px', border: '4px solid #FFC107', boxSizing: 'border-box' }}>
                <div style={{ width: '100%', height: '2px', background: '#FFC107', marginTop: '20px' }} />
                <div style={{ width: '100%', height: '2px', background: '#FFC107', marginTop: '20px' }} />
                {/* Lock */}
                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', width: '30px', height: '30px', background: 'radial-gradient(circle, #FFD54F, #FF8F00)', borderRadius: '50%', border: '2px solid #5D4037', zIndex: 5 }} />
              </div>
              
              {/* Chest Lid */}
              <motion.div 
                animate={{ rotateX: chestOpen ? -110 : 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ position: 'absolute', top: 0, width: '100%', height: '40px', background: 'linear-gradient(180deg, #8D6E63, #5D4037)', borderRadius: '40px 40px 0 0', border: '4px solid #FFC107', borderBottom: 'none', boxSizing: 'border-box', transformOrigin: 'bottom center', zIndex: 2 }}
              />

              {/* Treasures flying out */}
              {chestOpen && (
                <div style={{ position: 'absolute', top: '20px', left: '50%', zIndex: 1 }}>
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{ scale: [1, 1.5, 1], x: (Math.random() - 0.5) * 300, y: -100 - Math.random() * 200, opacity: [1, 1, 0] }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      style={{ position: 'absolute', fontSize: '24px' }}
                    >
                      {['💰', '💎', '🎁', '✨'][Math.floor(Math.random() * 4)]}
                    </motion.div>
                  ))}
                  {/* Golden Explosion */}
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 5, opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{ position: 'absolute', top: '20px', left: '-25px', width: '50px', height: '50px', background: 'radial-gradient(circle, rgba(255,215,0,0.8), transparent)', borderRadius: '50%', filter: 'blur(10px)' }}
                  />
                </div>
              )}
            </div>

            {/* Combination Lock Area */}
            <motion.div 
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}
            >
              {combo.map((digit, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => handleUp(idx)} style={{ background: 'transparent', border: 'none', color: '#FFC107', fontSize: '24px', cursor: 'pointer' }}>▲</button>
                  <div style={{ width: '50px', height: '60px', background: 'rgba(255,255,255,0.05)', border: '2px solid #FFC107', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: '#fff', fontWeight: 'bold', boxShadow: 'inset 0 0 10px rgba(255,193,7,0.2)' }}>
                    {digit}
                  </div>
                  <button onClick={() => handleDown(idx)} style={{ background: 'transparent', border: 'none', color: '#FFC107', fontSize: '24px', cursor: 'pointer' }}>▼</button>
                </div>
              ))}
            </motion.div>

            <div style={{ height: '24px', color: '#f44336', marginBottom: '20px', fontSize: '14px' }}>
              {errorMsg}
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
              <button 
                onClick={() => setShowHint(!showHint)}
                style={{ background: 'transparent', border: '1px solid rgba(255,193,7,0.5)', color: '#FFC107', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
              >
                💡 Hint
              </button>
              <GlowButton onClick={handleOpen} color="#FFC107">
                OPEN
              </GlowButton>
            </div>

            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ marginTop: '20px', color: '#FFD54F', fontStyle: 'italic', background: 'rgba(0,0,0,0.5)', padding: '10px 20px', borderRadius: '10px' }}
                >
                  "Hint: నీ పుట్టినరోజు తేదీ! (0 5 0 8)"
                </motion.div>
              )}
            </AnimatePresence>
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
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              style={{ fontSize: '64px', marginBottom: '20px', filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.8))' }}
            >
              💎
            </motion.div>
            <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#FFD700', fontFamily: "'Playfair Display', serif" }}>
              Treasure Unlocked!
            </h2>
            <div style={{ background: 'rgba(255,215,0,0.05)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,215,0,0.3)', marginBottom: '30px', backdropFilter: 'blur(10px)' }}>
              <p style={{ fontSize: '18px', lineHeight: '1.6', fontStyle: 'italic', color: '#fff', margin: 0 }}>
                You are my greatest treasure.
              </p>
            </div>
            <GlowButton onClick={handleComplete} color="#FFC107">
              🪷 Unlock November Portal
            </GlowButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
