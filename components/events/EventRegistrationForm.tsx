'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaUniversity, FaGraduationCap, FaMapMarkerAlt, FaBus, FaInfoCircle, FaTimes, FaUpload } from 'react-icons/fa'
import { toast } from 'sonner'

interface EventRegistrationFormProps {
  event: any
  ticket: any
  onClose: () => void
}

export default function EventRegistrationForm({ event, ticket, onClose }: EventRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    studentId: '',
    collegeName: '',
    department: '',
    year: '',
    emergencyContact: '',
    city: '',
    state: '',
    transactionId: '',
    wantCertificate: 'no',
    wantTransport: 'no',
    hearAboutEvent: ''
  })

  // UPI Payment Link for TEDxKPRIT (₹499)
  const UPI_PAYMENT_LINK = 'upi://pay?pa=vyapar.171588997321@hdfcbank&amt=499&cu=INR&pn=UPIPE%20User'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const sendToGoogleSheet = async (data: any) => {
    try {
      const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

      console.log('🔍 DEBUG: Starting submission')
      console.log('🔍 Script URL:', GOOGLE_SCRIPT_URL)

      if (!GOOGLE_SCRIPT_URL) {
        console.error('❌ Google Script URL is missing!')
        throw new Error('Google Script URL not configured. Please check .env.local file.')
      }

      console.log('📊 Data to send:', data)

      console.log('🚀 Sending request to Google Apps Script...')

      // Send to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('✅ Request sent successfully')
      console.log('⏳ Waiting for Google Script to process...')
      
      // Wait for Google Script to process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('✅ Data sent to Google Sheet successfully')
      return true
    } catch (error: any) {
      console.error('❌ ERROR in sendToGoogleSheet:', error)
      console.error('❌ Error message:', error.message)
      console.error('❌ Error stack:', error.stack)
      throw new Error(`Failed to submit: ${error.message}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('🚀 Form submission started')

    // Validate transaction ID for paid events
    if (ticket.price > 0 && !formData.transactionId) {
      console.error('❌ No transaction ID provided')
      toast.error('Please enter the UPI Transaction ID')
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare data to send to Google Sheet
      console.log('📝 Preparing registration data...')
      const registrationData = {
        timestamp: new Date().toISOString(),
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        ticketType: ticket.name,
        ticketPrice: ticket.price,
        fullName: formData.fullName,
        contactNumber: formData.contactNumber,
        email: formData.email,
        studentId: formData.studentId,
        collegeName: formData.collegeName,
        department: formData.department,
        year: formData.year,
        emergencyContact: formData.emergencyContact,
        city: formData.city,
        state: formData.state,
        transactionId: formData.transactionId,
        wantCertificate: formData.wantCertificate,
        wantTransport: formData.wantTransport,
        hearAboutEvent: formData.hearAboutEvent,
        status: 'Pending Verification'
      }

      console.log('✅ Registration data prepared:', registrationData)

      // Send data to Google Apps Script
      console.log('📤 Sending to Google Apps Script...')
      toast.info('Submitting registration...')
      
      await sendToGoogleSheet(registrationData)

      console.log('🎉 Registration submitted successfully!')
      
      // Success message
      toast.success('✅ Registration submitted successfully! We will verify your payment and send confirmation via email.')
      
      // Reset form
      setFormData({
        fullName: '',
        contactNumber: '',
        email: '',
        studentId: '',
        collegeName: '',
        department: '',
        year: '',
        emergencyContact: '',
        city: '',
        state: '',
        transactionId: '',
        wantCertificate: 'no',
        wantTransport: 'no',
        hearAboutEvent: ''
      })
      
      // Close the form after a short delay
      setTimeout(() => {
        console.log('Closing form...')
        onClose()
      }, 2000)

    } catch (error: any) {
      console.error('❌❌❌ REGISTRATION ERROR:', error)
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
      toast.error(`Failed to submit: ${error.message || 'Please try again'}`)
    } finally {
      setIsSubmitting(false)
      console.log('Form submission process completed')
    }
  }

  const handlePaymentClick = () => {
    window.location.href = UPI_PAYMENT_LINK
    toast.info('Complete payment and upload screenshot below')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes className="text-2xl" />
          </button>
          <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
          <p className="text-white/90">Complete your registration</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FaUser className="text-blue-500" />
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email ID *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Emergency Contact Number *
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Emergency contact number"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your city"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your state"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FaGraduationCap className="text-purple-500" />
              Academic Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Student ID / Roll Number *
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your roll number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  College Name *
                </label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your college name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year *
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FaInfoCircle className="text-green-500" />
              Preferences
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Hide certificate option for TEDxKPRIT */}
              {event.id !== 'tedxkprit-2025' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Do you prefer a certificate? *
                  </label>
                  <select
                    name="wantCertificate"
                    value={formData.wantCertificate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes (₹50)</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Do you want transport? *
                </label>
                <select
                  name="wantTransport"
                  value={formData.wantTransport}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  How did you know about this event? *
                </label>
                <select
                  name="hearAboutEvent"
                  value={formData.hearAboutEvent}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select an option</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="matriXO">matriXO</option>
                  <option value="Friend">Friend/Word of mouth</option>
                  <option value="College">College/Professor</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FaInfoCircle className="text-orange-500" />
              Payment
            </h3>

            <div className="glass-card p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-2 border-orange-200 dark:border-orange-700">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">Ticket Price: ₹{ticket.price}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pay via UPI</p>
                  </div>
                  <button
                    type="button"
                    onClick={handlePaymentClick}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
                             text-white rounded-lg font-semibold shadow-lg
                             hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    Pay Now ₹{ticket.price}
                  </button>
                </div>

                <div className="border-t border-orange-300 dark:border-orange-700 pt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    UPI Transaction ID *
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter UPI Transaction ID (e.g., 123456789012)"
                  />
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    After making payment, enter your 12-digit UPI Transaction ID here
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">`
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 
                       text-gray-700 dark:text-gray-300 rounded-lg font-semibold
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 
                       text-white rounded-lg font-semibold shadow-lg
                       hover:shadow-xl transform hover:scale-105 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Submitting...' : 'Complete Registration'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
