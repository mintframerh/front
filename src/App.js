import React from 'react';
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import './App.css';
import Home from './component/Home'
import Marketplace from './component/Marketplace'
import Assets from './component/Assets';
import Notification from './component/Notification';
import Login from './component/Login';
import Signup from './component/Signup';

import { Route, Routes } from "react-router-dom";
import Trending from './component/Trending';
import LandAndEstate from './component/LandAndEstate';
import ConnectWallet from './component/ConnectWallet';
import PageNotFound from './component/PageNotFound';
import SingleAsset from './component/SingleAsset';
import CreateNewProduct from './component/CreateNewProduct';
import CryptoPayment from './component/CryptoPayment';
import AllUsers from './component/AllUsers';
import AllProducts from './component/AllProducts';
import About from './component/About';
import AdminProtectedRoute from './component/AdminProtectedRoute';
import ProtectedRoute from './component/ProtectedRoute';
import ForgotPassword from './component/ForgotPassword';
import UpdatePassword from './component/UpdatePassword';
import Products from './component/Products';
import CreateAsset from './component/CreateAsset';
import Withdraw from './component/Withdraw';
import Addmoney from './component/Addmoney';
import Metamask from './component/Metamask';
import Coinbase from './component/Coinbase';
import Binance from './component/Binance';

function App() {
  return (
    <div className="App">
      <ToastContainer style={{position:'absolute',bottom:'10px',right:'40%'}} limit={1}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/api/asset/user/:id" element={<ProtectedRoute><Assets /></ProtectedRoute>} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/landandEstate" element={<LandAndEstate />} />
        <Route path="/connectwallet" element={<ProtectedRoute><ConnectWallet /></ProtectedRoute>} />
        <Route path="/api/product/id/:id" element={<SingleAsset />} />
       <Route path='/admin/createNewProduct' element={<AdminProtectedRoute><CreateNewProduct/></AdminProtectedRoute> }/>
       <Route path='/admin/allproducts' element={<AdminProtectedRoute><AllProducts/></AdminProtectedRoute>}/>
       <Route path='/admin/allusers' element={<AdminProtectedRoute><AllUsers/></AdminProtectedRoute>}/>
       <Route path='/cryptopayment' element={<ProtectedRoute><CryptoPayment/></ProtectedRoute>}/>
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/api/resetpassword/:token" element={<UpdatePassword />} />
        <Route path="/product" element={<Products />} />
        <Route path="/createasset" element={<ProtectedRoute><CreateAsset /></ProtectedRoute>} />
        <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
        <Route path="/checksales" element={<ProtectedRoute><Addmoney/></ProtectedRoute>} />
        <Route path="/metamask" element={<ProtectedRoute><Metamask/></ProtectedRoute>} />
        <Route path="/coinbase" element={<ProtectedRoute><Coinbase/></ProtectedRoute>} />
        <Route path="/binance" element={<ProtectedRoute><Binance/></ProtectedRoute>} />
      </Routes>
     
    </div>
  );
}

export default App;
