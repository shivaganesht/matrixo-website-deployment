'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGoogle, FaGithub, FaArrowRight, FaShieldAlt, FaBolt, FaLock } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { toast } from 'sonner'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()
  const { signIn, signUp, signInWithGoogle, signInWithGithub } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password)
        toast.success('Welcome back!')
        router.push('/')
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match')
          setLoading(false)
          return
        }
        await signUp(formData.email, formData.password, formData.name)
        toast.success('Account created successfully!')
        router.push('/')
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already in use')
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password should be at least 6 characters')
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address')
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error('Invalid email or password')
      } else {
        toast.error(error.message || 'Authentication failed')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
      toast.success('Signed in successfully!')
      router.push('/')
    } catch (error: any) {
      console.error('Google sign-in error:', error)
      setLoading(false)
      
      if (error.code === 'auth/popup-closed-by-user') {
        toast.info('Sign-in cancelled')
        return
      }
      
      if (error.code === 'auth/popup-blocked') {
        toast.error('Popup blocked! Please allow popups.')
      } else if (error.code === 'auth/unauthorized-domain') {
        toast.error('Domain not authorized in Firebase Console.')
      } else {
        toast.error('Google sign-in failed.')
      }
      return
    }
    setLoading(false)
  }

  const handleGithubSignIn = async () => {
    setLoading(true)
    try {
      await signInWithGithub()
      toast.success('Signed in successfully!')
      router.push('/')
    } catch (error: any) {
      console.error('GitHub sign-in error:', error)
      setLoading(false)
      
      if (error.code === 'auth/popup-closed-by-user') {
        toast.info('Sign-in cancelled')
        return
      }
      
      if (error.code === 'auth/popup-blocked') {
        toast.error('Popup blocked! Please allow popups.')
      } else if (error.code === 'auth/unauthorized-domain') {
        toast.error('Domain not authorized in Firebase Console.')
      } else {
        toast.error('GitHub sign-in failed.')
      }
      return
    }
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Subtle Blue Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-50" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-8 py-24">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left space-y-6 hidden lg:block"
          >
            <div className="space-y-4">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  Experience
                </h1>
                <h2 className="text-5xl font-bold text-blue-600 dark:text-blue-500 pb-1 leading-tight">
                  Personalized Learning
                </h2>
              </div>
              <p className="text-2xl font-light text-gray-600 dark:text-gray-300">
                Vision Platform for Next-Gen Education
              </p>
            </div>

            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <FaShieldAlt className="text-2xl text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Enterprise Security</h3>
                  <p className="text-gray-600 dark:text-gray-400">End-to-end encryption & data protection</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <FaBolt className="text-2xl text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Lightning Fast</h3>
                  <p className="text-gray-600 dark:text-gray-400">Instant access to all platform features</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <FaLock className="text-2xl text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Privacy First</h3>
                  <p className="text-gray-600 dark:text-gray-400">Your data, your control, always</p>
                </div>
              </div>
            </div>

            <div className="pt-8 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
              <span>Trusted by 10,000+ students</span>
              <span>•</span>
              <span>500+ institutions</span>
            </div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 lg:p-8 shadow-lg">
              {/* Mobile Logo */}
              <div className="lg:hidden mb-8 flex justify-center relative h-12">
                {/* Light Mode Logo (Black) */}
                <img 
                  src="/logos/logo-light.png" 
                  alt="matriXO Logo" 
                  className="h-12 w-auto object-contain dark:hidden"
                />
                {/* Dark Mode Logo (White) */}
                <img 
                  src="/logos/logo-dark.png" 
                  alt="matriXO Logo" 
                  className="h-12 w-auto object-contain hidden dark:block"
                />
              </div>

              {/* Tab Switcher */}
              <div className="flex gap-2 mb-6 p-1 bg-gray-200 dark:bg-gray-800 rounded-xl">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2.5 px-5 rounded-lg font-medium transition-all ${
                    isLogin
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2.5 px-5 rounded-lg font-medium transition-all ${
                    !isLogin
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* OAuth Buttons */}
              <div className="space-y-2.5 mb-6">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-5 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-900 rounded-full animate-spin" />
                  ) : (
                    <>
                      <FaGoogle className="text-xl" />
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleGithubSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-5 bg-gray-800 dark:bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 dark:hover:bg-gray-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg border border-gray-700 dark:border-gray-700"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <FaGithub className="text-xl" />
                      <span>Continue with GitHub</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-800" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-500">Or continue with email</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required={!isLogin}
                        className="w-full py-3 px-5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full py-3 px-5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full py-3 px-5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500"
                />

                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required={!isLogin}
                        className="w-full py-3 px-5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {isLogin && (
                  <div className="flex justify-end">
                    <Link href="/forgot-password" className="text-sm text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                By continuing, you agree to our{' '}
                <Link href="/terms" className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
