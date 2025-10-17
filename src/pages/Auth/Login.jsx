import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login() {
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    if(!email||!pass) { toast.error('Enter email and password'); return }
    localStorage.setItem('rd_user_demo', JSON.stringify({ email }))
    toast.success('Logged in (demo)')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
        <h2 className="text-2xl font-bold mb-4">Sign in</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600" />
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600" />
          <button className="w-full px-4 py-2 rounded-md bg-primary text-white">Sign in</button>
        </form>
        <div className="mt-3 text-sm flex justify-between">
          <Link to="/auth/reset" className="text-primary">Forgot password?</Link>
          <Link to="/auth/signup" className="text-primary">Create account</Link>
        </div>
      </div>
    </div>
  )
}
