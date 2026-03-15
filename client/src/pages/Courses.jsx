import { useEffect, useState } from "react"
import { Search, Filter } from "lucide-react"
import CourseCard from "../components/CourseCard"
import api from "../api/axiosInstance"

export default function Courses({ onAddToCart }) {
  const [courses, setCourses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchCourses = async () => {
    try {
      setLoading(true)
      
      const res = await api.get("/course/list")
      setCourses(res.data)
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  // Generate categories dynamically
  const categories = ["All", ...new Set(courses.map((c) => c.category))]

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Explore Our Courses
        </h1>
        <p className="text-lg text-slate-600">
          Browse our comprehensive collection of courses and start learning today
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-3 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search courses by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Filter size={20} className="text-primary-600" />
              <h3 className="text-lg font-bold text-slate-900">Categories</h3>
            </div>

            <div className="space-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all font-medium ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-4">
                <span className="font-bold text-slate-900">
                  {filteredCourses.length}
                </span>{" "}
                courses found
              </p>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-20">Loading courses...</div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                No courses found
              </h3>
              <p className="text-slate-600 mb-6">
                Try adjusting your search or filters to find what you're looking for
              </p>

              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
                className="btn-primary"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}