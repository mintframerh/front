import React, { useEffect,useReducer, useState } from 'react'
import { BiBarChart} from 'react-icons/bi'
import { TiTag } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { Pagination,Autoplay } from "swiper";
import "./marketplace.css"
import axios from 'axios'
import { SERVERMACHINE } from './envconfig';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { toast } from 'react-toastify'
import { getError } from './utils'
import Footer from './Footer'

const Explore='Explore >>'
const Marketplace = () => {
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
  const [{loading,product,error}, dispatch]=useReducer((reducer),{loading:true,product:[],error:''})
  // const [product,setProduct]=useState([]);
  useEffect(()=>{
    
      const FetchData=async()=>{
        dispatch({type:"FETCH_REQUEST"})
        try {
          // const response=await axios.get('http://localhost:5000/api/product');
          const response=await axios.get(`${SERVERMACHINE}/api/product`);
          dispatch({type:"FETCH_SUCCESS",payload:response.data})
        } catch (error) {
          dispatch({type:"FETCH_FAIL",payload:error.message})
        }
      }
      FetchData()  
   
    
  },[])





  const reducer3=(state,action)=>{
    switch (action.type) {
      case 'FETCH_REQUEST':
        return {...state,loading3:true};
      case 'FETCH_SUCCESSS':
        return {...state,product3:action.payload,loading3:false};
      case 'FETCH_FAIL':
          return {...state, loading3:false, error:action.payload};  
    
      default:
        break;
    }
  }
  const [{loading3,product3,error3}, dispatch3]=useReducer((reducer3),{loading3:true,product3:[],error3:''})
  
 
  useEffect(()=>{
    
      const FetchData=async()=>{
        dispatch3({type:"FETCH_REQUEST"})
        try {
          // const response=await axios.get('https://cloudy-toad-wig.cyclic.app/api/recentlysold');
          const response=await axios.get(`${SERVERMACHINE}/api/recentlysold`);
          dispatch3({type:"FETCH_SUCCESSS",payload:response.data})
        } catch (error) {
          dispatch3({type:"FETCH_FAIL",payload:error.message})
        }
      }
      FetchData()  
   
    
  },[])


  const [slideShowLen,setSlideShowLen]=useState(2);
  const [size,setSize]=useState(window.innerWidth);
  const checksize=()=>{
    setSize(window.innerWidth)
  }
  useEffect(()=>{
    const dsize=window.addEventListener('resize',checksize);
    if(size <= 768){
        setSlideShowLen(1)
    }
    else{
      setSlideShowLen(2)
    }
    return()=>{
      window.removeEventListener('resize',dsize)
    }
  },[slideShowLen,size])


  // const [total,setTotal]=useState([0])
  const [totalSales,setToTalSales]=useState(0)
  // const [duser,setDuser]=useState({})
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const response=await axios.get(`${SERVERMACHINE}/api/admin/allusers`)
        // const response=await axios.get(`http://localhost:5000/api/admin/allusers`)
        const {data}=response
        if(data){
          let aa=[]
          // setDuser(data)
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            aa.push(element.assets.asset.length)
          }
         
          const sales= aa.reduce((a,c)=>a+c)
          setToTalSales(sales)
        }
      } catch (error) {
        toast.error(getError(error))
       }
    }
    fetchData()
  })
 

  if (loading) {
    return(
      <div className='loading__center'>
      <div className="ring"></div>
      <span className="loading">Loading</span>
    </div>
    )
  }
  if (error) {
    return(
      <div style={{minHeight:"75vh"}}>error</div>
    )
  }
  return (
    <section className='container bigMarketWrapper'>
      <Navbar/>
       <article className='overviewCon'>
          <h3 className='overview'> <Link to='/marketplace'>Overveiw</Link> </h3>
          <h3><Link to='/api/asset/user/:id'>My Assets</Link></h3>
       </article>
       <article className='marketVolume'>
        <div className='marketVolumetop'>
          <div className='marketVolumetopLeft'>
            <h2>Marketplace Volume</h2>
            <p>Includes Land,Wearable,Emotes and Names</p>
          </div>
          <div className='marketVolumetopRight'>
            <div className='day7'>7day</div><div className='day30'>30day</div><div className='dayall'>All</div>
          </div>
        </div>
        <div className='marketVolumetopbtm'>
          <div className='changeres'><div className='iconCon'><TiTag/></div>
          <div><h5>TOTAL SALES</h5>
            <div className='salesnum'><h2>{totalSales}</h2><div><p>/{Math.floor(totalSales/2)}days</p></div></div>
          </div></div>
          <div className='changeres'>
          <div className='iconCon'><BiBarChart/></div>
          <div><h5>TOTAL VOLUME</h5>
            <div className='salesnum'><h2>203.35k</h2><h2>$85.46k</h2></div>
          </div>
          </div>
          
          
        </div>
       </article>
       <article className='trendingContainer'>
        <div className='trendwrap'>
        <div>
        <h2 className='trendingItemText'>Trending Items</h2>
        <div className='trendText'><p>Best Selling Item over the last 24h&#128293;</p></div>
        
        </div>
        <Link className='exploree' to='/marketplace'>{Explore}</Link>
        </div>
        <Swiper
      
       // install Swiper modules
       modules={[Pagination,Autoplay]}
       spaceBetween={40}
       slidesPerView={slideShowLen}
       pagination={{ clickable: true }}
       autoplay={{delay:3000}}
     >
       {product.slice(5,10).map((trendItem) => {
         return (
           <SwiperSlide  key={trendItem._id} className="singleTrendingItem" >
            <Link to={`/api/product/id/${trendItem._id}`}>
            <div className='SwiperImageContainer' style={{padding:0,margin:0,width:"100%"}}>
               <img
               style={{width:"100%"}}
                 src={trendItem.image}
                 alt={trendItem.name}
               />
             </div>
             <h5 className="swipename">{trendItem.name}</h5>
            </Link>
             
           </SwiperSlide>
         );
       })}
     </Swiper>
       </article>
       <article>
        <div className='trendwrap'>
        <h2>Land and Estate</h2>
        <Link className='exploree' to='/product'>{Explore}</Link>
        </div>
       
        <Swiper
      
       // install Swiper modules
       modules={[Pagination,Autoplay]}
       spaceBetween={40}
       slidesPerView={slideShowLen}
       pagination={{ clickable: true }}
       autoplay={{delay:5000}}
     >
      
       {product.slice(0,5).map((landEstate) => {
         return (
           <SwiperSlide key={landEstate._id} >
            <Link to={`/api/product/id/${landEstate._id}`}>
            <div  className='SwiperImageContainer'>
               <img
                 className=""
                 src={landEstate.image}
                 alt=""
               />
             </div>
             <h5 className="swipename">{landEstate.name}</h5>
            </Link>
            
           </SwiperSlide>
         );
       })}
     </Swiper>
       </article>
       {loading3?<div>loading</div>:error3}
       <h2 className='recentSoldText'>Recently Sold</h2>
       <article className='recentSoldContainer'>
        <div className='recentTop'><h3>Land</h3><h3>Estate</h3><h3>Shares</h3></div>
        <div>
          <div className='recentspread'><h3>Assets</h3><h3>Rarity</h3><h3>Volume</h3></div>
          {product3.slice(-5).reverse().map((recentsold)=>{
            const {_id,name,image,volume,rarity,landSize}=recentsold
            return(
              <div key={_id} className='soldcon'>
                <div className='recentspread'>
                  <div className='recentNameAndImg'>
                  <div className='recentImage' style={{width:"30px",height:"30px"}}><img alt={name} src={image}/></div>
                  <h2 className='namee'>{name}</h2>
                  </div>
                  <div className='rare'>{rarity}</div>
                  <div className='rareRight'><img src={landSize} alt={name} style={{width:"30px",height:"30px"}}/>{volume}</div>
                  </div>
                <hr/>
              </div>
            )
          })}
        </div>
       </article>
       {loading?<div></div>:<Footer/>}
    </section>
  )
}

export default Marketplace