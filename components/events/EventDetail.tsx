'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { format } from 'date-fns'
import { FaCalendar, FaMapMarkerAlt, FaClock, FaUsers, FaTag } from 'react-icons/fa'
import EventRegistrationForm from './EventRegistrationForm'

export default function EventDetail({ event }: { event: any }) {
  const [showRegistration, setShowRegistration] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)

  const handleRegisterNow = (ticket: any) => {
    setSelectedTicket(ticket)
    setShowRegistration(true)
  }

  const closeRegistration = () => {
    setShowRegistration(false)
    setSelectedTicket(null)
  }

  const percentSold = ((event.ticketsSold / event.totalCapacity) * 100).toFixed(0)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Banner */}
      <section className="relative h-[60vh] bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20">
        <div className="absolute inset-0 flex items-center justify-center text-9xl font-bold gradient-text">
          {event.title.charAt(0)}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
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

              {/* Venue */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold mb-6">Venue</h2>
                <div className="glass-card p-6">
                  <FaMapMarkerAlt className="text-neon-blue text-2xl mb-3" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {event.venue}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{event.location}</p>
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
                        <div className="w-20 h-20 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full 
                                      flex items-center justify-center text-white text-2xl font-bold mb-4">
                          {speaker.name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                          {speaker.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {speaker.designation}
                        </p>
                        <p className="text-sm text-neon-blue font-medium">
                          {speaker.topic}
                        </p>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...event.partners, ...event.sponsors].map((org: string, index: number) => (
                    <div key={index} className="glass-card p-4 text-center hover-lift">
                      <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 
                                    rounded-full flex items-center justify-center text-2xl font-bold gradient-text">
                        {org.charAt(0)}
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {org}
                      </p>
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
                        {event.ticketsSold} / {event.totalCapacity} sold
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
                      {event.totalCapacity - event.ticketsSold} tickets remaining
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
                            {ticket.perks.map((perk: string, i: number) => (
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
                            {ticket.available} tickets available
                          </span>
                        </div>

                        <button
                          onClick={() => handleRegisterNow(ticket)}
                          disabled={ticket.available === 0}
                          className="w-full btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {ticket.available === 0 ? 'Sold Out' : 'Register Now'}
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
