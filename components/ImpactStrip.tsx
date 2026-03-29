'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Counter {
  label: string
  target: number
  suffix: string
  prefix?: string
}

const counters: Counter[] = [
  { label: 'Veterans Served Annually', target: 250, suffix: '+' },
  { label: 'Anglers Per Trip',          target: 4,   suffix: '' },
  { label: 'of Donations to Mission',   target: 100, suffix: '%' },
]

function AnimatedCounter({ target, suffix, prefix }: { target: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const prefersReduced = useReducedMotion()

  // Native IntersectionObserver — avoids Framer Motion useInView issues under React 19 + Turbopack
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      if (prefersReduced) {
        setCount(target)
        return
      }

      let start = 0
      const duration = 2000
      const step = 16
      const increment = target / (duration / step)

      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, step)
    }, { threshold: 0.1 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, prefersReduced])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

export default function ImpactStrip() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="impact" className="relative bg-navy py-20 px-6 overflow-hidden">
      {/* Subtle wave divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {counters.map((c, i) => (
          <motion.div
            key={c.label}
            initial={prefersReduced ? false : { opacity: 0, y: 30 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={prefersReduced ? {} : { duration: 0.6, delay: i * 0.15 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="font-heading text-5xl md:text-6xl font-bold text-gold tracking-tight">
              <AnimatedCounter target={c.target} suffix={c.suffix} prefix={c.prefix} />
            </p>
            <p className="font-body text-white/80 text-sm uppercase tracking-[0.15em]">{c.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Subtle wave divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 