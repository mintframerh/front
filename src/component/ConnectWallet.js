import React from 'react'
import {FaWallet} from 'react-icons/fa'
import './connectwallet.css'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
const ConnectWallet = () => {
  const navigate =useNavigate()
 
  const connectHandler=()=>{
    navigate('/cryptopayment')
  }
  return (
    <React.Fragment>
        <Navbar/>
        <section className='container connectContainer'>
        <article className='connectWrapper'>
            <div className='walletIconContainer'><FaWallet className='walletIcon'/></div>
            <button className='btn connectBtn getSbtn' onClick={()=>connectHandler()}>Connect wallet</button>
        </article>
        
    </section>   
    <Footer/>
    </React.Fragment>
    
  )
}

export default ConnectWallet