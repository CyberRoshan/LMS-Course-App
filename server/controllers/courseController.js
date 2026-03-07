import Course from "../models/courseModel.js"

const getCourses=async (req,res)=>{
    const courses=await Course.find()
    res.status(200).json(courses)
}

export {getCourses}