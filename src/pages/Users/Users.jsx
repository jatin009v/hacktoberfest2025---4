import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    let mounted=true
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res=> mounted && setUsers(res.data))
      .catch(e=>console.error(e))
      .finally(()=> mounted && setLoading(false))
    return ()=> mounted=false
  },[])
  if(loading) return <Loader/>
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {users.map(u=>(
        <Link to={`/dashboard/users/${u.id}`} key={u.id} className="transform hover:scale-[1.02] transition">
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 mx-auto grid place-items-center font-semibold">{u.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
            <h3 className="mt-3 font-semibold">{u.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{u.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{u.company?.name}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
