import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import Navbar from './Navbar'
import './assest.css'
import axios from 'axios'
import { Store } from './store'
import { Link } from 'react-router-dom'
import { SERVERMACHINE } from './envconfig'
import Footer from './Footer'



function convertImageUrlToBase64(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };
    img.onerror = error => reject(error);
    img.src = imageUrl;
  });
}
  
const Assets = () => {
  const [imageUrl, setImageUrl] = useState('https://res.cloudinary.com/dkzuuda7n/image/upload/v1680255027/x4nycckcho7ddiizktj9.png');
  const [base64String, setBase64String] = useState('');
  const [balance,setBalance]=useState(0.00)
    useEffect(() => {
      async function fetchData() {
        try {
          const base64String = await convertImageUrlToBase64(imageUrl);
          setBase64String(base64String);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, [imageUrl]);

    const {state}=useContext(Store)
    const {userInfo}=state;
    
    const reducer=(state,action)=>{
      switch (action.type) {
        case 'FETCH_REQUEST':
          return {...state,loading:true};
        case 'FETCH_SUCCESS':
          return {...state,asset:action.payload,loading:false};
        case 'FETCH_FAIL':
            return {...state, loading:false, error:action.payload};  
      
        default:
          break;
      }
    }

  
  
   
    const [{loading,asset,error}, dispatch]=useReducer((reducer),{loading:true,asset:[],error:''})
    useEffect(()=>{
      
      const FetchData=async()=>{
        dispatch({type:"FETCH_REQUEST"})
        try {
          // const response=await axios.get(`http://localhost:5000/api/asset/user/${userInfo._id}`)
          const response=await axios.get(`${SERVERMACHINE}/api/asset/user/${userInfo._id}`);
          const balanceResponse=await axios.get(`${SERVERMACHINE}/api/asset/user/balance/${userInfo._id}`);
          setBalance(balanceResponse.data.balance)
          dispatch({type:"FETCH_SUCCESS",payload:response.data})
          
        
        } catch (error) {
          dispatch({type:"FETCH_FAIL",payload:error.message})
        }
      }
      FetchData() 
  },[userInfo._id,balance])
  
  const [disableDownload,setDisableDownload]=useState(true)
  const chechRef=useRef()
  const downloadRef=useRef()
  const handleDat=(image)=>{
    const chech=chechRef.current.checked='checked';
    if(chech){
      setImageUrl(image)
      setDisableDownload(false)
    }
  }
  if(loading){
    return (
      <div className='loading__center'>
        <div className="ring"></div>
        <span className="loading">Loading</span>
    </div>
    )
  }
  if(error){
    return(<div style={{minHeight:"75vh"}}>error:cannot fetch data</div>)
  }

    return (
      <div className='container'>
        <Navbar/>
        <div className='createasset'>
        <div className='flexdown'>
        <Link to='/createasset' className='btn'>Create Asset</Link>
        <Link to='/checksales' className='btn'>Check Sales</Link>
        </div>
          
          <div>
            <div className='flex'>
              <p>balance:</p>
              <p><b>${balance}</b></p>
            </div>
            <div className='withdraw'>
              <Link to='/metamask' className='btn '>Withdraw</Link>
            </div>
          </div>
        </div>
        <h2 className='assetTexth colorful-text'>My Asset</h2>
        <section className=' assetContainer'>
          {asset.length === 0?<div> <h2 style={{margin:"2rem 0"}}>Sorry you do not have an asset</h2>
          <Link to='/product' className='btn'>Go Shopping{'>>>'}</Link> </div>:<div>{ asset.map((data,index)=>{
            const {name,image,price}=data
            return(
              <article key={index} className='singleAssetContainer'>
              <div className='leftImageContainer'>
              <img src={image} alt={name}/>  
            </div>
            <div className='RightImageContainer'>
              <small className='assetSmall'>Asset Name</small>
              <div className='nametotal'><h2 className='assetName'>{name}</h2><h2 className='assetName'>{`+${price}`}</h2></div>
              
              <small className='assetSmall'>Total Volume</small>
              <input  type="checkbox" ref={chechRef}  className='check' onClick={()=>handleDat(image)} />
              <h3 className='volume'>{price}</h3> 
              <a href={`${base64String}`} ref={downloadRef} download  className={disableDownload ? 'btn sellBtn disableDownlaod' : 'btn sellBtn '} >Get NFT</a>
            </div>
          </article>
            )
          })}</div>}
          
        </section>
        {loading?<div></div>:<Footer/>}
      </div>
    )
  }

export default Assets