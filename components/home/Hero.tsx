'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaCalendarCheck, FaArrowRight, FaUsers } from 'react-icons/fa'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.06),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.12),transparent_50%)]" />
      </div>

      {/* Minimal Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Content */}
      <div className="relative z-10 container-custom px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-full"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-blue-700 dark:text-blue-400 font-medium text-sm">
              An Ed-Tech Startup
            </span>
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <img 
              src="/logos/logo-light.png" 
              alt="matriXO" 
              className="h-16 md:h-20 w-auto dark:hidden"
            />
            <img 
              src="/logos/logo-dark.png" 
              alt="matriXO" 
              className="h-16 md:h-20 w-auto hidden dark:block"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 max-w-4xl leading-tight"
          >
            Where Technical Excellence
            <span className="text-blue-600 dark:text-blue-500"> Meets Career Growth</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl"
          >
            Workshops • Hackathons • Bootcamps • Real Skills
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base md:text-lg text-gray-500 dark:text-gray-500 mb-10 max-w-2xl"
          >
            Empowering students through hands-on technical training, competitive events, 
            and industry-relevant bootcamps. Build skills that matter.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/events">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex items-center gap-2"
              >
                <FaCalendarCheck className="text-sm" />
                <span>Explore Programs</span>
                <FaArrowRight className="text-sm" />
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <FaUsers className="text-sm" />
                <span>Collaborate with Us</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
