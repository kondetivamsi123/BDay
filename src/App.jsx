import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TouchHearts from './components/ui/TouchHearts'
import useGameStore from './store/useGameStore'

// ── Screens (eager-loaded for Phase 1 core) ────────────────
import SplashScreen from './screens/SplashScreen'
import LockScreen from './screens/LockScreen'
import DoorAnimation from './screens/DoorAnimation'
import WorldMap from './screens/WorldMap'

// ── Month Screens (lazy-loaded) ────────────────────────────
const Month01 = lazy(() => import('./screens/months/Month01_HiddenKey'))
const Month02 = lazy(() => import('./screens/months/Month02_Diyas'))
const Month03 = lazy(() => import('./screens/months/Month03_WishTree'))
const Month04 = lazy(() => import('./screens/months/Month04_Railway'))
const Month05 = lazy(() => import('./screens/months/Month05_RainWorld'))
const Month06 = lazy(() => import('./screens/months/Month06_Collection'))
const Month07 = lazy(() => import('./screens/months/Month07_Radio'))
const Month08 = lazy(() => import('./screens/months/Month08_Palace'))
const Month09 = lazy(() => import('./screens/months/Month09_Lanterns'))
const Month10 = lazy(() => import('./screens/months/Month10_Treasure'))
const Month11 = lazy(() => import('./screens/months/Month11_Vrindavan'))
const Month12 = lazy(() => import('./screens/months/Month12_Library'))
const GrandFinale = lazy(() => import('./screens/GrandFinale'))

// ── Loading fallback ───────────────────────────────────────
const LoadingFallback = () => (
  <div
    className="screen sky-night center"
    style={{ flexDirection: 'column', gap: '16px' }}
  >
    <div
      style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: '2px solid rgba(255,215,0,0.3)',
        borderTop: '2px solid #FFD700',
        animation: 'spin-slow 1s linear infinite',
      }}
    />
    <p style={{ color: 'rgba(255,215,0,0.6)', fontFamily: "'Cormorant Garamond', serif", fontSize: '18px' }}>
      Opening the door...
    </p>
  </div>
)

// ── Protected route for post-unlock screens ───────────────
const ProtectedRoute = ({ children }) => {
  const isDateValidated = useGameStore((s) => s.isDateValidated)
  if (!isDateValidated) return <Navigate to="/lock" replace />
  return children
}

// ── Toast notification ─────────────────────────────────────
const Toast = () => {
  const msg = useGameStore((s) => s.toastMessage)
  return msg ? (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(10, 0, 21, 0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 107, 157, 0.3)',
        borderRadius: '50px',
        padding: '12px 28px',
        color: '#FFB3D1',
        fontSize: '14px',
        fontFamily: "'Inter', sans-serif",
        zIndex: 10000,
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 30px rgba(255, 107, 157, 0.2)',
        animation: 'fade-up 0.3s ease',
      }}
    >
      {msg}
    </div>
  ) : null
}

function App() {
  return (
    <BrowserRouter>
      {/* Global touch hearts on every screen */}
      <TouchHearts />

      {/* Toast notifications */}
      <Toast />

      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* ── Core Screens ─────────────────────── */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/lock" element={<LockScreen />} />
          <Route path="/door" element={<DoorAnimation />} />
          <Route
            path="/world"
            element={
              <ProtectedRoute>
                <WorldMap />
              </ProtectedRoute>
            }
          />

          {/* ── 12 Month Screens ─────────────────── */}
          <Route path="/month/1" element={<ProtectedRoute><Month01 /></ProtectedRoute>} />
          <Route path="/month/2" element={<ProtectedRoute><Month02 /></ProtectedRoute>} />
          <Route path="/month/3" element={<ProtectedRoute><Month03 /></ProtectedRoute>} />
          <Route path="/month/4" element={<ProtectedRoute><Month04 /></ProtectedRoute>} />
          <Route path="/month/5" element={<ProtectedRoute><Month05 /></ProtectedRoute>} />
          <Route path="/month/6" element={<ProtectedRoute><Month06 /></ProtectedRoute>} />
          <Route path="/month/7" element={<ProtectedRoute><Month07 /></ProtectedRoute>} />
          <Route path="/month/8" element={<ProtectedRoute><Month08 /></ProtectedRoute>} />
          <Route path="/month/9" element={<ProtectedRoute><Month09 /></ProtectedRoute>} />
          <Route path="/month/10" element={<ProtectedRoute><Month10 /></ProtectedRoute>} />
          <Route path="/month/11" element={<ProtectedRoute><Month11 /></ProtectedRoute>} />
          <Route path="/month/12" element={<ProtectedRoute><Month12 /></ProtectedRoute>} />

          {/* ── Grand Finale ─────────────────────── */}
          <Route
            path="/finale"
            element={
              <ProtectedRoute>
                <GrandFinale />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
