import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom'
const currentYear = () => {
    const date = new Date()
    return date.getFullYear()
}
const Footer = () => {
  return (
    <div className="container footWrapper">
      <hr className="horizontalLine" />
      <article className="footerContainer">
        <div className="leftFooter">
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/marketplace">Privacy</Link>
          </p>

          <p>
            <Link to="/about">About</Link>
          </p>
        </div>
        <div className="rightFooter">
          <p>&#169; {currentYear()} MintyLand</p>
          <p>Powered By Trojan</p>
        </div>
      </article>
    </div>
  );
}

export default Footer