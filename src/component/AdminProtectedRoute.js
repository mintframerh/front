import React, { useContext } from 'react'
import { Store } from './store'
import { Navigate } from 'react-router-dom'

const AdminProtectedRoute = ({children}) => {
    const {state}=useContext(Store)
    const {userInfo}=state
  return (
    <div>{userInfo && userInfo.isAdmin === true ? children:<Navigate to='/login'/>}</div>
  )
}

export default AdminProtectedRoute