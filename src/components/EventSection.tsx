import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Divider, Reveal, ScrollHint, SectionTitle } from './ui'

type Item = { icon: string; title: string; body: string }
type Theme = 'ceremony' | 'reception' | 'sangeet'

const themes = {
  ceremony: { glow: 'radial-gradient(circle, rgba(107,125,58,0.18) 0%, transparent 70%)', hover: '#6B7D3A' },
  sangeet: { glow: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(196,113,122,0.08) 45%, transparent 70%)', hover: '#D4AF37' },
  reception: { glow: 'radial-gradient(circle, rgba(196,113,122,0.16) 0%, rgba(212,175,55,0.1) 40%, transparent 70%)', hover: '#C4717A' },
}

function Card({ icon, title, body, theme, index }: Item & { theme: Theme; index: number }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const press = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const id = Date.now()
    setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }])
    setTimeout(() => setRipples((p) => p.filter((x) => x.id !== id)), 700)
  }
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-[#D4AF37]/20 p-8 text-center shadow-md cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(107,125,58,0.18)' }}
      onClick={press}
    >
      <motion.div className="relative z-10 text-4xl mb-3" whileHover={{ scale: 1.2, rotate: [-6, 6, 0] }} transition={{ duration: 0.4 }}>{icon}</motion.div>
      <h3 className="relative z-10 mb-2 font-serif text-2xl text-[#4F5D2A]">{title}</h3>
      <p className="relative z-10 text-sm leading-relaxed text-[#7A7266]">{body}</p>
      <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full opacity-0 transition-all duration-300 group-hover:w-[45%] group-hover:opacity-100" style={{ background: themes[theme].hover }} />
      {ripples.map((r) => (
        <motion.span key={r.id} className="pointer-events-none absolute rounded-full bg-white/40" style={{ left: r.x - 40, top: r.y - 40, width: 80, height: 80 }} initial={{ scale: 0, opacity: 0.7 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} />
      ))}
    </motion.div>
  )
}

export function EventSection({ id, title, items, theme, next, mapUrl, children }: { id: string; title: string; items: Item[]; theme: Theme; next: string; mapUrl?: string; children?: ReactNode }) {
  return (
    <section id={id} className="relative py-24 px-4 overflow-hidden">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: themes[theme].glow }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Reveal className="relative z-10">
        <SectionTitle>{title}</SectionTitle>
        <Divider />
      </Reveal>
      <div className="relative z-10 max-w-4xl mx-auto mt-12 grid sm:grid-cols-2 gap-6">
        {items.map((it, i) => (
          <div key={it.title} className={items.length % 2 === 1 && i === items.length - 1 ? 'sm:col-span-2 sm:mx-auto sm:w-1/2' : ''}>
            <Card {...it} theme={theme} index={i} />
          </div>
        ))}
      </div>
      {mapUrl && (
        <div className="relative z-10 mt-10 flex justify-center">
          <motion.a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white shadow-lg"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            View Location
          </motion.a>
        </div>
      )}
      {children}
      <ScrollHint nextId={next} />
    </section>
  )
}
