import { competitions } from '../data/mockData'
import { motion } from 'framer-motion'
import { Trophy, Medal } from 'lucide-react'

const positionColor = (pos) => {
  if (pos === 1) return 'var(--accent-gold)'
  if (pos === 2) return '#c0c0c0'
  if (pos === 3) return '#cd7f32'
  return 'var(--text-muted)'
}

const positionLabel = (pos) => {
  if (pos === 1) return '1ST'
  if (pos === 2) return '2ND'
  if (pos === 3) return '3RD'
  return `${pos}TH`
}

export default function Competitions() {
  const wins = competitions.filter(c => c.position === 1).length
  const podiums = competitions.filter(c => c.position <= 3).length
  const bestTotal = [...competitions].sort((a, b) => {
    const toSec = t => {
      const p = t.split(':')
      return p.length === 3 ? +p[0]*3600 + +p[1]*60 + +p[2] : +p[0]*60 + +p[1]
    }
    return toSec(a.total) - toSec(b.total)
  })[0]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Races', value: competitions.length, accent: 'var(--border)' },
          { label: 'Wins', value: wins, accent: 'var(--accent-gold)' },
          { label: 'Podiums', value: podiums, accent: 'var(--accent-run)' },
          { label: 'Win Rate', value: `${Math.round((wins / competitions.length) * 100)}%`, accent: 'var(--accent-bike)' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '18px 24px',
              borderTop: `3px solid ${s.accent}`,
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
            <div className="font-display" style={{ fontSize: 40, lineHeight: 1 }}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Race Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[...competitions].reverse().map((race, i) => (
          <motion.div
            key={race.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderLeft: `3px solid ${positionColor(race.position)}`,
              borderRadius: 12,
              padding: '20px 24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{race.name}</span>
                  <span style={{
                    fontSize: 10, padding: '2px 8px', borderRadius: 4,
                    background: 'var(--surface2)', color: 'var(--text-muted)',
                    letterSpacing: 1, textTransform: 'uppercase'
                  }}>{race.type}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{race.date}</div>
              </div>

              {/* Position Badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--surface2)', borderRadius: 10, padding: '8px 16px',
              }}>
                <span className="font-display" style={{ fontSize: 32, color: positionColor(race.position), lineHeight: 1 }}>
                  {positionLabel(race.position)}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>/{race.totalField}</span>
              </div>
            </div>

            {/* Split Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 16 }}>
              {[
                { label: 'Run 1', value: race.run1, color: 'var(--accent-run)' },
                { label: 'Bike', value: race.bike, color: 'var(--accent-bike)' },
                { label: 'Run 2', value: race.run2, color: 'var(--accent-run)' },
                { label: 'Total', value: race.total, color: 'var(--text)', bold: true },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--surface2)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ fontSize: 10, color: s.color, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                  <div className="font-mono" style={{ fontSize: 16, fontWeight: s.bold ? 600 : 400 }}>{s.value}</div>
                </div>
              ))}
            </div>

            {race.notes && (
              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', padding: '8px 12px', background: 'var(--surface2)', borderRadius: 6 }}>
                "{race.notes}"
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
