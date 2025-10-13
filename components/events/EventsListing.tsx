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
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-20">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Programs</span>
            </h1>
            <p className="text-xl text-gray-300">
              Workshops, hackathons, bootcamps, and technical events designed to accelerate your tech career
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-gray-50 dark:bg-gray-900 py-8 border-b border-gray-200 dark:border-gray-800">
        <div className="container-custom px-6">
          {/* Search */}
          <div className="relative w-full md:w-96 mb-6">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs, topics, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 
                       dark:border-gray-700 focus:border-blue-500 focus:outline-none transition-colors text-gray-900 dark:text-white"
            />
          </div>

          {/* Sort Options */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FaClock className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort By:</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { value: 'upcoming', label: 'Upcoming', icon: FaClock },
                { value: 'latest', label: 'Latest Added', icon: FaStar },
                { value: 'all', label: 'All Events', icon: FaCalendar }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortOption(option.value as SortOption)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                    sortOption === option.value
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <option.icon className="text-sm" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter By Type:</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
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
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
                    categoryFilter === cat.value
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
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
                className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-200"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedEvents.map((event, index) => {
                const eventLink = (event as any).externalLink || `/events/${event.slug}`
                const isExternal = !!(event as any).externalLink

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <Link 
                      href={eventLink}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                      <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                                    transition-all duration-200 hover:-translate-y-2 border-2 border-transparent 
                                    hover:border-blue-500/30 h-full flex flex-col">
                        {/* Image */}
                        <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 overflow-hidden">
                          {event.images?.thumbnail ? (
                            <Image
                              src={event.images.thumbnail}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                              {event.title.charAt(0)}
                            </div>
                          )}
                          {event.featured && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                              FEATURED
                            </div>
                          )}
                          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {event.category.toUpperCase()}
                          </div>
                          {isFuture(new Date(event.date)) && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                              UPCOMING
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:bg-clip-text 
                                       group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 
                                       group-hover:to-purple-600 transition-all duration-200 line-clamp-2">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {event.tagline}
                          </p>

                          {/* Details */}
                          <div className="space-y-2 mb-4 flex-1">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <FaCalendar className="mr-2 text-blue-500 flex-shrink-0" />
                              {format(new Date(event.date), 'MMM dd, yyyy • hh:mm a')}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <FaMapMarkerAlt className="mr-2 text-purple-600 flex-shrink-0" />
                              {event.location}
                            </div>
                          </div>

                          {/* Price & CTA */}
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">From</span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold gradient-text">
                                  ₹{Math.min(...event.tickets.map((t: any) => t.price))}
                                </span>
                                {event.tickets.some((t: any) => t.originalPrice) && (
                                  <span className="text-sm text-gray-400 line-through">
                                    ₹{(event.tickets.find((t: any) => t.originalPrice) as any)?.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center space-x-2 bg-gradient-to-r from-neon-blue to-neon-purple 
                                       text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg 
                                       hover:shadow-neon-blue/50 transition-shadow"
                            >
                              <FaTicketAlt />
                              <span>Book</span>
                            </motion.button>
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
