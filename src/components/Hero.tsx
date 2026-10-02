import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { invite } from '../data/invite'

export function Hero({ onOpen }: { onOpen: (x: number, y: number) => void }) {
  const ref = useRef<HTMLElement>(null)
  const btn = useRef<HTMLButtonElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const click = () => {
    const r = btn.current?.getBoundingClientRect()
    if (r) onOpen(r.left + r.width / 2, r.top + r.height / 2)
  }

  return (
    <section ref={ref} className="relative min-h-screen flex items-end justify-center overflow-hidden">
      <motion.div className="absolute inset-0 w-full h-[120%] -top-[10%]" style={{ y }}>
        <img src={invite.images.hero} alt={invite.coupleLabel} className="w-full h-full object-cover object-[center_30%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/70" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#fdfbf7]" />
      </motion.div>
      <motion.div className="relative z-10 text-center px-6 pt-32 pb-44" style={{ opacity }}>
        <motion.p className="text-sm tracking-[0.4em] uppercase text-white/80 mb-6 font-light" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>
          We are getting Married
        </motion.p>
        <motion.h1 className="text-5xl md:text-8xl font-serif leading-tight mb-6" initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <span className="text-white drop-shadow-2xl">{invite.bride.name}</span>
          <span className="text-[#D4AF37] mx-3 md:mx-5 drop-shadow-2xl">&</span>
          <span className="text-white drop-shadow-2xl">{invite.groom.name}</span>
        </motion.h1>
        <motion.p className="text-xl md:text-2xl text-white/90 font-light tracking-widest mb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
          {invite.dateLong}
        </motion.p>
        <motion.button
          ref={btn}
          onClick={click}
          className="relative inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#D4AF37] text-white font-medium text-sm tracking-[0.2em] uppercase shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(212,175,55,0.7), 0 20px 50px rgba(212,175,55,0.4)' }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent" initial={{ x: '-100%' }} animate={{ x: '200%' }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }} />
          {[0, 0.5, 1].map((d) => (
            <motion.span key={d} className="absolute inset-0 rounded-full border border-white/30" animate={{ scale: [1, 1.6], opacity: [0.6, 0] }} transition={{ duration: 2, delay: d, repeat: Infinity, ease: 'easeOut' }} />
          ))}
          <span className="relative z-10">View Invitation</span>
          <motion.span className="relative z-10 text-lg" animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            💍
          </motion.span>
        </motion.button>
      </motion.div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <motion.div className="w-px h-12 bg-white/50" animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
        <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
