import dynamic from 'next/dynamic'
import SideNav from '@/components/SideNav'
import Hero from '@/components/Hero'
import ImpactStrip from '@/components/ImpactStrip'

// Below-fold components — loaded as separate chunks only when needed
const WaveDivider    = dynamic(() => import('@/components/WaveDivider'))
const OurStory       = dynamic(() => import('@/components/OurStory'))
const Programs       = dynamic(() => import('@/components/Programs'))
const DonationTiers  = dynamic(() => import('@/components/DonationTiers'))
const CharterPricing = dynamic(() => import('@/components/CharterPricing'))
const Gallery        = dynamic(() => import('@/components/Gallery'))
const SocialFeed     = dynamic(() => import('@/components/SocialFeed'))
const Contact        = dynamic(() => import('@/components/Contact'))
const Footer         = dynamic(() => import('@/components/Footer'))

export default function Home() {
  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-navy focus:px-4 focus:py-2 focus:rounded focus:font-body focus:font-semibold"
      >
        Skip to main content
      </a>

      <SideNav />
      <main id="main-content">
        <Hero />
        <ImpactStrip />
        <WaveDivider from="navy" to="off-white" />
        <OurStory />
        <WaveDivider from="off-white" to="navy" />
        <Programs />
        <WaveDivider from="navy" to="off-white" />
        <DonationTiers />
        <WaveDivider from="off-white" to="navy" />
        <CharterPricing />
        <WaveDivider from="navy" to="off-white" />
        <Gallery />
        <WaveDivider from="off-white" to="navy" />
        <SocialFeed />
        <WaveDivider from="navy" to="off-white" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
