import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
  return (
    <div>
      {localStorage.getItem('token') ? <Outlet /> : 
      //redirect to login if not authenticated in react way
       <Navigate to="/login" />
      }
    </div>
  )
}

export default ProtectedRoute
