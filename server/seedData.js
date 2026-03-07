import Course from "./models/courseModel.js"

const courseList=[
    {
      "id": 1,
      "title": "JavaScript Basics",
      "description": "Learn the fundamentals of JavaScript including variables, functions, and loops.",
      "thumbnail": "https://example.com/images/javascript.jpg",
      "category": "Programming"
    },
    {
      "id": 2,
      "title": "React for Beginners",
      "description": "Build modern user interfaces using React and component-based architecture.",
      "thumbnail": "https://example.com/images/react.jpg",
      "category": "Frontend Development"
    },
    {
      "id": 3,
      "title": "Node.js API Development",
      "description": "Learn how to build REST APIs using Node.js and Express.",
      "thumbnail": "https://example.com/images/nodejs.jpg",
      "category": "Backend Development"
    },
    {
      "id": 4,
      "title": "MongoDB Essentials",
      "description": "Understand database design and CRUD operations with MongoDB.",
      "thumbnail": "https://example.com/images/mongodb.jpg",
      "category": "Database"
    },
    {
      "id": 5,
      "title": "Full Stack MERN",
      "description": "Build full stack applications using MongoDB, Express, React, and Node.",
      "thumbnail": "https://example.com/images/mern.jpg",
      "category": "Full Stack"
    }]

export const seedData=async()=>{
    const courses=await Course.find().lean()
    if(courses.length===0){
        await Course.insertMany(courseList)
        console.log("Course data seeded successfully.")
    } else return
}