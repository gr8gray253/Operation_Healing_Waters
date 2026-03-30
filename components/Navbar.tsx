'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { ZEFFY_DONATE_URL } from '@/lib/constants'

const navLinks = [
  { label: 'Mission',  href: '#story' },
  { label: 'Programs', href: '#programs' },
  { label: 'Impact',   href: '#donate' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-navy focus:px-4 focus:py-2 focus:rounded focus:font-body focus:font-semibold"
      >
        Skip to main content
      </a>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-4 left-4 right-4 z-50 rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-navy/90 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#hero" aria-label="Operation Healing Waters — back to top">
          <Image
            src="/images/logo.jpg"
            alt="Operation Healing Waters logo"
            width={44}
            height={44}
            style={{ width: 44, height: 44 }}
            className="rounded-full object-cover"
          />
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white/90 hover:text-gold font-body font-medium text-sm transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={ZEFFY_DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-gold hover:bg-yellow-500 text-navy font-body font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer"
        >
          Donate Now
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden text-white cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-navy/95 backdrop-blur-md flex flex-col items-center justify-center gap-8"
          >
            <ul className="flex flex-col items-center gap-8" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="text-white text-2xl font-heading font-semibold hover:text-gold transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={ZEFFY_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="bg-gold hover:bg-yellow-500 text-navy font-body font-bold text-lg px-8 py-4 rounded-2xl transition-colors duration-200 cursor-pointer"
            >
              Donate Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
