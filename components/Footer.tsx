import Link from 'next/link'
import { FaLinkedin, FaInstagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="container-custom px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="relative h-8 w-auto mb-4">
              <img 
                src="/logos/logo-light.png" 
                alt="matriXO" 
                className="h-8 w-auto block dark:hidden"
              />
              <img 
                src="/logos/logo-dark.png" 
                alt="matriXO" 
                className="h-8 w-auto absolute top-0 left-0 hidden dark:block"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed">
              Technical workshops, hackathons, and career-focused events for students.
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com/company/matrixo" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-200">
                <FaLinkedin size={16} />
              </a>
              <a href="https://instagram.com/matrixo_official" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-200">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link href="/events" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Events</Link></li>
              <li><Link href="/services" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Services</Link></li>
              <li><Link href="/team" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Team</Link></li>
              <li><Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4 text-sm uppercase tracking-wide">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services#workshops" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Technical Workshops</Link></li>
              <li><Link href="/services#hackathons" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Hackathons</Link></li>
              <li><Link href="/services#bootcamps" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Bootcamps</Link></li>
              <li><Link href="/services#events" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Career Events</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-blue-600 dark:text-blue-500" size={14} />
                <span className="text-gray-600 dark:text-gray-400">25, Heaven Down Residency<br />RTC Colony, Nagaram<br />Hyderabad, Telangana - 501302</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="flex-shrink-0 text-blue-600 dark:text-blue-500" size={14} />
                <a href="mailto:hello@matrixo.in" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                  hello@matrixo.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              © {currentYear} matriXO - An Ed-Tech Startup. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/terms" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Terms</Link>
              <Link href="/privacy" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Privacy</Link>
              <Link href="/refund" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Refunds</Link>
              <Link href="/shipping" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Shipping</Link>
              <Link href="/contact" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
