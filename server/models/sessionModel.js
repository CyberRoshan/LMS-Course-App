import { model, Schema } from "mongoose";

const sessionSchema=Schema({
    sessionId: {
        type: String,
        required: true
    },
    cartList:{
        type: Schema.Types.Array,
        ref: "Course"
    }
})

sessionSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});


const Session=model("Session",sessionSchema)

export default Session;