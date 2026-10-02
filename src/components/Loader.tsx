import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { invite } from '../data/invite'
import { Petal } from './Falling'

const CIRC = 2 * Math.PI * 36

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const done = useRef(false)
  const srcs = Object.values(invite.images)

  useEffect(() => {
    const finish = () => {
      if (done.current) return
      done.current = true
      onComplete()
    }
    const timeout = setTimeout(finish, 5000) // never block on slow images
    let loaded = 0
    srcs.forEach((s) => {
      const img = new Image()
      const bump = () => {
        loaded += 1
        setCount(loaded)
        if (loaded >= srcs.length) {
          clearTimeout(timeout)
          setTimeout(finish, 500)
        }
      }
      img.onload = bump
      img.onerror = bump
      img.src = s
    })
    return () => clearTimeout(timeout)
  }, [onComplete])

  const pct = Math.round((count / srcs.length) * 100)
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg,#fffdf9 0%,#f7f1e8 60%,#ede8df 100%)' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {Array.from({ length: 10 }, (_, i) => <Petal key={i} delay={i * 0.3} opacity={0.45} />)}
      <motion.div className="text-5xl mb-8" animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
        💍
      </motion.div>
      <div className="relative w-24 h-24 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="#f0e8d8" strokeWidth="5" />
          <motion.circle cx="40" cy="40" r="36" fill="none" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round" strokeDasharray={CIRC} animate={{ strokeDashoffset: CIRC - (pct / 100) * CIRC }} transition={{ duration: 0.3 }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-[#4F5D2A]">{pct}%</span>
        </div>
      </div>
      <p className="font-serif text-2xl text-[#4F5D2A] mb-2">{invite.coupleLabel}</p>
      <p className="text-xs tracking-[0.3em] uppercase text-[#b89a63]">Loading your invitation…</p>
      <div className="mt-6 w-48 h-1 rounded-full bg-[#e8ddc8] overflow-hidden">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#f5e6b0]" animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} />
      </div>
    </motion.div>
  )
}
