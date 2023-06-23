import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom';
import './signup.css'
import { TiEye } from 'react-icons/ti';
import axios from "axios";  
import { useLocation } from 'react-router-dom';
import { Store } from './store';
import { toast } from 'react-toastify';
import { getError } from './utils';
import { SERVERMACHINE } from './envconfig';
import Footer from './Footer';
const Login = () => {
  const navigate=useNavigate()
  const {search}=useLocation()
  const redirctUrl=new URLSearchParams(search).get('redirect');
  const redirect= redirctUrl ? redirctUrl:"/";
   const details = {
    
     email: "",
     password: "",
    
   };
   
   const [showpassword,setShowPassword]=useState('password')
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");
 
   const [success, setSuccess] = useState();
  
   const emailRef = useRef("");
   const passwordRef = useRef("");
  
   const removeErrorMessage = () => {
     const removeTime = setTimeout(() => {
       setEmailError("");
       setPasswordError("");
       setSuccess("");
     }, 2000);
     return () => {
       clearTimeout(removeTime);
     };
   };
   const {state,dispatch:ctxDispatch}=useContext(Store)
   const {userInfo}=state
   const registerSubmitHandler = async(e) => {
     e.preventDefault();
    
     let email = emailRef.current.value;
     let password = passwordRef.current.value;

     if (email === "" || email === null) {
       setEmailError("Enter your email");
       removeErrorMessage();
     }
     if (password === "" || password === null) {
       setPasswordError("Enter your password");
       removeErrorMessage();
     }
     if (
       email !== "" &&
       password !== ""
     ) {
      const ChangeEmail=email.toLowerCase()
       let data = {
         ...details,
         email: ChangeEmail,
         password: password,
       };
         await axios
         axios.post(`${SERVERMACHINE}/api/user/login`,data,{
           headers: {
             "Content-Type": "application/json",
           },
         })
         .then(function (response) {
          ctxDispatch({type:"USER_SIGNIN",payload:response.data})
          localStorage.setItem('userInfo',JSON.stringify(response.data))
          console.log(response.data)
          setSuccess("success");
          removeErrorMessage();
          e.target.reset();    
          if(response.data.name ==="Admin"){
            navigate('/admin/createNewProduct')
          }
          else{
            navigate(redirect || '/')
          }
           
         })
         .catch(function (error) {
          toast.error(getError(error))
         });
      
     }
  };
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
  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
  },[navigate,redirect,userInfo])
  return (
    <div className="container">
      <Navbar />
      <section className="signupSection">
        <h2 className="accounttxt">Login</h2>
        <article className='coverArt'>
          <form className="form" onSubmit={registerSubmitHandler}>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              className="input"
            />
            <small className="error">{emailError}</small>
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

            <p className="accounttxt">
              create an account?{" "}
              <span>
                <Link to={`/signup?redirect=${redirect}`} className="log">
                  sign up
                </Link>
              </span>
            </p>
            <p style={{textAlign:"center", margin:"1rem"}}>
              <Link className="log" to='/forgotpassword'>forgotten password?</Link>
            </p>
            <small className="success">{success}</small>
            <button className="btn continue getSbtn">Continue</button>
          </form>
        </article>
      </section>
      <Footer/>
    </div>
  );
}

export default Login