import Course from "./models/courseModel.js"
const courseList = [
  {
    title: "JavaScript Basics",
    description:
      "Learn the fundamentals of JavaScript including variables, functions, and loops.",
    thumbnail:
      "https://media.istockphoto.com/id/537331500/photo/programming-code-abstract-technology-background-of-software-deve.jpg?s=612x612&w=0&k=20&c=jlYes8ZfnCmD0lLn-vKvzQoKXrWaEcVypHnB5MuO-g8=",
    category: "Programming",
  },
  {
    title: "React for Beginners",
    description:
      "Build modern user interfaces using React and component-based architecture.",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS13xDmLD7uEjCnSsD57_3ahgnLXk2ca1b5eg&s",
    category: "Frontend Development",
  },
  {
    title: "Node.js API Development",
    description:
      "Learn how to build REST APIs using Node.js and Express.",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
    category: "Backend Development",
  },
  {
    title: "MongoDB Essentials",
    description:
      "Understand database design and CRUD operations with MongoDB.",
    thumbnail:
      "https://www.economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png",
    category: "Database",
  },
  {
    title: "Full Stack MERN",
    description:
      "Build full stack applications using MongoDB, Express, React, and Node.",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    category: "Full Stack",
  },
];

export const seedData=async()=>{
    const courses=await Course.find().lean()
    if(courses.length===0){
        await Course.insertMany(courseList)
        console.log("Course data seeded successfully.")
    } else return
}