import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { SERVERMACHINE } from './envconfig';
import './adminUpdate.css'
const AdminUpdate = () => {
  const {id}=useParams()
  // const [name,setName]=useState('')
  // const [email,setEmail]=useState('')
  // const [balance,setBalance]=useState(0)  
  const [value,setValues]=useState({
    id:id,
    name:'',
    email:'',
    balance:0,
  })
  const getUserdetails=async(id)=>{
    try {
      const response =await axios.get(`${SERVERMACHINE}/api/user/${id}`)
      const {data}=response  
      setValues({id:data._id, name:data.name,email:data.email,balance:data.balance})
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
    
    const updates={name:value.name,email:value.email,balance:value.balance}
    const updateUser=await axios.patch(`${SERVERMACHINE}/api/user/${id}`,updates)
    if (updateUser) {
      navigate('/admin/allusers')
    }
       
  };
  const cancelUpdate=(event)=>{
    event.preventDefault()
    navigate('/admin/allusers')
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
      Email:
      <input className='dinput' type="email" value={value.email} onChange={(e)=>setValues({email:e.target.value})} />
    </label>
    <br />
    <label className='dlabel'>
      Balance:
      <input className='dinput' type="number" value={value.balance} onChange={(e)=>setValues({balance:e.target.value})} />
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

export default AdminUpdate
