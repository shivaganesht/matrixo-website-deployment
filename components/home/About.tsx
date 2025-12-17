'use client'

import { motion } from 'framer-motion'
import { FaGraduationCap, FaLightbulb, FaRocket } from 'react-icons/fa'

export default function About() {
  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="section-title mb-4">
            Who We <span className="text-blue-600 dark:text-blue-500">Are</span>
          </h2>
          <p className="section-subtitle">
            matriXO is an An Ed-Tech Startup dedicated to bridging the gap between 
            academic learning and industry requirements through technical workshops, hackathons, 
            bootcamps, and career-focused events.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: FaGraduationCap,
              title: 'Hands-On Learning',
              description: 'Practical workshops and bootcamps that teach real-world skills through project-based learning.',
            },
            {
              icon: FaLightbulb,
              title: 'Industry-Relevant',
              description: 'Programs designed with industry experts to ensure students learn what companies actually need.',
            },
            {
              icon: FaRocket,
              title: 'Career Growth',
              description: 'From technical hackathons to placement preparation, we focus on building career-ready students.',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-2xl hover:border-blue-300 dark:hover:border-blue-600/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-5 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <item.icon size={26} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
