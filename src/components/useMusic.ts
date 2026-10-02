import { useCallback, useRef, useState } from 'react'

// Music only starts from a user gesture (the "View Invitation" button), never on page load.
export function useMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [started, setStarted] = useState(false)
  const [muted, setMuted] = useState(false)

  const start = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = 0.35
    a.muted = false
    a.play().then(() => {
      setStarted(true)
      setMuted(false)
    }).catch(() => {})
  }, [])

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    if (!started) return start()
    const next = !muted
    a.muted = next
    if (!next && a.paused) a.play().catch(() => {})
    setMuted(next)
  }, [started, muted, start])

  return { audioRef, started, muted, start, toggle }
}
