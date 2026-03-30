'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Anchor, Heart, Image as ImageIcon, Mail, Waves } from 'lucide-react'
import { ZEFFY_DONATE_URL } from '@/lib/constants'

const sideLinks = [
  { label: 'Hero',     href: '#hero',     icon: Waves },
  { label: 'Programs', href: '#programs', icon: Anchor },
  { label: 'Gallery',  href: '#gallery',  icon: ImageIcon },
  { label: 'Contact',  href: '#contact',  icon: Mail },
]

export default function SideNav() {
  const [activeHash, setActiveHash] = useState('#hero')

  useEffect(() => {
    const sections = sideLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`)
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ─── Desktop: Fixed left pill sidebar ─── */}
      <aside
        className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 h-fit flex-col p-6 z-50"
        aria-label="Quick navigation"
      >
        <div className="bg-navy/80 backdrop-blur-xl rounded-[3rem] p-4 flex flex-col gap-4 shadow-[40px_0_60px_rgba(0,0,0,0.4)] border border-white/5">
          {/* Logo avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden mb-4 ring-2 ring-teal ring-offset-4 ring-offset-navy">
            <Image
              src="/images/logo.jpg"
              alt="Operation Healing Waters"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Nav links */}
          {sideLinks.map((link) => {
            const Icon = link.icon
            const isActive = activeHash === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                aria-label={link.label}
                className={`rounded-full w-12 h-12 flex items-center justify-center transition-all hover:scale-110 ${
                  isActive
                    ? 'bg-teal text-white'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                <Icon size={20} />
              </a>
            )
          })}

          {/* Divider */}
          <div className="h-px bg-white/10 w-8 mx-auto my-2" />

          {/* Donate shortcut */}
          <a
            href={ZEFFY_DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Donate"
            className="text-gold hover:text-yellow-400 w-12 h-12 flex items-center justify-center transition-all hover:scale-110"
          >
            <Heart size={20} />
          </a>
        </div>
      </aside>

      {/* ─── Mobile: Fixed bottom nav bar ─── */}
      <nav
        className="lg:hidden fixed bottom-6 left-6 right-6 bg-navy/90 backdrop-blur-xl rounded-full px-6 py-4 flex justify-between items-center z-[100] border border-white/5"
        aria-label="Quick navigation"
      >
        <a
          href="#hero"
          className={activeHash === '#hero' ? 'text-teal' : 'text-white/60'}
          aria-label="Hero"
        >
          <Waves size={22} />
        </a>
        <a
          href="#programs"
          className={activeHash === '#programs' ? 'text-teal' : 'text-white/60'}
          aria-label="Programs"
        >
          <Anchor size={22} />
        </a>

        {/* Raised center donate button — Stitch pattern */}
        <a
          href={ZEFFY_DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold w-12 h-12 rounded-full flex items-center justify-center -mt-10 border-4 border-navy shadow-xl"
          aria-label="Donate"
        >
          <Heart size={20} className="text-near-black" fill="currentColor" />
        </a>

        <a
          href="#gallery"
          className={activeHash === '#gallery' ? 'text-teal' : 'text-white/60'}
          aria-label="Gallery"
        >
          <ImageIcon size={22} />
        </a>
        <a
          href="#contact"
          className={activeHash === '#contact' ? 'text-teal' : 'text-white/60'}
          aria-label="Contact"
        >
          <Mail size={22} />
        </a>
      </nav>
    </>
  )
}
