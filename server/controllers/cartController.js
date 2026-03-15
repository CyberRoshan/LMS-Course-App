import mongoose from "mongoose";
import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";

const moveSessionCart = async (req, res, next) => {
    const sessionId = req.signedCookies?.sessionId?.split(".")[0]
    try {
        const session = await Session.findOne({ _id: sessionId })
        const user=await User.findOne({_id: session.userId})
        if(user){
            await Cart.create({
                userId: user._id,
                cart: session.cartList
            })
            return res.status(201).json({message: "Cart updated."})
        } else{
            return res.status(404).json({message: "Cart items not saved."})
        }
    } catch (err) {
        next(err)
    }
}

const addCart = async (req, res, next) => {
    const { cartItem } = req.body
    const sessionId = req.signedCookies?.sessionId?.split(".")[0]
    try {
        if (!sessionId) return res.status(404).json({ message: "Session not found." });
            if (!mongoose.Types.ObjectId.isValid(cartItem)) return res.status(404).json({ message: "Invalid cart item." });
            const result = await Session.findOne({ _id: sessionId })
            const user=await Cart.findOne({userId: result.userId})
            const isCartItemExist = await user.cart.find((item) => item._id === cartItem)
            if (!isCartItemExist) {
                await Cart.findOneAndUpdate({ userId: result.userId }, { $push: { cart: { _id: cartItem, quantity: 1 } } })
                return res.status(201).json({ message: "Cart item added." })
            } else {
                await Cart.updateOne({ userId: result.userId, "cart._id": cartItem }, { $inc: { "cart.$.quantity": 1 } })
                return res.status(201).json({ message: "Cart item quantity updated." })
            }
    } catch (err) {
        next(err)
    }
}

const getCart = async (req, res, next) => {
    const sessionId = req.signedCookies?.sessionId?.split(".")[0]
    try {
        if (!sessionId) return res.status(404).json({ message: "Session not found." });
        const result = await Session.findOne({ _id: sessionId })
        const cartResponse = await Cart.find({ userId: result.userId }).populate({ path: "cart._id", select: "_id title description thumbnail category price createdAt updatedAt" })

        const formattedCart = cartResponse[0].cart.map((item) => {
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
        const result = await Session.findOne({ _id: sessionId })
        await Cart.findOneAndUpdate({ userId: result.userId }, { $pull: { cart: { "_id": id } } })
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
        const result = await Session.findOne({ _id: sessionId })
        await Cart.findOneAndUpdate({ userId: result.userId, "cart._id": id }, { $set: { "cart.$.quantity": quantity } })
        res.status(200).json({ message: "Cart item updated." })
    } catch (err) {
        next(err)
    }
}

export { addCart, getCart, deleteCart, updateCart, moveSessionCart }