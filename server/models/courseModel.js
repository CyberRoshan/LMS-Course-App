import mongoose, { model, Schema } from "mongoose";

const courseSchema=Schema({
     title: {
        type: String,
        required: true,
        minLength: 3
     },
     description: String,
     thumbnail: String,
     category: String,
     price: {
        type: mongoose.Schema.Types.Int32,
        default: 0
     }
}, {
    timestamps: true,
    strict: "throw"
})

courseSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Course=model("Course", courseSchema)

export default Course;