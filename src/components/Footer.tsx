import { motion } from 'framer-motion'
import { invite } from '../data/invite'
import { Divider } from './ui'
import { Credit } from './Credit'

export function Footer() {
  return (
    <footer className="pt-16 pb-6 px-4 text-center bg-gradient-to-b from-[#f6f1e8] to-[#efe8da]">
      <motion.div className="text-4xl mb-4" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>💍</motion.div>
      <p className="font-serif text-xl text-[#4F5D2A]">{invite.footerLine}</p>
      <Divider />
      <p className="text-xs tracking-widest uppercase text-[#7A7266]">{invite.coupleLabel} · {invite.dateShort}</p>
      <Credit />
    </footer>
  )
}
