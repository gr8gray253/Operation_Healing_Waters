'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { HeartHandshake } from 'lucide-react'
import { ZEFFY_DONATE_URL } from '@/lib/constants'

const tiers = [
  { amount: 500, impact: 'Sends 2 veterans on a healing trip', popular: false },
  { amount: 600, impact: 'Sends 3 veterans on a healing trip', popular: true },
  { amount: 700, impact: 'Fills the whole boat — 4 veterans', popular: false },
]

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export default function DonationTiers() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="donate"
      className="relative py-20 px-6 bg-off-white overflow-hidden"
    >

      <div className="relative z-20 max-w-5xl mx-auto">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? {} : { duration: 0.6 }}
          className="text-center mb-4"
        >
          <p className="font-body font-medium text-teal text-sm uppercase tracking-[0.2em] mb-3">Make an Impact</p>
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-bold mb-4">
            Your Donation = Real People on the Water
          </h2>
          <p className="font-body text-gray-500 text-lg max-w-2xl mx-auto">
            Every dollar goes straight to getting people on the water. We use Zeffy, so there are zero platform fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.amount}
              initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
              whileInView={prefersReduced ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={prefersReduced ? {} : { duration: 0.5, ease, delay: i * 0.15 }}
              whileHover={prefersReduced ? {} : { y: -6, boxShadow: '0 20px 40px rgba(245,158,11,0.15)' }}
              className={`relative rounded-2xl p-8 flex flex-col gap-4 border-2 transition-shadow duration-300 ${
                tier.popular
                  ? 'border-gold bg-navy text-white shadow-lg shadow-gold/15'
                  : 'border-gold/30 bg-white text-navy shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-navy font-body font-bold text-xs px-4 py-1 rounded-full shadow-sm">
                    Most Popular
                  </span>
                </div>
              )}
              <p className="font-heading text-5xl font-bold text-gold">
                ${tier.amount}
              </p>
              <p className={`font-body text-base leading-snug ${tier.popular ? 'text-white/80' : 'text-gray-600'}`}>
                {tier.impact}
              </p>
              <a
                href={`${ZEFFY_DONATE_URL}?amount=${tier.amount}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto inline-block text-center font-body font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  tier.popular
                    ? 'bg-gold hover:bg-yellow-500 text-navy focus:ring-gold focus:ring-offset-navy'
                    : 'bg-navy hover:bg-teal text-white focus:ring-navy'
                }`}
              >
                Donate ${tier.amount} Now
              </a>
            </motion.div>
          ))}
        </div>

        {/* Zeffy callout */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? {} : { duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-teal/8 border border-teal/20 rounded-2xl p-6 text-center"
        >
          <p className="font-body text-teal font-medium text-sm mb-4 inline-flex items-center gap-2">
            <HeartHandshake size={16} aria-hidden="true" className="shrink-0" />
            We fundraise with Zeffy — 100% of your donation reaches our mission, guaranteed.
          </p>
          <a
            href={ZEFFY_DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body font-semibold text-sm text-teal border border-teal/30 rounded-xl px-6 py-2.5 hover:bg-teal hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal"
          >
            Start Donating
          </a>
        </motion.div>
      </div>
    </section>
  )
}
