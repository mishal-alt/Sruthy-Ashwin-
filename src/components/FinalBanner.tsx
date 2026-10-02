import { motion } from 'framer-motion'
import { invite } from '../data/invite'
import { Reveal } from './ui'

export function FinalBanner() {
  return (
    <section id="finalbanner" className="py-8 md:py-12 md:px-4">
      <div className="relative max-w-5xl mx-auto overflow-hidden rounded-none md:rounded-3xl shadow-2xl min-h-[420px] md:min-h-[520px] flex items-center justify-center">
        <motion.img src={invite.images.banner} alt={invite.coupleLabel} className="absolute inset-0 w-full h-full object-cover object-[center_55%]" whileHover={{ scale: 1.05 }} transition={{ duration: 6, ease: 'easeOut' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        <Reveal className="relative z-10 text-center px-6 text-white">
          <motion.p className="text-sm tracking-[0.4em] uppercase text-[#D4AF37] mb-4" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }}>
            Forever & Always
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-serif mb-3">{invite.coupleLabel}</h2>
          <p className="tracking-widest text-white/80">{invite.dateShort}</p>
        </Reveal>
      </div>
    </section>
  )
}
