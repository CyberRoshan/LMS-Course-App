import express from "express";
import { addCart, deleteCart, generateSession, getCart, updateCart } from "../controllers/sessionController.js";

const sessionRoutes=express.Router()

sessionRoutes.get("/generate-session",generateSession)
sessionRoutes.post("/cart",addCart)
sessionRoutes.get("/cart",getCart)
sessionRoutes.delete("/cart/:id",deleteCart)
sessionRoutes.patch("/cart/:id",updateCart)

export default sessionRoutes;