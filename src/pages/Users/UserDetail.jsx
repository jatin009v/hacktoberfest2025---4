import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../components/Loader'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    let mounted=true
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res=> mounted && setUser(res.data))
      .catch(e=>console.error(e))
      .finally(()=> mounted && setLoading(false))
    return ()=> mounted=false
  },[id])
  if(loading) return <Loader/>
  if(!user) return <div>Not found</div>
  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
      <button onClick={()=>navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4"><ArrowLeft size={14}/>Back</button>
      <div className="max-w-2xl mx-auto p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Username: {user.username}</p>
        <p className="mt-3">Email: <span className="font-medium">{user.email}</span></p>
        <p className="mt-1">Phone: <span className="font-medium">{user.phone}</span></p>
        <p className="mt-1">Company: <span className="font-medium">{user.company?.name}</span></p>
        <p className="mt-1">Address: <span className="font-medium">{user.address?.street}, {user.address?.city}</span></p>
      </div>
    </motion.div>
  )
}
