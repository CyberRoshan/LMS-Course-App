import crypto from "crypto";
import Session from "../models/sessionModel.js";

const generateSession=async(req,res,next)=>{
    try{
    const sessionId= crypto.randomBytes(10).toString("base64url")
    await Session.insertOne({sessionId})
    return res.status(200).json({sessionId})
    } catch(err){
        next(err)
    }
}

const addSessionCart=async(req,res,next)=>{
    const {sessionId, cartList} = req.body
    try{
        if(!sessionId) return res.status(404).json({message: "Session required."});
        if(!Array.isArray(cartList)) return res.status(404).json({message: "Cart must be an array."});
        const session=await Session.findOneAndUpdate({sessionId}, {cartList}, { returnDocument: true }).populate({path: "cartList", select: "_id title description thumbnail category price createdAt updatedAt" })
        if(!session) return res.status(404).json({message: "Invalid session."});
        return res.status(201).json(session)
    } catch(err){
        next(err)
    }
}

export {generateSession, addSessionCart}