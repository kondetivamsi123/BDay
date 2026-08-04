import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Stars from '../../components/particles/Stars';
import GoldenDust from '../../components/particles/GoldenDust';
import Fireflies from '../../components/particles/Fireflies';
import FloatingHearts from '../../components/particles/FloatingHearts';
import GlowButton from '../../components/ui/GlowButton';
import useGameStore from '../../store/useGameStore';
import lav1Img from '../../assets/lav1.jpg';
import lav2Img from '../../assets/lav2.jpg';
import lav3Img from '../../assets/lav3.jpg';
import venkateswaraImg from '../../assets/venkateswara.jpg';

// Quote 1: Venkateswara Blessing Quote
const QUOTE_BLESSING = `రాధాకృష్ణుల పవిత్ర ప్రేమలా, సీతారాముల అచంచల నమ్మకంతో ఏ అడ్డంకినైనా దాటుకుంటూ చివరిదాకా నీడలా నీకు తోడుగా ఉంటాను... మన ఈ అపురూప బంధాన్ని ఏడుకొండల శ్రీ వెంకటేశ్వర స్వామి ఎల్లప్పుడూ చల్లగా దీవించాలి! 🙏✨`;

// Quote 2: Final Promise Quote
const QUOTE_PROMISE = `ప్రపంచం మొత్తం ఒక వైపు నిలిచినా, నువ్వు నా పక్కన లేని లోకాన్ని నేను ఊహించలేను. నన్ను నేను మరచిపోగలను కానీ, నిన్ను మాత్రం ఎప్పటికీ విడిచిపెట్టి వెళ్లను. ❤️`;

const LETTER = `Priyatamaina Lavanya,

Nee kosam ee 12 doors tiyyanu... oka special journey create chesanu because nuvvu special person. Nee navvu chusthe na manasu puvvulaa vipputundi. Nee existence alone makes my world brighter.

Ee roju nee puttinaroju, I want you to know that you are loved beyond words. Every single day, every moment — nenu ninu preminchanu, always.

— Vamsi Krishna 💛`;

// Love Rain Shower Effect (Hearts + Petals + Sparkles)
const LoveRain = () => (
  <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 3 }}>
    {Array.from({ length: 30 }, (_, i) => {
      const symbols = ['❤️', '💕', '💖', '💗', '🌸', '✨', '💛', '🌺'];
      const sym = symbols[i % symbols.length];
      return (
        <div key={i} style={{
          position: 'absolute',
          left: `${(i * 3.3) + 1}%`,
          top: '-40px',
          fontSize: `${Math.random() * 14 + 18}px`,
          animation: `petal-fall ${Math.random() * 2 + 1.5}s ${Math.random() * 3}s linear infinite`,
          filter: 'drop-shadow(0 0 8px rgba(255,107,157,0.7))'
        }}>
          {sym}
        </div>
      );
    })}
  </div>
);

