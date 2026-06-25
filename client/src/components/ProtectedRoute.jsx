import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext.jsx'

function ProtectedRoute() {
  const { user } = useAuth();

  return (
    <div>
      {user ? <Outlet /> : 
      //redirect to login if not authenticated in react way
       <Navigate to="/login" />
      }
    </div>
  )
}

export default ProtectedRoute
