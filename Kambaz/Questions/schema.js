import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({

  _id: String,
  quiz: { type: String, ref: "QuizModel" },
  type: String,
  title: String,
  text: String,
  points: Number,
  choices: [String],          
  correctIndex: Number,      
  correct: Boolean,           
  answers: [String],

}, { collection: "questions" });

export default questionsSchema;

