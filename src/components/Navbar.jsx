import React, { useState, useRef, useEffect } from 'react'
import { Menu, Sun, Moon, LayoutDashboard } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ setSidebarOpen }) {
  const { mode, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('rd_user_demo') || 'null')

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('rd_user_demo')
    navigate('/auth/login')
  }

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-colors duration-300">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle */}
        <button
          className="p-2 rounded-md md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setSidebarOpen(s => !s)}
        >
          <Menu size={18} />
        </button>

        {/* Logo + Caption */}
        <div className="flex items-center gap-2">
          <LayoutDashboard className="text-indigo-600 dark:text-indigo-400" size={28} />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Your central hub for productivity and automation
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 transition-colors"
        >
          {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* User Menu */}
        <div className="relative" ref={ref}>
          <button onClick={() => setOpen(o => !o)} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white grid place-items-center font-semibold">
              {user ? user.email[0].toUpperCase() : 'JD'}
            </div>
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow rounded-md p-2 z-50 transition-colors">
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Dashboard
              </Link>
              <Link
                to="/dashboard/settings"
                className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
