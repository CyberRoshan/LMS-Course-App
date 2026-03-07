import express from "express";
import { addSessionCart, generateSession } from "../controllers/sessionController.js";

const sessionRoutes=express.Router()

sessionRoutes.get("/generate-session",generateSession)
sessionRoutes.post("/session-cart",addSessionCart)

export default sessionRoutes;