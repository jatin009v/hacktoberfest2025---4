import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ResetPassword() {
  const [email,setEmail] = useState('')
  const handleSubmit = e => { e.preventDefault(); if(!email){toast.error('Enter email'); return} toast.success('Reset link (demo)') }

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
        <h2 className="text-2xl font-bold mb-4">Reset password</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600" />
          <button className="w-full px-4 py-2 rounded-md bg-primary text-white">Send reset link</button>
        </form>
        <div className="mt-3 text-sm">
          <Link to="/auth/login" className="text-primary">Back to login</Link>
        </div>
      </div>
    </div>
  )
}
