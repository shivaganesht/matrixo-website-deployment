'use client'

import { motion } from 'framer-motion'
import { FaUsers, FaGraduationCap, FaCalendarCheck, FaChartLine } from 'react-icons/fa'

const stats = [
  { icon: FaUsers, value: 'Growing', label: 'Community of Learners' },
  { icon: FaCalendarCheck, value: 'Regular', label: 'Events & Workshops' },
  { icon: FaGraduationCap, value: 'Quality', label: 'Technical Training' },
  { icon: FaChartLine, value: 'Expanding', label: 'Partner Network' },
]

export default function Stats() {
  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-blue-100 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <stat.icon size={24} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-500 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
