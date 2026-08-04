import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Stars from '../components/particles/Stars';
import GoldenDust from '../components/particles/GoldenDust';
import FloatingHearts from '../components/particles/FloatingHearts';
import Butterflies from '../components/particles/Butterflies';
import LotusPetals from '../components/particles/LotusPetals';
import Fireflies from '../components/particles/Fireflies';
import GlowButton from '../components/ui/GlowButton';
import useGameStore from '../store/useGameStore';
import { lav1Img, lav2Img, lav3Img, venkateswaraImg } from '../assets/images';

// Quote 1: Venkateswara Blessing Quote
const QUOTE_BLESSING = `రాధాకృష్ణుల పవిత్ర ప్రేమలా, సీతారాముల అచంచల నమ్మకంతో ఏ అడ్డంకినైనా దాటుకుంటూ చివరిదాకా నీడలా నీకు తోడుగా ఉంటాను... మన ఈ అపురూప బంధాన్ని ఏడుకొండల శ్రీ వెంకటేశ్వర స్వామి ఎల్లప్పుడూ చల్లగా దీవించాలి! 🙏✨`;

// Quote 2: Final Promise Quote at the very end
const QUOTE_PROMISE = `ప్రపంచం మొత్తం ఒక వైపు నిలిచినా, నువ్వు నా పక్కన లేని లోకాన్ని నేను ఊహించలేను. నన్ను నేను మరచిపోగలను కానీ, నిన్ను మాత్రం ఎప్పటికీ విడిచిపెట్టి వెళ్లను. ❤️`;

const FINAL_LETTER = `My dearest Lavanya,

You just completed 12 chapters of love I created just for you. Each door was a piece of my heart, each puzzle a memory, each moment a whisper of how deeply I feel for you.

నువ్వు నా జీవితంలో వచ్చావు, నా లోకం మారిపోయింది. నీతో ప్రతి రోజు ఒక కొత్త కలలా ఉంటుంది.

You are my favorite adventure, my greatest joy, and my most beautiful blessing.

Happy Birthday, Lavanya. Ee prapancham lo anni velugulu nee kosame!

Forever and always,
Vamsi Krishna 💛`;

// Love Symbols Rain Shower (❤️ 💕 💖 💗 🌸 ✨ 💛 🌺)
const LoveSymbolsRain = () => (
  <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 3 }}>
    {Array.from({ length: 35 }, (_, i) => {
      const symbols = ['❤️', '💕', '💖', '💗', '🌸', '✨', '💛', '🌺', '💕'];
      const sym = symbols[i % symbols.length];
      return (
        <div key={i} style={{
          position: 'absolute',
          left: `${(i * 2.8) + 1}%`,
          top: '-40px',
          fontSize: `${Math.random() * 14 + 18}px`,
          animation: `petal-fall ${Math.random() * 2.5 + 1.5}s ${Math.random() * 3}s linear infinite`,
          filter: 'drop-shadow(0 0 10px rgba(255,107,157,0.8))'
        }}>
          {sym}
        </div>
      );
    })}
  </div>
);

