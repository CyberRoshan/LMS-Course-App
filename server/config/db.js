import mongoose from "mongoose";

mongoose.connect("mongodb://admin:admin@localhost:27017/lmsApp?authsource=admin")
console.log("Client connected.")

process.on("SIGINT", async()=>{
    await mongoose.disconnect()
    console.log("Client disconnected.")
    process.exit(0)
})