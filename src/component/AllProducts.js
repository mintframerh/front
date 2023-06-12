import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TiTrash } from 'react-icons/ti'
import { toast } from 'react-toastify'
import { getError } from './utils'
import "./Allproduct.css"
import Navbar from './Navbar'
import { SERVERMACHINE } from './envconfig'
import Footer from './Footer'
import { Link } from 'react-router-dom'

const AllProducts = () => {
  const [loading,setloading]=useState(true)
  const [product,setProduct]=useState([])
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        
        const response=await axios.get(`${SERVERMACHINE}/api/admin/allproducts`)
        // const response=await axios.get(`http://localhost:5000/api/admin/allproducts`)
        const {data}=response
        console.log(data)
        if(data){
          setloading(false)
          setProduct(data)
        }
      } catch (error) {
        toast.error(getError(error))
       }
    }
    fetchData()
  },[])
  const deleteProductHandler=async(id)=>{
    const response= await axios.delete(`${SERVERMACHINE}/api/admin/delete/${id}`)
    
  //  const response= await axios.delete(`http://localhost:5000/api/admin/delete/${id}`)
    const {data}=response
    if(data){
      const newProduct=product.filter((item)=>item._id !== id)
      setProduct(newProduct)
    }
  }
  if(loading){
    return(
      <div className='loading__center'>
      <div className="ring"></div>
      <span className="loading">Loading</span>
    </div>
    )
  }
  return (
    <div className='container'>
       <Navbar />
        <h2 style={{textAlign:"center",margin:"1rem"}}>All Products</h2>
        <div style={{height:"88vh",overflow:"auto",marginBottom:"2rem"}} >
        <section  className='bottomContainer headd'>
            <p className='ProImg'>Asset Image</p>
            <p className=''>name</p>
            <p className=''>category</p>
            <p className=''>update</p>
            <TiTrash/>
          </section>
        {product.map((singleProduct)=>{
        const {name,_id,image,category}=singleProduct
        return(
          <div  key={_id}>
          <section  className='bottomContainer headd' >
            <img className='ProImg'  src={image} alt={name} />
            <p style={{width:"20%"}}>{name}</p>
            <p style={{width:"20%"}}>{category}</p>
            <Link to={`/update/product/${_id}`} className='update pupdate'>update</Link>
            <TiTrash onClick={()=>deleteProductHandler(_id)} style={{cursor:"pointer"}}/>
          </section>
          <hr/>
          </div>
        )
      })}
    </div>
    <Footer/>
    </div>
    
  )
}

export default AllProducts


