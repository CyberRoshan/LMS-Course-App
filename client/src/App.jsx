import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [user, setUser] = useState(null)

  const addToCart = (course) => {
    const exists = cartItems.find(item => item.id === course.id)
    if (exists) {
      setCartItems(cartItems.map(item =>
        item.id === course.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCartItems([...cartItems, { ...course, quantity: 1 }])
    }
  }

  const removeFromCart = (courseId) => {
    setCartItems(cartItems.filter(item => item.id !== courseId))
  }

  const updateCartQuantity = (courseId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(courseId)
    } else {
      setCartItems(cartItems.map(item =>
        item.id === courseId ? { ...item, quantity } : item
      ))
    }
  }

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
        <Header 
          cartCount={cartItems.length} 
          user={user} 
          onLogout={handleLogout}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/courses" element={<Courses onAddToCart={addToCart} />} />
            <Route path="/cart" element={
              <Cart 
                cartItems={cartItems}
                onRemoveFromCart={removeFromCart}
                onUpdateQuantity={updateCartQuantity}
              />
            } />
            <Route path="/checkout" element={
              <Checkout 
                cartItems={cartItems}
                user={user}
              />
            } />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
