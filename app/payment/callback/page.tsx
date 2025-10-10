'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaSpinner } from 'react-icons/fa'

function PaymentCallbackContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing')
  const [message, setMessage] = useState('Processing your payment...')

  useEffect(() => {
    const merchantTransactionId = searchParams.get('merchantTransactionId') || searchParams.get('txnId')
    
    if (!merchantTransactionId) {
      setStatus('failed')
      setMessage('Invalid transaction')
      return
    }

    // Verify payment
    fetch('/api/phonepe/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ merchantTransactionId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Payment successful, now complete the registration
          const pendingRegistration = sessionStorage.getItem('pendingRegistration')
          
          if (pendingRegistration) {
            const registrationData = JSON.parse(pendingRegistration)
            
            // Complete registration with payment details
            return fetch('/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...registrationData,
                paymentStatus: 'completed',
                transactionId: merchantTransactionId
              }),
            })
              .then(regRes => regRes.json())
              .then(regData => {
                if (regData.success || regData.message) {
                  setStatus('success')
                  setMessage('Payment successful! Your registration is confirmed. Check your email.')
                  sessionStorage.removeItem('pendingRegistration')
                  setTimeout(() => {
                    router.push('/events')
                  }, 3000)
                } else {
                  setStatus('failed')
                  setMessage('Payment successful but registration failed. Please contact support with transaction ID: ' + merchantTransactionId)
                }
              })
          } else {
            setStatus('success')
            setMessage('Payment successful! Your registration is confirmed.')
            setTimeout(() => {
              router.push('/events')
            }, 3000)
          }
        } else {
          setStatus('failed')
          setMessage(data.message || 'Payment verification failed')
          sessionStorage.removeItem('pendingRegistration')
        }
      })
      .catch(error => {
        console.error('Payment verification error:', error)
        setStatus('failed')
        setMessage('Failed to verify payment')
        sessionStorage.removeItem('pendingRegistration')
      })
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 text-center"
      >
        {status === 'processing' && (
          <>
            <FaSpinner className="text-6xl text-blue-500 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Processing Payment
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Redirecting to events page...
            </p>
          </>
        )}

        {status === 'failed' && (
          <>
            <div className="text-6xl text-red-500 mx-auto mb-4">✕</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
            <button
              onClick={() => router.push('/events')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Back to Events
            </button>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  )
}
