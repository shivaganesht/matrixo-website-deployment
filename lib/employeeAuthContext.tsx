'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
  updateDoc
} from 'firebase/firestore'
import { auth } from './firebaseConfig'
import { getFirestore } from 'firebase/firestore'

// Initialize Firestore
const db = getFirestore()

export interface EmployeeProfile {
  employeeId: string
  name: string
  email: string
  department: string
  designation: string
  joiningDate: string
  profileImage: string
  phone?: string
  role: 'employee' | 'admin'
}

export interface AttendanceRecord {
  id?: string
  employeeId: string
  date: string
  timestamp: Timestamp
  status: 'P' | 'A' | 'L' | 'O' | 'H' // Present, Absent, Leave, On Duty, Holiday
  checkInTime?: string
  checkOutTime?: string
  notes?: string
}

interface EmployeeAuthContextType {
  user: User | null
  employee: EmployeeProfile | null
  loading: boolean
  signIn: (employeeId: string, password: string) => Promise<void>
  logout: () => Promise<void>
  markAttendance: (status: AttendanceRecord['status'], notes?: string) => Promise<void>
  getAttendanceRecords: (startDate?: Date, endDate?: Date) => Promise<AttendanceRecord[]>
  getTodayAttendance: () => Promise<AttendanceRecord | null>
  calculateAttendancePercentage: (records: AttendanceRecord[]) => number
}

const EmployeeAuthContext = createContext<EmployeeAuthContextType | undefined>(undefined)

export function EmployeeAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [employee, setEmployee] = useState<EmployeeProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        // Fetch employee profile from Firestore
        const employeeDoc = await getDoc(doc(db, 'employees', user.uid))
        if (employeeDoc.exists()) {
          setEmployee(employeeDoc.data() as EmployeeProfile)
        }
      } else {
        setEmployee(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (employeeId: string, password: string) => {
    // First, find the employee by employeeId to get their email
    const employeesRef = collection(db, 'employees')
    const q = query(employeesRef, where('employeeId', '==', employeeId))
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      throw new Error('Employee ID not found')
    }

    const employeeData = querySnapshot.docs[0].data() as EmployeeProfile
    
    // Sign in with email and password
    await signInWithEmailAndPassword(auth, employeeData.email, password)
  }

  const logout = async () => {
    await signOut(auth)
    setEmployee(null)
  }

  const markAttendance = async (status: AttendanceRecord['status'], notes?: string) => {
    if (!user || !employee) throw new Error('Not authenticated')

    const today = new Date()
    const dateString = today.toISOString().split('T')[0]
    const now = new Date()
    
    const attendanceId = `${employee.employeeId}_${dateString}`
    
    const attendanceData: AttendanceRecord = {
      employeeId: employee.employeeId,
      date: dateString,
      timestamp: Timestamp.now(),
      status,
      checkInTime: now.toLocaleTimeString('en-US', { hour12: true }),
      notes: notes || ''
    }

    await setDoc(doc(db, 'attendance', attendanceId), attendanceData)
  }

  const getTodayAttendance = async (): Promise<AttendanceRecord | null> => {
    if (!employee) return null

    const today = new Date().toISOString().split('T')[0]
    const attendanceId = `${employee.employeeId}_${today}`
    
    const attendanceDoc = await getDoc(doc(db, 'attendance', attendanceId))
    
    if (attendanceDoc.exists()) {
      return { id: attendanceDoc.id, ...attendanceDoc.data() } as AttendanceRecord
    }
    return null
  }

  const getAttendanceRecords = async (startDate?: Date, endDate?: Date): Promise<AttendanceRecord[]> => {
    if (!employee) return []

    const attendanceRef = collection(db, 'attendance')
    let q = query(
      attendanceRef, 
      where('employeeId', '==', employee.employeeId),
      orderBy('date', 'desc')
    )

    const querySnapshot = await getDocs(q)
    let records = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as AttendanceRecord[]

    // Filter by date range if provided
    if (startDate && endDate) {
      const start = startDate.toISOString().split('T')[0]
      const end = endDate.toISOString().split('T')[0]
      records = records.filter(r => r.date >= start && r.date <= end)
    }

    return records
  }

  const calculateAttendancePercentage = (records: AttendanceRecord[]): number => {
    if (records.length === 0) return 0
    const presentDays = records.filter(r => r.status === 'P' || r.status === 'O').length
    return Math.round((presentDays / records.length) * 100)
  }

  return (
    <EmployeeAuthContext.Provider value={{
      user,
      employee,
      loading,
      signIn,
      logout,
      markAttendance,
      getAttendanceRecords,
      getTodayAttendance,
      calculateAttendancePercentage
    }}>
      {children}
    </EmployeeAuthContext.Provider>
  )
}

export function useEmployeeAuth() {
  const context = useContext(EmployeeAuthContext)
  if (context === undefined) {
    throw new Error('useEmployeeAuth must be used within an EmployeeAuthProvider')
  }
  return context
}

export { db }
