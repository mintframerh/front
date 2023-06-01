import React, { useContext } from 'react'
import { Store } from './store'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {state}=useContext(Store)
    const {userInfo}=state
  return (
    <div>{userInfo?children:<Navigate to='/login'/>}</div>
  )
}

export default ProtectedRoute