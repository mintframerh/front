import React, { useContext, useEffect, useState } from 'react'
import {ethers} from "ethers"
import { useNavigate } from 'react-router-dom'
import './cryptopayment.css';
import { Store } from './store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from './utils';
import { SERVERMACHINE } from './envconfig';
import Navbar from './Navbar';
import Footer from './Footer';

const CryptoPayment = () => {
 
  const {state}=useContext(Store);
 
  const {userInfo,cart}=state
  const [ethPrice,setEthPrice]=useState()
  const totalPrice=state.cart.cartItems.reduce((a,c)=>a+c.price * c.quantity,0)
  useEffect(()=>{
    
    const FetchData=async()=>{
      try {
        const response=await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
         const {data}=response
         console.log(data)
         for (let index = 0; index < data.length; index++) {
          const element = data[index]
          console.log(element)
          if(element.id==='ethereum'){
            const currentDollar=(element.current_price)
            const totalPrice=state.cart.cartItems.reduce((a,c)=>a+c.price * c.quantity,0)
            const ethPricee=totalPrice / currentDollar
            const ethPrice=Number(ethPricee.toFixed(18));
            setEthPrice(ethPrice)
          }
         }
        } catch (error) {
        
      }
    }
    FetchData()  
 
  
})

 
 
  const destinationAddress="0x278e109a6c4a2affcce691147e6b6ac05c602676"
  const navigate=useNavigate()
 
    const [transactionError,setTransactionError]=useState('')
    const [transaction,setTransaction]=useState('')

    const paymentHandler=async (e)=>{
        const amount=ethPrice 
    try {

	if (!window.ethereum) {
		throw  new  Error("No crypto wallet found. Please install it.");
	}

		await  window.ethereum.send("eth_requestAccounts");

		const  provider = new  ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    // if (network.chainId !== 1) {
    //   alert('Please switch to the Ethereum mainnet')
    //   throw new Error('Please switch to the Ethereum mainnet');
    // }
    // else{
      const  signer = provider.getSigner();

		ethers.utils.getAddress(destinationAddress);

		const  transactionResponse = await  signer.sendTransaction({

			to:  destinationAddress,

			value:  ethers.utils.parseEther(amount.toString())

		});
    if(transactionResponse){
      
      const transactiondata={userId:userInfo._id,totalPrice:totalPrice,ethPrice:ethPrice ,transactionResponse:transactionResponse,asset:cart.cartItems}
      // const sales={sale:cart.cartItems}
      // try {
      //   const saleResponse=await axios.post(`${SERVERMACHINE}/api/transaction`,sales)
      // } catch (error) {
        
      // }
      try {
        const response=await axios.post(`${SERVERMACHINE}/api/transaction`,transactiondata)  
        if(response){
          const addToRecentSold=await axios.post(`${SERVERMACHINE}/api/recentlysold`,{justSold:cart.cartItems})
          if(addToRecentSold){
            for (let index = 0; index < cart.cartItems.length; index++) {
              const element = cart.cartItems[index];
              console.log(element)
              await axios.post(`${SERVERMACHINE}/api/sales`,element)
              const price={price:element.price}
             
              try {
                await axios.patch(`${SERVERMACHINE}/api/updatebalance/${element.userId}`,price)
              
              } catch (error) {
                console.log(error)
              }
              
              // const dd={element}
              await axios.delete(`${SERVERMACHINE}/api/removeProduct/${element._id}`)
              // await axios.post(`http://localhost:5000/api/removeProduct`,dd)
            }
          }
          
          if(true){
            setTransaction('payment completed')
            const removeErrorMessage = () => {
              const removeTime = setTimeout(() => {
                setTransactionError("");
                setTransaction("");
              }, 10000);
              return () => {
                clearTimeout(removeTime);
              };
            };
            removeErrorMessage()
            cart.cartItems.length=0
            navigate(`/api/asset/user/${userInfo._id}`)
            }
          }
      } catch (error) {
        alert('there was an error')        
      } 
    }
    // }
   
    // usrid,product purchase,transaction response
	} catch (error) {
    
    toast.error(getError(error))
    setTransactionError(error.message)
    const removeErrorMessage = () => {
      const removeTime = setTimeout(() => {
        setTransactionError("");
        setTransaction("");
        navigate('/notification')
      }, 2000);
      return () => {
        clearTimeout(removeTime);
      };
    };
    removeErrorMessage()
	}
    }
  return (
    <div>
      <Navbar/>
    <div className='container crptoContainer'>
    <input type="number" className="input" defaultValue={ethPrice}  placeholder='Amount' required/>
    <input type="password" className="input" defaultValue={destinationAddress} readOnly placeholder='Destination Address' required/>
    <button type='submit' className=' getSbtn bttn' onClick={()=>paymentHandler()}>pay</button>
    <div>{transaction}</div>
    <div>{transactionError}</div>
</div>
<Footer/>
    </div>
    
  )
}

export default CryptoPayment