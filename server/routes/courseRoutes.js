import express from "express";
import { getCourses } from "../controllers/courseController.js";

const courseRoutes=express.Router()

courseRoutes.get("/list", getCourses)

export default courseRoutes;