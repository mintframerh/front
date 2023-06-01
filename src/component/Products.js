import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import "./products.css"
import Navbar from "./Navbar";
import { SERVERMACHINE } from "./envconfig";
import Footer from "./Footer";
const Products = () => {
  // sample product data
//   const products = [
//     { id: 1, name: "Product 1", price: 10 },
//     { id: 2, name: "Product 2", price: 20 },
//     { id: 3, name: "Product 3", price: 30 },
//     { id: 4, name: "Product 4", price: 40 },
//     { id: 5, name: "Product 5", price: 50 },
//     { id: 6, name: "Product 6", price: 60 },
//     { id: 7, name: "Product 7", price: 70 },
//     { id: 8, name: "Product 8", price: 80 },
//     { id: 9, name: "Product 9", price: 90 },
//     { id: 10, name: "Product 10", price: 100 },
//     { id: 11, name: "Product 11", price: 110 },
//     { id: 12, name: "Product 12", price: 120 },
//   ];
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
          // const response=await axios.get('https://cloudy-toad-wig.cyclic.app/api/product');
          const response=await axios.get(`${SERVERMACHINE}/api/product`);
          dispatch({type:"FETCH_SUCCESS",payload:response.data})
        } catch (error) {
          dispatch({type:"FETCH_FAIL",payload:error.message})
        }
      }
      FetchData()  
   
    
  },[])

  // state for current page
  const [currentPage, setCurrentPage] = useState(1);
  // state for number of products per page
  const [productsPerPage] = useState(8);

  // calculate total number of pages based on number of products and products per page
  const totalPages = Math.ceil(product.length / productsPerPage);

  // get index of first and last product of current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // get current products based on index of first and last product
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

  // function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
if(loading){
  return(
    <div className='loading__center'>
    <div className="ring"></div>
    <span className="loading">Loading</span>
  </div>
  )
}
if(error){
  return(
    <div style={{minHeight:"70vh"}}>There was an error</div>
  )
}
  return (
    <div className="container ">
      {/* display current products */}
      <Navbar/>
      <h2 className="accounttxt">Our Products</h2>
      <div className="productContainer">
      {currentProducts.map((sproduct) => (
        <div key={sproduct._id} className="pCon">
        <Link to={`/api/product/id/${sproduct._id}`}>
            <div  className='SwiperImageContainer'>
               <img
                 className=""
                 src={sproduct.image}
                 alt=""
               />
             </div>
             <h5 className="swipename">{sproduct.name}</h5>
            </Link>
        </div>
      ))}
      </div>
      
      {/* display pagination */}
      <div className="numberContainer">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button className={pageNumber === currentPage ? "active btn" : "btn"} key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
      {loading?<div></div>:<Footer/>}
      
    </div>
  );
};

export default Products;
