'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FaCalendar, FaMapMarkerAlt, FaTicketAlt, FaSearch, FaFilter, FaClock, FaStar } from 'react-icons/fa'
import eventsData from '@/data/events.json'
import { format, isFuture, isPast, compareDesc, compareAsc } from 'date-fns'

type SortOption = 'upcoming' | 'latest' | 'all'

export default function EventsListing() {
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortOption, setSortOption] = useState<SortOption>('upcoming')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = eventsData.filter(event => {
      const matchesCategory = categoryFilter === 'all' || event.category.toLowerCase() === categoryFilter.toLowerCase()
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.location.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })

    // Sort based on selected option
    if (sortOption === 'upcoming') {
      filtered = filtered
        .filter(event => isFuture(new Date(event.date)))
        .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
    } else if (sortOption === 'latest') {
      filtered = filtered.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    }

    return filtered
  }, [categoryFilter, sortOption, searchTerm])

  return (
    <div className="min-h-screen pt-5 pb-20">
      {/* Header */}
      <section className="bg-gray-950 text-white py-16">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Explore <span className="text-blue-500">Programs</span>
            </h1>
            <p className="text-lg text-gray-400">
              Workshops, hackathons, bootcamps, and technical events designed to accelerate your tech career
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search - Compact Version */}
      <section className="bg-gray-50 dark:bg-gray-900 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="container-custom px-6">
          {/* Compact Filter Row */}
          <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
            {/* Search - Compact */}
            <div className="relative w-full lg:w-80">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search programs, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 
                         dark:border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors text-sm text-gray-900 dark:text-white"
              />
            </div>

            {/* Sort Options - Compact */}
            <div className="flex items-center gap-2 flex-wrap">
              <FaClock className="text-gray-500 text-sm" />
              {[
                { value: 'upcoming', label: 'Upcoming', icon: FaClock },
                { value: 'latest', label: 'Latest', icon: FaStar },
                { value: 'all', label: 'All', icon: FaCalendar }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortOption(option.value as SortOption)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    sortOption === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <option.icon className="text-xs" />
                  {option.label}
                </button>
              ))}
            </div>

            {/* Category Filter Buttons - Compact */}
            <div className="flex items-center gap-2 flex-wrap">
              <FaFilter className="text-gray-500 text-sm" />
              {[
                { value: 'all', label: 'All Programs' },
                { value: 'course', label: 'Courses' },
                { value: 'workshop', label: 'Workshops' },
                { value: 'hackathon', label: 'Hackathons' },
                { value: 'bootcamp', label: 'Bootcamps' },
                { value: 'event', label: 'Events' }
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategoryFilter(cat.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    categoryFilter === cat.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredAndSortedEvents.length}</span> program{filteredAndSortedEvents.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-6">
          {filteredAndSortedEvents.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No programs found matching your criteria</p>
              <button
                onClick={() => {
                  setCategoryFilter('all')
                  setSortOption('all')
                  setSearchTerm('')
                }}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedEvents.map((event, index) => {
                const eventLink = (event as any).externalLink || `/events/${event.slug}`
                const isExternal = !!(event as any).externalLink

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link 
                      href={eventLink}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                      <div className="group bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800
                                    hover:border-blue-300 dark:hover:border-blue-600/50 transition-all duration-300 h-full flex flex-col">
                        {/* Image */}
                        <div className="relative h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                          {event.images?.thumbnail ? (
                            <Image
                              src={event.images.thumbnail}
                              alt={event.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-blue-600 dark:text-blue-500">
                              {event.title.charAt(0)}
                            </div>
                          )}
                          {event.featured && (
                            <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                              FEATURED
                            </div>
                          )}
                          {event.status === 'sold-out' && (
                            <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold">
                              🎉 SOLD OUT
                            </div>
                          )}
                          <div className="absolute bottom-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium">
                            {event.category.toUpperCase()}
                          </div>
                          {isFuture(new Date(event.date)) && event.status !== 'sold-out' && (
                            <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                              UPCOMING
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 
                                       dark:group-hover:text-blue-500 transition-colors duration-200 line-clamp-2">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                            {event.tagline}
                          </p>

                          {/* Details */}
                          <div className="space-y-2 mb-4 flex-1">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <FaCalendar className="mr-2 text-blue-600 dark:text-blue-500 flex-shrink-0" />
                              {format(new Date(event.date), 'MMM dd, yyyy • hh:mm a')}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <FaMapMarkerAlt className="mr-2 text-blue-600 dark:text-blue-500 flex-shrink-0" />
                              {event.location}
                            </div>
                          </div>

                          {/* Price & CTA */}
                          <div className="flex items-center justify-between">
                            {event.status === 'sold-out' ? (
                              <div className="w-full">
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center">
                                  <span className="text-2xl mb-1 block">🎉</span>
                                  <span className="text-lg font-bold text-red-600 dark:text-red-400">
                                    SOLD OUT!
                                  </span>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                    All tickets claimed
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">From</span>
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-bold text-blue-600 dark:text-blue-500">
                                      ₹{Math.min(...event.tickets.map((t: any) => t.price))}
                                    </span>
                                    {event.tickets.some((t: any) => t.originalPrice) && (
                                      <span className="text-xs text-gray-400 line-through">
                                        ₹{(event.tickets.find((t: any) => t.originalPrice) as any)?.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700
                                           text-white px-4 py-2 rounded-xl font-medium text-sm 
                                           transition-colors"
                                >
                                  <FaTicketAlt />
                                  <span>Book</span>
                                </motion.button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
