import { invite } from '../data/invite'
import { Divider, Reveal, ScrollHint, SectionTitle } from './ui'

function Photo({ src, label, pos }: { src: string; label: string; pos: string }) {
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-2xl shadow-lg">
      <img src={src} alt={label} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ objectPosition: pos }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute bottom-3 left-0 right-0 text-center text-sm font-serif text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{label}</span>
    </div>
  )
}

export function Moments() {
  const areas: [string, string, string, string][] = [
    ['main', invite.images.galleryMain, 'Together Forever', 'center 60%'],
    ['groom', invite.groom.photo, invite.groom.name, 'center 20%'],
    ['bride', invite.bride.photo, invite.bride.name, 'center 5%'],
    ['ring', invite.images.ring, 'Ring Exchange', '32% center'],
    ['gb', invite.images.galleryCouple, invite.coupleLabel, 'center 50%'],
  ]
  return (
    <section id="photos" className="py-24 px-4 bg-gradient-to-b from-[#fdfbf7] to-[#f6f1e8]">
      <Reveal className="text-center">
        <SectionTitle>Our Moments</SectionTitle>
        <Divider />
        <p className="text-[#7A7266] text-sm">A glimpse of our beautiful journey together</p>
      </Reveal>
      <div
        className="max-w-5xl mx-auto mt-12 grid"
        style={{
          gap: 10,
          gridTemplateColumns: '2fr 1fr 1fr',
          gridTemplateRows: 'repeat(3, minmax(160px, 280px))',
          gridTemplateAreas: '"main groom groom" "main bride bride" "ring gb gb"',
        }}
      >
        {areas.map(([area, src, label, pos]) => (
          <div key={area} style={{ gridArea: area }} className="min-h-0">
            <Reveal className="h-full">
              <Photo src={src} label={label} pos={pos} />
            </Reveal>
          </div>
        ))}
      </div>
      <ScrollHint nextId="finalbanner" />
    </section>
  )
}
