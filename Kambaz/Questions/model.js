import mongoose from "mongoose";
import schema from "./schema.js";

const QuestionModel =
  mongoose.models.QuestionModel ||
  mongoose.model("QuestionModel", schema);

export default QuestionModel;
