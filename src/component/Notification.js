import React, { useContext } from 'react';
import { Store } from './store';
import {Link, useNavigate} from 'react-router-dom';
import { BiMinus, BiPlus, BiTrash } from 'react-icons/bi';
import axios from 'axios';
import Navbar from './Navbar';
import './notification.css'
import { SERVERMACHINE } from './envconfig';
import Footer from './Footer';
const Notification = () => {
  const {state,dispatch:ctxDispatch}=useContext(Store);
  const {cart:{cartItems}}=state
  const leftbracket='('
  const rightbracket=')'
  const removeItemHandler=(item)=>{
    ctxDispatch({type:"CART_REMOVE_ITEM",payload:item})
  }
  const updateCartHandler=async(item,quantity)=>{
    const {data}= await axios.get(`${SERVERMACHINE}/api/product/${item._id}`)
    // const {data}= await axios.get(`https://cloudy-toad-wig.cyclic.app/api/product/${item._id}`)
    if(data.countInStock < quantity){
        window.alert('sorry. Product is out of stock')
        return;
      }
      ctxDispatch({type:"CART_ADD_ITEM",payload:{...item,quantity}})
  }
  const navigate=useNavigate()
  const checkoutHandler=()=>{
    navigate('/login?redirect=/connectwallet')
  }
  return (
    <div>
       <Navbar/>
        <h1 className="accounttxt">Shopping Cart</h1>
        {cartItems.length < 1 ?
                <div style={{minHeight:"75vh"}}>Cart is empty <Link to='/'>Go shopping</Link></div>
                :
                <section className='shoppingContainer'>
                <article className="leftShopping">
                   {cartItems.map((item)=>{
                        return(
                            <div className='leftShoppingInner' key={item._id}>
                        <div className='cartItemNameAndImage'>
                            <div className="cartItemImageContainer"><img src={item.image} alt="" /></div>
                            <p className='itemName'><Link to={`/api/product/id/${item._id}`}>{item.name}</Link> </p>
                        </div>
                        <div className="changeQuantityContainer">
                            <button className='dbtn' disabled={item.quantity===1} onClick={()=>updateCartHandler(item,item.quantity - 1)}><BiMinus className='pointer minus' /></button>
                            {item.quantity}
                            <button className='dbtn' disabled={item.quantity >= item.countInStock} onClick={()=>updateCartHandler(item,item.quantity + 1)}><BiPlus className='pointer plus'/></button>
                            
                        </div>
                        <div className="price">price: ${item.price}</div>
                        <div className="deleteContainer"><BiTrash className='pointer' onClick={()=>removeItemHandler(item)}/></div>
                    </div>
                        )
                   })}
                    
                   
                    
                </article>
                <article className="rightShopping">
                    <div className='totalTextContainer'>
                        <h2>Total</h2><p>{leftbracket}{cartItems.reduce((a,c)=>a+c.quantity,0)} items{rightbracket}</p>
                    </div>
                    <h3>price:${cartItems.reduce((a,c)=>a+c.price * c.quantity,0)}</h3>
                    <button className='btn proceed getSbtn' disabled={cartItems.quantity===0} onClick={checkoutHandler}>proceed</button>
                    
                </article>
            </section>
            }
            <Footer/>
    </div>
  )
}

export default Notification