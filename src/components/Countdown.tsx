import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { invite } from '../data/invite'
import { Reveal, ScrollHint } from './ui'

function calc(target: string) {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, arrived: true }
  return {
    days: Math.floor(diff / 864e5),
    hours: Math.floor((diff % 864e5) / 36e5),
    minutes: Math.floor((diff % 36e5) / 6e4),
    seconds: Math.floor((diff % 6e4) / 1e3),
    arrived: false,
  }
}

function Tile({ value, label }: { value: number; label: string }) {
  return (
    <motion.div className="group flex flex-col items-center" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300 }}>
      <div className="w-[16vw] h-[16vw] max-w-20 max-h-20 md:max-w-24 md:max-h-24 md:w-24 md:h-24 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#D4AF37]/30 shadow-md flex items-center justify-center transition-all duration-300 group-hover:border-[#D4AF37]/60 group-hover:shadow-[0_0_24px_rgba(212,175,55,0.35)]">
        <span className="text-2xl md:text-4xl font-serif text-[#4F5D2A] tabular-nums">{String(value).padStart(2, '0')}</span>
      </div>
      <span className="mt-2 text-xs tracking-widest uppercase text-[#7A7266]">{label}</span>
    </motion.div>
  )
}

type CountdownProps = {
  id?: string
  target?: string
  label?: string
  arrivedLabel?: string
  next?: string
  bare?: boolean // render without the section wrapper (for embedding)
}

export function Countdown({
  id = 'countdown',
  target = invite.dateISO,
  label = 'Counting down to forever',
  arrivedLabel = 'The wedding day has arrived 💍',
  next = 'invitation',
  bare = false,
}: CountdownProps) {
  const [t, setT] = useState(() => calc(target))
  useEffect(() => {
    const tick = setInterval(() => setT(calc(target)), 1000)
    return () => clearInterval(tick)
  }, [target])

  const colon = <span className="text-2xl md:text-3xl text-[#D4AF37] mt-3 md:mt-4">:</span>
  const body = (
    <Reveal className="max-w-3xl mx-auto text-center">
      <p className="text-sm tracking-[0.3em] uppercase text-[#7A7266] mb-8">{t.arrived ? arrivedLabel : label}</p>
      {!t.arrived && (
        <div className="flex items-start justify-center gap-1.5 sm:gap-4 md:gap-8">
          <Tile value={t.days} label="Days" />{colon}
          <Tile value={t.hours} label="Hours" />{colon}
          <Tile value={t.minutes} label="Mins" />{colon}
          <Tile value={t.seconds} label="Secs" />
        </div>
      )}
    </Reveal>
  )
  if (bare) return <div id={id} className="relative z-10 mt-16">{body}</div>
  return (
    <section id={id} className="py-20 px-4 bg-gradient-to-b from-[#fdfbf7] to-[#f6f1e8]">
      {body}
      <ScrollHint nextId={next} />
    </section>
  )
}
