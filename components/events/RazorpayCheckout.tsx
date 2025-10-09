'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaSpinner } from 'react-icons/fa'
import { toast } from 'sonner'

interface RazorpayCheckoutProps {
  event: any
  ticket: any
  quantity: number
  onClose: () => void
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function RazorpayCheckout({ event, ticket, quantity, onClose }: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const totalAmount = ticket.price * quantity
  const gst = Math.round(totalAmount * 0.18) // 18% GST
  const grandTotal = totalAmount + gst

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name')
      return false
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email')
      return false
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast.error('Please enter a valid phone number')
      return false
    }
    return true
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleCheckout = async () => {
    if (!validateForm()) return

    setLoading(true)

    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      toast.error('Failed to load payment gateway. Please try again.')
      setLoading(false)
      return
    }

    try {
      // Create order on your backend
      console.log('Creating order...', {
        amount: grandTotal,
        currency: 'INR',
        eventId: event.id,
        ticketId: ticket.id,
        quantity: quantity,
        customerInfo: formData,
      })

      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: grandTotal,
          currency: 'INR',
          eventId: event.id,
          ticketId: ticket.id,
          quantity: quantity,
          customerInfo: formData,
        }),
      })

      console.log('Response status:', response.status)
      const orderData = await response.json()
      console.log('Order data received:', orderData)

      if (!response.ok) {
        throw new Error(orderData.error || orderData.details || 'Failed to create order')
      }

      if (!orderData.id) {
        throw new Error('No order ID received from server')
      }

      // Razorpay checkout options (following official Razorpay documentation)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: grandTotal * 100, // Amount in paise (₹1 = 100 paise)
        currency: 'INR',
        name: 'matriXO',
        description: `${event.title} - ${ticket.name}`,
        image: '/logos/matrixo logo wide.png',
        order_id: orderData.id,
        handler: async function (response: any) {
          // Payment successful - handler function
          setLoading(true)
          try {
            // Verify payment signature on backend
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerInfo: formData,
                eventId: event.id,
                ticketId: ticket.id,
                quantity: quantity,
                amount: grandTotal,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (verifyData.success) {
              toast.success('🎉 Payment successful! Check your email for confirmation.')
              setTimeout(() => {
                onClose()
                // Optionally redirect to success page
                // window.location.href = '/booking-success?id=' + verifyData.bookingId
              }, 2000)
            } else {
              toast.error('Payment verification failed. Please contact support with Payment ID: ' + response.razorpay_payment_id)
            }
          } catch (error) {
            console.error('Verification error:', error)
            toast.error('Failed to verify payment. Please contact support with Payment ID: ' + response.razorpay_payment_id)
          } finally {
            setLoading(false)
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          event_id: event.id,
          event_title: event.title,
          ticket_type: ticket.name,
          quantity: quantity,
        },
        theme: {
          color: '#00d4ff', // matriXO neon blue
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
            toast.info('Payment cancelled')
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      
      // Handle payment failures
      razorpay.on('payment.failed', function (response: any) {
        setLoading(false)
        console.error('Payment failed:', response.error)
        
        toast.error(
          `Payment failed: ${response.error.description || 'Unknown error'}`,
          { duration: 5000 }
        )
        
        // Log error details for debugging
        console.log('Error Code:', response.error.code)
        console.log('Error Description:', response.error.description)
        console.log('Error Source:', response.error.source)
        console.log('Error Step:', response.error.step)
        console.log('Error Reason:', response.error.reason)
        if (response.error.metadata) {
          console.log('Order ID:', response.error.metadata.order_id)
          console.log('Payment ID:', response.error.metadata.payment_id)
        }
      })

      razorpay.open()
      setLoading(false)
    } catch (error: any) {
      console.error('Checkout error:', error)
      const errorMessage = error.message || 'Failed to initiate payment. Please try again.'
      toast.error(errorMessage, { duration: 5000 })
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold gradient-text">Complete Your Registration</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {event.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  {ticket.name} x {quantity}
                </span>
                <span className="font-semibold">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">GST (18%)</span>
                <span className="font-semibold">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-700 pt-2 mt-2">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total Amount</span>
                  <span className="font-bold gradient-text">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Your Details</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                <FaUser className="inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800 focus:border-neon-blue focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                <FaEnvelope className="inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800 focus:border-neon-blue focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                <FaPhone className="inline mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                maxLength={10}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800 focus:border-neon-blue focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Checkout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            disabled={loading}
            className="w-full btn-primary py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <FaSpinner className="animate-spin" />
                <span>Processing...</span>
              </span>
            ) : (
              `Pay ₹${grandTotal.toLocaleString('en-IN')} - Proceed to Razorpay`
            )}
          </motion.button>

          <p className="text-xs text-center text-gray-500">
            Powered by Razorpay • Secure Payment Gateway
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
