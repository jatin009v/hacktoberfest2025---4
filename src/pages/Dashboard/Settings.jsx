import React, { useEffect, useState } from 'react'

export default function Settings() {
  const [profile, setProfile] = useState({ name:'', email:'' })
  useEffect(()=> {
    const stored = JSON.parse(localStorage.getItem('rd_user_demo') || '{}')
    setProfile({ name: stored.email ? stored.email.split('@')[0] : '', email: stored.email || '' })
  },[])
  const handleSave = e => { e.preventDefault(); localStorage.setItem('rd_user_demo', JSON.stringify({ email: profile.email })); alert('Profile saved (demo)') }
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
      <form onSubmit={handleSave} className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <div><label className="text-sm">Name</label><input value={profile.name} onChange={e=>setProfile({...profile, name:e.target.value})} className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600 mt-1" /></div>
        <div><label className="text-sm">Email</label><input value={profile.email} onChange={e=>setProfile({...profile, email:e.target.value})} className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600 mt-1" /></div>
        <div className="pt-2"><button className="px-4 py-2 bg-primary text-white rounded-md">Save</button></div>
      </form>
    </div>
  )
}
