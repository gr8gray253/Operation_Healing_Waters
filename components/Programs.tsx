'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Shield, Users } from 'lucide-react'

const programs = [
  {
    icon: Shield,
    iconColor: 'text-teal',
    headline: 'Healing for Those Who Served',
    body: 'Veterans and first responders carrying PTSD, depression, anxiety, or social isolation find something different on the water. No appointments. No waiting rooms. Just open air, quiet casting, and community — at no cost to participants.',
    badge: 'All veterans welcome · No cost to participate',
    badgeColor: 'text-teal border-teal/30 bg-teal/10',
  },
  {
    icon: Users,
    iconColor: 'text-green',
    headline: "Building Tomorrow's Leaders",
    body: 'Underprivileged youth aged 8-18 get a supervised day on the water with veteran mentors. They learn patience, respect for nature, responsibility, and what it means to be part of something bigger than themselves.',
    badge: 'Ages 8-18 · Supervised · Free of charge',
    badgeColor: 'text-green border-green/30 bg-green/10',
  },
]

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export default function Programs() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="programs" className="bg-navy relative overflow-hidden">
      {/* Program cards section */}
      <div className="py-20 px-6 relative">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
          <Image
            src="/images/hero.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 30 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={prefersReduced ? {} : { duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-body font-medium text-gold text-sm uppercase tracking-[0.2em] mb-3">Our Programs</p>
            <h2 className="font-heading text-4xl md:text-5xl text-white font-bold">
              Who We Serve
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((p, i) => (
              <motion.div
                key={p.headline}
                initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
                whileInView={prefersReduced ? {} : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={prefersReduced ? {} : { duration: 0.5, ease, delay: i * 0.15 }}
                className="glass-card p-8 flex flex-col gap-5 hover:border-gold/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <p.icon size={28} className={p.iconColor} aria-hidden="true" />
                </div>
                <h3 className="font-heading text-2xl text-white font-semibold">{p.headline}</h3>
                <p className="font-body text-white/80 leading-relaxed text-base">{p.body}</p>
                <span className={`inline-flex self-start items-center border rounded-full px-4 py-1.5 font-body text-xs