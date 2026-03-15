import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X, LogOut } from 'lucide-react'
import api from '../api/axiosInstance'
import { useDispatch } from 'react-redux'
import { clearUser, setUser } from '../store/authSlice'

export default function Header({ cartCount, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const generateSession = async () => {
        await api.get('/session/generate-session')
    }

    generateSession()
  }, [])

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/user/profile')
        setUserData(response.data)
        dispatch(setUser(response.data))
      } catch (error) {
        console.error('Failed to fetch user profile:', error)
        setUserData(null)
        dispatch(clearUser())
      }
    }

    fetchUserProfile()
  }, [])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <nav className="container-custom flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:inline">CourseHub</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-slate-700 hover:text-primary-600 font-medium transition-colors">
            Home
          </Link>
          <Link to="/courses" className="text-slate-700 hover:text-primary-600 font-medium transition-colors">
            Courses
          </Link>
          <Link to="/courses" className="text-slate-700 hover:text-primary-600 font-medium transition-colors">
            Explore
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6">
          {userData ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-700">Welcome, {userData.name}</span>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-slate-700 hover:text-primary-600 font-medium">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Sign Up
              </Link>
            </div>
          )}
          <Link to="/cart" className="relative btn-icon">
            <ShoppingCart size={24} className="text-slate-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative btn-icon">
            <ShoppingCart size={20} className="text-slate-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={toggleMenu} className="btn-icon">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container-custom py-4 space-y-4">
            <Link to="/" className="block text-slate-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link to="/courses" className="block text-slate-700 hover:text-primary-600 font-medium">
              Courses
            </Link>
            <hr className="my-2" />
            {userData ? (
              <div className="space-y-4">
                <p className="text-sm text-slate-700">Welcome, {userData.name}</p>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link to="/login" className="block text-center py-2 text-primary-600 font-medium border border-primary-600 rounded-lg hover:bg-primary-50">
                  Login
                </Link>
                <Link to="/register" className="block text-center btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}