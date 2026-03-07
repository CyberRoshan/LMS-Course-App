import express from "express";
import cors from "cors";
import "./config/db.js";
import { seedData } from "./seedData.js";
import courseRoutes from "./routes/courseRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app=express()
const PORT= 3000

app.use(express.json())
app.use(cors())


app.use("/course", courseRoutes)
app.use("/session", sessionRoutes)
app.use("/user", userRoutes)

seedData()

app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})