export default function GrandFinale() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('entry'); // entry -> transform -> letter -> surprise -> collage
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (phase === 'entry') {
      const timer = setTimeout(() => setPhase('transform'), 2500);
      return () => clearTimeout(timer);
    } else if (phase === 'transform') {
      const timer = setTimeout(() => setPhase('letter'), 3000);
      return () => clearTimeout(timer);
    } else if (phase === 'letter') {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(FINAL_LETTER.substring(0, i + 1));
        i++;
        if (i >= FINAL_LETTER.length) clearInterval(interval);
      }, 35);
      return () => clearInterval(interval);
    } else if (phase === 'surprise') {
      const timer = setTimeout(() => setPhase('collage'), 800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      <motion.div
        animate={{
          background: phase === 'entry' || phase === 'surprise' ? 'radial-gradient(circle, #050008, #050008)' 
                    : phase === 'transform' ? ['radial-gradient(circle, #050008, #050008)', 'radial-gradient(circle, #FFD700, #FF6B9D, #9B5DE5)']
                    : phase === 'letter' ? 'radial-gradient(circle, #2d004d, #4d3319)'
                    : 'radial-gradient(circle, #4d0026, #2b001a)'
        }}
        transition={{ duration: 2 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -2 }}
        className="sky-magic"
      />

      {/* Rainbow Arc */}
      <div style={{
        position: 'fixed', top: '-130px', left: '-50%',
        width: '200%', height: '220px', borderRadius: '50%',
        background: 'linear-gradient(180deg, transparent 30%, rgba(255,0,100,0.4), rgba(255,165,0,0.4), rgba(255,255,0,0.4), rgba(0,255,150,0.4), rgba(0,225,255,0.4), rgba(148,0,211,0.4))',
        pointerEvents: 'none', zIndex: 1, filter: 'blur(4px)'
      }} />

      {/* Love Symbols Rain */}
      <LoveSymbolsRain />

      {(phase === 'entry' || phase === 'transform' || phase === 'letter' || phase === 'collage') && (
        <>
          <Stars count={phase === 'transform' ? 200 : 100} />
          <GoldenDust count={phase === 'transform' ? 120 : 60} />
          <FloatingHearts count={phase === 'transform' || phase === 'collage' ? 50 : 25} />
          <Fireflies count={phase === 'transform' ? 40 : 20} />
          <LotusPetals count={phase === 'transform' ? 40 : 20} />
          <Butterflies count={phase === 'transform' || phase === 'collage' ? 20 : 10} />
        </>
      )}

      <AnimatePresence mode="wait">
        {phase === 'entry' && (
          <motion.div
            key="entry"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            style={{ textAlign: 'center', zIndex: 10 }}
          >
            <h1 className="font-display" style={{ fontSize: '48px', color: '#FFD700', textShadow: '0 0 25px rgba(255,215,0,0.9)', fontFamily: "'Cormorant Garamond', serif" }}>
              The Journey is Complete
            </h1>
            <p className="font-script" style={{ fontSize: '26px', color: '#fff', marginTop: '16px', opacity: 0.9 }}>
              All 12 Doors of Love... opened ❤️
            </p>
          </motion.div>
        )}

        {phase === 'transform' && (
          <motion.div key="transform" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 5 }}>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 1.5, delay: i * 0.3, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  width: '50px', height: '50px',
                  borderRadius: '50%',
                  border: '4px solid #FFD700',
                  boxShadow: '0 0 30px #FFD700, inset 0 0 30px #FFD700'
                }}
              />
            ))}
          </motion.div>
        )}

        {phase === 'letter' && (
          <motion.div
            key="letter"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 1.5, type: 'spring', bounce: 0.2 }}
            style={{ 
              width: '90%', maxWidth: '440px', background: 'rgba(20,0,30,0.75)', 
              border: '2px solid rgba(255,215,0,0.6)', borderRadius: '20px', padding: '28px', 
              backdropFilter: 'blur(15px)', zIndex: 10, boxShadow: '0 0 40px rgba(255,215,0,0.3)' 
            }}
          >
            <div style={{ whiteSpace: 'pre-wrap', fontFamily: "'Dancing Script', cursive", color: '#FFD700', fontSize: '21px', lineHeight: '1.6', textShadow: '0 0 8px rgba(255,215,0,0.4)' }}>
              {displayedText}
            </div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: displayedText.length === FINAL_LETTER.length ? 1 : 0 }} transition={{ duration: 1 }} style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
              <GlowButton onClick={() => setPhase('surprise')} color="#FF69B4">
                One Last Surprise ❤️
              </GlowButton>
            </motion.div>
          </motion.div>
        )}

        {phase === 'surprise' && (
          <motion.div
            key="surprise"
            initial={{ opacity: 0, backgroundColor: '#fff' }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, background: '#fff' }}
          />
        )}

        {phase === 'collage' && (
          <motion.div
            key="collage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', overflowY: 'auto', zIndex: 10, msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <h1 className="font-script" style={{ fontSize: '54px', color: '#FFD700', textShadow: '0 0 20px rgba(255,215,0,0.7)', marginBottom: '20px' }}>Our Story ❤️</h1>
            
            {/* Real Tirumala Venkateswara Swamy Illuminated Photo */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '340px', borderRadius: '20px', overflow: 'hidden', border: '3px solid #FFD700', boxShadow: '0 0 35px rgba(255,215,0,0.7)', marginBottom: '20px' }}>
              <img src={venkateswaraImg} alt="Tirumala Seven Hills Venkateswara Swamy" style={{ width: '100%', height: '210px', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.9))', padding: '12px', textAlign: 'center' }}>
                <span style={{ color: '#FFD700', fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.08em', fontFamily: "'Cormorant Garamond', serif" }}>
                  ✨ ఏడుకొండల శ్రీ వెంకటేశ్వర స్వామి దివ్య సమక్షంలో ✨
                </span>
              </div>
            </div>

            {/* Quote 1: Venkateswara Blessing Quote */}
            <div style={{ background: 'rgba(255,215,0,0.12)', border: '2px solid rgba(255,215,0,0.5)', borderRadius: '20px', padding: '20px 24px', marginBottom: '28px', maxWidth: '360px', boxShadow: '0 0 30px rgba(255,215,0,0.3)', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '20px', color: '#FFD700', lineHeight: '1.6', margin: 0, textShadow: '0 0 10px rgba(255,215,0,0.5)' }}>
                "{QUOTE_BLESSING}"
              </p>
            </div>

            {/* Photo Cards Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', marginBottom: '30px', width: '100%', maxWidth: '340px' }}>
              {/* Photo 1 */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '3px solid #FFD700', boxShadow: '0 0 25px rgba(255,215,0,0.5)', width: '280px', height: '360px' }}>
                <img src={lav1Img} alt="Lavanya Heart" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Photo 2 */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '3px solid #FFD700', boxShadow: '0 0 25px rgba(255,215,0,0.5)', width: '280px', height: '360px' }}>
                <img src={lav2Img} alt="Lavanya Pose" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Photo 3 - Couple Photo Highlight */}
              <div style={{ borderRadius: '20px', overflow: 'hidden', border: '4px solid #FFD700', boxShadow: '0 0 35px rgba(255,215,0,0.8)', width: '300px', height: '380px' }}>
                <img src={lav3Img} alt="Vamsi & Lavanya" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Quote 2: Final Promise Quote at the very end */}
            <div style={{ background: 'rgba(255,107,157,0.15)', border: '2px solid rgba(255,107,157,0.5)', borderRadius: '20px', padding: '22px 24px', marginBottom: '32px', maxWidth: '360px', boxShadow: '0 0 30px rgba(255,107,157,0.3)', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '21px', color: '#FFB3D1', lineHeight: '1.6', margin: 0, textShadow: '0 0 10px rgba(255,107,157,0.5)' }}>
                "{QUOTE_PROMISE}"
              </p>
            </div>

            <p className="font-script" style={{ fontSize: '28px', color: '#FFF', textAlign: 'center', marginBottom: '16px', textShadow: '0 0 15px rgba(255,105,180,0.6)' }}>
              "Happy Birthday Lavanya! 🌸"
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', color: '#FFD700', opacity: 0.95, marginBottom: '50px' }}>
              — With infinite love, Vamsi Krishna 💛
            </p>

            <motion.button 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.7 }} 
              onClick={() => navigate('/world')} 
              style={{ color: '#FFD700', fontSize: '15px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,215,0,0.4)', borderRadius: '50px', padding: '10px 24px', cursor: 'pointer', fontFamily: "'Inter',sans-serif", marginBottom: '40px' }}
            >
              ← Back to World Map
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
