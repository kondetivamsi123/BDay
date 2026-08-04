import React from 'react'
import { motion } from 'framer-motion'

const GlowButton = ({
  children,
  onClick,
  variant = 'gold',      // 'gold' | 'rose' | 'purple' | 'glass'
  size = 'md',           // 'sm' | 'md' | 'lg'
  disabled = false,
  fullWidth = false,
  style = {},
  id,
}) => {
  const variants = {
    gold: {
      bg: 'linear-gradient(135deg, rgba(255,215,0,0.18) 0%, rgba(184,134,11,0.25) 100%)',
      border: 'rgba(255, 215, 0, 0.5)',
      color: '#FFD700',
      shadow: '0 0 25px rgba(255,215,0,0.35), 0 0 50px rgba(255,215,0,0.15)',
      hoverShadow: '0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.25)',
    },
    rose: {
      bg: 'linear-gradient(135deg, rgba(255,107,157,0.18) 0%, rgba(194,24,91,0.25) 100%)',
      border: 'rgba(255, 107, 157, 0.5)',
      color: '#FFB3D1',
      shadow: '0 0 25px rgba(255,107,157,0.35), 0 0 50px rgba(255,107,157,0.15)',
      hoverShadow: '0 0 40px rgba(255,107,157,0.6), 0 0 80px rgba(255,107,157,0.25)',
    },
    purple: {
      bg: 'linear-gradient(135deg, rgba(155,93,229,0.18) 0%, rgba(106,13,173,0.25) 100%)',
      border: 'rgba(155, 93, 229, 0.5)',
      color: '#C3A0F0',
      shadow: '0 0 25px rgba(155,93,229,0.35), 0 0 50px rgba(155,93,229,0.15)',
      hoverShadow: '0 0 40px rgba(155,93,229,0.6), 0 0 80px rgba(155,93,229,0.25)',
    },
    glass: {
      bg: 'rgba(255, 255, 255, 0.07)',
      border: 'rgba(255, 255, 255, 0.2)',
      color: 'rgba(255,255,255,0.9)',
      shadow: '0 4px 20px rgba(0,0,0,0.3)',
      hoverShadow: '0 4px 30px rgba(255,255,255,0.15)',
    },
  }

  const sizes = {
    sm: { padding: '10px 22px', fontSize: '14px', borderRadius: '40px' },
    md: { padding: '14px 36px', fontSize: '16px', borderRadius: '50px' },
    lg: { padding: '18px 48px', fontSize: '20px', borderRadius: '50px' },
  }

  const v = variants[variant]
  const s = sizes[size]

  return (
    <motion.button
      id={id}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.04, boxShadow: v.hoverShadow } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        background: v.bg,
        border: `1px solid ${v.border}`,
        color: v.color,
        padding: s.padding,
        fontSize: s.fontSize,
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 500,
        letterSpacing: '0.03em',
        borderRadius: s.borderRadius,
        cursor: disabled ? 'not-allowed' : 'pointer',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: v.shadow,
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : 'auto',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease',
        ...style,
      }}
    >
      {/* Shimmer overlay */}
      {!disabled && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2.5s linear infinite',
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </motion.button>
  )
}

export default GlowButton
