import React, { useContext } from 'react'
import { useRef,useState } from 'react'
import {useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import axios from 'axios'

import './signup.css'
import './createnewproduct.css'
import { toast } from 'react-toastify';
import { getError } from './utils';
import { SERVERMACHINE } from './envconfig';
import Footer from './Footer';
import { Store } from './store';
const CreateAsset = () => {
    const navigate=useNavigate()
    const {state}=useContext(Store)
    const {userInfo}=state;
    const [nameError, setNameError] = useState("");
   const [priceError, setPriceError] = useState();
   const [descriptionError, setDescriptionError] = useState("");
  const [imageError, setImageError] = useState("");
   const [success, setSuccess] = useState();
   const nameRef = useRef();
   const priceRef = useRef();
   const descriptionRef = useRef();
   const imageRef = useRef();
    const removeErrorMessage = () => {
      const removeTime = setTimeout(() => {
        setNameError('')
        setImageError('')
        setDescriptionError('')
        setPriceError('')
        setSuccess('')
      }, 2000);
      return () => {
        clearTimeout(removeTime);
      };
    };
   const registerSubmitHandler = async(e) => {
     console.log(e)
     e.preventDefault();
     let name = nameRef.current.value
    
     let image =imageRef.current.files[0]
     let description = descriptionRef.current.value
     let price=priceRef.current.value
     if (name === ""|| name === null) {
       setNameError('Enter Product Name')
       removeErrorMessage()
     }
     if (image === ""|| name === null) {
       setImageError('insert Product image')
       removeErrorMessage()
     }
     if (
        price=== "" ||
        price === null
     ) {
       setPriceError("Enter product price");
       removeErrorMessage();
     }
     if (
       description === "" ||
       description === null
     ) {
       setDescriptionError("Enter product description ");
       removeErrorMessage();
     }

     if (
       (name !== "") &&
       (description !== "") &&
       (price !== "") &&
       (image !== "")
     ) {
 
const formData = new FormData();
formData.append('image', image);
formData.append('name', name);
formData.append('description', description);
formData.append('price', price);
formData.append('userId',userInfo._id)
formData.append('ownerName',userInfo.name)
// axios.post('http://localhost:5000/api/admin/createnewproduct',formData)
axios.post(`${SERVERMACHINE}/api/admin/createnewasset`,formData)
.then(()=>{
  setSuccess('success')
  removeErrorMessage()
  e.target.reset();    
  navigate('/api/asset/user/:id')
})
.catch((err)=>{
console.log(err)
toast.error(getError(err))
})      
e.target.reset();
}}  
  return (
   
        <div className="container">
          <Navbar />
          <section className="signupSectione">
            <h2 className="accounttxt">Create New Product</h2>
            
            <article >
              <form  onSubmit={registerSubmitHandler} >
                <div className='formCont'>
                <div  className='formlf'>
              <input
                  ref={nameRef}
                  type="text"
                  placeholder="Asset Name"
                  className="input adinput"
                  style={{width:'88%'}}
                />
                <small className="error">{nameError}</small>
                  <input
                    ref={descriptionRef}
                    className="input adinput"
                    type='text'
                    placeholder="description"
                  />
                <small className="error">{descriptionError}</small>
              </div>
              <div className='formlf'>
                  <input
                    ref={priceRef}
                    className="input adinput"
                    type='number'
                    placeholder="price"
                  />
                <small className="error">{priceError}</small>
                <div style={{border:"solid",textAlign:"center",cursor:"pointer"}} className='input adinput'>
                <input
                  ref={imageRef}
                  type="file"
                  placeholder="image"
                  className="input adinput"
                  style={{display:"none"}}
                  id='file'
                />
                <label htmlFor="file"
                className="label"
                >
                  Asset image
                </label>
                </div>
                
                <small className="error">{imageError}</small>
              </div>

                </div>
                <div style={{width:"100%",margin:"auto",textAlign:"center",paddingTop:"2rem"}}>
                <small className="success">{success}</small>
                <button className="btn continue" style={{textAlign:"center"}}>Create</button>
                </div>
                
              </form>
            </article>
          </section>
          <Footer/>
        </div>
  )
}

export default CreateAsset
