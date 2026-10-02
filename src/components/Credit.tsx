import { invite } from '../data/invite'

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
    </svg>
  )
}

const link = {
  href: invite.credit.url,
  target: '_blank',
  rel: 'noopener noreferrer',
  'aria-label': `Follow ${invite.credit.name} on Instagram`,
}

// Understated footer credit: small muted line with the Instagram mark.
export function Credit() {
  return (
    <div className="mt-16 flex justify-center">
      <a {...link} className="inline-flex items-center gap-1.5 text-[11px] tracking-wide text-[#7A7266]/70 transition-colors hover:text-[#4F5D2A]">
        <InstagramIcon size={12} />
        <span>Designed by {invite.credit.name}</span>
      </a>
    </div>
  )
}
