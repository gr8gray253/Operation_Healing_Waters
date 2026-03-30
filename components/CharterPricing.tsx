'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Users } from 'lucide-react'

const packages = [
  { people: 2, price: 600 },
  { people: 3, price: 700 },
  { people: 4, price: 800 },
]

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export default function CharterPricing() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="pricing" className="py-20 px-6 bg-teal-wash">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? {} : { duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body font-medium text-teal text-sm uppercase tracking-[0.2em] mb-3">Charter Trips</p>
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-bold mb-4">
            Book a Charter Trip
          </h2>
          <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
            Every charter helps fund free trips for veterans. All outings led by Captain Derrious Austin — licensed and Coast Guard-approved.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.people}
              initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
              whileInView={prefersReduced ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={prefersReduced ? {} : { duration: 0.5, ease, delay: i * 0.15 }}
              whileHover={prefersReduced ? {} : { y: -4, boxShadow: '0 16px 32px rgba(14,116,144,0.12)' }}
              className="bg-white border border-teal/15 rounded-2xl p-8 flex flex-col items-center gap-4 shadow-sm transition-shadow duration-300 h-full"
            >
              <div className="w-14 h-14 bg-teal/8 rounded-2xl flex items-center justify-center">
                <Users size={28} className="text-teal" aria-hidden="true" />
              </div>
              <p className="font-body font-semibold text-navy text-lg">{pkg.people} People</p>
              <p className="font-heading text-4xl font-bold text-gold">${pkg.price}</p>
              <p className="font-body text-gray-500 text-sm text-center">Full day guided fishing charter</p>
              <a
                href="#contact"
                className="mt-auto inline-block text-center font-body font-bold text-sm px-6 py-3 rounded-xl bg-teal hover:bg-teal/90 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 w-full"
              >
                Book Now
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? {} : { duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-block bg-teal hover:bg-teal/90 text-white font-body font-bold text-base px-8 py-4 rounded-full transition-colors duration-200 cursor-pointer shadow-md shadow-teal/20 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
          >
            Book Your Trip
          </a>
        </motion.div>
      </div>
    </section>
  )
}
