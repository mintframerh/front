import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import './metamask.css'
import { useNavigate } from 'react-router-dom'
import { Store } from './store'
import axios from 'axios'
import { SERVERMACHINE } from './envconfig'
import { toast } from 'react-toastify'
const Metamask = () => {

    const navigate=useNavigate()
    const ethereumAdd=useRef()
    const amountInDollar=useRef()
    const Description=useRef()
    const {state}=useContext(Store);
    const {userInfo}=state
  
    const [balance,setBalance]=useState()
    useEffect(()=>{
        const getBalance=async()=>{
            const balanceResponse=await axios.get(`${SERVERMACHINE}/api/asset/user/balance/${userInfo._id}`);
            setBalance(balanceResponse.data.balance)
        }
        getBalance()
    })
    const [ethValue,setEthValue]=useState()
    const [etherPrice,setEthPrice]=useState(0)
    useEffect(()=>{
        const getEthValue=async()=>{
            const response=await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
           const {data}=response
           setEthValue(data)
        }
        getEthValue()
    })

    const WithdrawHandler= async(e)=>{
        e.preventDefault()
        const paymentMethod = "Metamask"
        const addressRef=ethereumAdd.current.value
        const amounref=amountInDollar.current.value
        const descriptionref=Description.current.value
        if(amounref <= balance){
            try {
                for (let index = 0; index < ethValue.length; index++) {
                 const element = ethValue[index]
                 if(element.id==='ethereum'){
                   const currentDollar=(element.current_price)
                   console.log(currentDollar)
                   const totalPrice=amountInDollar.current.value
                   const ethPricee=totalPrice / currentDollar
                   const ethPrice=Number(ethPricee.toFixed(18));
                   setEthPrice(ethPrice)
                   
                   const withdrawDetails={userAddress:addressRef,amountWitdraw:amounref,paymentMethod,withdrawDescription:descriptionref,WithdrawalId:userInfo._id,amountInEth:ethPrice,email:userInfo.email}
                   const initialWithdraw=await axios.post(`${SERVERMACHINE}/api/transaction/withdraw`,withdrawDetails) 
                  if (initialWithdraw){
                    await axios.patch(`${SERVERMACHINE}/api/updatebalance/withdraw/${userInfo._id}`,{withdrawPrice:amounref})
                    navigate('/checksales')
                  }
                 }
                }
               } catch (error) {
               
             }
            
            
        }
        else{
            toast.error('Insufficient fund')
            navigate('/withdraw')
        }       
    }

   

  return (
    <div>
      <Navbar/>
        <div className='flexin'>
        <h2> Withdraw Funds</h2>
        </div>
        
        <div>
       
        <article className='coverArt withdrawContainerMeta'>
        <form className="form" onSubmit={WithdrawHandler} >
          <input
            type="text"
            placeholder="Recipient Address"
            className="input"
            ref={ethereumAdd}
          />
          <div className="input passdiv">
            <input
              className="password"
              placeholder="Amount in dollars"
              ref={amountInDollar}
              type='number'
            />
          </div>
          <div className="input passdiv">
            <input
              className="password"
              placeholder="Description[optional]"
              ref={Description}
              type='text'
            />
          </div>
          <div className='ineth'>Amount In Eth  {etherPrice}</div>
          <button className="btn continue getSbtn">Withdraw</button>
        </form>
      </article>         
        </div>
    </div>
  )
}

export default Metamask
