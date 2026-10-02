import { motion } from 'framer-motion'

export function MusicButton({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[#D4AF37]/40 shadow-lg flex items-center justify-center text-[#4F5D2A]"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring' }}
      whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}
      whileTap={{ scale: 0.88 }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        {muted ? (
          <>
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        ) : (
          <>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </>
        )}
      </svg>
    </motion.button>
  )
}
