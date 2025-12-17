'use client'

import { motion } from 'framer-motion'
import { FaRocket, FaChartLine, FaGraduationCap, FaLightbulb, FaCalendarCheck, FaUsers } from 'react-icons/fa'

const features = [
  {
    icon: FaChartLine,
    title: 'Technical Workshops',
    description: 'Hands-on coding workshops covering latest technologies, frameworks, and industry best practices.',
  },
  {
    icon: FaRocket,
    title: 'Hackathons',
    description: 'Competitive coding events where students build real projects and solve industry challenges.',
  },
  {
    icon: FaGraduationCap,
    title: 'Bootcamps',
    description: 'Intensive training programs designed to make students industry-ready in weeks.',
  },
  {
    icon: FaLightbulb,
    title: 'Career Programs',
    description: 'Placement preparation, interview coaching, and career guidance for students.',
  },
  {
    icon: FaCalendarCheck,
    title: 'Campus Events',
    description: 'Technical events, seminars, and competitions hosted at educational institutions.',
  },
  {
    icon: FaUsers,
    title: 'Community Building',
    description: 'Building a strong network of tech enthusiasts, mentors, and industry professionals.',
  },
]

export default function Features() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="section-title mb-4">
            Why Choose <span className="text-blue-600 dark:text-blue-500">matriXO</span>
          </h2>
          <p className="section-subtitle">
            Empowering students with technical skills and real-world experience through 
            comprehensive training programs and industry-focused events.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="group bg-white dark:bg-gray-800/50 p-7 rounded-2xl border border-gray-200 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-5 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 transition-colors duration-300">
                <feature.icon size={22} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
