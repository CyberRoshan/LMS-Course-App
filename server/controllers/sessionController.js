import mongoose from "mongoose";
import Session from "../models/sessionModel.js";

const generateSession = async (req, res, next) => {
    const sessionId=req.signedCookies?.sessionId
    try {
        const session=await Session.findById(sessionId)
        if (!session) {
            const session = await Session.create({})
            res.cookie("sessionId", session.id, {
                httpOnly: true,
                signed: true,
                secure: true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
        }
        return res.status(200).json({ message: "Session generated." })
    } catch (error) {
        next(error)
    }
}

const addCart = async (req, res, next) => {
    const { cartItem } = req.body
    const sessionId = req.signedCookies?.sessionId?.split(".")[0]
    try {
        if (sessionId) {
            if (!mongoose.Types.ObjectId.isValid(cartItem)) return res.status(404).json({ message: "Invalid cart item." });
            const result = await Session.findOne({ _id: sessionId })
            const isCartItemExist = await result.cartList.find((item) => item._id === cartItem)
            if (!isCartItemExist) {
                await Session.findByIdAndUpdate(sessionId, { $push: { cartList: { _id: cartItem, quantity: 1 } } })
                return res.status(201).json({ message: "Cart item added." })
            } else {
                await Session.updateOne({ _id: sessionId, "cartList._id": cartItem }, { $inc: { "cartList.$.quantity": 1 } })
                return res.status(201).json({ message: "Cart item quantity updated." })
            }
        } else {
            // Normal cart logic
        }
    } catch (err) {
        next(err)
    }
}

const getCart = async (req, res, next) => {
    const sessionId = req.signedCookies?.sessionId?.split(".")[0]
    try {
        if (!sessionId) return res.status(404).json({ message: "Session not found." });
        const cartResponse = await Session.find({ _id: sessionId }).populate({ path: "cartList._id", select: "_id title description thumbnail category price createdAt updatedAt" })
        console.log(cartResponse)

        const formattedCart = cartResponse[0].cartList.map((item) => {
            const course = item._id?.[0];

            return {
                id: course?._id,
                quantity: item.quantity,
                title: course?.title,
                description: course?.description,
                thumbnail: course?.thumbnail,
                category: course?.category,
                price: course?.price,
                createdAt: course?.createdAt,
                updatedAt: course?.updatedAt
            };
        });

        res.status(200).json(formattedCart);

    } catch (err) {
        next(err)
    }
}

const deleteCart = async (req, res, next) => {
    const sessionId = req.signedCookies?.sessionId?.split(".")[0]
    const id = req.params?.id
    try {
        if (!sessionId) return res.status(404).json({ message: "Session not found." });
        await Session.findOneAndUpdate({ _id: sessionId }, { $pull: { cartList: { "_id": id } } })
        res.status(200).json({ message: "Item removed from cart." })
    } catch (err) {
        next(err)
    }
}

const updateCart = async (req, res, next) => {
    const sessionId = req.signedCookies?.sessionId?.split(".")[0]
    const id = req.params?.id
    const { quantity } = req.body
    try {
        if (!sessionId) return res.status(404).json({ message: "Session not found." });
        await Session.findOneAndUpdate({ _id: sessionId, "cartList._id": id }, { $set: { "cartList.$.quantity": quantity } })
        res.status(200).json({ message: "Cart item updated." })
    } catch (err) {
        next(err)
    }
}

export { addCart, getCart, deleteCart, updateCart, generateSession }