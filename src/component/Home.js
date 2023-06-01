import React from 'react'
import Navbar from './Navbar'
import './home.css'
import { Link } from 'react-router-dom';
import Image1 from '../image/digital-2.png'
import Footer from './Footer';
const Home = () => {
  let image1=Image1
  return (
    <div className="container">
   
      <div className=" homeContainer">
        <Navbar />
        <div className="wrapper">
       
          <div className="cover">
                  
            <h2 className="welcomeText">Welcome To</h2>
              
              <div style={{display:"flex", height:"80px" , alignItems:"flex-end"}} className="tests">
               
                <h1 className="mintyText colorful-text">MintyLand </h1>
              <div class="box-container">
                <div class="box box1"></div>
                <div class="box box2"></div>
            </div>  
              </div>
               
            <h2 className="buyText">Buy, sell and own virtual lands</h2>
          </div>
        </div>
      </div>
      <article className="descovery">
        <div className="left" >
          <h2 className="discoverText colorful-text">Discover</h2>
          <h3>Immerse Yourself In The Beautiful and Evolving Virtual Word</h3>
          <h5 className="immerseText">
            Discover LANDs owned by users & experience incredible scenes and
            structures
          </h5>
          <div className="getStarted">
            <Link className="btn getSbtn" to="/signup">
              Get Started
            </Link>
          </div>
        </div>
        <div className="right">
          <div className="homeImageContainer">
            <img src={image1} alt="try" />
          </div>
        </div>
      </article>
      <article className="descovery">
        <div className="left">
          <div className="homeImageContainer">
            <img src={image1} alt="try" />
          </div>
        </div>
        <div className="right magadded">
          <h2 className="discoverText colorful-text">Trade</h2>
          <h3>Buy & sell LANDs $ Estate From Our Store</h3>
          <h5 className="immerseText">
            Discover LANDs owned by users & experience incredible scenes and
            structures
          </h5>
          <div className="getStarted">
            <Link className="btn getSbtn" to="/signup">
              Get Started
            </Link>
          </div>
        </div>
      </article>
      <section className="homeAboutContainer">
        <h2 className="discoverText colorful-text">About MintyLand</h2>
        <h3 className='homeAboutText'>MintyLand allow you to buy and sell virtual assets and real estate</h3>
        <div className="getStarted">
          <Link className="btn getSbtn" to="/about">
            Read More
          </Link>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Home