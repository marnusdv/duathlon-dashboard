import { currentStats, upcomingRaces, competitions, athlete } from '../data/mockData'
import { Trophy, Zap, TrendingUp, Calendar, MapPin, Target } from 'lucide-react'
import { motion } from 'framer-motion'

const StatCard = ({ label, value, sub, accent, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '20px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 3,
      background: accent || 'var(--accent-run)',
      borderRadius: '12px 12px 0 0',
    }} />
    <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
      {label}
    </div>
    <div className="font-display" style={{ fontSize: 40, lineHeight: 1, color: 'var(--text)', letterSpacing: 1 }}>
      {value}
    </div>
    {sub && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>{sub}</div>}
  </motion.div>
)

export default function Overview() {
  const lastRace = competitions[competitions.length - 1]
  const daysToWorlds = Math.ceil((new Date('2026-10-10') - new Date()) / (1000 * 60 * 60 * 24))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* World Champs Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          background: 'linear-gradient(120deg, #000d1a 0%, #001a0d 50%, #1a0000 100%)',
          border: '1px solid #1a3d28',
          borderRadius: 16,
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Target size={18} color="var(--accent-gold)" />
            <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
              Primary Target
            </span>
          </div>
          <div className="font-display" style={{ fontSize: 32, letterSpacing: 2, color: '#fff' }}>
            DUATHLON WORLD CHAMPS 2026
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
            October 10, 2026 · Junior Standard Distance
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="font-display" style={{ fontSize: 64, lineHeight: 1, color: 'var(--accent-gold)' }}>
            {daysToWorlds}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 2, textTransform: 'uppercase' }}>
            Days Out
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
        <StatCard label="Total Run KM" value={`${currentStats.totalRunKm}`} sub="Since Jan 2026" accent="var(--accent-run)" index={0} />
        <StatCard label="Total Bike KM" value={`${currentStats.totalBikeKm}`} sub="Since Jan 2026" accent="var(--accent-bike)" index={1} />
        <StatCard label="Best 5K" value={currentStats.bestRun5k} sub="Run pace" accent="var(--accent-run)" index={2} />
        <StatCard label="Best 10K" value={currentStats.bestRun10k} sub="Run pace" accent="var(--accent-run)" index={3} />
        <StatCard label="Peak Power" value={`${currentStats.bestBikePower}W`} sub="FTP estimate" accent="var(--accent-bike)" index={4} />
        <StatCard label="Podiums" value={`${currentStats.podiums}/${competitions.length}`} sub="This season" accent="var(--accent-gold)" index={5} />
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Last Result */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>
            Last Result
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{lastRace.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{lastRace.date} · {lastRace.type}</div>
            </div>
            <div style={{
              background: lastRace.position === 1 ? 'rgba(240,180,41,0.15)' : 'var(--surface2)',
              border: `1px solid ${lastRace.position === 1 ? 'var(--accent-gold)' : 'var(--border)'}`,
              borderRadius: 8, padding: '6px 14px', textAlign: 'center',
            }}>
              <div className="font-display" style={{ fontSize: 28, color: lastRace.position === 1 ? 'var(--accent-gold)' : 'var(--text)', lineHeight: 1 }}>
                {lastRace.position}{lastRace.position === 1 ? 'ST' : lastRace.position === 2 ? 'ND' : 'RD'}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>/{lastRace.totalField}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 20 }}>
            {[
              { label: 'Run 1', value: lastRace.run1, color: 'var(--accent-run)' },
              { label: 'Bike', value: lastRace.bike, color: 'var(--accent-bike)' },
              { label: 'Run 2', value: lastRace.run2, color: 'var(--accent-run)' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface2)', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontSize: 10, color: s.color, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                <div className="font-mono" style={{ fontSize: 16, fontWeight: 500 }}>{s.value}</div>
              </div>
            ))}
          </div>

          {lastRace.notes && (
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--surface2)', borderRadius: 8, fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>
              "{lastRace.notes}"
            </div>
          )}
        </div>

        {/* Upcoming Races */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>
            Upcoming Races
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {upcomingRaces.map((race, i) => {
              const daysTo = Math.ceil((new Date(race.date) - new Date()) / (1000 * 60 * 60 * 24))
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', background: 'var(--surface2)', borderRadius: 10,
                  border: race.priority === 'A+' ? '1px solid rgba(240,180,41,0.3)' : '1px solid transparent',
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{race.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                      {race.date} · {race.type}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <span style={{
                      fontSize: 10, letterSpacing: 1, padding: '2px 8px', borderRadius: 4,
                      background: race.priority === 'A+' ? 'rgba(240,180,41,0.2)' : 'rgba(255,77,46,0.15)',
                      color: race.priority === 'A+' ? 'var(--accent-gold)' : 'var(--accent-run)',
                      fontWeight: 600,
                    }}>
                      {race.priority}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{daysTo}d</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
