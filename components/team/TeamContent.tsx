'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaEnvelope } from 'react-icons/fa'

const team = [
  {
    name: 'Shiva Ganesh Talikota',
    role: 'Founder',
    bio: 'Visionary leader driving matriXO\'s mission to empower students through technical education and hands-on workshops.',
    image: '/team/shiva.webp',
    social: {
      linkedin: 'https://linkedin.com/in/shivaganesht',
      email: 'hello@matrixo.in',
    },
  },
  {
    name: 'Kishan Sai Vutukuri',
    role: 'Co-Founder',
    bio: 'Tech innovator focused on building scalable platforms and creating impactful learning experiences for students.',
    image: '/team/kishan.webp',
    social: {
      linkedin: 'https://www.linkedin.com/in/kishan-sai-vutukuri/',
      email: 'hello@matrixo.in',
    },
  },
]

export default function TeamContent() {
  return (
    <div className="min-h-screen pt-0">
      {/* Hero */}
      <section className="bg-gray-950 text-white section-padding">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Meet Our <span className="text-blue-500">Team</span>
            </h1>
            <p className="text-xl text-gray-400">
              The passionate individuals building the future of technical education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center"
              >
                {/* Avatar - Image with fallback to initials */}
                <div className="relative w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden bg-blue-600">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // If image fails to load, show initials
                      e.currentTarget.style.display = 'none'
                      const parent = e.currentTarget.parentElement
                      if (parent) {
                        const fallback = document.createElement('div')
                        fallback.className = 'absolute inset-0 flex items-center justify-center text-white text-4xl font-bold'
                        fallback.textContent = member.name.split(' ').map(n => n.charAt(0)).join('')
                        parent.appendChild(fallback)
                      }
                    }}
                  />
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-500 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center 
                               text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white 
                               transition-all duration-300"
                    >
                      <FaLinkedin size={18} />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-9 h-9 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center 
                               text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white 
                               transition-all duration-300"
                    >
                      <FaEnvelope size={18} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-10 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-gray-900 dark:text-white">
              Want to <span className="text-blue-600 dark:text-blue-500">Join Our Team?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We&apos;re always looking for talented individuals who share our passion for education and technology.
            </p>
            <a href="mailto:hello@matrixo.in?subject=Open%20Position%20Inquiry">
              <button className="btn-primary">
                View Open Positions
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
