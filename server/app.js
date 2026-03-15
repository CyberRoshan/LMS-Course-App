import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./config/db.js";
import { seedData } from "./seedData.js";
import courseRoutes from "./routes/courseRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config()
const app=express()
const PORT= 8000

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(cookieParser(process.env.COOKIE_SECRET))


app.use("/course", courseRoutes)
app.use("/session", sessionRoutes)
app.use("/cart", cartRoutes)
app.use("/user", userRoutes)

seedData()

app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})