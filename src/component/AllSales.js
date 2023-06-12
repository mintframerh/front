import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getError } from './utils'
import "./Allproduct.css"
import Navbar from './Navbar'
import { SERVERMACHINE } from './envconfig'
import Footer from './Footer'


const AllSales = () => {
    const [loading,setloading]=useState(true)
    const [totalSales,setToTalSales]=useState([])
  
    useEffect(()=>{
      const fetchData=async()=>{
        try {
          const response =await axios.get(`${SERVERMACHINE}/api/admin/withdraw`)
          // const response=await axios.get(`http://localhost:5000/api/admin/allusers`)
          const {data}=response
          if(data){
            setloading(false)
            setToTalSales(data)
            
          }
        } catch (error) {
          toast.error(getError(error))
         }
      }
      fetchData()
    })
    
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
         <Navbar/>
          <h2 style={{textAlign:"center",margin:"1rem"}}>All Withdraw</h2>
          <h3>TotalWithdraw={totalSales.length}</h3>
          <div style={{height:"88vh",overflow:"auto",marginBottom:"2rem"}}>
          <section className='bottomContainer'>
            <p  className='adp mail'>email</p>
              <p  className='adp mail'>userAddress</p>
              <p  className='adp mail'>Amount in dollar</p>
              <p  className='adp mail'>Amount in Ethereum</p>           
            </section>
          {totalSales.length===0? <p>No withdraw so far</p>: totalSales.map((singleSale)=>{
          const {_id,email,userAddress,amountWitdraw,amountInEth}=singleSale
          return(
            <div>
            <section key={_id} className='bottomContainer'>
            <p  className='adp mail'>{email}</p>
              <p  className='adp mail'>{userAddress}</p>
              <p  className='adp mail'>{amountWitdraw}</p>
              <p  className='adp mail'>{amountInEth}</p>           
            </section>
            <hr />
            </div>
          )
        })}
        
      </div>
      <Footer/>
      </div>
      
    )
}

export default AllSales
