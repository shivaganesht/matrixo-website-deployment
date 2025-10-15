'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { FaCalendar, FaMapMarkerAlt, FaClock, FaUsers, FaTag } from 'react-icons/fa'
import EventRegistrationForm from './EventRegistrationForm'
import Confetti from '../Confetti'

export default function EventDetail({ event }: { event: any }) {
  const [showRegistration, setShowRegistration] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const ticketSectionRef = useRef<HTMLDivElement>(null)

  const handleRegisterNow = (ticket: any) => {
    // Check if event has external registration link
    if (event.externalRegistrationLink) {
      window.open(event.externalRegistrationLink, '_blank')
      return
    }

    setSelectedTicket(ticket)
    setShowRegistration(true)
  }

  const scrollToTickets = () => {
    ticketSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  }

  const closeRegistration = (registrationSuccessful: boolean = false) => {
    setShowRegistration(false)
    setSelectedTicket(null)
  }
  
  // Check if this is TEDxKPRIT event
  const isTEDxEvent = event.id === 'tedxkprit-2025'

  // Trigger confetti for sold out events
  useEffect(() => {
    if (event.status === 'sold-out') {
      setShowConfetti(true)
    }
  }, [event.status])

  return (
    <div className={`min-h-screen ${isTEDxEvent ? 'tedx-theme' : 'pt-20'}`}>
      {/* Confetti for Sold Out Events */}
      {event.status === 'sold-out' && <Confetti active={showConfetti} duration={6000} />}
      {/* Hero Banner */}
      <section className={`relative ${isTEDxEvent ? 'h-screen' : 'h-[60vh] pt-20'} ${isTEDxEvent ? 'bg-black' : 'bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20'}`}>
        {isTEDxEvent ? (
          <>
            {/* TED-Inspired Red Spotlight Background with Animations */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Animated Floating Ideas (Particles) */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 bg-red-500/30 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${15 + Math.random() * 10}s`,
                    }}
                  />
                ))}
              </div>

              {/* Radial red spotlight with pulse */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] 
                            bg-gradient-radial from-red-600/40 via-red-900/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
              
              {/* Animated TED circle pattern - expanding ripples */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border-2 border-red-600 animate-ripple"
                    style={{
                      width: `${(i + 1) * 150}px`,
                      height: `${(i + 1) * 150}px`,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>

              {/* Moving gradient waves */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/20 to-transparent animate-wave" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-red-700/20 to-transparent animate-wave-reverse" />
              </div>
            </div>

            {/* TEDxKPRIT Banner Image */}
            <div className="absolute inset-0 flex items-start justify-center flex items-start pt-20">
              <Image
                src={event.images.banner}
                alt="Break The Loop"
                fill
                className="object-contain object-top p-8"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center text-9xl font-bold gradient-text">
              {event.title.charAt(0)}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 container-custom px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {event.featured && (
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {event.status === 'sold-out' && (
                  <span className="inline-block bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white px-6 py-3 rounded-full text-sm font-bold animate-celebrate animate-shine shadow-lg shadow-red-600/50">
                    🎉 SOLD OUT - ALL {event.totalCapacity} TICKETS CLAIMED! 🎊
                  </span>
                )}
                {isTEDxEvent && (
                  <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    🔴 IDEAS WORTH SPREADING
                  </span>
                )}
                <span className={`inline-block ${isTEDxEvent ? 'bg-gray-800 border-2 border-red-600' : 'bg-neon-pink'} text-white px-4 py-2 rounded-full text-sm font-bold`}>
                  ⭐ FEATURED EVENT
                </span>
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              {event.title}
            </h1>
            <p className="text-2xl text-gray-200 font-medium mb-6">
              {event.tagline}
            </p>
            <div className="flex flex-wrap gap-4 text-white">
              <div className={`flex items-center space-x-2 ${isTEDxEvent ? 'bg-red-600/30 border border-red-600/50' : 'bg-white/20'} backdrop-blur-sm px-4 py-2 rounded-full`}>
                <FaCalendar className={isTEDxEvent ? 'text-red-400' : 'text-neon-blue'} />
                <span>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
              </div>
              <div className={`flex items-center space-x-2 ${isTEDxEvent ? 'bg-red-600/30 border border-red-600/50' : 'bg-white/20'} backdrop-blur-sm px-4 py-2 rounded-full`}>
                <FaClock className={isTEDxEvent ? 'text-red-400' : 'text-neon-purple'} />
                <span>{format(new Date(event.date), 'hh:mm a')}</span>
              </div>
              <div className={`flex items-center space-x-2 ${isTEDxEvent ? 'bg-red-600/30 border border-red-600/50' : 'bg-white/20'} backdrop-blur-sm px-4 py-2 rounded-full`}>
                <FaMapMarkerAlt className={isTEDxEvent ? 'text-red-400' : 'text-neon-pink'} />
                <span>{event.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className={`section-padding ${isTEDxEvent ? 'bg-gradient-to-b from-black via-gray-900 to-black' : 'bg-white dark:bg-gray-950'}`}>
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Register Now Button - Mobile Only - Before About Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center md:hidden"
              >
                {event.status === 'sold-out' ? (
                  <div className="w-full bg-red-100 dark:bg-red-900/20 border-2 border-red-500 rounded-xl p-6 text-center">
                    <span className="text-3xl font-bold text-red-600 dark:text-red-400 block mb-2">
                      SOLD OUT
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      All {event.totalCapacity} tickets have been claimed
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={scrollToTickets}
                    className={`px-8 py-4 ${isTEDxEvent 
                      ? 'bg-red-600 hover:bg-red-700 shadow-red-600/50' 
                      : 'bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink'} 
                             text-white text-lg font-bold rounded-3xl shadow-xl
                             hover:shadow-2xl hover:scale-105 hover:-translate-y-1 
                             active:scale-95 transition-all duration-300 transform
                             flex items-center gap-3 group`}
                  >
                    <span>🎟️ Register Now</span>
                    <svg 
                      className="w-5 h-5 group-hover:translate-y-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </motion.div>

              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className={`text-3xl font-bold mb-6 ${isTEDxEvent ? 'text-red-600' : 'gradient-text'}`}>
                  About This Event
                </h2>
                
                {/* Event Title/Theme - Break The Loop */}
                {isTEDxEvent && event.tagline && (
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {event.tagline}
                  </h3>
                )}
                
                <p className={`${isTEDxEvent ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'} text-lg leading-relaxed mb-6`}>
                  {event.description}
                </p>
              </motion.div>

              {/* Theme Section - TEDxKPRIT Only */}
              {event.theme && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <h2 className={`text-3xl font-bold mb-6 ${isTEDxEvent ? 'text-red-600' : 'gradient-text'}`}>
                    {event.theme.title}
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {event.theme.pillars.map((pillar: any, index: number) => (
                      <div key={index} className={`${isTEDxEvent 
                        ? 'bg-black/40 border border-red-600/20 rounded-3xl' 
                        : 'glass-card'} p-6 hover-lift`}>
                        <h3 className={`text-xl font-bold mb-3 ${isTEDxEvent ? 'text-red-500' : 'text-neon-blue'}`}>
                          {pillar.name}
                        </h3>
                        <p className={`${isTEDxEvent ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'}`}>
                          {pillar.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Venue */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className={`text-3xl font-bold mb-6 ${isTEDxEvent ? 'text-red-600' : ''}`}>
                  Venue
                </h2>
                <div className={`${isTEDxEvent ? 'bg-black/40 border border-red-600/20 rounded-3xl' : 'glass-card'} p-6 space-y-4`}>
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className={`${isTEDxEvent ? 'text-red-500' : 'text-neon-blue'} text-2xl mt-1 flex-shrink-0`} />
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 ${isTEDxEvent ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        {event.venue}
                      </h3>
                      <a 
                        href="https://maps.app.goo.gl/phYNNYQyWgacvBA59"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${isTEDxEvent ? 'text-red-500 hover:text-red-400' : 'text-neon-blue hover:text-neon-purple'} transition-colors duration-300 
                                 flex items-center gap-2 group cursor-pointer font-medium`}
                      >
                        <span className="group-hover:underline">{event.location}</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  {/* Embedded Google Map */}
                  <div className="mt-4 rounded-lg overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-700">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.553845987853!2d78.68277187462795!3d17.433186001485225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a33110155555557%3A0xb597e25edcbfbfbb!2sKommuri%20Pratap%20Reddy%20Institute%20Of%20Technology%20(Autonomous%20Institute)!5e0!3m2!1sen!2sin!4v1760181922948!5m2!1sen!2sin" 
                      width="100%" 
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Agenda */}
              {event.agenda && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className={`text-3xl font-bold mb-6 ${isTEDxEvent ? 'text-red-600' : ''}`}>
                    Event Agenda
                  </h2>
                  <div className="space-y-4">
                    {event.agenda.map((item: any, index: number) => (
                      <div key={index} className={`flex items-start space-x-4 ${isTEDxEvent 
                        ? 'bg-black/40 border border-red-600/20 rounded-3xl' 
                        : 'glass-card'} p-4 hover-lift`}>
                        <div className={`flex-shrink-0 w-24 ${isTEDxEvent ? 'text-red-500' : 'text-neon-blue'} font-bold`}>
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${isTEDxEvent ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className={`text-3xl font-bold mb-6 ${isTEDxEvent ? 'text-red-600' : ''}`}>
                    Featured Speakers
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {event.speakers.map((speaker: any, index: number) => (
                      <div key={index} className={`${
                        speaker.revealingSoon 
                          ? 'relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-dashed border-red-600/50 rounded-3xl' 
                          : isTEDxEvent
                            ? 'glass-card bg-black/40 border border-red-600/20 rounded-3xl'
                            : 'glass-card'
                      } p-6 hover-lift`}>
                        
                        {/* "Revealing Soon" Badge */}
                        {speaker.revealingSoon && (
                          <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                            COMING SOON
                          </div>
                        )}

                        {speaker.revealingSoon ? (
                          <>
                            {/* Mystery Speaker Card */}
                            <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden bg-gradient-to-br from-red-600/30 to-gray-700 
                                          flex items-center justify-center border-2 border-red-600/50">
                              <span className="text-4xl opacity-50">❓</span>
                            </div>
                            <h3 className="text-xl font-bold mb-1 text-red-500">
                              {speaker.name}
                            </h3>
                            <p className="text-sm text-gray-400 mb-2 italic">
                              {speaker.title}
                            </p>
                            <p className="text-sm text-gray-400 mb-2">
                              {speaker.bio}
                            </p>
                            <p className="text-sm text-red-500 font-medium">
                              {speaker.topic}
                            </p>
                          </>
                        ) : (
                          <>
                            {/* Regular Speaker Card */}
                            {speaker.image ? (
                              <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden">
                                <Image
                                  src={speaker.image}
                                  alt={speaker.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className={`w-20 h-20 ${isTEDxEvent 
                                ? 'bg-gradient-to-br from-red-600 to-red-800' 
                                : 'bg-gradient-to-br from-neon-blue to-neon-purple'} rounded-full 
                                          flex items-center justify-center text-white text-2xl font-bold mb-4`}>
                                {speaker.name.charAt(0)}
                              </div>
                            )}
                            <h3 className={`text-xl font-bold mb-1 ${isTEDxEvent ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                              {speaker.name}
                            </h3>
                            <p className={`text-sm ${isTEDxEvent ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'} mb-2`}>
                              {speaker.title || speaker.designation}
                            </p>
                            {speaker.bio && (
                              <p className={`text-sm ${isTEDxEvent ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'} mb-2 line-clamp-3`}>
                                {speaker.bio}
                              </p>
                            )}
                            {speaker.topic && (
                              <p className={`text-sm ${isTEDxEvent ? 'text-red-500' : 'text-neon-blue'} font-medium`}>
                                {speaker.topic}
                              </p>
                            )}
                            {speaker.socialLinks && (
                              <div className="mt-3 flex gap-2">
                                {speaker.socialLinks.linkedin && (
                                  <a
                                    href={speaker.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-xs ${isTEDxEvent ? 'text-red-500 hover:text-red-400' : 'text-neon-blue'} hover:underline`}
                                  >
                                    LinkedIn
                                  </a>
                                )}
                                {speaker.socialLinks.website && (
                                  <a
                                    href={speaker.socialLinks.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-xs ${isTEDxEvent ? 'text-red-500 hover:text-red-400' : 'text-neon-blue'} hover:underline`}
                                  >
                                    Website
                                  </a>
                                )}
                                {speaker.socialLinks.instagram && (
                                  <a
                                    href={speaker.socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-xs ${isTEDxEvent ? 'text-red-500 hover:text-red-400' : 'text-neon-blue'} hover:underline`}
                                  >
                                    Instagram
                                  </a>
                                )}
                                {speaker.socialLinks.facebook && (
                                  <a
                                    href={speaker.socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-xs ${isTEDxEvent ? 'text-red-500 hover:text-red-400' : 'text-neon-blue'} hover:underline`}
                                  >
                                    Facebook
                                  </a>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Partners & Sponsors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className={`text-3xl font-bold mb-6 ${isTEDxEvent ? 'text-red-600' : ''}`}>
                  Partners & Sponsors
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[...event.partners, ...event.sponsors].map((org: string, index: number) => (
                    <div key={index} className={`${isTEDxEvent 
                      ? 'bg-black/40 border border-red-600/20 rounded-3xl' 
                      : 'glass-card'} p-6 text-center hover-lift`}>
                      {org.toLowerCase() === 'matrixo' ? (
                        <>
                          <div className="w-full h-20 mb-4 flex items-center justify-center">
                            <Image
                              src="/logos/logo-light.png"
                              alt="matriXO"
                              width={120}
                              height={60}
                              className="object-contain dark:hidden"
                            />
                            <Image
                              src="/logos/logo-dark.png"
                              alt="matriXO"
                              width={120}
                              height={60}
                              className="object-contain hidden dark:block"
                            />
                          </div>
                          <p className={`text-base font-bold ${isTEDxEvent ? 'text-red-500' : 'gradient-text'} mb-1`}>
                            matriXO
                          </p>
                          <p className={`text-xs ${isTEDxEvent ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
                            Ticketing & Community Partner
                          </p>
                        </>
                      ) : (
                        <>
                          <div className={`w-16 h-16 mx-auto mb-2 ${isTEDxEvent 
                            ? 'bg-red-600/20 border border-red-600/30' 
                            : 'bg-gradient-to-br from-neon-blue/20 to-neon-purple/20'} 
                                        rounded-full flex items-center justify-center text-2xl font-bold ${isTEDxEvent ? 'text-red-500' : 'gradient-text'}`}>
                            {org.charAt(0)}
                          </div>
                          <p className={`text-sm font-medium ${isTEDxEvent ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'}`}>
                            {org}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Ticket Booking */}
            <div className="lg:col-span-1">
              <div className="sticky top-24" ref={ticketSectionRef}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${isTEDxEvent 
                    ? 'bg-black/60 border-2 border-red-600/30 backdrop-blur-lg rounded-3xl' 
                    : 'glass-card'} p-8 space-y-6`}
                  id="tickets-section"
                >
                  <h2 className={`text-2xl font-bold ${isTEDxEvent ? 'text-red-600' : 'gradient-text'}`}>
                    Get Your Tickets
                  </h2>

                  {/* Sold Out Notice */}
                  {event.status === 'sold-out' && (
                    <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/30 dark:via-orange-900/30 dark:to-yellow-900/30 border-2 border-red-500 rounded-xl p-6 text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                      <div className="text-5xl mb-3 animate-celebrate">🎉</div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-3">
                        SOLD OUT!
                      </h3>
                      <p className="text-base text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                        All <strong className="text-red-600 dark:text-red-400">{event.totalCapacity}</strong> tickets have been claimed! 🎊
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Thank you for the overwhelming response!
                      </p>
                    </div>
                  )}

                  {/* Ticket Options */}
                  <div className="space-y-4">
                    {event.tickets.map((ticket: any) => (
                      <div
                        key={ticket.id}
                        className={`border-2 ${isTEDxEvent 
                          ? 'border-red-600/30 bg-gray-900/30 hover:border-red-600/60 hover:bg-gray-900/50 rounded-3xl' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-neon-blue'} rounded-xl p-4 
                                 transition-all duration-300`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className={`font-bold text-lg ${isTEDxEvent ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                              {ticket.name}
                            </h3>
                            <p className={`text-sm ${isTEDxEvent ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
                              {ticket.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${isTEDxEvent ? 'text-red-500' : 'gradient-text'}`}>
                              ₹{ticket.price}
                            </div>
                            {ticket.originalPrice && (
                              <div className="text-sm text-gray-400 line-through">
                                ₹{ticket.originalPrice}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Perks */}
                        {ticket.perks && (
                          <div className="mb-3 space-y-1">
                            {ticket.perks
                              .filter((perk: string) => !perk.toLowerCase().includes('participation certificate'))
                              .map((perk: string, i: number) => (
                              <div key={i} className={`flex items-center text-sm ${isTEDxEvent ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                <span className={`${isTEDxEvent ? 'text-red-500' : 'text-neon-blue'} mr-2`}>✓</span>
                                {perk}
                              </div>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() => handleRegisterNow(ticket)}
                          disabled={event.status === 'sold-out'}
                          className={`w-full py-4 px-6 text-base font-bold rounded-3xl transition-all duration-300 transform ${
                            event.status === 'sold-out'
                              ? 'bg-gray-400 dark:bg-gray-600 text-gray-700 dark:text-gray-400 cursor-not-allowed opacity-60'
                              : isTEDxEvent
                              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 active:scale-95 animate-pulse-slow'
                              : 'bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink text-white shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 active:scale-95 animate-pulse-slow'
                          }`}
                        >
                          <span className="flex items-center justify-center gap-2">
                            {event.status === 'sold-out' ? '🔴 SOLD OUT' : '🎟️ Book Now'}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center flex-wrap gap-2">
                      <FaTag className="text-gray-400" />
                      {event.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                                   text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegistration && selectedTicket && (
          <EventRegistrationForm
            event={event}
            ticket={selectedTicket}
            onClose={closeRegistration}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
