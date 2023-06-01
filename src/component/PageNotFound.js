import React from 'react'
import FourZeroFour from "../image/404.png"
import { Link } from 'react-router-dom'
import './pagenotfound.css'
import Footer from './Footer'
const PageNotFound = () => {
  return (
    <section className='container pagenotfoundContainer' >
        <article className='leftpagenotfound'>
            <img src={FourZeroFour} alt='404' />
        </article>
        <article className='rightpagenotfound'>
            <h3 className='lost'>Uhhhhh OH!!! YOU'RE LOST</h3>
            <p className='pageTxt'>This page you're looking for does not exist, how you got here was a mystery but you can click on the button below to go back home</p>
            <Link to='/' className='goHome btn'>Go Back Home</Link>
        </article>
        <Footer/>
    </section>
  )
}

export default PageNotFound