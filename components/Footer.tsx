import Link from 'next/link'
import { FaLinkedin, FaInstagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-gray-300 pt-20 pb-10">
      <div className="container-custom px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img 
              src="/logos/logo with name blk sq final wide.png" 
              alt="matriXO" 
              className="h-30 w-auto mb-4 rounded-lg"
            />
            <p className="text-gray-400 mb-6">
              Technical workshops, hackathons, and career-focused events for students.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/company/matrixo" target="_blank" rel="noopener noreferrer"
                 className="hover:text-neon-blue transition-colors duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="https://instagram.com/matrixo_official" target="_blank" rel="noopener noreferrer"
                 className="hover:text-neon-blue transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-neon-blue transition-colors">About Us</Link></li>
              <li><Link href="/events" className="hover:text-neon-blue transition-colors">Events</Link></li>
              <li><Link href="/services" className="hover:text-neon-blue transition-colors">Services</Link></li>
              <li><Link href="/team" className="hover:text-neon-blue transition-colors">Team</Link></li>
              <li><Link href="/blog" className="hover:text-neon-blue transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services#workshops" className="hover:text-neon-blue transition-colors">Technical Workshops</Link></li>
              <li><Link href="/services#hackathons" className="hover:text-neon-blue transition-colors">Hackathons</Link></li>
              <li><Link href="/services#bootcamps" className="hover:text-neon-blue transition-colors">Bootcamps</Link></li>
              <li><Link href="/services#events" className="hover:text-neon-blue transition-colors">Career Events</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-neon-blue" />
                <span>25, Heaven Down Residency<br />RTC Colony, Nagaram<br />Hyderabad, Telangana - 501302</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="flex-shrink-0 text-neon-blue" />
                <a href="mailto:off.matrixo@gmail.com" className="hover:text-neon-blue transition-colors">
                  off.matrixo@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} matriXO - MSME Registered. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/terms" className="hover:text-neon-blue transition-colors">Terms & Conditions</Link>
              <Link href="/privacy" className="hover:text-neon-blue transition-colors">Privacy Policy</Link>
              <Link href="/refund" className="hover:text-neon-blue transition-colors">Cancellations & Refunds</Link>
              <Link href="/shipping" className="hover:text-neon-blue transition-colors">Shipping & Delivery</Link>
              <Link href="/contact" className="hover:text-neon-blue transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
