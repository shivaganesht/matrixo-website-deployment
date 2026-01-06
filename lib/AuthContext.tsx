'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
  ConfirmationResult
} from 'firebase/auth'
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '@/lib/firebaseConfig'

// Extend Window interface for recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: ConfirmationResult | null;
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName?: string) => Promise<void>
  logout: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithGithub: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  setupRecaptcha: (elementId: string) => void
  sendPhoneOTP: (phoneNumber: string) => Promise<ConfirmationResult>
  verifyPhoneOTP: (otp: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string, displayName?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName })
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }

  const setupRecaptcha = (elementId: string) => {
    if (typeof window !== 'undefined') {
      // Don't re-initialize if already exists and is valid
      if (window.recaptchaVerifier) {
        return; // Already set up
      }
      
      // Check if element exists
      const container = document.getElementById(elementId);
      if (!container) {
        console.warn('reCAPTCHA container not found:', elementId);
        return;
      }
      
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
          'size': 'invisible',
          'callback': () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber
            console.log('reCAPTCHA verified');
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            console.log('reCAPTCHA expired');
            window.recaptchaVerifier = null;
          }
        });
      } catch (error: any) {
        console.error('reCAPTCHA setup error:', error);
        // If already rendered, just keep the existing one
        if (error.message?.includes('already been rendered')) {
          console.log('Using existing reCAPTCHA');
        }
      }
    }
  }

  const clearRecaptcha = () => {
    if (typeof window !== 'undefined' && window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        // Ignore
      }
      window.recaptchaVerifier = null;
      
      // Also clear the grecaptcha widget if it exists
      const container = document.getElementById('recaptcha-container');
      if (container) {
        container.innerHTML = '';
      }
    }
  }

  const sendPhoneOTP = async (phoneNumber: string): Promise<ConfirmationResult> => {
    if (typeof window === 'undefined') {
      throw new Error('Phone auth only works in browser')
    }
    
    // Ensure recaptcha is set up
    if (!window.recaptchaVerifier) {
      setupRecaptcha('recaptcha-container');
    }
    
    const appVerifier = window.recaptchaVerifier
    if (!appVerifier) {
      throw new Error('reCAPTCHA not initialized. Please refresh the page.')
    }
    
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      window.confirmationResult = confirmationResult
      return confirmationResult
    } catch (error: any) {
      // Clear recaptcha on error so it can be re-initialized
      clearRecaptcha();
      throw error;
    }
  }

  const verifyPhoneOTP = async (otp: string): Promise<void> => {
    if (typeof window === 'undefined') {
      throw new Error('Phone auth only works in browser')
    }
    
    const confirmationResult = window.confirmationResult
    if (!confirmationResult) {
      throw new Error('Please request OTP first')
    }
    
    await confirmationResult.confirm(otp)
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
    signInWithGoogle,
    signInWithGithub,
    resetPassword,
    setupRecaptcha,
    sendPhoneOTP,
    verifyPhoneOTP
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
