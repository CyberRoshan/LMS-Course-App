import { model, Schema } from "mongoose";

const userSchema=Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    email:{
        type: String,
        required: true,
        match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
}, {
    strict: "throw",
    timestamps: true,
})

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const User=model("User", userSchema)

export default User;