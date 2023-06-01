import React, { useRef,useState } from 'react'
import { TiEye } from 'react-icons/ti';
import {  useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar'
import axios from 'axios'

import './signup.css'
import { toast } from 'react-toastify';
import { getError } from './utils';
import { SERVERMACHINE } from './envconfig';
import Footer from './Footer';
const UpdatePassword = () => {
    const para =useParams();
    const { token } =para;
  const navigate=useNavigate()
  const [showpassword,setShowPassword]=useState('password')
  const showPasswordHandler = () => {
    let show = passwordRef.current.type
    if (show === 'password') {
      let newshow=setShowPassword('text')
      show=newshow
    }
    else {
      let newshow2=setShowPassword('password')
      show=newshow2
    }
  }
  const data={password:'',confirmPassword:''} 
   const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [success, setSuccess] = useState();
  
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
   const removeErrorMessage = () => {
     const removeTime = setTimeout(() => {
      
       setPasswordError('')
       setConfirmPasswordError('')
       
       setSuccess('')
     }, 2000);
     return () => {
       clearTimeout(removeTime);
     };
   };
  const registerSubmitHandler = async(e) => {
    console.log(e)
    e.preventDefault();
    
    let password = passwordRef.current.value
    let confirmPassword=confirmPasswordRef.current.value
    
    
    if (
      password === "" ||
      password === null
    ) {
      setPasswordError("Enter your password");
      removeErrorMessage();
    }
    if (
      confirmPassword === "" ||
      confirmPassword === null
    ) {
      setConfirmPasswordError("Confirm your password");
      removeErrorMessage();
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Password does not match')
      removeErrorMessage();
    }
    if (
      (password !== "") &&
      (confirmPassword !== "")
    ) {
      let newdata={ ...data, password:password, confirmPassword:confirmPassword }
      console.log(newdata)
      axios.patch(`${SERVERMACHINE}/api/resetpassword/${token}`,newdata)
      // axios.post('https://cloudy-toad-wig.cyclic.app/api/resetpassword',newdata)
      .then((response)=>{
        console.log(response)
        setSuccess('success')
        removeErrorMessage()
        e.target.reset();    
          navigate('/login') 
      })
      .catch((err)=>{
        console.log(err)
        toast.error(getError(err))
      })
    
      e.target.reset();
    }

  }
 
  return (
    <div className="container">
      <Navbar />
      <section className="signupSection">
        <h2 className="accounttxt">Create an Account</h2>
        <article className='coverArt'>
          <form className="form" onSubmit={registerSubmitHandler}>
            <div className="input passdiv">
              <input
                ref={passwordRef}
                className="password"
                type={showpassword}
                placeholder="Password"
              />
                <TiEye className='eye' onClick={()=>showPasswordHandler()}/>
              
            </div>
            <small className="error">{passwordError}</small>
            <div className="input passdiv">
              <input
                ref={confirmPasswordRef}
                className="password"
                type={showpassword}
                placeholder="Password"
              />
                <TiEye className='eye' onClick={()=>showPasswordHandler()}/>
              
            </div>
            <small className="error">{confirmPasswordError}</small>
            <small className="success">{success}</small>
            <button className="btn continue">Continue</button>
          </form>
        </article>
      </section>
      <Footer/>
    </div>
  );
}

export default UpdatePassword