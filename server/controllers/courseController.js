import Course from "../models/courseModel.js"

const getCourses=async (req,res,next)=>{
    try{
        const courses=await Course.find()
        res.status(200).json(courses)
} catch(err){
    next(err)
}
}

export {getCourses}