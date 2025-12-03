import mongoose from "mongoose";

const assignmentsSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  pts: Number,
  due: String,
  avail: String,
  until: String,

  course: { type: String, ref: "CourseModel" }
}, 
{ collection: "assignments" }
);

export default assignmentsSchema;
