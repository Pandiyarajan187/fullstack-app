import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext.jsx'

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/projects', label: 'Projects' },
]

function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#0d0f14]">
      <nav className="bg-[#0d0f14] border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="text-xl font-bold text-white tracking-tight">
              <span className="text-blue-500">{'{PM}'}</span> Manager
            </span>
            <div className="flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    location.pathname === link.to
                      ? 'text-white bg-gray-800'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
