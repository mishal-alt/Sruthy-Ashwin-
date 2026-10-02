import { motion } from 'framer-motion'
import { invite } from '../data/invite'
import { Divider, Reveal, ScrollHint } from './ui'

export function RingExchange() {
  return (
    <section id="ringexchange" className="py-8 md:py-12 md:px-4">
      <div className="relative max-w-5xl mx-auto overflow-hidden rounded-none md:rounded-3xl shadow-2xl min-h-[420px] md:min-h-[520px] flex items-center justify-center">
        <motion.img src={invite.images.ring} alt="Ring Exchange" className="absolute inset-0 w-full h-full object-cover object-[34%_center]" whileHover={{ scale: 1.04 }} transition={{ duration: 5, ease: 'easeOut' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
        <Reveal className="relative z-10 text-center px-6 py-16 text-white">
          <motion.div className="text-4xl mb-4" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>💍</motion.div>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">The Ring Exchange</h2>
          <p className="max-w-md mx-auto text-white/85 leading-relaxed">{invite.ringText}</p>
          <Divider />
          <p className="tracking-widest text-sm text-[#D4AF37]">{invite.dateShort} · {invite.ringPlace}</p>
        </Reveal>
      </div>
      <ScrollHint nextId="sangeet" />
    </section>
  )
}
