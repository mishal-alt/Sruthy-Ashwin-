import { AnimatePresence, motion } from 'framer-motion'

const glyphs = ['💍', '✿', '♥', '✨', '🌸', '⭐']

export function Burst({ data }: { data: { id: number; x: number; y: number } | null }) {
  return (
    <AnimatePresence>
      {data && (
        <div key={data.id} className="pointer-events-none fixed inset-0 z-[70]">
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = ((i / 20) * 360 * Math.PI) / 180
            const dist = 80 + ((i * 53) % 160)
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: data.x, top: data.y, fontSize: 14 + ((i * 7) % 14) }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
                animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.9 + (i % 4) * 0.1, ease: 'easeOut' }}
              >
                {glyphs[i % glyphs.length]}
              </motion.div>
            )
          })}
          {[0, 0.1, 0.22].map((d, i) => (
            <motion.div
              key={d}
              className="absolute rounded-full border-2 border-[#D4AF37]/60"
              style={{ left: data.x, top: data.y, translateX: '-50%', translateY: '-50%' }}
              initial={{ width: 10, height: 10, opacity: 0.9 }}
              animate={{ width: 300 + i * 80, height: 300 + i * 80, opacity: 0 }}
              transition={{ duration: 0.8, delay: d, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
