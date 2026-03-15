import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function Checkout({ cartItems, user }) {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const subtotal = cartItems.reduce((sum, item) => sum + (49.99 * item.quantity), 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderPlaced(true)
    }, 2000)
  }

  if (orderPlaced) {
    return (
      <div className="container-custom py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 animate-fade-in">
            <CheckCircle2 size={80} className="mx-auto text-green-500 mb-6" />
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Order Confirmed!</h1>
            <p className="text-lg text-slate-600 mb-8">
              Thank you for your purchase. We've sent a confirmation email to {formData.email}
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="text-left mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Order Summary</h2>
              <div className="space-y-3 border-b border-slate-200 pb-4 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-slate-700">
                    <span>{item.title}</span>
                    <span className="font-medium">${(49.99 * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 mt-2">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold gradient-text">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-slate-600 mb-6">
              Access your courses by logging into your account. You'll find them in your learning dashboard.
            </p>
            <Link to="/" className="btn-primary inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
          <p className="text-slate-600 mb-8">Add some courses to proceed with checkout</p>
          <Link to="/courses" className="btn-primary inline-block">
            Browse Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <Link to="/cart" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-8">
        <ArrowLeft size={20} />
        Back to Cart
      </Link>

      <h1 className="text-4xl font-bold text-slate-900 mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Shipping Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </div>

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 mb-4"
              />

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Information</h2>

              <input
                type="text"
                name="cardName"
                placeholder="Cardholder Name"
                value={formData.cardName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 mb-4"
              />

              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number (1234 5678 9012 3456)"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                maxLength="19"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 mb-4"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  maxLength="5"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  maxLength="4"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full btn-primary py-3 text-lg font-bold disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-8 shadow-sm sticky top-24 h-fit">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-slate-700">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(49.99 * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-slate-200">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-2xl font-bold gradient-text">${total.toFixed(2)}</span>
            </div>

            <div className="mt-6 p-4 bg-primary-50 rounded-lg space-y-2 text-sm">
              <p className="text-primary-700">✓ Secure payment</p>
              <p className="text-primary-700">✓ Lifetime access</p>
              <p className="text-primary-700">✓ No hidden fees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
