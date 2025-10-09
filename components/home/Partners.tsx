'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const partners = [
  { name: 'Smartzy Edu Pvt. Ltd.', logo: '/partners/smartzy.png' },
  { name: 'TEDxIARE', logo: '/partners/tedx-iare.png' },
  { name: 'TEDxCMRIT Hyderabad', logo: '/partners/tedx-cmrit.png' },
  { name: 'Kommuri Pratap Reddy Institute of Technology', logo: '/partners/kprit.png' },
  { name: 'Sree Indu College of Engineering', logo: '/partners/sree-indu.png' },
]

export default function Partners() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">Trusted By</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Partnering with leading educational institutions and event organizers across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full flex items-center justify-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
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
          className="mt-16 text-center glass-card p-8"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Join our growing network of partners
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">5+</h3>
              <p className="text-gray-600 dark:text-gray-400">Partner Institutions</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">1,000+</h3>
              <p className="text-gray-600 dark:text-gray-400">Students Reached</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">20+</h3>
              <p className="text-gray-600 dark:text-gray-400">Events Organized</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
