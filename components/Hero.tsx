'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { ZEFFY_DONATE_URL } from '@/lib/constants'
import { Anchor, ShieldCheck, BadgeCheck } from 'lucide-react'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['0%', '30%'])

  // Strict Mode-safe entrance: timeout fires on 2nd mount after cleanup clears 1st
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Shared easing for all entrance animations
  const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
  const animIn  = (delay: number) => mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
  const transIn = (delay: number) => prefersReduced ? {} : { duration: 0.6, ease, delay }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >

      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, willChange: 'transform' }}
      >
        <Image
          src="/images/hero.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%] scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-near-black/70 via-navy/60 to-navy/90" />
      </motion.div>

      {/* Content — inline object animations bypass variant context propagation issues */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pt-32 pb-16">
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 40 }}
          animate={animIn(0)}
          transition={transIn(0)}
          className="font-body font-medium text-gold text-sm uppercase tracking-[0.2em] mb-4"
        >
          A Veteran &amp; Youth Wellness Initiative
        </motion.p>

        <motion.h1
          initial={prefersReduced ? false : { opacity: 0, y: 40 }}
          animate={animIn(0.15)}
          transition={transIn(0.15)}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-[1.05] mb-6"
        >
          Healing Happens
          <br />
          <span className="text-gold italic">on the Water.</span>
        </motion.h1>

        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 40 }}
          animate={animIn(0.3)}
          transition={transIn(0.3)}
          className="font-body text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Free fishing trips for veterans and young people who deserve a day on the water —
          because healing doesn&apos;t need four walls.
        </motion.p>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 40 }}
          animate={animIn(0.45)}
          transition={transIn(0.45)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={ZEFFY_DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-yellow-500 text-navy font-body font-bold text-base px-8 py-4 rounded-full transition-all duration-200 cursor-pointer shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
          >
            Donate Now
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-gold text-white hover:text-gold font-body font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy"
          >
            Book a Trip
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 40 }}
          animate={animIn(0.6)}
          transition={transIn(0.6)}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {[
            { icon: Anchor,      label: 'Coast Guard Approved' },
            { icon: ShieldCheck, label: 'Fully Insured' },
            { icon: BadgeCheck,  label: 'Licensed Captain' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/70 font-body text-sm">
              <Icon size={15} className="text-gold/80 shrink-0" aria-hidden="true" />
              {label}
            </div>
          ))}
          <div className="flex items-center gap-2 text-white/70 font-body text-sm">
            <span className="text-gold font-bold">100%</span> of Donations to Mission
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: prefersReduced ? 0 : 1.5, duration: prefersReduced ? 0 : 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
          <motion.div
            animate={prefersReduced ? {} : { y: [0, 12, 0] }}
            transition={prefersReduced ? {} : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-1 h-2 bg-white/50 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
