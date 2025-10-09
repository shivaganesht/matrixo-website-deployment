import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Features from '@/components/home/Features'
import Partners from '@/components/home/Partners'
import CTA from '@/components/home/CTA'
import Stats from '@/components/home/Stats'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Features />
      <Partners />
      <CTA />
    </>
  )
}
