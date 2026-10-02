import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { invite } from './data/invite'
import { Loader } from './components/Loader'
import { TypingSplash } from './components/TypingSplash'
import { Hero } from './components/Hero'
import { Countdown } from './components/Countdown'
import { InvitationCard } from './components/InvitationCard'
import { Couple } from './components/Couple'
import { RingExchange } from './components/RingExchange'
import { EventSection } from './components/EventSection'
import { Moments } from './components/Moments'
import { FinalBanner } from './components/FinalBanner'
import { Footer } from './components/Footer'
import { MusicButton } from './components/MusicButton'
import { Burst } from './components/Burst'
import { useMusic } from './components/useMusic'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [splashDone, setSplashDone] = useState(false)
  const [burst, setBurst] = useState<{ id: number; x: number; y: number } | null>(null)
  const [glow, setGlow] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const music = useMusic()

  const onLoaded = useCallback(() => setLoaded(true), [])
  const onSplashDone = useCallback(() => setSplashDone(true), [])

  const openInvitation = useCallback((x: number, y: number) => {
    music.start()
    setBurst({ id: Date.now(), x, y })
    setTimeout(() => setBurst(null), 1200)
    setTimeout(() => cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200)
    setTimeout(() => {
      setGlow(true)
      setTimeout(() => setGlow(false), 2500)
    }, 700)
  }, [music.start])

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: 'linear-gradient(180deg,#fdfbf7 0%,#f8f3eb 100%)' }}
    >
      <audio ref={music.audioRef} src={invite.music} loop preload="auto" playsInline />
      <AnimatePresence mode="wait">{!loaded && <Loader key="loader" onComplete={onLoaded} />}</AnimatePresence>
      <AnimatePresence>
        {loaded && !splashDone && (
          <TypingSplash key="splash" onDone={onSplashDone} />
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: loaded && splashDone ? 1 : 0 }} transition={{ duration: 1 }}>
        <Hero onOpen={openInvitation} />
        <Countdown />
        <InvitationCard ref={cardRef} glow={glow} />
        <Couple />
        <RingExchange />
        <EventSection
          id="sangeet"
          title="Sangeet Night"
          items={invite.sangeet.items}
          mapUrl={invite.sangeet.mapUrl}
          theme="sangeet"
          next="events"
        >
          <Countdown
            bare
            id="sangeet-countdown"
            target={invite.sangeetISO}
            label="Counting down to the sangeet"
            arrivedLabel="The sangeet night is here 🎶"
          />
        </EventSection>
        <EventSection
          id="events"
          title="Wedding Ceremony"
          items={invite.ceremony.items}
          mapUrl={invite.ceremony.mapUrl}
          theme="ceremony"
          next="reception"
        />
        <EventSection
          id="reception"
          title="Reception"
          items={invite.reception.items}
          mapUrl={invite.reception.mapUrl}
          theme="reception"
          next="photos"
        >
          <Countdown
            bare
            id="reception-countdown"
            target={invite.receptionISO}
            label="Counting down to the reception"
            arrivedLabel="The reception is tonight ✨"
          />
        </EventSection>
        <Moments />
        <FinalBanner />
        <Footer />
      </motion.div>

      {music.started && <MusicButton muted={music.muted} onToggle={music.toggle} />}
      <Burst data={burst} />
    </div>
  )
}
