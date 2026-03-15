import Session from "../models/sessionModel.js";
import User from "../models/userModel.js"
import bcrypt from "bcrypt";

const login = async (req, res, next) => {
    const { email, password } = req.body
    const sessionId = req.signedCookies?.sessionId?.split(".")[0]
    try {
        const user = await User.findOne({ email })
        const verifyPassword = await bcrypt.compare(password, user.password)
        if (!verifyPassword) return res.status(401).json("Invalid email or password.")
        if(sessionId){
            const session=await Session.findOne({_id: sessionId})
            if(session.userId !== user._id){
            await Session.updateOne({ _id: sessionId }, { $set: { userId: user._id, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} })
            res.cookie("sessionId", sessionId, {
                httpOnly: true,
                signed: true,
                secure: true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            }
        }
        return res.status(200).json({ message: "Login successfully." })
    } catch (error) {
        next(error)
    }
}

const register = async (req, res, next) => {
    const { name, email, password } = req.body
    const sessionId = req.signedCookies?.sessionId?.split(".")[0]
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User with this email already exists." })
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashPassword })
        if (sessionId) {
            await Session.updateOne({ _id: sessionId }, { $set: { userId: user._id, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } })
            res.cookie("sessionId", sessionId, {
                httpOnly: true,
                signed: true,
                secure: true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
        }
        return res.status(201).json({ message: "Registration completed." })
    } catch (error) {
        next(error)
    }
}

const profile= async (req,res,next)=>{
    const sessionId = req.signedCookies?.sessionId?.split(".")[0]
    try {
        if(!sessionId) return res.status(401).json({message: "User not logged in."})
        const session=await Session.findById(sessionId).lean()
        if(!session) return res.status(401).json({message: "Invalid session."})
        const user=await User.findById(session.userId).select("_id name email createdAt")
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export { login, register, profile }