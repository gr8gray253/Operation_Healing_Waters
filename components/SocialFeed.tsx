'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SOCIAL } from '@/lib/constants'

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export default function SocialFeed() {
  const prefersReduced = useReducedMotion()
  const iframeContainerRef = useRef<HTMLDivElement>(null)
  const [iframeVisible, setIframeVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIframeVisible(true) },
      { rootMargin: '200px' }
    )
    if (iframeContainerRef.current) observer.observe(iframeContainerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="social" className="py-20 px-6 bg-off-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? {} : { duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-body font-medium text-teal text-sm uppercase tracking-[0.2em] mb-3">Follow Along</p>
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-bold">
            See What We&apos;re Up To
          </h2>
        </motion.div>

        {/* Instagram embed */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? {} : { duration: 0.6, ease }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
            <div>
              <p className="font-body text-navy font-semibold text-sm">{SOCIAL.instagramHandle}</p>
              <p className="font-body text-gray-400 text-xs">Instagram</p>
            </div>
          </div>

          <div
            ref={iframeContainerRef}
            className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm"
            style={{ minHeight: 480 }}
          >
            {iframeVisible ? (
              <iframe
                src="https://www.instagram.com/reel.ofishal/embed"
                className="w-full border-0"
                style={{ height: 480 }}
                loading="lazy"
                title="Operation Healing Waters Instagram feed"
                allow="encrypted-media"
              />
            ) : (
              <div className="w-full flex items-center justify-center" style={{ height: 480 }}>
                <p className="font-body text-sm text-gray-400">Loading Instagram feed…</p>
              </div>
            )}
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6 mt-2">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-gray-500 hover:text-teal transition-colors cursor-pointer"
            >
              View on Instagram
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polylin