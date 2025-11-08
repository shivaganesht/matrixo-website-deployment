'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'
import config from '@/lib/config'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
]

// Beta-only links - matriXO Vision Platform
const betaLinks = [
  { name: 'SkillDNA™', href: '/skilldna' },
  { name: 'GrowGrid™', href: '/growgrid' },
  { name: 'PlayCred™', href: '/playcred' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isBeta, setIsBeta] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsBeta(window.location.hostname === 'beta.matrixo.in')
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Check current state from DOM
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)
  }, [mounted])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    
    setDarkMode(newDarkMode)
  }

  return (
    <nav
      className={`fixed ${isBeta ? 'top-14' : 'top-0'} w-full z-40 transition-all duration-300 bg-white/20 dark:bg-gray-950/20 backdrop-blur-xl shadow-lg border-b border-gray-200/20 dark:border-gray-700/20`}
    >
      <div className="container-custom px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-8 md:h-12 w-auto"
            >
              {/* Light Mode Logo (Black) */}
              <img 
                src="/logos/logo-light.png" 
                alt="matriXO" 
                className="h-8 md:h-12 w-auto block dark:hidden"
              />
              {/* Dark Mode Logo (White) */}
              <img 
                src="/logos/logo-dark.png" 
                alt="matriXO" 
                className="h-8 md:h-12 w-auto hidden dark:block"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 
                           font-medium transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 
                                 group-hover:w-full transition-all duration-200" />
                </Link>
              </motion.div>
            ))}
            
            {/* Beta-only navigation items */}
            {isBeta && betaLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + index) * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 
                           font-bold transition-colors duration-200 relative group flex items-center gap-1"
                >
                  {link.name}
                  <span className="px-1.5 py-0.5 text-[8px] bg-purple-500 text-white rounded-full font-bold">NEW</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-600 
                                 group-hover:w-full transition-all duration-200" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Dark Mode Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                         hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaSun className="text-xl text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaMoon className="text-xl text-blue-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            <Link href="/events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-sm"
              >
                Explore Programs
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {mounted && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FaSun className="text-lg text-yellow-500" /> : <FaMoon className="text-lg text-blue-500" />}
              </motion.button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-gray-200 text-2xl z-50"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-neon-blue dark:hover:text-neon-blue 
                             font-medium transition-colors duration-300 py-2"
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Beta-only mobile links */}
                {isBeta && betaLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 
                             font-bold transition-colors duration-300 py-2 flex items-center gap-2"
                  >
                    {link.name}
                    <span className="px-2 py-0.5 text-[10px] bg-purple-500 text-white rounded-full font-bold">NEW</span>
                  </Link>
                ))}
                
                <Link href="/events" onClick={() => setIsOpen(false)}>
                  <button className="btn-primary w-full text-sm">
                    Get Tickets
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
