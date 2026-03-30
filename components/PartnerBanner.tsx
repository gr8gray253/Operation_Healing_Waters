'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function PartnerBanner() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-teal py-16 px-6 relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={prefersReduced ? {} : { duration: 0.6 }}
        className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
      >
        <div className="flex flex-col gap-2">
          <p className="font-body text-white/60 text-xs uppercase tracking-[0.2em] font-medium">Organizational Partner</p>
          <h3 className="font-heading text-2xl md:text-3xl text-white font-bold">
            Proud partner of BayouCharity.org
          </h3>
          <p className="font-body text-white/75 text-base">
            Together, we&apos;re bringing more veterans and young people to the water across the Gulf Coast.
          </p>
        </div>
        <a
          href="https://www.bayoucharity.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 bg-white text-teal font-body font-bold text-sm px-6 py-3 rounded-xl transition-colors hover:bg-teal-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
        >
          Visit BayouCharity.org
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  )
}
