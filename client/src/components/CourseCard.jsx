import { ShoppingCart, Star } from 'lucide-react'
import api from '../api/axiosInstance'
import { useSelector } from 'react-redux'


export default function CourseCard({ course }) {
  const user = useSelector((state) => state.auth.user?.id)
  const handleAddToCart = async (e) => {
    e.preventDefault()

    try {

      const payload = {
        cartItem: course.id
      }

      const res = await api.post(user ? "/cart" : "/session/cart", payload)

      console.log("Cart updated:", res.data)

    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }


  return (
    <div className="card overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-r from-primary-500 to-primary-600 overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-600 to-accent-500">
            <div className="text-white text-center">
              <div className="text-5xl font-bold opacity-20 mb-2">📚</div>
              <p className="text-white text-sm font-medium">{course.category}</p>
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          New
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <span className="inline-block text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">
          {course.category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-600">(128 reviews)</span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
          <div>
            <p className="text-2xl font-bold gradient-text">$49.99</p>
            <p className="text-xs text-slate-500 line-through">$99.99</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}
