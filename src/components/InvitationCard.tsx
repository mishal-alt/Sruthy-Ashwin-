import { forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { invite } from '../data/invite'
import { Divider, Reveal, ScrollHint } from './ui'

export const InvitationCard = forwardRef<HTMLElement, { glow: boolean }>(function InvitationCard({ glow }, ref) {
  return (
    <section ref={ref} id="invitation" className="py-24 px-4 relative overflow-hidden">
      <AnimatePresence>
        {glow && (
          <motion.div className="pointer-events-none absolute inset-0 z-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            {[0, 0.15, 0.3].map((d) => (
              <motion.div
                key={d}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#D4AF37]/60"
                initial={{ width: 0, height: 0, opacity: 0.9 }}
                animate={{ width: '140vw', height: '140vw', opacity: 0 }}
                transition={{ duration: 1.2, delay: d, ease: 'easeOut' }}
              />
            ))}
            <motion.div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.18) 0%, transparent 70%)' }} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1.2, opacity: 1 }} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #6B7D3A 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <Reveal className="max-w-3xl mx-auto relative z-10">
        <motion.h2 className="text-4xl md:text-5xl font-serif text-center text-[#4F5D2A] mb-2" animate={glow ? { scale: [1, 1.06, 1], color: ['#4F5D2A', '#b89a30', '#4F5D2A'] } : {}} transition={{ duration: 0.7 }}>
          Invitation
        </motion.h2>
        <Divider />
        <div className="mt-10 relative">
          <div className="absolute -top-6 -left-4 text-8xl text-[#D4AF37]/20 font-serif leading-none select-none">"</div>
          <motion.div
            className="bg-white/70 backdrop-blur-sm border border-[#D4AF37]/20 rounded-3xl p-10 md:p-16 text-center shadow-lg relative z-10"
            animate={glow ? { scale: [0.96, 1.03, 1], boxShadow: ['0 0 0px transparent', '0 0 60px rgba(212,175,55,0.5)', '0 20px 50px rgba(107,125,58,0.15)'] } : {}}
            whileHover={{ boxShadow: '0 30px 70px rgba(107,125,58,0.18)', borderColor: 'rgba(212,175,55,0.45)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <p className="text-lg md:text-xl text-[#4F5D2A] font-serif leading-relaxed mb-6 italic">{invite.invitationQuote}</p>
            <Divider />
            <p className="text-[#7A7266] text-sm tracking-widest uppercase mt-4">
              The families of {invite.coupleLabel} {invite.invitationLine}
            </p>
          </motion.div>
          <div className="absolute -bottom-6 -right-4 text-8xl text-[#D4AF37]/20 font-serif leading-none select-none rotate-180">"</div>
        </div>
      </Reveal>
      <ScrollHint nextId="couple" />
    </section>
  )
})
