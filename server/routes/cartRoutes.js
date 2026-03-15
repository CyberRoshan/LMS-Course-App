import express from "express";
import { addCart, deleteCart, getCart, moveSessionCart, updateCart } from "../controllers/cartController.js";

const cartRoutes=express.Router()

cartRoutes.post("/move-session-cart",moveSessionCart)
cartRoutes.post("/",addCart)
cartRoutes.get("/",getCart)
cartRoutes.delete("/:id",deleteCart)
cartRoutes.patch("/:id",updateCart)

export default cartRoutes;