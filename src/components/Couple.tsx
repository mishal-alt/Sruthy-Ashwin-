import { motion } from 'framer-motion'
import { invite } from '../data/invite'
import { Divider, Reveal, ScrollHint, SectionTitle } from './ui'

export function Couple() {
  const people = [
    { src: invite.groom.photo, role: 'Groom', name: invite.groom.name, parents: invite.groom.parents },
    { src: invite.bride.photo, role: 'Bride', name: invite.bride.name, parents: invite.bride.parents },
  ]
  return (
    <section id="couple" className="py-24 px-4 bg-gradient-to-b from-[#f6f1e8] to-[#fdfbf7]">
      <Reveal>
        <SectionTitle>The Couple</SectionTitle>
        <Divider />
      </Reveal>
      <div className="max-w-5xl mx-auto mt-14 grid md:grid-cols-2 gap-10">
        {people.map((p) => (
          <Reveal key={p.role}>
            <motion.div className="group relative overflow-hidden rounded-3xl shadow-2xl" whileHover={{ y: -10, boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 200 }}>
              <div className="aspect-[3/4] overflow-hidden">
                <motion.img src={p.src} alt={p.name} className="w-full h-full object-cover object-top" whileHover={{ scale: 1.07 }} transition={{ duration: 0.5 }} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white">
                <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-1">{p.role}</div>
                <h3 className="text-3xl font-serif">{p.name}</h3>
                <p className="text-sm text-white/80 mt-1">{p.parents}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
      <ScrollHint nextId="ringexchange" />
    </section>
  )
}
