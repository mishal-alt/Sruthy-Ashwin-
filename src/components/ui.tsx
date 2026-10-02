import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 my-5" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
      <span className="text-[#D4AF37] text-sm">✦</span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
    </div>
  )
}

export function ScrollHint({ nextId }: { nextId: string }) {
  const go = () => document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return (
    <div className="flex justify-center pt-8 pb-2 md:hidden">
      <motion.button
        onClick={go}
        aria-label="Scroll to next section"
        className="text-[#b89a63] active:scale-90"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.button>
    </div>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-4xl md:text-5xl font-serif text-center text-[#4F5D2A] mb-2">{children}</h2>
}
