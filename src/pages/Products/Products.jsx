import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    let mounted=true
    axios.get('https://fakestoreapi.com/products')
      .then(res=> mounted && setProducts(res.data))
      .catch(e=>console.error(e))
      .finally(()=> mounted && setLoading(false))
    return ()=> mounted=false
  },[])
  if(loading) return <Loader/>
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map(p=>(
        <Link to={`/dashboard/products/${p.id}`} key={p.id} className="transform hover:scale-[1.02] transition">
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
            <img src={p.image} alt={p.title} className="h-40 w-full object-contain" />
            <h3 className="mt-3 font-medium line-clamp-2">{p.title}</h3>
            <div className="mt-2 font-semibold text-primary">${p.price}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
