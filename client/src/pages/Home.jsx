import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, Zap } from 'lucide-react'
import CourseCard from '../components/CourseCard'

const FEATURED_COURSES = [
  {
    id: 1,
    title: "JavaScript Basics",
    description: "Learn the fundamentals of JavaScript including variables, functions, and loops.",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db3a?w=500&h=300&fit=crop",
    category: "Programming"
  },
  {
    id: 2,
    title: "React for Beginners",
    description: "Build modern user interfaces using React and component-based architecture.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop",
    category: "Frontend Development"
  },
  {
    id: 3,
    title: "Node.js API Development",
    description: "Learn how to build REST APIs using Node.js and Express.",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    category: "Backend Development"
  },
  {
    id: 4,
    title: "MongoDB Essentials",
    description: "Understand database design and CRUD operations with MongoDB.",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=500&h=300&fit=crop",
    category: "Database"
  },
]

export default function Home({ onAddToCart }) {
  return (
    <>
      {/* Hero Section */}
      <section className="container-custom py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Master <span className="gradient-text">In-Demand Skills</span> Online
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Learn from industry experts, build real-world projects, and advance your career with our premium online courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses" className="btn-primary flex items-center justify-center gap-2">
                Explore Courses
                <ArrowRight size={20} />
              </Link>
              <button className="btn-secondary flex items-center justify-center gap-2">
                Watch Demo
                <span className="text-lg">▶</span>
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="animate-slide-up hidden md:flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl shadow-2xl flex items-center justify-center text-white text-center p-8">
              <div>
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-3xl font-bold mb-2">Level Up Your Skills</h3>
                <p className="text-lg opacity-90">Join thousands of learners today</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-t border-b border-slate-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
              <p className="text-slate-600">Active Students</p>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold gradient-text mb-2">200+</div>
              <p className="text-slate-600">Expert Courses</p>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold gradient-text mb-2">4.9/5</div>
              <p className="text-slate-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container-custom py-20">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Courses</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Handpicked courses from industry leaders designed to help you succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {FEATURED_COURSES.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        <div className="text-center">
          <Link to="/courses" className="btn-primary inline-flex items-center gap-2">
            View All Courses
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container-custom">
          <h2 className="section-title mb-16">Why Choose CourseHub?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                <BookOpen size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Expert Content</h3>
              <p className="text-slate-600">
                Courses created by industry professionals with years of experience in their field.
              </p>
            </div>

            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Community Support</h3>
              <p className="text-slate-600">
                Learn alongside a global community and get help from instructors and peers.
              </p>
            </div>

            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Zap size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Flexible Learning</h3>
              <p className="text-slate-600">
                Learn at your own pace with lifetime access to course materials and updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-20">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-center text-white animate-slide-up">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students and start your learning journey today. Get lifetime access to your courses.
          </p>
          <Link to="/courses" className="inline-block bg-white text-primary-600 px-8 py-3 font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            Explore All Courses
          </Link>
        </div>
      </section>
    </>
  )
}
