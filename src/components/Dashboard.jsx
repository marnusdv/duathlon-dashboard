import { useState } from 'react'
import { motion } from 'framer-motion'
import Overview from './Overview'
import Training from './Training'
import Competitions from './Competitions'
import Progress from './Progress'

const tabs = ['Overview', 'Training', 'Competitions', 'Progress']

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* SA Flag stripe */}
      <div style={{
        height: 4,
        background: 'linear-gradient(90deg, #002395 0%, #002395 20%, #FFB612 20%, #FFB612 22%, #000 22%, #000 38%, #FFB612 38%, #FFB612 40%, #DE3831 40%, #DE3831 60%, #FFB612 60%, #FFB612 62%, #007A4D 62%, #007A4D 100%)',
        position: 'sticky', top: 0, zIndex: 51,
      }} />
      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        position: 'sticky',
        top: 4,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span className="font-display" style={{ fontSize: 28, letterSpacing: 2, color: 'var(--accent-run)' }}>
            APEX
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: 3, textTransform: 'uppercase' }}>
            Duathlon Analytics
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-run), var(--accent-gold), var(--accent-bike))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff'
          }}>D</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.2 }}>Divan de Vries</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Junior · Cape Town Tri Club</div>
          </div>
        </div>
      </header>

      {/* Tab Nav */}
      <nav style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: '0 32px',
        display: 'flex',
        gap: 0,
      }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '14px 20px',
              fontSize: 13,
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? 'var(--text)' : 'var(--text-muted)',
              borderBottom: activeTab === tab ? '2px solid var(--accent-gold)' : '2px solid transparent',
              transition: 'all 0.15s',
              fontFamily: 'inherit',
              letterSpacing: 0.3,
            }}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'Overview' && <Overview />}
          {activeTab === 'Training' && <Training />}
          {activeTab === 'Competitions' && <Competitions />}
          {activeTab === 'Progress' && <Progress />}
        </motion.div>
      </main>
    </div>
  )
}
