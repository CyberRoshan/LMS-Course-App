import { model, Schema } from "mongoose";

const userSchema=Schema({
    name: required
})

const User=model("User", userSchema)

export default User;