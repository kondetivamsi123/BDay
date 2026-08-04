import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Stars from '../../components/particles/Stars';
import GoldenDust from '../../components/particles/GoldenDust';
import GlowButton from '../../components/ui/GlowButton';
import useGameStore from '../../store/useGameStore';

export default function Month09_Lanterns() {
  const navigate = useNavigate();
  const { completeMonth } = useGameStore();
  const [phase, setPhase] = useState('intro');
  const [wish, setWish] = useState('');

  const handleRelease = () => {
    setPhase('releasing');
    setTimeout(() => {
      setPhase('reward');
    }, 3500);
  };

  const handleComplete = () => {
    completeMonth(9);
    navigate('/world');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050b14',
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

      {/* Moon during releasing/reward phase */}
      <AnimatePresence>
        {(phase === 'releasing' || phase === 'reward') && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'fixed',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,200,0.9), rgba(255,220,100,0.6), transparent)',
              boxShadow: '0 0 40px rgba(255,255,200,0.4)',
              zIndex: 1
            }}
          />
        )}
      </AnimatePresence>

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
              transition={{ repeat: Infinity, duration: 3 }}
              style={{ fontSize: '72px', marginBottom: '20px', filter: 'drop-shadow(0 0 20px rgba(255,140,0,0.6))' }}
            >
              🏮
            </motion.div>
            <h1 style={{ fontSize: '32px', marginBottom: '10px', background: 'linear-gradient(45deg, #FF9800, #FFC107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Playfair Display', serif" }}>
              Lantern Festival
            </h1>
            <p style={{ fontSize: '20px', marginBottom: '30px', fontStyle: 'italic', color: '#FFB74D' }}>
              "నీ కోరిక రాసి ఆకాశానికి పంపు..."
            </p>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', marginBottom: '30px', border: '1px solid rgba(255,152,0,0.2)' }}>
              <p style={{ margin: '5px 0' }}>1) ✍️ Type your secret wish for Lavanya</p>
              <p style={{ margin: '5px 0' }}>2) 🏮 Watch the lantern glow with your wish</p>
              <p style={{ margin: '5px 0' }}>3) 🌟 Tap Release to send it to the stars</p>
              <p style={{ margin: '5px 0' }}>4) ⭐ Your wish joins the cosmos!</p>
            </div>
            <GlowButton onClick={() => setPhase('writing')} color="#FF9800">
              🏮 Light a Lantern
            </GlowButton>
          </motion.div>
        )}

        {phase === 'writing' && (
          <motion.div 
            key="writing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, width: '100%', padding: '20px' }}
          >
            <h2 style={{ fontSize: '24px', marginBottom: '40px', color: '#FFCC80', textAlign: 'center' }}>
              What is your wish for Lavanya? 🌟
            </h2>

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
              {/* Lantern Body */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                style={{
                  width: '100px',
                  height: '130px',
                  background: 'linear-gradient(180deg, #FF8C00, #FF6B00)',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                  boxShadow: '0 0 30px rgba(255,140,0,0.5)',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '20px 10px',
                  zIndex: 2
                }}
              >
                {/* Window */}
                <div style={{ width: '60%', height: '70%', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontSize: '10px', color: '#FFF3E0', textAlign: 'center', wordBreak: 'break-word', margin: 0 }}>
                    {wish || '...'}
                  </p>
                </div>
              </motion.div>
              {/* Lantern Cap */}
              <div style={{ width: '60px', height: '10px', background: '#E65100', clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)', marginTop: '-140px', zIndex: 3 }} />
              {/* Lantern Bottom */}
              <div style={{ width: '100px', height: '10px', background: '#E65100', marginTop: '130px', zIndex: 3 }} />
              {/* Tassel */}
              <div style={{ width: '2px', height: '20px', background: '#FFB300', marginTop: '0' }} />
              <div style={{ width: '10px', height: '10px', background: '#FFB300', transform: 'rotate(45deg)', marginTop: '-5px' }} />
            </div>

            <input
              type="text"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Write your wish here... 💫"
              maxLength={60}
              style={{
                width: '100%',
                maxWidth: '300px',
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid #FFCA28',
                color: '#FFCA28',
                fontSize: '18px',
                padding: '10px',
                textAlign: 'center',
                outline: 'none',
                marginBottom: '30px'
              }}
            />

            <GlowButton onClick={handleRelease} color="#FFCA28" disabled={wish.length <= 3}>
              Release Lantern 🏮
            </GlowButton>
          </motion.div>
        )}

        {phase === 'releasing' && (
          <motion.div 
            key="releasing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0 }}
          >
            {/* Background small lanterns */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: '100vh', x: `${Math.random() * 80 + 10}vw`, scale: Math.random() * 0.3 + 0.1, opacity: 0 }}
                animate={{ y: '-20vh', opacity: [0, 1, 0] }}
                transition={{ duration: 4 + Math.random() * 2, ease: 'easeOut', delay: Math.random() * 1 }}
                style={{
                  position: 'absolute',
                  width: '40px', height: '50px',
                  background: 'linear-gradient(180deg, #FF8C00, #FF6B00)',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                  boxShadow: '0 0 15px rgba(255,140,0,0.5)'
                }}
              />
            ))}

            <motion.div
              initial={{ y: 0, scale: 1, opacity: 1 }}
              animate={{ y: -500, scale: 0.3, opacity: 0 }}
              transition={{ duration: 3, ease: 'easeInOut' }}
              style={{
                width: '100px',
                height: '130px',
                background: 'linear-gradient(180deg, #FF8C00, #FF6B00)',
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                boxShadow: '0 0 40px rgba(255,140,0,0.8)',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}
            >
              <div style={{ width: '60%', height: '70%', background: 'rgba(255,255,255,0.3)', borderRadius: '4px' }} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{ position: 'absolute', bottom: '20%', fontSize: '24px', color: '#FFF3E0', fontStyle: 'italic', textAlign: 'center', width: '100%', padding: '0 20px' }}
            >
              "Your wish is on its way to the stars, Lavanya... 🌟"
            </motion.p>
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
              style={{ fontSize: '64px', marginBottom: '20px', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' }}
            >
              🏮
            </motion.div>
            <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#FFD700', fontFamily: "'Playfair Display', serif" }}>
              Wish Granted ✨
            </h2>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,215,0,0.3)', marginBottom: '30px', backdropFilter: 'blur(10px)' }}>
              <p style={{ fontSize: '18px', lineHeight: '1.6', fontStyle: 'italic', color: '#fff', margin: 0 }}>
                May all your wishes come true, today and always.
              </p>
            </div>
            <GlowButton onClick={handleComplete} color="#FF9800">
              💎 Unlock October Portal
            </GlowButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
