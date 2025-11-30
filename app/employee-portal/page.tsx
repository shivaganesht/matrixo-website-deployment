'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaUser, 
  FaLock, 
  FaSignOutAlt, 
  FaCalendarCheck, 
  FaChartLine, 
  FaHistory,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaPlane,
  FaBriefcase,
  FaUmbrellaBeach,
  FaSpinner,
  FaIdCard,
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaChevronDown,
  FaExclamationTriangle
} from 'react-icons/fa'
import { EmployeeAuthProvider, useEmployeeAuth, AttendanceRecord } from '@/lib/employeeAuthContext'
import { toast, Toaster } from 'sonner'
import Link from 'next/link'

// Status Colors and Icons
const statusConfig = {
  P: { label: 'Present', color: 'bg-green-500', icon: FaCheckCircle, textColor: 'text-green-500' },
  A: { label: 'Absent', color: 'bg-red-500', icon: FaTimesCircle, textColor: 'text-red-500' },
  L: { label: 'Leave', color: 'bg-yellow-500', icon: FaUmbrellaBeach, textColor: 'text-yellow-500' },
  O: { label: 'On Duty', color: 'bg-blue-500', icon: FaBriefcase, textColor: 'text-blue-500' },
  H: { label: 'Holiday', color: 'bg-purple-500', icon: FaPlane, textColor: 'text-purple-500' }
}

