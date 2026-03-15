import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react'
import api from '../api/axiosInstance'
import { useSelector } from 'react-redux'

export default function Cart({ onRemoveFromCart, onUpdateQuantity }) {
  const user = useSelector((state) => state.auth.user?.id)
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  
  const getCart = async () => {
    try {
      setLoading(true)
      const res = await api.get(user ? "/cart" : "/session/cart")
      console.log("Cart API response:", res.data)

      const items = (Array.isArray(res.data) ? res.data : []).map((item) => ({
  ...item,
  quantity: item.quantity || 1
}))

      setCartItems(items)
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message)
      setCartItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  const handleRemove = async (itemId) => {
  try {
    await api.delete(user ? `/cart/${itemId}` : `/session/cart/${itemId}`)
    await getCart()
    if (onRemoveFromCart) {
      onRemoveFromCart(itemId)
    }
  } catch (error) {
    console.error("Error removing item:", error.response?.data || error.message)
  }
}

  const handleQuantityUpdate = async (itemId, newQty) => {
  if (newQty < 1) return

  try {
    await api.patch(user ? `/cart/${itemId}` : `/session/cart/${itemId}`, {
      quantity: newQty,
    })
    await getCart()

    if (onUpdateQuantity) {
      onUpdateQuantity(itemId, newQty)
    }
  } catch (error) {
    console.error("Error updating quantity:", error.response?.data || error.message)
  }
}

  const subtotal = cartItems.reduce(
    (sum, item) => sum + ((item.price || 0) * item.quantity),
    0
  )
  const tax = subtotal * 0.1
  const total = subtotal + tax

  if (loading) {
    return (
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
        <div className="text-center py-20 bg-white rounded-lg shadow-sm">
          <p className="text-slate-600">Loading cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          to="/courses"
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm divide-y divide-slate-200">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex gap-6">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center overflow-hidden">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-white text-2xl">📚</div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3">
                        {item.category}
                      </p>
                      <p className="text-xl font-bold gradient-text">
                        ${((item.price || 0) * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                      <div className="flex items-center gap-2 border border-slate-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-100 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 font-medium text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-100 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 h-fit">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (10%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold gradient-text">${total.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="btn-primary w-full text-center block mb-3">
                Proceed to Checkout
              </Link>

              <Link to="/courses" className="btn-secondary w-full text-center block">
                Continue Shopping
              </Link>

              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-700">
                  ✓ Get lifetime access to all courses
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg">
          <ShoppingCart size={64} className="mx-auto text-slate-300 mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Your cart is empty</h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            Explore our courses and add some to your cart to get started on your learning journey.
          </p>
          <Link to="/courses" className="btn-primary inline-block">
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  )
}