import React, { useState, useRef, useEffect } from 'react'
import { Menu, Sun, Moon, LayoutDashboard, User, Settings, LogOut } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ setSidebarOpen }) {
  const { mode, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const ref = useRef()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('rd_user_demo') || 'null')

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    
    function handleScroll() {
      setIsScrolled(window.scrollY > 10)
    }
    
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('rd_user_demo')
    navigate('/auth/login')
  }

  return (
    <header 
      className={`sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b dark:border-gray-700 transition-all duration-300 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle */}
        <button
          className="p-2 rounded-md md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 active:scale-95"
          onClick={() => setSidebarOpen(s => !s)}
        >
          <Menu size={18} />
        </button>

        {/* Logo + Caption */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md transition-transform duration-300 hover:scale-105">
            <LayoutDashboard size={24} />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-semibold text-gray-800 dark:text-white">Dashboard Pro</span>
            <span className="text-xs text-gray-600 dark:text-gray-300">
              Your central hub for productivity
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 transition-all duration-300 hover:shadow-md hover:scale-110 active:scale-95"
          aria-label="Toggle theme"
        >
          {mode === 'dark' ? (
            <Sun size={16} className="text-amber-400" />
          ) : (
            <Moon size={16} className="text-indigo-600" />
          )}
        </button>

        {/* User Menu */}
        <div className="relative" ref={ref}>
          <button 
            onClick={() => setOpen(o => !o)} 
            className="flex items-center gap-2 p-1 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white grid place-items-center font-semibold shadow-md transition-transform duration-300 hover:scale-105">
              {user ? user.email[0].toUpperCase() : 'JD'}
            </div>
            <svg
              className={`w-4 h-4 text-gray-500 dark:text-gray-300 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
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

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg rounded-xl p-2 z-50 transition-all duration-300 origin-top-right animate-scale-in">
              <div className="px-3 py-2 border-b dark:border-gray-700 mb-1">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {user ? user.email : 'John Doe'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Administrator
                </p>
              </div>
              
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
                onClick={() => setOpen(false)}
              >
                <LayoutDashboard size={16} className="text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                <span>Dashboard</span>
              </Link>
              
              <Link
                to="/dashboard/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
                onClick={() => setOpen(false)}
              >
                <Settings size={16} className="text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                <span>Profile Settings</span>
              </Link>
              
              <div className="border-t dark:border-gray-700 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group text-red-600 dark:text-red-400"
                >
                  <LogOut size={16} className="group-hover:scale-110 transition-transform" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
