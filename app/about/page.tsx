import { Metadata } from 'next'
import AboutContent from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About Us - matriXO',
  description: 'Learn about matriXO - an EdTech startup incubated at KPRIT IIC, revolutionizing event ticketing for students and educational institutions.',
}

export default function AboutPage() {
  return <AboutContent />
}
