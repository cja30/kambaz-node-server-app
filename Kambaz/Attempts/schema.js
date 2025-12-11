import mongoose from "mongoose";

const attemptsSchema = new mongoose.Schema({

  _id: String,

  quiz: { type: String, ref: "QuizModel" },

  student: { type: String, ref: "UserModel" },

  answers: Object,

  score: Number,

  attemptNumber: Number,

  createdAt: { type: Date, default: Date.now }

}, { collection: "attempts" });

export default attemptsSchema;
