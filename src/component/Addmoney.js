import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { SERVERMACHINE } from './envconfig'
import { Store } from './store';
import './addmoney.css'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
const Addmoney = () => {
  const {state}=useContext(Store);
 const [withdraw,setWithdraw]=useState([])
 const [sales,setSales]=useState([])
  const {userInfo}=state
  useEffect(()=>{
    const getWithdraw=async()=>{
      const withdrawResponse= await axios.get(`${SERVERMACHINE}/api/transaction/withdraw/${userInfo._id}`)
      const {data}=withdrawResponse
      console.log(data)
      setWithdraw(data)
    }
    getWithdraw()
  },[userInfo._id])
  useEffect(()=>{
    const getSales=async()=>{
      const salesResponse= await axios.get(`${SERVERMACHINE}/api/sales/singleSingle/${userInfo._id}`)
      const {data}=salesResponse
      console.log(data)
      setSales(data)
    }
    getSales()
  },[userInfo._id])
  return (
    <div className="container">
    <Navbar/>
    <div className="divflex">
    <div className='addleft'>
    <h2 className='colorful-text'>Withdraw History</h2>
      <div>
      {withdraw.length===0?<div> <h4 style={{margin:"2rem 0"}}>you have not make any withdrawal</h4>
      <Link to='/product' className='btn'>Check Marketplace{'>>>'}</Link> </div>: withdraw.map((singleWithdraw)=>{
        const {amountInEth,userAddress,paymentMethod,amountWitdraw,_id,status}=singleWithdraw
        return(
          <div key={_id}>
              <div className='flex space'><h4>Amount Withdraw:</h4><p>${amountWitdraw}</p></div>
              <div className='flex space'><h4>Ethereum Address:</h4><p> {userAddress}</p></div>
              <div className='flex space'><h4>Payment Method:</h4><p> {paymentMethod}</p></div>
              <div className='flex space'><h4>Amount In Ethereum:</h4><p>{amountInEth}</p> </div>
              <div className='flex space' style={{alignItems:'center'}}><h4>status:</h4><p className='status'>{status}</p></div>
              <hr />
          </div>
        )
      })}
      </div>
    <div>

    </div>
    
    </div>
    <div  className='addright'>
    <h2 className='colorful-text'>Sales History</h2>

      <div>
      {sales.length===0?<div> <h4 style={{margin:"2rem 0"}}>Sorry you do not make any sale</h4>
      <Link to='/product' className='btn'>Check Marketplace{'>>>'}</Link> </div>: sales.map((singleSale)=>{
        const {_id,name,image,price,description}=singleSale
        return(
          <div key={_id}>
              <div className='flex space'><h4>Asset Name:</h4><p>{name}</p></div>
              <div className='flex space' style={{alignItems:'center'}}><h4>Asset Sold</h4><div className='addimgContainer'><small className='sold '>sold</small><img src={image} alt='saleimg' /></div></div>
              <div className='flex space'><h4>Price:</h4><p>{price}</p></div>
              <div className='flex space'><h4>Description:</h4><p>{description}</p></div>
              
              <hr />
              </div>
        
        )
        
      })}
      </div>
    
    </div>
    </div>      
    </div>
  )
}

export default Addmoney
