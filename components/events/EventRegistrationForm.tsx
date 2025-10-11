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
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    studentId: '',
    collegeName: '',
    department: '',
    year: '',
    emergencyContact: '',
    address: '',
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file')
        return
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB')
        return
      }
      setPaymentScreenshot(file)
      toast.success('Screenshot selected successfully')
    }
  }

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const sendToGoogleSheet = async (data: any) => {
    try {
      const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

      if (!GOOGLE_SCRIPT_URL) {
        throw new Error('Google Script URL not configured')
      }

      console.log('Sending data to Google Sheet...')
      console.log('Data size:', JSON.stringify(data).length, 'bytes')
      console.log('Screenshot size:', data.paymentScreenshot ? data.paymentScreenshot.length : 0, 'bytes')

      // Send to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('Request sent to Google Sheet')
      // Note: With no-cors mode, we can't read the response
      // But if fetch doesn't throw an error, it means the request was sent
      
      // Wait a bit to ensure Google Script has time to process
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Data sent successfully')
      return true
    } catch (error) {
      console.error('Error sending to Google Sheet:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate payment screenshot
    if (!paymentScreenshot) {
      toast.error('Please upload payment screenshot before submitting')
      return
    }

    setIsSubmitting(true)

    try {
      // Convert screenshot to base64
      toast.info('Processing payment screenshot...')
      const base64Image = await convertFileToBase64(paymentScreenshot)

      // Prepare data to send to Google Sheet
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
        address: formData.address,
        wantCertificate: formData.wantCertificate,
        wantTransport: formData.wantTransport,
        hearAboutEvent: formData.hearAboutEvent,
        paymentScreenshot: base64Image,
        screenshotFileName: paymentScreenshot.name,
        status: 'Pending Verification'
      }

      // Send data to Google Apps Script
      toast.info('Submitting registration...')
      await sendToGoogleSheet(registrationData)

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
        address: '',
        wantCertificate: 'no',
        wantTransport: 'no',
        hearAboutEvent: ''
      })
      setPaymentScreenshot(null)
      
      // Close the form after a short delay
      setTimeout(() => {
        onClose()
      }, 2000)

    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Failed to submit registration. Please try again.')
    } finally {
      setIsSubmitting(false)
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full address"
              />
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
                    Upload Payment Screenshot *
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600
                               text-gray-700 dark:text-gray-300 rounded-lg font-medium
                               hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                               flex items-center gap-2"
                    >
                      <FaUpload />
                      Choose File
                    </button>
                    {paymentScreenshot && (
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-2">
                        ✓ {paymentScreenshot.name}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    After making payment, please upload the screenshot here (Max 5MB, Image only)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
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
