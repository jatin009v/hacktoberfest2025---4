import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { getTodoCounts } from '../../utils/todoStorage'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'

export default function DashboardHome() {
  const [stats, setStats] = useState({ products:0, users:0 })
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  const [todoCounts, setTodoCounts] = useState({ total:0, pending:0, completed:0 })

  useEffect(()=>{
    let mounted = true
    async function fetchAll(){
      try {
        const [pRes, uRes] = await Promise.all([axios.get('https://fakestoreapi.com/products'), axios.get('https://jsonplaceholder.typicode.com/users')])
        if(!mounted) return
        setStats({ products: pRes.data.length, users: uRes.data.length })
        setChartData(pRes.data.slice(0,6).map(p=>({ name:`P${p.id}`, price: Math.round(p.price) })))
      } catch(e){ console.error(e) } finally { if(mounted) setLoading(false) }
    }
    fetchAll()
    setTodoCounts(getTodoCounts())
    return ()=> mounted=false
  },[])

  if(loading) return <Loader/>

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Insights</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Quick overview of important metrics</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-3xl font-bold mt-1">{stats.products}</div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-3xl font-bold mt-1">{stats.users}</div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
          <div className="text-sm text-gray-500">Todos</div>
          <div className="text-3xl font-bold mt-1">{todoCounts.total}</div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
          <h3 className="font-semibold mb-2">Price Snapshot</h3>
          <div style={{ height:220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={document.documentElement.classList.contains('dark') ? '#1f2937' : '#e5e7eb'} />
                <XAxis dataKey="name" stroke={document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#6b7280'} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
          <h3 className="font-semibold mb-2">Tasks</h3>
          <div className="flex gap-4 items-center">
            <div>
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-2xl font-bold">{todoCounts.total}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Pending</div>
              <div className="text-2xl font-bold text-yellow-500">{todoCounts.pending}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Completed</div>
              <div className="text-2xl font-bold text-green-500">{todoCounts.completed}</div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Link to="/dashboard/todos" className="px-3 py-2 rounded-md bg-primary text-white">Open Todos</Link>
            <Link to="/dashboard/settings" className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700">Manage</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
