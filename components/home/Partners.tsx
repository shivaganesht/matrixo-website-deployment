'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const partners = [
  { name: 'Smartzy Edu Pvt. Ltd.', logo: '/partners/smartzy.png' },
  { name: 'TEDxIARE', logo: '/partners/tedx-iare.png' },
  { name: 'TEDxCMRIT Hyderabad', logo: '/partners/tedx-cmrit.png' },
  { name: 'Kommuri Pratap Reddy Institute of Technology', logo: '/partners/kprit.png' },
  { name: 'TEDxKPRIT', logo: '/events/tedxkprit-logo.png' },
]

export default function Partners() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-3">
            <span className="text-blue-600 dark:text-blue-500">Trusted By</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Partnering with leading educational institutions and event organizers across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-center p-5 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl hover:border-blue-300 dark:hover:border-blue-600/50 transition-colors duration-300"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-500">
                  {partner.name.charAt(0)}
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight">
                  {partner.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            Interested in <span className="text-blue-600 dark:text-blue-500">Partnering with Us?</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-5">
            Join our growing network of educational institutions and event organizers
          </p>
          <a
            href="/contact"
            className="btn-primary"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
