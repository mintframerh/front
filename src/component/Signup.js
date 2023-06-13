import React, { useContext, useEffect, useRef,useState } from 'react'
import { TiEye } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import axios from 'axios'

import './signup.css'
import { toast } from 'react-toastify';
import { getError } from './utils';
import { SERVERMACHINE } from './envconfig';
import Footer from './Footer';
import { Store } from './store';
const Signup = () => {
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
  const data={username:'',email:'',password:'',confirmPassword:''}
  // const [username, setUsername] = useState('')
  // const [emal, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
   const [usernameError, setUsernameError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [success, setSuccess] = useState();
  const usernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
   const removeErrorMessage = () => {
     const removeTime = setTimeout(() => {
       setEmailError('')
       setPasswordError('')
       setConfirmPasswordError('')
       setUsernameError('')
       setSuccess('')
     }, 2000);
     return () => {
       clearTimeout(removeTime);
     };
   };
  const registerSubmitHandler = async(e) => {
    console.log(e)
    e.preventDefault();
    let username = usernameRef.current.value
    let email = emailRef.current.value
    let password = passwordRef.current.value
    let confirmPassword=confirmPasswordRef.current.value
    if (username === ""|| username === null) {
      setUsernameError('Enter your username')
      removeErrorMessage()
    }
    if (
      email === "" ||
      email === null
    ) {
      setEmailError("Enter your email");
      removeErrorMessage();
    }
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
      (email !== "") &&
      (username !== "") &&
      (password !== "") &&
      (confirmPassword !== "")
    ) {
      const ChangeEmail=email.toLowerCase()
      let newdata={ ...data, email:ChangeEmail, username:username, password:password, confirmPassword:confirmPassword }
      console.log(newdata)
      axios.post(`${SERVERMACHINE}/api/user/signin`,newdata)
      // axios.post('https://cloudy-toad-wig.cyclic.app/api/user/signin',newdata)
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
  const {state}=useContext(Store)
  const {userInfo}=state
  useEffect(()=>{
    if(userInfo){
      navigate('/marketplace')
    }
  })
 
  return (
    <div className="container">
      <Navbar />
      <section className="signupSection">
        <h2 className="accounttxt">Create an Account</h2>
        <article className='coverArt'>
          <form className="form" onSubmit={registerSubmitHandler}>
            <input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              className="input"
            />
            <small className="error">{usernameError}</small>
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
            <p className="accounttxt">
              already have an account?{" "}
              <span>
                <Link to="/login" className="log">
                  log in
                </Link>
              </span>
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

export default Signup