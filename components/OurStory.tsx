'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Anchor, Fish, Shield, Handshake } from 'lucide-react'

const badges = [
  { icon: Anchor,    label: 'Coast Guard Approved' },
  { icon: Fish,      label: 'Licensed Charter Captain' },
  { icon: Shield,    label: 'Fully Insured' },
  { icon: Handshake, label: 'BayouCharity.org Partner' },
]

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export default function OurStory() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="story" className="py-20 px-6 bg-off-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Photo */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, x: -40 }}
          whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={prefersReduced ? {} : { duration: 0.6, ease }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
            <Image
              src="/images/Derrious (owner) fish 2.jpeg"
              alt="Captain Derrious Austin smiling and holding a large redfish on the water"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-heading text-white text-xl font-bold">Captain Derrious Austin</p>
              <p className="font-body text-white/80 text-sm mt-1">Founder &middot; Operation Healing Waters</p>
            </div>
          </div>
          {/* Decorative accents */}
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal/15 rounded-3xl -z-10" aria-hidden="true" />
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-gold/15 rounded-2xl -z-10" aria-hidden="true" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, x: 40 }}
          whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={prefersReduced ? {} : { duration: 0.6, ease }}
          className="flex flex-col gap-6"
        >
          <p className="font-body font-medium text-teal text-sm uppercase tracking-[0.2em]">Our Story</p>
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-bold leading-tight">
            Where Service Meets <span className="text-teal italic">the Water</span>
          </h2>
          <div className="space-y-4 font-body text-gray-600 text-base leading-relaxed">
            <p>
              Captain Derrious Austin started Operation Healing Waters with one belief: nature heals. For veterans carrying the invisible weight of service — PTSD, depression, anxiety, the kind of isolation that sneaks up on you — a day on the water can do more than any waiting room.
            </p>
            <p>
              Based out of Southeast Louisiana, Derrious opens his boat — free of charge — to veterans, first responders, and young people from underserved communities. Every trip is more than fishing. It&apos;s conversation, mentorship, and room to breathe.
            </p>
            <p>
              Our secondary mission is building a permanent waterfront event space and community hub that serves the Gulf Coast for generations. Every donation moves us closer to that vision.
            </p>
          </div>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row gap-4 font-body text-sm text-gray-600">
            <a href="mailto:support@operationhealingwaters.org" className="hover:text-teal transition-colors cursor-pointer inline-flex items-center gap-2 h-11">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              support@operationhealingwaters.org
            </a>
            <a href="tel:8503198909" className="hover:text-teal transition-colors cursor-pointer inline-flex items-center gap-2 h-11">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              (850) 319-8909
            </a>
          </div>

          {/* Credential badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            {badges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 bg-teal/8 text-teal border border-teal/20 rounded-full px-4 py-1.5 font-body text-xs font-medium"
              >
                <Icon size={14} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
