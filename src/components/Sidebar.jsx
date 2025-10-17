import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutGrid, ShoppingBag, Users, Github, CheckSquare } from 'lucide-react'
import { motion } from 'framer-motion'

const links = [
  { to: '/dashboard', label: 'Overview', icon: <LayoutGrid size={18}/> },
  { to: '/dashboard/products', label: 'Products', icon: <ShoppingBag size={18}/> },
  { to: '/dashboard/users', label: 'Users', icon: <Users size={18}/> },
  { to: '/dashboard/github', label: 'GitHub Finder', icon: <Github size={18}/> },
  { to: '/dashboard/todos', label: 'Todos', icon: <CheckSquare size={18}/> },
]

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
        <div className="p-6 font-extrabold text-3xl">Hubster</div>
        <nav className="flex flex-col gap-1 p-3">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={({isActive}) => `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
              {l.icon}<span>{l.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* mobile slide-over */}
      <motion.div initial={false} animate={open ? { x: 0 } : { x: '-100%' }} className="fixed inset-y-0 left-0 z-40 md:hidden">
        <div className="w-72 h-full bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-xl">
          <div className="p-4 flex items-center justify-between">
            <div className="font-bold">My Dashboard</div>
            <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Close</button>
          </div>
          <nav className="p-3 flex flex-col gap-1">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className={({isActive}) => `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                {l.icon}<span>{l.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* backdrop */}
      {open && <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setOpen(false)} />}
    </>
  )
}