// Login Component
function LoginForm() {
  const [employeeId, setEmployeeId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { signIn } = useEmployeeAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!employeeId || !password) {
      toast.error('Please enter both Employee ID and Password')
      return
    }
    
    setLoading(true)
    try {
      await signIn(employeeId, password)
      toast.success('Welcome back!')
    } catch (error: any) {
      console.error('Login error:', error)
      if (error.message === 'Employee ID not found') {
        toast.error('Employee ID not found. Please contact administrator.')
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        toast.error('Invalid password. Please try again.')
      } else {
        toast.error('Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <motion.img 
              src="/logos/logo-dark.png" 
              alt="matriXO" 
              className="h-12 mx-auto mb-4"
              whileHover={{ scale: 1.05 }}
            />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Employee Portal</h1>
          <p className="text-gray-400">Access your attendance dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee ID Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FaIdCard className="text-purple-400" />
                Employee ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="e.g., M-01 or M-A001"
                  className="w-full py-3 px-4 bg-gray-800/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FaLock className="text-purple-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full py-3 px-4 bg-gray-800/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <FaExclamationTriangle className="text-yellow-500 mt-0.5 flex-shrink-0" />
                If you forget your password, please contact the system administrator to reset it.
              </p>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <FaUser />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link href="https://matrixo.in" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
              ← Back to matriXO Website
            </Link>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FaLock className="text-green-500" /> Secure Login
          </span>
          <span>•</span>
          <span>256-bit Encryption</span>
        </div>
      </motion.div>
    </div>
  )
}

// Dashboard Header Component
function DashboardHeader() {
  const { employee, logout } = useEmployeeAuth()
  const [showProfile, setShowProfile] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  return (
    <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/logos/logo-dark.png" alt="matriXO" className="h-8" />
            <div className="hidden sm:block">
              <span className="text-white font-bold">Employee Portal</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-4">
              <a href="#attendance" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                <FaCalendarCheck /> Attendance
              </a>
              <a href="#dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                <FaChartLine /> Dashboard
              </a>
              <a href="#history" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                <FaHistory /> History
              </a>
            </nav>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white transition-colors"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
              >
                <img
                  src={employee?.profileImage || '/team/default-avatar.png'}
                  alt={employee?.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-purple-500"
                />
                <span className="hidden sm:block text-white text-sm font-medium">
                  {employee?.name?.split(' ')[0]}
                </span>
                <FaChevronDown className={`text-gray-400 text-xs transition-transform ${showProfile ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    {/* Profile Header */}
                    <div className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-b border-gray-700">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee?.profileImage || '/team/default-avatar.png'}
                          alt={employee?.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                        />
                        <div>
                          <p className="text-white font-semibold">{employee?.name}</p>
                          <p className="text-purple-400 text-sm">{employee?.employeeId}</p>
                        </div>
                      </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-4 space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaBuilding className="text-purple-400" />
                        <span>{employee?.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaBriefcase className="text-purple-400" />
                        <span>{employee?.designation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaEnvelope className="text-purple-400" />
                        <span className="truncate">{employee?.email}</span>
                      </div>
                      {employee?.phone && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <FaPhone className="text-purple-400" />
                          <span>{employee?.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-700">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
                      >
                        <FaSignOutAlt />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800 text-gray-300"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-700 py-4"
            >
              <nav className="flex flex-col gap-2">
                <a href="#attendance" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
                  <FaCalendarCheck /> Attendance
                </a>
                <a href="#dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
                  <FaChartLine /> Dashboard
                </a>
                <a href="#history" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
                  <FaHistory /> History
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

// Attendance Marker Component
function AttendanceMarker() {
  const { employee, markAttendance, getTodayAttendance } = useEmployeeAuth()
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [marking, setMarking] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<AttendanceRecord['status']>('P')
  const [notes, setNotes] = useState('')
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)

  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  const currentTime = today.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })

  useEffect(() => {
    const fetchTodayAttendance = async () => {
      try {
        const attendance = await getTodayAttendance()
        setTodayAttendance(attendance)
      } catch (error) {
        console.error('Error fetching today attendance:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTodayAttendance()
  }, [getTodayAttendance])

  const handleMarkAttendance = async () => {
    setMarking(true)
    try {
      await markAttendance(selectedStatus, notes)
      const attendance = await getTodayAttendance()
      setTodayAttendance(attendance)
      toast.success(`Attendance for ${formattedDate} marked successfully!`)
      setNotes('')
    } catch (error) {
      console.error('Error marking attendance:', error)
      toast.error('Failed to mark attendance. Please try again.')
    } finally {
      setMarking(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <FaSpinner className="animate-spin text-4xl text-purple-500" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      id="attendance"
      className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 md:p-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaCalendarCheck className="text-purple-500" />
            Mark Attendance
          </h2>
          <p className="text-gray-400 mt-1">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <FaClock className="text-cyan-400" />
          <span className="text-xl font-mono">{currentTime}</span>
        </div>
      </div>

      {todayAttendance ? (
        /* Already Marked */
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl ${statusConfig[todayAttendance.status].color} flex items-center justify-center`}>
              {(() => {
                const Icon = statusConfig[todayAttendance.status].icon
                return <Icon className="text-3xl text-white" />
              })()}
            </div>
            <div>
              <p className="text-gray-400 text-sm">Today's Status</p>
              <p className="text-2xl font-bold text-white">
                {statusConfig[todayAttendance.status].label}
              </p>
              {todayAttendance.checkInTime && (
                <p className="text-gray-400 text-sm mt-1">
                  Checked in at {todayAttendance.checkInTime}
                </p>
              )}
            </div>
          </div>
          {todayAttendance.notes && (
            <div className="mt-4 p-3 bg-gray-800 rounded-xl">
              <p className="text-gray-400 text-sm">Notes: {todayAttendance.notes}</p>
            </div>
          )}
        </div>
      ) : (
        /* Mark Attendance Form */
        <div className="space-y-6">
          {/* Status Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {(Object.entries(statusConfig) as [AttendanceRecord['status'], typeof statusConfig['P']][]).map(([status, config]) => (
              <motion.button
                key={status}
                onClick={() => setSelectedStatus(status)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  selectedStatus === status
                    ? `${config.color} border-white/50 shadow-lg`
                    : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                }`}
              >
                <config.icon className={`text-2xl mx-auto mb-2 ${selectedStatus === status ? 'text-white' : config.textColor}`} />
                <p className={`text-sm font-medium ${selectedStatus === status ? 'text-white' : 'text-gray-300'}`}>
                  {config.label}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Notes Input */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes for today's attendance..."
              rows={2}
              className="w-full py-3 px-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleMarkAttendance}
            disabled={marking}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {marking ? (
              <>
                <FaSpinner className="animate-spin" />
                Marking Attendance...
              </>
            ) : (
              <>
                <FaCheckCircle />
                Mark Attendance for Today
              </>
            )}
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}

// Stats Card Component
function StatCard({ title, value, icon: Icon, color, subtext }: { 
  title: string
  value: string | number
  icon: any
  color: string
  subtext?: string 
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          {subtext && <p className="text-gray-500 text-xs mt-1">{subtext}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="text-xl text-white" />
        </div>
      </div>
    </motion.div>
  )
}

// Attendance Dashboard Component
function AttendanceDashboard() {
  const { getAttendanceRecords, calculateAttendancePercentage } = useEmployeeAuth()
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('month')

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true)
      try {
        let startDate: Date | undefined
        const endDate = new Date()

        if (timeRange === 'week') {
          startDate = new Date()
          startDate.setDate(startDate.getDate() - 7)
        } else if (timeRange === 'month') {
          startDate = new Date()
          startDate.setMonth(startDate.getMonth() - 1)
        }

        const data = await getAttendanceRecords(startDate, endDate)
        setRecords(data)
      } catch (error) {
        console.error('Error fetching records:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecords()
  }, [timeRange, getAttendanceRecords])

  const presentDays = records.filter(r => r.status === 'P').length
  const absentDays = records.filter(r => r.status === 'A').length
  const leaveDays = records.filter(r => r.status === 'L').length
  const onDutyDays = records.filter(r => r.status === 'O').length
  const percentage = calculateAttendancePercentage(records)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      id="dashboard"
      className="space-y-6"
    >
      {/* Header with Time Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaChartLine className="text-cyan-500" />
          Attendance Overview
        </h2>
        <div className="flex gap-2">
          {(['week', 'month', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {range === 'week' ? 'Week' : range === 'month' ? 'Month' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="animate-spin text-4xl text-purple-500" />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              title="Attendance Rate"
              value={`${percentage}%`}
              icon={FaChartLine}
              color="bg-gradient-to-r from-purple-500 to-pink-500"
              subtext={`${records.length} total days`}
            />
            <StatCard
              title="Present"
              value={presentDays}
              icon={FaCheckCircle}
              color="bg-green-500"
            />
            <StatCard
              title="Absent"
              value={absentDays}
              icon={FaTimesCircle}
              color="bg-red-500"
            />
            <StatCard
              title="Leave"
              value={leaveDays}
              icon={FaUmbrellaBeach}
              color="bg-yellow-500"
            />
            <StatCard
              title="On Duty"
              value={onDutyDays}
              icon={FaBriefcase}
              color="bg-blue-500"
            />
          </div>

          {/* Attendance Progress Bar */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300">Overall Attendance</span>
              <span className="text-2xl font-bold text-white">{percentage}%</span>
            </div>
            <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  percentage >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                  percentage >= 75 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                  'bg-gradient-to-r from-red-500 to-pink-500'
                }`}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>0%</span>
              <span>Target: 90%</span>
              <span>100%</span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}

// Attendance History Component
function AttendanceHistory() {
  const { getAttendanceRecords } = useEmployeeAuth()
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getAttendanceRecords()
        setRecords(data.slice(0, 30)) // Last 30 records
      } catch (error) {
        console.error('Error fetching records:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecords()
  }, [getAttendanceRecords])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      id="history"
      className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
        <FaHistory className="text-pink-500" />
        Attendance History
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="animate-spin text-4xl text-purple-500" />
        </div>
      ) : records.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <FaCalendarAlt className="text-5xl mx-auto mb-4 opacity-50" />
          <p>No attendance records found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                <th className="pb-4 pr-4">Date</th>
                <th className="pb-4 pr-4">Status</th>
                <th className="pb-4 pr-4">Check In</th>
                <th className="pb-4">Notes</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => {
                const config = statusConfig[record.status]
                const date = new Date(record.date)
                return (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="py-4 pr-4">
                      <div>
                        <p className="text-white font-medium">
                          {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-gray-500 text-xs">{date.getFullYear()}</p>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.color} text-white`}>
                        <config.icon className="text-xs" />
                        {config.label}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-gray-300">
                      {record.checkInTime || '-'}
                    </td>
                    <td className="py-4 text-gray-400 text-sm max-w-xs truncate">
                      {record.notes || '-'}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}

// Main Dashboard Component
function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AttendanceMarker />
        <AttendanceDashboard />
        <AttendanceHistory />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} matriXO Employee Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Main Page Component with Auth Check
function EmployeePortalContent() {
  const { user, loading } = useEmployeeAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-purple-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return user ? <Dashboard /> : <LoginForm />
}

// Export Page with Provider
export default function EmployeePortalPage() {
  return (
    <EmployeeAuthProvider>
      <EmployeePortalContent />
      <Toaster position="top-right" richColors />
    </EmployeeAuthProvider>
  )
}
