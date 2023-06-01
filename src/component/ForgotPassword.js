import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import { getError } from './utils';
import { SERVERMACHINE } from './envconfig';
import Footer from './Footer';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${SERVERMACHINE}/api/forgotpassword`, { email });
      const {data}=response
      console.log(data)
    //   setSuccessMessage(response.data.message);
    } catch (error) {
      toast.error(getError(error))
       
    //   setErrorMessage(error);
    }

    setIsLoading(false);
  };

  return (
    <div className='container'>
      <Navbar/>
      <section className="signupSection">
      <h2 className="accounttxt">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
         className="input"
          type="email"
          id="email"
          value={email}
          placeholder='Your Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={isLoading} className="btn continue">
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      </section>
      
      {/* {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>} */}
      <Footer/>
    </div>
  );
};

export default ForgotPassword;


