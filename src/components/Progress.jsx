import { pbProgressionSeconds, pbProgression } from '../data/mockData'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'
import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp } from 'lucide-react'

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

const RunTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#16162a', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color: p.color, display: 'flex', justifyContent: 'space-between', gap: 16 }}>
          <span>{p.name}</span>
          <span className="font-mono">{formatTime(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

const PowerTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#16162a', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <span className="font-mono">{p.value}W</span>
        </div>
      ))}
    </div>
  )
}

export default function Progress() {
  const first5k = pbProgressionSeconds[0].run5k
  const last5k = pbProgressionSeconds[pbProgressionSeconds.length - 1].run5k
  const improve5k = first5k - last5k

  const first10k = pbProgressionSeconds[0].run10k
  const last10k = pbProgressionSeconds[pbProgressionSeconds.length - 1].run10k
  const improve10k = first10k - last10k

  const firstPower = pbProgressionSeconds[0].bikePower
  const lastPower = pbProgressionSeconds[pbProgressionSeconds.length - 1].bikePower
  const improvePower = lastPower - firstPower

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Improvement Banners */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          {
            label: '5K Run Improvement',
            value: `-${Math.floor(improve5k / 60)}:${(improve5k % 60).toString().padStart(2, '0')}`,
            from: pbProgression[0].run5k,
            to: pbProgression[pbProgression.length - 1].run5k,
            accent: 'var(--accent-run)',
            icon: <TrendingDown size={16} />,
            good: true,
          },
          {
            label: '10K Run Improvement',
            value: `-${Math.floor(improve10k / 60)}:${(improve10k % 60).toString().padStart(2, '0')}`,
            from: pbProgression[0].run10k,
            to: pbProgression[pbProgression.length - 1].run10k,
            accent: 'var(--accent-run)',
            icon: <TrendingDown size={16} />,
            good: true,
          },
          {
            label: 'Bike Power Gain',
            value: `+${improvePower}W`,
            from: `${firstPower}W`,
            to: `${lastPower}W`,
            accent: 'var(--accent-bike)',
            icon: <TrendingUp size={16} />,
            good: true,
          },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '20px 24px',
              borderTop: `3px solid ${s.accent}`,
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ color: s.accent }}>{s.icon}</span>
              <span className="font-display" style={{ fontSize: 36, color: s.accent }}>{s.value}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {s.from} → <span style={{ color: 'var(--text)' }}>{s.to}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Run PB Chart */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Run PB Progression</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Lower is better</div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={pbProgressionSeconds}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={false} tickLine={false}
              tickFormatter={formatTime}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<RunTooltip />} />
            <Line
              type="monotone" dataKey="run5k" name="5K PB"
              stroke="var(--accent-run)" strokeWidth={2.5}
              dot={{ fill: 'var(--accent-run)', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone" dataKey="run10k" name="10K PB"
              stroke="#ff8c6b" strokeWidth={2.5} strokeDasharray="6 3"
              dot={{ fill: '#ff8c6b', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bike Power Chart */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Bike Power Progression (FTP estimate)</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Higher is better</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={pbProgressionSeconds}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={false} tickLine={false}
              domain={[230, 290]}
            />
            <Tooltip content={<PowerTooltip />} />
            <ReferenceLine y={270} stroke="rgba(0,212,255,0.2)" strokeDasharray="4 4" label={{ value: 'Target 270W', fill: 'rgba(0,212,255,0.5)', fontSize: 10, position: 'insideTopLeft' }} />
            <Line
              type="monotone" dataKey="bikePower" name="FTP"
              stroke="var(--accent-bike)" strokeWidth={2.5}
              dot={{ fill: 'var(--accent-bike)', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* PB Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 600 }}>
          Monthly PB Record
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--surface2)' }}>
              {['Month', '5K PB', '10K PB', 'Bike FTP'].map(h => (
                <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...pbProgression].reverse().map((row, i) => (
              <tr key={i} style={{ borderTop: '1px solid var(--border)', background: i === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                <td style={{ padding: '12px 20px', fontWeight: 500 }}>{row.month}</td>
                <td style={{ padding: '12px 20px' }} className="font-mono">
                  <span style={{ color: 'var(--accent-run)' }}>{row.run5k}</span>
                </td>
                <td style={{ padding: '12px 20px' }} className="font-mono">
                  <span style={{ color: '#ff8c6b' }}>{row.run10k}</span>
                </td>
                <td style={{ padding: '12px 20px' }} className="font-mono">
                  <span style={{ color: 'var(--accent-bike)' }}>{row.bikePower}W</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
