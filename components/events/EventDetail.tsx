'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { FaCalendar, FaMapMarkerAlt, FaClock, FaUsers, FaTag } from 'react-icons/fa'
import EventRegistrationForm from './EventRegistrationForm'

export default function EventDetail({ event }: { event: any }) {
  const [showRegistration, setShowRegistration] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [ticketsSold, setTicketsSold] = useState(event.ticketsSold || 0)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch live ticket count
  useEffect(() => {
    const fetchTicketCount = async () => {
      try {
        const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
        if (!GOOGLE_SCRIPT_URL) {
          console.log('Google Script URL not configured')
          setIsLoading(false)
          return
        }

        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getTicketCount&eventId=${event.id}`, {
          method: 'GET',
          cache: 'no-store',
        })

        const data = await response.json()
        if (data.success) {
          setTicketsSold(data.ticketsSold)
        }
      } catch (error) {
        console.error('Error fetching ticket count:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTicketCount()
    
    // Refresh ticket count every 30 seconds
    const interval = setInterval(fetchTicketCount, 30000)
    
    return () => clearInterval(interval)
  }, [event.id])

  const handleRegisterNow = (ticket: any) => {
    const remainingTickets = event.totalCapacity - ticketsSold
    if (remainingTickets <= 0) {
      alert('Sorry, this event is sold out!')
      return
    }
    setSelectedTicket(ticket)
    setShowRegistration(true)
  }

  const closeRegistration = () => {
    setShowRegistration(false)
    setSelectedTicket(null)
    // Refresh ticket count after registration
    setTimeout(async () => {
      try {
        const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
        if (GOOGLE_SCRIPT_URL) {
          const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getTicketCount&eventId=${event.id}`, {
            method: 'GET',
            cache: 'no-store',
          })
          const data = await response.json()
          if (data.success) {
            setTicketsSold(data.ticketsSold)
          }
        }
      } catch (error) {
        console.error('Error refreshing ticket count:', error)
      }
    }, 1000)
  }

  const percentSold = ((ticketsSold / event.totalCapacity) * 100).toFixed(0)
  const remainingTickets = event.totalCapacity - ticketsSold
  const isSoldOut = remainingTickets <= 0
  
  // Check if this is TEDxKPRIT event
  const isTEDxEvent = event.id === 'tedxkprit-2025'

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Banner */}
      <section className="relative h-[60vh] bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20">
        {isTEDxEvent ? (
          <>
            {/* TEDxKPRIT Banner Image */}
            <div className="absolute inset-0 flex items-start justify-center flex items-start bg-white dark:bg-gray-900">
              <Image
                src={event.images.banner}
                alt="Break The Loop"
                fill
                className="object-contain object-top p-8"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
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
              <span className="inline-block mb-4 bg-neon-pink text-white px-4 py-2 rounded-full text-sm font-bold">
                FEATURED EVENT
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              {event.title}
            </h1>
            <p className="text-2xl text-gray-200 font-medium mb-6">
              {event.tagline}
            </p>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaCalendar className="text-neon-blue" />
                <span>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaClock className="text-neon-purple" />
                <span>{format(new Date(event.date), 'hh:mm a')}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaMapMarkerAlt className="text-neon-pink" />
                <span>{event.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold mb-6 gradient-text">About This Event</h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
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
                  <h2 className="text-3xl font-bold mb-6 gradient-text">{event.theme.title}</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {event.theme.pillars.map((pillar: any, index: number) => (
                      <div key={index} className="glass-card p-6 hover-lift">
                        <h3 className="text-xl font-bold mb-3 text-neon-blue">
                          {pillar.name}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
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
                <h2 className="text-3xl font-bold mb-6">Venue</h2>
                <div className="glass-card p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-neon-blue text-2xl mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {event.venue}
                      </h3>
                      <a 
                        href="https://maps.app.goo.gl/phYNNYQyWgacvBA59"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neon-blue hover:text-neon-purple transition-colors duration-300 
                                 flex items-center gap-2 group cursor-pointer font-medium"
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
                  <h2 className="text-3xl font-bold mb-6">Event Agenda</h2>
                  <div className="space-y-4">
                    {event.agenda.map((item: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4 glass-card p-4 hover-lift">
                        <div className="flex-shrink-0 w-24 text-neon-blue font-bold">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
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
                  <h2 className="text-3xl font-bold mb-6">Featured Speakers</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {event.speakers.map((speaker: any, index: number) => (
                      <div key={index} className="glass-card p-6 hover-lift">
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
                          <div className="w-20 h-20 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full 
                                        flex items-center justify-center text-white text-2xl font-bold mb-4">
                            {speaker.name.charAt(0)}
                          </div>
                        )}
                        <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                          {speaker.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {speaker.title || speaker.designation}
                        </p>
                        {speaker.bio && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-3">
                            {speaker.bio}
                          </p>
                        )}
                        {speaker.topic && (
                          <p className="text-sm text-neon-blue font-medium">
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
                                className="text-xs text-neon-blue hover:underline"
                              >
                                LinkedIn
                              </a>
                            )}
                            {speaker.socialLinks.website && (
                              <a
                                href={speaker.socialLinks.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-neon-blue hover:underline"
                              >
                                Website
                              </a>
                            )}
                            {speaker.socialLinks.instagram && (
                              <a
                                href={speaker.socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-neon-blue hover:underline"
                              >
                                Instagram
                              </a>
                            )}
                            {speaker.socialLinks.facebook && (
                              <a
                                href={speaker.socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-neon-blue hover:underline"
                              >
                                Facebook
                              </a>
                            )}
                          </div>
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
                <h2 className="text-3xl font-bold mb-6">Partners & Sponsors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[...event.partners, ...event.sponsors].map((org: string, index: number) => (
                    <div key={index} className="glass-card p-6 text-center hover-lift">
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
                          <p className="text-base font-bold gradient-text mb-1">
                            matriXO
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Ticketing & Community Partner
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 
                                        rounded-full flex items-center justify-center text-2xl font-bold gradient-text">
                            {org.charAt(0)}
                          </div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card p-8 space-y-6"
                >
                  <h2 className="text-2xl font-bold gradient-text">Get Your Tickets</h2>

                  {/* Ticket Stats */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {isLoading ? 'Loading...' : `${ticketsSold} / ${event.totalCapacity} sold`}
                      </span>
                      <span className="text-sm font-bold text-neon-blue">
                        {percentSold}% sold
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        style={{ width: `${percentSold}%` }}
                        className="h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-1000"
                      />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FaUsers className="mr-2" />
                      {isLoading ? 'Loading...' : isSoldOut ? 'SOLD OUT!' : `${remainingTickets} tickets remaining`}
                    </div>
                  </div>

                  {/* Ticket Options */}
                  <div className="space-y-4">
                    {event.tickets.map((ticket: any) => (
                      <div
                        key={ticket.id}
                        className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 
                                 hover:border-neon-blue transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                              {ticket.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {ticket.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold gradient-text">
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
                              <div key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-neon-blue mr-2">✓</span>
                                {perk}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Availability */}
                        <div className="mb-3">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {isLoading ? 'Checking availability...' : isSoldOut ? 'SOLD OUT' : `${remainingTickets} tickets available`}
                          </span>
                        </div>

                        <button
                          onClick={() => handleRegisterNow(ticket)}
                          disabled={isSoldOut || isLoading}
                          className={`w-full py-4 px-6 text-base font-bold rounded-xl transition-all duration-300 transform ${
                            isSoldOut 
                              ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed' 
                              : 'bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink text-white shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 active:scale-95 animate-pulse-slow'
                          } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:animate-none`}
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Loading...
                            </span>
                          ) : isSoldOut ? (
                            '🎫 Sold Out'
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              🎟️ Book Now
                            </span>
                          )}
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
