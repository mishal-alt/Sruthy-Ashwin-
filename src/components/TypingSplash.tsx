import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { invite } from '../data/invite'
import { Heart, Petal } from './Falling'

const petals = Array.from({ length: 18 }, (_, i) => i)
const heartX = ['8%', '20%', '35%', '52%', '68%', '82%', '93%']

export function TypingSplash({ onDone }: { onDone: () => void }) {
  const [text, setText] = useState('')
  const [hold, setHold] = useState(false)

  useEffect(() => {
    const full = invite.typingText
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      if (i <= full.length) {
        setText(full.slice(0, i++))
        timer = setTimeout(tick, 75)
      } else {
        setHold(true)
        timer = setTimeout(onDone, 1400)
      }
    }
    timer = setTimeout(tick, 400)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#fffdf9 0%,#f7f1e8 50%,#ede8df 100%)' }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      {petals.map((i) => <Petal key={i} delay={i * 0.3} />)}
      {heartX.map((x, i) => <Heart key={x} x={x} delay={i * 0.8} />)}
      <div className="text-center px-6 relative z-10">
        <motion.div className="text-5xl mb-6" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120 }}>
          💍
        </motion.div>
        <h1 className="text-3xl md:text-5xl font-serif text-[#4F5D2A] min-h-[60px] leading-tight">
          {text}
          <motion.span className="inline-block w-0.5 h-8 md:h-10 bg-[#6B7D3A] ml-1 align-middle" animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
        </h1>
        <motion.p
          className="mt-4 text-sm tracking-[0.3em] uppercase text-[#7A7266]"
          animate={{ opacity: hold ? 1 : 0, y: hold ? 0 : 12 }}
          transition={{ duration: 0.6 }}
        >
          Wedding Invitation · {invite.coupleLabel}
        </motion.p>
      </div>
    </motion.div>
  )
}
