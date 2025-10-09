'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaEnvelope } from 'react-icons/fa'

const team = [
  {
    name: 'Shiva Ganesh Talikota',
    role: 'Founder',
    bio: 'Visionary leader driving matriXO\'s mission to empower students through technical education and hands-on workshops.',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQFTVSaOE75yMg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722352150087?e=1762992000&v=beta&t=idxQdU1Hm7lL2MJgZvLp5i85YUAdJh1QoDjOT860d6E',
    social: {
      linkedin: 'https://linkedin.com/in/shivaganesht',
      email: 'off.matrixo@gmail.com',
    },
  },
  {
    name: 'Kishan Sai Vutukuri',
    role: 'Co-Founder',
    bio: 'Tech innovator focused on building scalable platforms and creating impactful learning experiences for students.',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQGKleEXV-3SOQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1686423933308?e=1762992000&v=beta&t=zOejuSeH7MPOmEOu_GpAbLelclEOjU4fyyxf1kLR3pQ',
    social: {
      linkedin: 'https://www.linkedin.com/in/kishan-sai-vutukuri/',
      email: 'off.matrixo@gmail.com',
    },
  },
  {
    name: 'Jatin Jangir',
    role: 'CFO',
    bio: 'Strategic financial leader ensuring sustainable growth and efficient operations for matriXO\'s expanding programs.',
    image: 'https://media.licdn.com/dms/image/v2/D5635AQGbcdwn0ANocQ/profile-framedphoto-shrink_400_400/B56ZmyzC8pHAAc-/0/1759641350253?e=1760601600&v=beta&t=XEqI3YepxPnHM6HjmVfIkeiVsZuGuxrJHUSSRdhH3DU',
    social: {
      linkedin: 'https://www.linkedin.com/in/astro-jatin-jangir-0287a6228',
      email: 'off.matrixo@gmail.com',
    },
  },
]

export default function TeamContent() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white section-padding">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Meet Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Team</span>
            </h1>
            <p className="text-2xl text-gray-300">
              The passionate individuals building the future of technical education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card p-8 hover-lift hover-glow text-center"
              >
                {/* Avatar - Image with fallback to initials */}
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden 
                              bg-gradient-to-br from-blue-500 to-purple-600">
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
                        fallback.className = 'absolute inset-0 flex items-center justify-center text-white text-5xl font-bold'
                        fallback.textContent = member.name.split(' ').map(n => n.charAt(0)).join('')
                        parent.appendChild(fallback)
                      }
                    }}
                  />
                </div>

                {/* Info */}
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center 
                               hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white 
                               transition-all duration-300"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center 
                               hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white 
                               transition-all duration-300"
                    >
                      <FaEnvelope size={20} />
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
            className="text-center glass-card p-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 gradient-text">
              Want to Join Our Team?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              We're always looking for talented individuals who share our passion for education and technology.
            </p>
            <a href="mailto:off.matrixo@gmail.com?subject=Open%20Position%20Inquiry">
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
