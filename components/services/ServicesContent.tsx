'use client'

import { motion } from 'framer-motion'
import { FaCode, FaLaptopCode, FaRocket, FaTrophy, FaBriefcase, FaUsers } from 'react-icons/fa'
import Link from 'next/link'

const services = [
  {
    icon: FaCode,
    title: 'Technical Workshops',
    description: 'Hands-on coding workshops on cutting-edge technologies taught by industry experts.',
    features: ['Web Development', 'Mobile App Development', 'Cloud Computing', 'DevOps & CI/CD', 'Database Management'],
  },
  {
    icon: FaTrophy,
    title: 'Hackathons',
    description: 'Competitive coding events where students build real projects and solve industry challenges.',
    features: ['24-48 hour events', 'Industry mentors', 'Real problem statements', 'Prizes & recognition', 'Networking opportunities'],
  },
  {
    icon: FaLaptopCode,
    title: 'Bootcamps',
    description: 'Intensive multi-week training programs to make students industry-ready.',
    features: ['Full-Stack Development', 'Data Science & ML', 'Cybersecurity', 'Mobile Development', 'Project-based learning'],
  },
  {
    icon: FaBriefcase,
    title: 'Career Programs',
    description: 'Placement preparation and career guidance to help students land their dream jobs.',
    features: ['Resume building', 'Interview preparation', 'Mock interviews', 'DSA training', 'Soft skills development'],
  },
  {
    icon: FaRocket,
    title: 'Campus Events',
    description: 'Large-scale technical events, seminars, and conferences hosted at your institution.',
    features: ['Tech talks', 'Industry seminars', 'Career fairs', 'Coding competitions', 'Innovation challenges'],
  },
  {
    icon: FaUsers,
    title: 'Corporate Collaboration',
    description: 'Partner with us to train students or host events at your organization.',
    features: ['Custom programs', 'Internship drives', 'Hiring events', 'Brand visibility', 'Talent pipeline'],
  },
]

const pricingPlans = [
  {
    name: 'Workshop',
    price: '₹499',
    period: '/student',
    description: 'Single-day hands-on workshops',
    features: [
      '6-8 hours of training',
      'Industry expert instructors',
      'Hands-on projects',
      'Certificate of completion',
      'Learning materials',
    ],
    cta: 'Register Now',
    highlighted: false,
  },
  {
    name: 'Bootcamp',
    price: '₹9,999',
    period: '/student',
    description: 'Intensive 4-6 week programs',
    features: [
      'Full-stack training',
      'Live projects',
      'Industry mentorship',
      'Placement assistance',
      'Internship opportunities',
      'Lifetime community access',
    ],
    cta: 'Enroll Today',
    highlighted: true,
  },
  {
    name: 'Institution',
    price: 'Custom',
    description: 'For colleges & universities',
    features: [
      'Custom program design',
      'Bulk pricing for students',
      'On-campus events',
      'Faculty training',
      'Placement support',
      'Industry partnerships',
    ],
    cta: 'Partner with Us',
    highlighted: false,
  },
]

export default function ServicesContent() {
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
              Programs That Build
              <span className="text-blue-500 block mt-2">Real Tech Careers</span>
            </h1>
            <p className="text-xl text-gray-400">
              From beginner workshops to intensive bootcamps, we offer hands-on technical training that prepares students for industry success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="programs" className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title mb-3">
              Our <span className="text-blue-600 dark:text-blue-500">Programs</span>
            </h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Comprehensive technical training designed to build industry-ready skills
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-7 hover:border-blue-300 dark:hover:border-blue-600/50 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-5 text-blue-600 dark:text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <service.icon size={22} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-4 h-4 mr-2 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title mb-3">
              How It <span className="text-blue-600 dark:text-blue-500">Works</span>
            </h2>
            <p className="section-subtitle">
              From registration to certification - a seamless learning journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Browse & Choose', desc: 'Explore our workshops, bootcamps, and hackathons to find the perfect program' },
              { step: '02', title: 'Register Online', desc: 'Quick and secure registration with instant confirmation via email' },
              { step: '03', title: 'Learn & Build', desc: 'Attend hands-on sessions, work on real projects with industry mentors' },
              { step: '04', title: 'Get Certified', desc: 'Receive certificates and lifetime access to resources and community' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner as Ticketing Partner Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-blue-600 rounded-2xl p-10 text-white text-center relative overflow-hidden">
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-block mb-5"
                >
                  <div className="w-16 h-16 mx-auto bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
                    <FaUsers size={32} />
                  </div>
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Partner as Ticketing Partner
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
                  Are you organizing technical events, workshops, or hackathons? Partner with matriXO as your official ticketing platform and enjoy seamless registration management, secure payments, and powerful analytics.
                </p>

                <div className="grid md:grid-cols-3 gap-5 mb-8">
                  {[
                    { icon: '🎫', title: 'Easy Ticketing', desc: 'Create and manage multiple ticket tiers' },
                    { icon: '✉️', title: 'Email Confirmations', desc: 'Automated registration confirmations' },
                    { icon: '📊', title: 'Real-time Analytics', desc: 'Track registrations and attendee insights' },
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-5"
                    >
                      <div className="text-3xl mb-2">{benefit.icon}</div>
                      <h3 className="text-base font-bold mb-1">{benefit.title}</h3>
                      <p className="text-sm text-white/80">{benefit.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg 
                             transition-all duration-200"
                  >
                    Become a Partner →
                  </motion.button>
                </Link>

                <p className="mt-5 text-sm text-white/70">
                  Join 5+ institutions already using matriXO for their events
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title mb-3">
              Simple, Transparent <span className="text-blue-600 dark:text-blue-500">Pricing</span>
            </h2>
            <p className="section-subtitle">
              Choose a plan that fits your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-7 ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-gray-950'
                    : 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
                }`}
              >
                <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`mb-5 text-sm ${plan.highlighted ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                  {plan.description}
                </p>
                <div className="mb-5">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className={`${plan.highlighted ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>{plan.period}</span>}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-center text-sm ${plan.highlighted ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                      <span className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlighted ? 'bg-white/20' : 'bg-blue-100 dark:bg-blue-500/10'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${plan.highlighted ? 'bg-white' : 'bg-blue-600 dark:bg-blue-500'}`} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <button className={`w-full py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-white text-blue-600 hover:shadow-lg'
                      : 'btn-primary'
                  }`}>
                    {plan.cta}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-10 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-gray-900 dark:text-white">
              Ready to <span className="text-blue-600 dark:text-blue-500">Get Started?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Join thousands of event organizers who trust matriXO for their ticketing needs
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <button className="btn-primary">
                  Schedule a Demo
                </button>
              </Link>
              <Link href="/events">
                <button className="btn-secondary">
                  Browse Events
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
