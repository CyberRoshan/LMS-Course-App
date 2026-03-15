import { model, Schema } from "mongoose";

const sessionSchema=Schema({
    userId: {
      type: Schema.Types.ObjectId,
      default: null
    },
    cartList:{
        type: Schema.Types.Array,
        ref: "Course"
    },
    expires: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
}, {
  strict: "throw",
  timestamps: true
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