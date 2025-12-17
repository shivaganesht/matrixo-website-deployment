'use client'

import { motion } from 'framer-motion'
import { FaGraduationCap, FaLightbulb, FaRocket, FaUsers, FaHeart, FaAward } from 'react-icons/fa'

export default function AboutContent() {
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
              About <span className="text-blue-500">matriXO</span>
            </h1>
            <p className="text-xl text-gray-400">
              Empowering students through technical workshops, hackathons, and career-focused bootcamps
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gray-900 dark:text-white">
                Our <span className="text-blue-600 dark:text-blue-500">Story</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                matriXO is an An Ed-Tech Startup dedicated to bridging the gap between academic learning 
                and industry requirements. We specialize in conducting hands-on technical workshops, competitive hackathons, 
                intensive bootcamps, and career-focused events exclusively for students.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Our journey began when we recognized that traditional education often lacks practical, industry-relevant training. 
                Students were graduating without the real-world skills that companies demand. We set out to change that.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Today, we partner with leading educational institutions across India to deliver technical training programs 
                that transform students into industry-ready professionals. From full-stack development bootcamps to AI/ML workshops, 
                we focus on what matters: building skills that lead to careers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-5">Why Choose matriXO?</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                {['Hands-on technical training programs', 'Industry-relevant curriculum', 'Expert mentorship and guidance', 'Growing partner network', 'Career-focused approach'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-5 text-blue-600 dark:text-blue-500">
                <FaRocket size={22} />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To empower every student with industry-relevant technical skills through hands-on workshops, 
                competitive hackathons, and intensive bootcamps. We believe that practical learning, combined 
                with expert mentorship, is the key to building successful tech careers. Our mission is to make 
                quality technical education accessible to all students.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-5 text-blue-600 dark:text-blue-500">
                <FaLightbulb size={22} />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To become India's most trusted technical education platform for students, creating a vibrant 
                ecosystem where learning meets career opportunities. We envision a future where every engineering 
                student graduates not just with a degree, but with real project experience, competitive coding skills, 
                and the confidence to succeed in the tech industry.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title mb-3">
              Our <span className="text-blue-600 dark:text-blue-500">Values</span>
            </h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: FaGraduationCap,
                title: 'Student-First',
                description: 'Every program is designed with student career growth in mind, from affordable pricing to placement support.',
              },
              {
                icon: FaUsers,
                title: 'Collaboration',
                description: 'We work closely with colleges, industry experts, and companies to create programs that truly matter.',
              },
              {
                icon: FaHeart,
                title: 'Passion for Education',
                description: 'We\'re driven by a genuine passion for empowering students through educational opportunities.',
              },
              {
                icon: FaRocket,
                title: 'Innovation',
                description: 'We constantly evolve our platform with cutting-edge technology to serve our users better.',
              },
              {
                icon: FaAward,
                title: 'Excellence',
                description: 'We strive for excellence in every aspect of our service, from technology to customer support.',
              },
              {
                icon: FaLightbulb,
                title: 'Transparency',
                description: 'We maintain open, honest communication with all stakeholders and operate with integrity.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-7 hover:border-blue-300 dark:hover:border-blue-600/50 transition-colors duration-300 text-center"
              >
                <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-5 text-blue-600 dark:text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <value.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Incubation */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-10"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-5 text-gray-900 dark:text-white">
              Supported by <span className="text-blue-600 dark:text-blue-500">KPRISE</span>
            </h2>
            <div className="flex justify-center mb-5">
              <div className="bg-white dark:bg-white p-3 rounded-xl border border-gray-200">
                <img 
                  src="/logos/kprise-logo.png" 
                  alt="KPRISE Logo" 
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              We&apos;re proud to be supported by <strong>KPR Foundation for Innovation and Social Empowerment (KPRISE)</strong>, 
              which has provided us with mentorship, resources, and a collaborative environment to grow. This partnership 
              has been instrumental in our journey from an idea to a thriving platform serving thousands of students.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">EdTech Startup</span>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">Supported 2023</span>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">Hyderabad, India</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

