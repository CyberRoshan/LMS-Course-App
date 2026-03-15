/**
 * Course Data Structure Reference
 * 
 * This file documents the course data structure used throughout the app.
 * Courses are defined inline in Home.jsx and Courses.jsx for this demo.
 * 
 * For production, you would:
 * 1. Move this data to a database (Firebase, MongoDB, etc.)
 * 2. Create an API endpoint to fetch courses
 * 3. Use useState/useEffect to fetch data on component mount
 * 4. Handle loading and error states
 */

/**
 * Course Object Structure
 * @typedef {Object} Course
 * @property {number} id - Unique course identifier
 * @property {string} title - Course name/title
 * @property {string} description - Brief course description
 * @property {string} thumbnail - Course image URL
 * @property {string} category - Course category
 */

// Example course object:
export const EXAMPLE_COURSE = {
  id: 1,
  title: "JavaScript Basics",
  description: "Learn the fundamentals of JavaScript including variables, functions, and loops.",
  thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db3a?w=500&h=300&fit=crop",
  category: "Programming"
}

/**
 * Available Course Categories
 */
export const COURSE_CATEGORIES = [
  'All',
  'Programming',
  'Frontend Development',
  'Backend Development',
  'Database',
  'Full Stack'
]

/**
 * Course Price (Fixed for all courses in demo)
 * In production, each course would have its own price
 */
export const COURSE_PRICE = 49.99

/**
 * Cart Item Structure
 * @typedef {Object} CartItem
 * @property {number} id - Course ID
 * @property {string} title - Course title
 * @property {string} category - Course category
 * @property {string} description - Course description
 * @property {string} thumbnail - Course image
 * @property {number} quantity - Number of times purchased
 */

export const EXAMPLE_CART_ITEM = {
  id: 1,
  title: "JavaScript Basics",
  category: "Programming",
  description: "Learn the fundamentals of JavaScript including variables, functions, and loops.",
  thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db3a?w=500&h=300&fit=crop",
  quantity: 2
}

/**
 * User Object Structure
 * @typedef {Object} User
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 */

export const EXAMPLE_USER = {
  name: "John Doe",
  email: "john@example.com"
}

/**
 * Order Object Structure
 * @typedef {Object} Order
 * @property {string} id - Order ID
 * @property {number[]} courseIds - Array of purchased course IDs
 * @property {number} total - Total order amount
 * @property {Object} shippingInfo - Shipping address
 * @property {string} status - Order status (pending, completed, etc.)
 * @property {Date} createdAt - Order creation date
 */

export const EXAMPLE_ORDER = {
  id: "ORD-001",
  courseIds: [1, 2, 3],
  total: 149.97,
  shippingInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001"
  },
  status: "completed",
  createdAt: new Date()
}

/**
 * Checkout Form Data Structure
 * @typedef {Object} CheckoutFormData
 * @property {string} firstName - First name
 * @property {string} lastName - Last name
 * @property {string} email - Email address
 * @property {string} phone - Phone number
 * @property {string} address - Street address
 * @property {string} city - City
 * @property {string} state - State/Province
 * @property {string} zipCode - ZIP/Postal code
 * @property {string} cardName - Cardholder name
 * @property {string} cardNumber - Card number
 * @property {string} expiryDate - Card expiry (MM/YY)
 * @property {string} cvv - Card CVV
 */

export const EXAMPLE_CHECKOUT_FORM = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+1234567890",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  cardName: "John Doe",
  cardNumber: "4242 4242 4242 4242",
  expiryDate: "12/25",
  cvv: "123"
}

/**
 * TAX_RATE - Percentage tax applied to orders
 * Current: 10%
 */
export const TAX_RATE = 0.1

/**
 * How to use this data in your application:
 * 
 * 1. Import in component:
 *    import { COURSE_CATEGORIES, COURSE_PRICE } from '../data/courseData'
 * 
 * 2. Use in rendering:
 *    {COURSE_CATEGORIES.map(cat => <option>{cat}</option>)}
 * 
 * 3. Calculate totals:
 *    const subtotal = cartItems.reduce((sum, item) => 
 *      sum + (COURSE_PRICE * item.quantity), 0)
 *    const tax = subtotal * TAX_RATE
 *    const total = subtotal + tax
 */

export default {
  EXAMPLE_COURSE,
  COURSE_CATEGORIES,
  COURSE_PRICE,
  EXAMPLE_CART_ITEM,
  EXAMPLE_USER,
  EXAMPLE_ORDER,
  EXAMPLE_CHECKOUT_FORM,
  TAX_RATE
}
