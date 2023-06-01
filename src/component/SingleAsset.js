import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useReducer } from 'react'
import './singleAsset.css'
import { getError } from './utils'
import axios from 'axios'
import { Store } from './store';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Frame1 from "../image/Frame 1.jpg"
import Frame2 from "../image/Frame 2.jpg"
import Frame3 from "../image/Frame 3.jpg"
import { SERVERMACHINE } from './envconfig';
import Footer from './Footer';



const reducer=(state,action)=>{
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {...state,loading:true};
    case 'FETCH_SUCCESS':
      return {...state,product:action.payload,loading:false};
    case 'FETCH_FAIL':
        return {...state, loading:false, error:action.payload};  
  
    default:
      break;
  }
}


const SingleAsset = () => {
  const navigate=useNavigate()
    const para =useParams();
    const { id } =para;
    const [{loading,product,error}, dispatch]=useReducer((reducer),{loading:true,product:[],error:''})
  // const [product,setProduct]=useState([]);
  const randomNumber = Math.floor(Math.random() * 2) + 1
  const frames=[Frame1,Frame2,Frame3]
  const dimag=frames[randomNumber]
 
  useEffect(()=>{
    
      const FetchData=async()=>{
        dispatch({type:"FETCH_REQUEST"})
        try {
          // const response=await axios.get(`https://cloudy-toad-wig.cyclic.app/api/product/id/${id}`);
          const response=await axios.get(`${SERVERMACHINE}/api/product/id/${id}`); 
           
          dispatch({type:"FETCH_SUCCESS",payload:response.data})
        } catch (error) {
          dispatch({type:"FETCH_FAIL",payload:getError(error)})
        }
      }
      FetchData()  
   
    
  },[id])
  const {state, dispatch:ctxDispatch}=useContext(Store)
  const {cart} =state
  // console.log(cart)
  // useEffect(()=>{
  //   const getOwner=async()=>{
  //     const response=await axios.get(`${SERVERMACHINE}/api/owner/id/${product.userId}`);
  //     const {data}=response
  //   }
     
  // })
  const AddToCartHandler= async ()=>{
    console.log(cart)
    const existItem=cart.cartItems.find((x)=>x._id===product._id)
    console.log(product);
    const quantity=existItem ? existItem.quantity+1: 1;
    // const data= await axios.get(`https://cloudy-toad-wig.cyclic.app/api/product/${product._id}`)
    const data= await axios.get(`${SERVERMACHINE}/api/product/${product._id}`)
    // console.log(data);
    if(data.countInStock < quantity){
      window.alert('sorry. Product is out of stock')
      return;
    }
    ctxDispatch({type:"CART_ADD_ITEM",payload:{...product,quantity}})
    navigate('/notification')
  }
  
  if (loading){
    return(
      <div className='loading__center'>
      <div className="ring"></div>
      <span className="loading">Loading</span>
    </div>
    )
  }
  if (error){
    return(
      <div style={{minHeight:"70vh"}}>{error}</div>
    )
  }
    return (
    <section className='container '>
      <Navbar/>
      <div className='singleProductContainer'>
      <div className='leftSingleProduct'>
          <img src={dimag} alt={product.name} />
        </div>
        <div className='centerSingleProduct'>
        <h3 className='blur'> Asset Owner</h3>
            <h1>{product.ownerName}</h1>
            <h3 className='blur'> Asset Name</h3>
            <h1>{product.name}</h1>
           <h3 className='blur'>total volume</h3>
           <h1>203.3</h1>
            <p>description: {product.description}</p>
        </div>
        <div className='rightSingleProduct'>
          <div className='downdown'>
          <p>price: ${product.price}</p>
            <p>Status: <small className= 'available'>InStock</small></p>
          </div>
          
            
        </div>
        <div className='lowerdown'>
          <button onClick={AddToCartHandler} className='btn  getSbtn'>Buy</button>
          </div>
      </div>
        {loading?<div></div>: <Footer/>}
    </section>
  )
}

export default SingleAsset