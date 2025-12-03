import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    _id: String,
    course: { type: String, ref: "CourseModel" }, // same as assignments
    name: String,
    lessons: Array
  },
  { collection: "modules" }
);

export default moduleSchema;
