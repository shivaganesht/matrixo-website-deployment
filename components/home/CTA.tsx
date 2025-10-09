'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

export default function CTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 dark:bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Level Up
            <span className="gradient-text block mt-2">Your Technical Skills?</span>
          </h2>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-12">
            Join thousands of students building their careers with matriXO&apos;s workshops, 
            hackathons, and bootcamps.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center space-x-2 text-lg"
              >
                <span>Collaborate with Us</span>
                <FaArrowRight />
              </motion.button>
            </Link>

            <Link href="/events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold rounded-full 
                         hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all duration-300"
              >
                Explore Programs
              </motion.button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <span className="text-neon-blue text-2xl">✓</span>
              <span>Industry Experts</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-neon-blue text-2xl">✓</span>
              <span>Hands-On Learning</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-neon-blue text-2xl">✓</span>
              <span>Career Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
