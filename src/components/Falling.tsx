import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Gold petal that drifts down (same effect as the original invitation).
export function Petal({ delay, opacity = 0.55 }: { delay: number; opacity?: number }) {
  const r = useMemo(() => ({ left: Math.random() * 100, size: 8 + Math.random() * 14, dur: 4 + Math.random() * 4, gap: Math.random() * 6 }), [])
  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{ left: `${r.left}%`, width: r.size, height: r.size }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{ y: '110vh', opacity: [1, 1, 0], rotate: 360 }}
      transition={{ duration: r.dur, delay, ease: 'linear', repeat: Infinity, repeatDelay: r.gap }}
    >
      <svg viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="6" ry="11" fill="#D4AF37" fillOpacity={opacity} transform="rotate(30 12 12)" />
      </svg>
    </motion.div>
  )
}

// Rose heart that floats up from the bottom.
export function Heart({ delay, x }: { delay: number; x: string }) {
  return (
    <motion.div
      className="absolute bottom-0 text-rose-400/40 text-2xl pointer-events-none select-none"
      style={{ left: x }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: -300, opacity: [0, 0.7, 0] }}
      transition={{ duration: 6, delay, ease: 'easeOut', repeat: Infinity, repeatDelay: 3 }}
    >
      ♥
    </motion.div>
  )
}
