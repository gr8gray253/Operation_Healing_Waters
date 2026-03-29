'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { sendContactEmail, type ContactFormData } from '@/lib/emailjs'
import { Phone, Mail, Clock } from 'lucide-react'

const initialForm: ContactFormData = {
  name: '', email: '', phone: '', date: '', groupSize: '', isVeteran: '', message: '',
}

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export default function Contact() {
  const prefersReduced = useReducedMotion()
  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleRadio = (val: string) => setForm((f) => ({ ...f, isVeteran: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await sendContactEmail(form)
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const inputCls = 'w-full bg-white/12 border border-white/35 rounded-xl px-4 py-3 font-body text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all'
  const labelCls = 'block font-body text-white/80 text-xs font-medium mb-1.5'

  return (
    <section id="contact" className="py-20 px-6 bg-navy">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* Form */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, x: -40 }}
          whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? {} : { duration: 0.6, ease }}
        >
          <p className="font-body font-medium text-gold text-sm uppercase tracking-[0.2em] mb-3">Ready to Get on the Water?</p>
          <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mb-8">
            Let&apos;s Set Up Your Trip
          </h2>

          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {status === 'loading' && 'Sending your message...'}
            {status === 'success' && 'Message sent successfully!'}
            {status === 'error' && 'Something went wrong. Please try again.'}
          </div>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green/15 border border-green/30 rounded-2xl p-8 text-center"
            >
              <p className="font-heading text-white text-2xl font-semibold mb-2">Message Sent!</p>
              <p className="font-body text-white/85 text-sm">
                You&apos;re all set! Captain Derrious will reach out within 24 hours to start planning your day on the water.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className={labelCls}>Full Name *</label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="email" className={labelCls}>Email Address *</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className={labelCls}>Phone Number</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="date" className={labelCls}>Preferred Trip Date</label>
                  <input id="date" name="date" type="date" value={form.date} onChange={handleChange} className={`${inputCls} [color-scheme:dark]`} />
                </div>
              </div>
              <div>
                <label htmlFor="groupSize" className={labelCls}>Group Size</label>
                <select id="groupSize" name="groupSize" value={form.groupSize} onChange={handleChange} className={inputCls}>
                  <option value="">Select group size</option>
                  <option value="2">2 People — $600</option>
                  <option value="3">3 People — $700</option>
                  <option value="4">4 People — $800</option>
                </select>
              </div>
              <fieldset className="border-0 p-0 m-0">
                <legend className={labelCls}>Are you a veteran?</legend>
                <div className="flex gap-4 flex-wrap">
                  {['Yes', 'No', 'Prefer not to say'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 font-body text-white/85 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="isVeteran"
                        value={opt}
                        checked={form.isVeteran === opt}
                        onChange={() => handleRadio(opt)}
                        className="accent-gold"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="message" className={labelCls}>Message / Questions</label>
                <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us about your group, any special needs, or questions..." className={`${inputCls} resize-none`} />
              </div>

              {status === 'error' && (
                <p className="font-body text-red-400 text-sm" role="alert">Hmm, that didn&apos;t go through. Give it another shot, or just email us at derrious09@gmail.com — we&apos;ll get you sorted.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gold hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed text-navy font-body font-bold text-base py-4 rounded-full transition-all duration-200 cursor-pointer shadow-lg shadow-gold/20 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>

        {/* Info column */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, x: 40 }}
          whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? {} : { duration: 0.6, ease }}
          className="flex flex-col gap-8 lg:pt-32"
        >
          <div className="flex flex-col gap-6">
            <a href="tel:8503198909" className="flex items-start gap-4 group cursor-pointer">
              <div className="w-12 h-12 bg-gold/15 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors">
                <Phone size={22} className="text-gold" aria-hidden="true" />
              </div>
              <div>
                <p className="font-body text-white/85 text-xs font-medium uppercase tracking-wider mb-1">Phone</p>
                <p className="font-body text-white text-lg font-semibold group-hover:text-gold transition-colors">(850) 319-8909</p>
              </div>
            </a>
            <a href="mailto:derrious09@gmail.com" className="flex items-start gap-4 group cursor-pointer">
              <div className="w-12 h-12 bg-gold/15 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors">
                <Mail size={22} className="text-gold" aria-hidden="true" />
              </div>
              <div>
                <p className="font-body text-white/85 text-xs font-medium uppercase tracking-wider mb-1">Email</p>
                <p className="font-body text-white text-base font-semibold group-hover:text-gold transition-colors">derrious09@gmail.com</p>
              </div>
            </a>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gold/15 rounded-xl flex items-center justify-center shrink-0">
                <Clock size={22} className="text-gold" aria-hidden="true" />
              </div>
              <div>
                <p className="font-body text-white/85 text-xs font-medium uppercase tracking-wider mb-1">Response Time</p>
                <p className="font-body text-white text-base font-semibold">Within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <p className="font-body text-white/85 text-sm leading-relaxed">
              <span className="text-gold font-semibold">If you&apos;ve served, you ride free.</span>{' '}
            