// 3x3 Photo Jigsaw Puzzle Component for Photo 2 (lav2.jpg)
const PhotoJigsawPuzzle = ({ onSolved }) => {
  // 9 tiles representing 3x3 positions [0..8]
  const [tiles, setTiles] = useState([2, 0, 4, 1, 5, 3, 7, 8, 6]); // shuffled
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isSolved, setIsSolved] = useState(false);

  const checkSolved = (currentTiles) => {
    const solved = currentTiles.every((val, idx) => val === idx);
    if (solved) {
      setIsSolved(true);
      setTimeout(() => onSolved(), 1200);
    }
  };

  const handleTileClick = (index) => {
    if (isSolved) return;
    if (selectedIdx === null) {
      setSelectedIdx(index);
    } else {
      // Swap tiles at selectedIdx and index
      const newTiles = [...tiles];
      const temp = newTiles[selectedIdx];
      newTiles[selectedIdx] = newTiles[index];
      newTiles[index] = temp;
      setTiles(newTiles);
      setSelectedIdx(null);
      checkSolved(newTiles);
    }
  };

  const handleAutoSolve = () => {
    const solvedTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    setTiles(solvedTiles);
    setIsSolved(true);
    setTimeout(() => onSolved(), 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '320px' }}>
      <div style={{ fontSize: '13px', color: '#FFD700', letterSpacing: '0.08em', marginBottom: '12px', fontWeight: 'bold' }}>
        🧩 PUZZLE: TAP 2 TILES TO SWAP & COMPLETE PHOTO 2
      </div>

      {/* 3x3 Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px',
        width: '270px', height: '340px', padding: '6px',
        background: 'rgba(255,215,0,0.2)', border: '3px solid #FFD700',
        borderRadius: '16px', boxShadow: '0 0 30px rgba(255,215,0,0.4)',
        position: 'relative', overflow: 'hidden'
      }}>
        {tiles.map((tileVal, currentIdx) => {
          const row = Math.floor(tileVal / 3);
          const col = tileVal % 3;
          const bgPositionX = `${(col / 2) * 100}%`;
          const bgPositionY = `${(row / 2) * 100}%`;
          const isSelected = selectedIdx === currentIdx;

          return (
            <motion.div
              key={currentIdx}
              onClick={() => handleTileClick(currentIdx)}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundImage: `url(${lav2Img})`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${bgPositionX} ${bgPositionY}`,
                borderRadius: '8px',
                cursor: 'pointer',
                border: isSelected ? '3px solid #00E5FF' : '1px solid rgba(255,215,0,0.5)',
                boxShadow: isSelected ? '0 0 20px #00E5FF' : 'none',
                transition: 'border 0.2s, box-shadow 0.2s'
              }}
            />
          );
        })}
      </div>

      {isSolved ? (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginTop: '16px', color: '#4CAF50', fontWeight: 'bold', fontSize: '18px' }}>
          ✨ PUZZLE SOLVED! UNLOCKING PHOTO 3... 💕
        </motion.div>
      ) : (
        <button
          onClick={handleAutoSolve}
          style={{
            marginTop: '16px', background: 'rgba(255,215,0,0.15)',
            border: '1px solid rgba(255,215,0,0.5)', borderRadius: '50px',
            padding: '8px 20px', color: '#FFD700', fontSize: '13px',
            cursor: 'pointer', fontFamily: "'Inter', sans-serif"
          }}
        >
          ✨ Auto-Solve Puzzle
        </button>
      )}
    </div>
  );
};

export default function Month12_Library() {
  const navigate = useNavigate();
  const { completeMonth } = useGameStore();
  const [phase, setPhase] = useState('intro'); // intro -> play (sealing -> opening -> puzzleStep1 -> puzzleStep2 -> coupleUnlocked -> reading)
  const [playPhase, setPlayPhase] = useState('sealing');
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (phase === 'play' && playPhase === 'reading') {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(LETTER.substring(0, i + 1));
        i++;
        if (i >= LETTER.length) clearInterval(interval);
      }, 35);
      return () => clearInterval(interval);
    }
  }, [phase, playPhase]);

  const breakSeal = () => {
    setPlayPhase('opening');
    setTimeout(() => {
      setPlayPhase('puzzleStep1');
    }, 1200);
  };

  const handleComplete = () => {
    completeMonth(12);
    navigate('/finale');
  };

  return (
    <div className="sky-magic" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Stars count={70} />
      <GoldenDust count={40} />
      <Fireflies count={15} />
      <FloatingHearts count={20} />
      <LoveRain />

      {/* Rainbow Arc */}
      <div style={{
        position: 'fixed', top: '-130px', left: '-50%',
        width: '200%', height: '220px', borderRadius: '50%',
        background: 'linear-gradient(180deg, transparent 30%, rgba(255,0,100,0.35), rgba(255,165,0,0.35), rgba(255,255,0,0.35), rgba(0,255,150,0.35), rgba(0,225,255,0.35), rgba(148,0,211,0.35))',
        pointerEvents: 'none', zIndex: 2, filter: 'blur(3px)'
      }} />

      <motion.button 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.7 }} 
        onClick={() => navigate('/world')} 
        style={{ 
          position: 'fixed', top: '18px', left: '18px', zIndex: 30, 
          color: 'rgba(255,255,255,0.8)', fontSize: '13px', 
          background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,215,0,0.4)', 
          borderRadius: '50px', padding: '8px 18px', cursor: 'pointer', 
          backdropFilter: 'blur(10px)', fontFamily: "'Inter',sans-serif" 
        }}
      >
        ← World Map
      </motion.button>

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10, padding: '20px' }}
          >
            <motion.div animate={{ scale: [1, 1.05, 1], filter: ['drop-shadow(0 0 10px #B8860B)', 'drop-shadow(0 0 25px #FFD700)', 'drop-shadow(0 0 10px #B8860B)'] }} transition={{ repeat: Infinity, duration: 2 }}>
              <span style={{ fontSize: '64px' }}>📜</span>
            </motion.div>
            <h1 className="font-display text-gold" style={{ fontSize: '38px', marginTop: '16px', marginBottom: '8px', color: '#FFD700', textShadow: '0 0 15px rgba(255,215,0,0.5)' }}>The Ancient Library</h1>
            <p style={{ color: '#FFD700', fontSize: '16px', fontStyle: 'italic', marginBottom: '8px', opacity: 0.8 }}>The final chapter, Lavanya...</p>
            <p className="font-script" style={{ fontSize: '24px', color: '#EEE8AA', marginBottom: '28px' }}>"ఈ పుస్తకంలో నీకు రాసిన మాటలు ఉన్నాయి..."</p>
            
            <p style={{ fontStyle: 'italic', color: '#FFD700', marginBottom: '24px', fontSize: '18px', textShadow: '0 0 8px rgba(255,215,0,0.5)' }}>
              Solve Photo 2 Jigsaw Puzzle to unlock the Couple Photo...
            </p>

            <div style={{ background: 'rgba(0,0,0,0.6)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(184,134,11,0.5)', marginBottom: '28px', maxWidth: '340px', backdropFilter: 'blur(10px)', boxShadow: '0 0 20px rgba(184,134,11,0.2)' }}>
              <p style={{ color: '#fff', fontSize: '14px', marginBottom: '10px', textAlign: 'left' }}>1) 📜 Break the golden wax seal</p>
              <p style={{ color: '#fff', fontSize: '14px', marginBottom: '10px', textAlign: 'left' }}>2) 📷 View Photo 1 & solve Photo 2 Jigsaw Puzzle</p>
              <p style={{ color: '#fff', fontSize: '14px', marginBottom: '10px', textAlign: 'left' }}>3) ❤️ Unlock Couple Photo (Photo 3)</p>
              <p style={{ color: '#fff', fontSize: '14px', textAlign: 'left' }}>4) 🌟 Enter Grand Finale with Venkateswara Swamy!</p>
            </div>

            <GlowButton onClick={() => setPhase('play')} color="#B8860B">
              💛 Break the Seal
            </GlowButton>
          </motion.div>
        )}

        {phase === 'play' && (
          <motion.div
            key="play"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
          >
            {playPhase === 'sealing' && (
              <motion.div exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '230px', height: '170px', background: 'linear-gradient(135deg, #2d1600, #4a2800)', border: '3px solid #8B6914', borderRadius: '4px 8px 8px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '10px 10px 30px rgba(0,0,0,0.8)' }}>
                  <motion.div
                    onClick={breakSeal}
                    animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 15px rgba(139,0,0,0.6)', '0 0 30px rgba(255,215,0,0.9)', '0 0 15px rgba(139,0,0,0.6)'] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{ position: 'absolute', width: '64px', height: '64px', borderRadius: '50%', background: 'radial-gradient(circle, #8B0000, #5a0000)', border: '3px solid #FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 5 }}
                  >
                    <span style={{ color: '#FFD700', fontSize: '26px', fontWeight: 'bold' }}>V</span>
                  </motion.div>
                </div>
                <p style={{ marginTop: '24px', color: '#FFD700', fontSize: '18px', opacity: 0.9 }}>Tap the wax seal to open 💛</p>
              </motion.div>
            )}

            {playPhase === 'opening' && (
              <motion.div
                initial={{ scaleX: 0, opacity: 1 }}
                animate={{ scaleX: 1, opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ width: '230px', height: '170px', background: 'rgba(240,220,180,0.9)', border: '1px solid rgba(184,134,11,0.5)', borderRadius: '4px 8px 8px 4px', transformOrigin: 'left center' }}
              />
            )}

            {/* Step 1: Photo 1 */}
            {playPhase === 'puzzleStep1' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                <div style={{ fontSize: '13px', color: '#FFD700', letterSpacing: '0.1em', marginBottom: '12px', fontWeight: 'bold' }}>
                  📸 PHOTO 1: LAVANYA'S HEART POSE
                </div>
                <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: '3px solid #FFD700', boxShadow: '0 0 30px rgba(255,215,0,0.5)', marginBottom: '20px', width: '260px', height: '350px' }}>
                  <img src={lav1Img} alt="Lavanya Heart" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <GlowButton onClick={() => setPlayPhase('puzzleStep2')} color="#FFD700">
                  🧩 Solve Photo 2 Puzzle →
                </GlowButton>
              </motion.div>
            )}

            {/* Step 2: Photo 2 Jigsaw Puzzle */}
            {playPhase === 'puzzleStep2' && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                <PhotoJigsawPuzzle onSolved={() => setPlayPhase('coupleUnlocked')} />
              </motion.div>
            )}

            {/* Step 3: Couple Photo Unlocked (Photo 3) */}
            {playPhase === 'coupleUnlocked' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ width: '90%', maxWidth: '400px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', overflowY: 'auto', maxHeight: '85vh' }}
              >
                <div style={{ fontSize: '13px', color: '#FFD700', letterSpacing: '0.1em', marginBottom: '12px', fontWeight: 'bold' }}>
                  ❤️ PHOTO 3 UNLOCKED: FOREVER TOGETHER
                </div>

                {/* Couple Photo (lav3.jpg) */}
                <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: '4px solid #FFD700', boxShadow: '0 0 40px rgba(255,215,0,0.8)', marginBottom: '20px', width: '280px', height: '350px' }}>
                  <img src={lav3Img} alt="Vamsi Krishna and Lavanya" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Venkateswara Swamy Illuminated Photo */}
                <div style={{ position: 'relative', width: '280px', borderRadius: '16px', overflow: 'hidden', border: '3px solid #FFD700', boxShadow: '0 0 30px rgba(255,215,0,0.6)', marginBottom: '16px' }}>
                  <img src={venkateswaraImg} alt="Tirumala Seven Hills Venkateswara Swamy" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                </div>

                {/* Quote 1: Blessing Quote */}
                <div style={{ background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.4)', borderRadius: '16px', padding: '16px 20px', marginBottom: '16px', boxShadow: '0 0 20px rgba(255,215,0,0.2)' }}>
                  <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '18px', color: '#FFD700', lineHeight: '1.6', margin: 0 }}>
                    "{QUOTE_BLESSING}"
                  </p>
                </div>

                {/* Quote 2: Promise Quote */}
                <div style={{ background: 'rgba(255,107,157,0.12)', border: '1px solid rgba(255,107,157,0.4)', borderRadius: '16px', padding: '16px 20px', marginBottom: '24px', boxShadow: '0 0 20px rgba(255,107,157,0.2)' }}>
                  <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '18px', color: '#FFB3D1', lineHeight: '1.6', margin: 0 }}>
                    "{QUOTE_PROMISE}"
                  </p>
                </div>

                <GlowButton onClick={() => setPlayPhase('reading')} color="#FFD700">
                  📖 Open Final Diary & Letter →
                </GlowButton>
              </motion.div>
            )}

            {/* Reading Diary Phase */}
            {playPhase === 'reading' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{ width: '90%', maxWidth: '400px', height: '82vh', overflowY: 'auto', background: 'rgba(20, 0, 30, 0.75)', border: '1px solid rgba(184,134,11,0.5)', borderRadius: '16px', padding: '20px', backdropFilter: 'blur(12px)', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
              >
                {/* Couple Photo Header */}
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '3px solid rgba(255,215,0,0.6)', marginBottom: '20px', boxShadow: '0 0 20px rgba(255,215,0,0.4)' }}>
                  <img src={lav3Img} alt="Vamsi & Lavanya" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                </div>

                <div style={{ marginBottom: '24px', whiteSpace: 'pre-wrap', fontFamily: "'Dancing Script', cursive", color: '#FFD700', fontSize: '20px', lineHeight: '1.6' }}>
                  {displayedText}
                </div>

                {/* Quotes */}
                <div style={{ background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.4)', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
                  <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '18px', color: '#FFD700', lineHeight: '1.6', margin: 0 }}>
                    "{QUOTE_BLESSING}"
                  </p>
                </div>

                <div style={{ background: 'rgba(255,107,157,0.12)', border: '1px solid rgba(255,107,157,0.4)', borderRadius: '14px', padding: '16px', marginBottom: '24px' }}>
                  <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '18px', color: '#FFB3D1', lineHeight: '1.6', margin: 0 }}>
                    "{QUOTE_PROMISE}"
                  </p>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: displayedText.length === LETTER.length ? 1 : 0 }} transition={{ duration: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
                    <GlowButton onClick={handleComplete} color="#FFD700">
                      ✨ Enter Grand Finale
                    </GlowButton>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
