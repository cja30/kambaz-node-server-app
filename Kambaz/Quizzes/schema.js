import mongoose from "mongoose";

const quizzesSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,

  published: { type: Boolean, default: false },
  points: { type: Number, default: 0 },
  quizType: { type: String, default: "GRADED_QUIZ" },
  assignmentGroup: { type: String, default: "Quizzes" },

  shuffleAnswers: { type: Boolean, default: true },
  timeLimit: { type: Number, default: 20 },
  multipleAttempts: { type: Boolean, default: false },
  allowedAttempts: { type: Number, default: 1 },
  showCorrectAnswers: { type: String, default: "never" },

  accessCode: { type: String, default: "" },
  oneQuestionAtATime: { type: Boolean, default: true },
  webcamRequired: { type: Boolean, default: false },
  lockQuestionsAfterAnswering: { type: Boolean, default: false },

  dueDate: String,
  availableDate: String,
  untilDate: String,

  course: { type: String, ref: "CourseModel" },
}, 
{ collection: "quizzes" }
);

export default quizzesSchema;
