import React, { useEffect, useState } from 'react'
import { SERVERMACHINE } from './envconfig'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ProductUpdate = () => {
    const {id}=useParams()
    // const [name,setName]=useState('')
    // const [email,setEmail]=useState('')
    // const [balance,setBalance]=useState(0)  
    const [value,setValues]=useState({
      id:id,
      name:'',
      category:'',
      description:"",
    })
    const getUserdetails=async(id)=>{
      try {
        const response =await axios.get(`${SERVERMACHINE}/api/product/id/${id}`)
        const {data}=response  
        setValues({id:data._id, name:data.name,category:data.category,description:data.description})
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      getUserdetails(id)
    },[id])
   
    const navigate=useNavigate()
    const handleSubmit = async(event) => {
      event.preventDefault();
      
      const updates={name:value.name,category:value.category,description:value.description}
      const updateUser=await axios.patch(`${SERVERMACHINE}/api/product/update/${id}`,updates)
      if (updateUser) {
        navigate('/admin/allproducts')
      }
         
    };
    const cancelUpdate=(event)=>{
      event.preventDefault()
      navigate('/admin/allproducts')
    }
  
    return (
      <div className='container dcon'>
      <form className='dform'>
      <label className='dlabel'>
        Name:
        <input type="text" className='dinput' value={value.name} onChange={(e)=>setValues({name:e.target.value})} />
      </label>
      <br />
      <label className='dlabel'>
        Category:
        <input className='dinput' type="text" value={value.category} onChange={(e)=>setValues({category:e.target.value})} />
      </label>
      <br />
      <label className='dlabel'>
        Description:
        <input className='dinput' type="text" value={value.description} onChange={(e)=>setValues({description:e.target.value})} />
      </label>
      <br />
      <div className='btnCont'>
      <button onClick={handleSubmit} className='dbutton' type="submit">Update</button>
      <button onClick={cancelUpdate} className='dbutton red' type="submit">Cancel</button>
      </div>
      
    </form>
      </div>
      
    );
}

export default ProductUpdate
