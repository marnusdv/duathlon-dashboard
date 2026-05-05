import { weeklyTraining } from '../data/mockData'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { motion } from 'framer-motion'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#16162a', border: '1px solid var(--border)',
      borderRadius: 8, padding: '10px 14px', fontSize: 12,
    }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color: p.color, display: 'flex', justifyContent: 'space-between', gap: 16 }}>
          <span>{p.name}</span>
          <span className="font-mono">{p.value}{p.dataKey.includes('Km') ? ' km' : p.dataKey === 'load' ? '' : ' min'}</span>
        </div>
      ))}
    </div>
  )
}

export default function Training() {
  const totalRunWeek = weeklyTraining.slice(-4).reduce((a, b) => a + b.runKm, 0)
  const totalBikeWeek = weeklyTraining.slice(-4).reduce((a, b) => a + b.bikeKm, 0)
  const avgLoad = Math.round(weeklyTraining.slice(-4).reduce((a, b) => a + b.load, 0) / 4)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Run (last 4 wks)', value: `${totalRunWeek} km`, accent: 'var(--accent-run)' },
          { label: 'Bike (last 4 wks)', value: `${totalBikeWeek} km`, accent: 'var(--accent-bike)' },
          { label: 'Avg Weekly Load', value: avgLoad, accent: 'var(--accent-gold)' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '18px 24px',
              borderTop: `3px solid ${s.accent}`,
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
              {s.label}
            </div>
            <div className="font-display" style={{ fontSize: 36, color: 'var(--text)' }}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Volume Chart */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 20 }}>Weekly Volume — Run & Bike (km)</div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={weeklyTraining} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-muted)' }} />
            <Bar dataKey="runKm" name="Run km" fill="var(--accent-run)" radius={[4, 4, 0, 0]} opacity={0.9} />
            <Bar dataKey="bikeKm" name="Bike km" fill="var(--accent-bike)" radius={[4, 4, 0, 0]} opacity={0.75} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Training Load + Time */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 20 }}>Training Load (ATL)</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyTraining}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone" dataKey="load" name="Load"
                stroke="var(--accent-gold)" strokeWidth={2.5}
                dot={{ fill: 'var(--accent-gold)', r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 20 }}>Time on Feet & Saddle (min)</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyTraining}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
              <Line type="monotone" dataKey="runTime" name="Run min" stroke="var(--accent-run)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="bikeTime" name="Bike min" stroke="var(--accent-bike)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Weekly Breakdown Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 600 }}>
          Weekly Breakdown
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--surface2)' }}>
                {['Week', 'Run km', 'Bike km', 'Run min', 'Bike min', 'Load'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...weeklyTraining].reverse().map((row, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--border)', background: i === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={{ padding: '11px 16px', fontWeight: 500 }}>{row.week}</td>
                  <td style={{ padding: '11px 16px', color: 'var(--accent-run)' }} className="font-mono">{row.runKm}</td>
                  <td style={{ padding: '11px 16px', color: 'var(--accent-bike)' }} className="font-mono">{row.bikeKm}</td>
                  <td style={{ padding: '11px 16px', color: 'var(--text-muted)' }} className="font-mono">{row.runTime}</td>
                  <td style={{ padding: '11px 16px', color: 'var(--text-muted)' }} className="font-mono">{row.bikeTime}</td>
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 60, height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${(row.load / 115) * 100}%`, height: '100%', background: row.load > 90 ? 'var(--accent-run)' : 'var(--accent-gold)', borderRadius: 3 }} />
                      </div>
                      <span className="font-mono" style={{ fontSize: 12 }}>{row.load}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
