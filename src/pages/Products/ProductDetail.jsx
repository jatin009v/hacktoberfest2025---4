import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../components/Loader'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    let mounted=true
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res=> mounted && setProduct(res.data))
      .catch(e=>console.error(e))
      .finally(()=> mounted && setLoading(false))
    return ()=> mounted=false
  },[id])
  if(loading) return <Loader/>
  if(!product) return <div>Not found</div>
  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
      <button onClick={()=>navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4"><ArrowLeft size={14}/>Back</button>
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
        <img src={product.image} alt={product.title} className="h-64 object-contain mx-auto" />
        <div>
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">{product.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="text-2xl font-extrabold text-primary">${product.price}</div>
            <div className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">{product.category}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
