'use client'

import { motion } from 'framer-motion'
import { FaUsers, FaGraduationCap, FaCalendarCheck, FaChartLine } from 'react-icons/fa'

const stats = [
  { icon: FaUsers, value: '1,000+', label: 'Students Trained' },
  { icon: FaCalendarCheck, value: '20+', label: 'Events Conducted' },
  { icon: FaGraduationCap, value: '15+', label: 'Workshops Conducted' },
  { icon: FaChartLine, value: '5+', label: 'Partner Institutions' },
]

export default function Stats() {
  return (
    <section className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white"
              >
                <stat.icon size={28} />
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
