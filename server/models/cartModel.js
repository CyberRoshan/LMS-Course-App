import { model, Schema } from "mongoose";

const cartSchema=Schema({
    userId: {
      type: Schema.Types.ObjectId,
      default: null
    },
    cart: {
            type: Schema.Types.Array,
            ref: "Course"
        },
})

cartSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Cart= model("Cart", cartSchema)

export default Cart;