import { Anchor } from 'lucide-react'
import Image from 'next/image'

const quickLinks = [
  { label: 'Mission',  href: '#story' },
  { label: 'Programs', href: '#programs' },
  { label: 'Donate',   href: '#donate' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Contact',  href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-near-black py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-4">
          <a href="#hero" aria-label="Operation Healing Waters — back to top" className="inline-block cursor-pointer">
            <Image
              src="/images/logo.jpg"
              alt="Operation Healing Waters logo"
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          </a>
          <div>
            <p className="font-heading text-white font-semibold text-lg">Operation Healing Waters</p>
            <p className="font-body text-white/55 text-sm italic mt-1">&quot;Healing Happens on the Water.&quot;</p>
          </div>
          <div className="flex flex-col gap-1.5 mt-2">
            <div className="flex items-center gap-2 font-body text-white/55 text-xs">
              <Anchor size={12} className="text-gold/70" aria-hidden="true" />
              Coast Guard Approved
            </div>
            <div className="flex items-center gap-2 font-body text-white/55 text-xs">
              <span className="text-gold/70 font-bold text-xs">100%</span> of Donations to Mission via Zeffy
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p className="font-body text-white/60 text-xs uppercase tracking-[0.2em] font-medium mb-5">Quick Links</p>
          <ul className="flex flex-col gap-3" role="list">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-body text-white/60 hover:text-gold text-sm transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + contact */}
        <div>
          <p className="font-body text-white/60 text-xs uppercase tracking-[0.2em] font-medium mb-5">Connect</p>
          <div className="flex flex-col gap-3">
            <a
              href="https://www.tiktok.com/@reelofishal"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-white/60 hover:text-gold text-sm transition-colors duration-200 cursor-pointer"
            >
              TikTok: @reelofishal
            </a>
            <a
              href="https://www.instagram.com/reel.ofishal"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-white/60 hover:text-gold text-sm transition-colors duration-200 cursor-pointer"
            >
              Instagram: @reel.ofishal
            </a>
            <a
              href="mailto:derrious09@gmail.com"
              className="font-body text-white/60 hover:text-gold text-sm transition-colors duration-200 cursor-pointer flex items-center h-11"
            >
              derrious09@gmail.com
            </a>
            <a
              href="tel:8503198909"
              className="font-body text-white/60 hover:text-gold text-sm transition-colors duration-200 cursor-pointer flex items-center h-11"
            >
              (850) 319-8909
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-body text-white/50 text-xs">
          &copy; 2026 Operation Healing Waters. All rights reserved.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <p className="font-body text-white/50 text-xs">
            Partner:{' '}
            <a
              href="https://www.bayoucharity.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors underline underline-offset-2"
            >
              BayouCharity.org
            </a>
          </p>
          <p className="font-body text-white/50 text-xs hidden sm:block">·</p>
          <p className="font-body text-white/50 text-xs">
 