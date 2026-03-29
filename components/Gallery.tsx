'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'

const images = [
  { src: '/images/gallery-1.jpg', alt: 'Fishing outing with participants on the Gulf Coast' },
  { src: '/images/gallery-2.jpg', alt: 'Veterans and youth on a guided fishing trip' },
  { src: '/images/gallery-3.jpg', alt: 'Participants enjoying a day of charter fishing' },
  { src: '/images/gallery-4.jpg', alt: 'Sunset view from the boat on the Florida Panhandle' },
  { src: '/images/gallery-5.jpg', alt: 'Participants fishing from the pier' },
]

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<null | { src: string; alt: string }>(null)
  const prefersReduced = useReducedMotion()
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    if (lightbox) {
      window.addEventListener('keydown', onKey)
      closeBtnRef.current?.focus()
    }
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <section id="gallery" className="py-20 px-6 bg-navy">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? {} : { duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body font-medium text-gold text-sm uppercase tracking-[0.2em] mb-3">Gallery</p>
          <h2 className="font-heading text-4xl md:text-5xl text-white font-bold">On the Water</h2>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
              whileInView={prefersReduced ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={prefersReduced ? {} : { duration: 0.5, ease, delay: (i % 3) * 0.1 }}
              whileHover={prefersReduced ? {} : { scale: 1.02 }}
              onClick={() => setLightbox(img)}
              aria-label={`View larger: ${img.alt}`}
              className="relative overflow-hidden rounded-2xl cursor-pointer group border-2 border-transparent hover:border-gold/40 transition-all duration-300 break-inside-avoid block w-full focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={800}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-300 flex items-center justify-center">
                <span className="font-body text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full">
                  View
                </span>
              </div>
            </motion.button>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={prefersReduced ? false : { scale: 0.9, opacity: 0 }}
              animate={prefersReduced ? {} : { scale: 1, opacity: 1 }}
              exit={prefersReduced ? {} : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                width={1200}
                height={1600}
                className="w-full h-auto rounded-2xl object-contain max-h-[85vh]"
              />
              <button
                ref={closeBtnRef}
                onClick={() => setLightbox(null)}
                aria-label="Close image"
                className="