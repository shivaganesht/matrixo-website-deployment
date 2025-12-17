'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

export default function CTA() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="section-title mb-4">
            Ready to Level Up
            <span className="text-blue-600 dark:text-blue-500 block mt-1">Your Technical Skills?</span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
            Join thousands of students building their careers with matriXO&apos;s workshops, 
            hackathons, and bootcamps.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex items-center gap-2"
              >
                <span>Collaborate with Us</span>
                <FaArrowRight className="text-sm" />
              </motion.button>
            </Link>

            <Link href="/events">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary"
              >
                Explore Programs
              </motion.button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span>Industry Experts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span>Hands-On Learning</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span>Career Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
