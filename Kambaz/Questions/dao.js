import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuestionsDao() {

  function findQuestionsForQuiz(quizId) {
    return model.find({ quiz: quizId });
  }

  function findQuestionById(questionId) {
    return model.findById(questionId);
  }

  function createQuestion(quizId, question) {
    return model.create({
      ...question,
      _id: uuidv4(),
      quiz: quizId
    });
  }

  function updateQuestion(questionId, updates) {
    return model.findByIdAndUpdate(questionId, updates, { new: true });
  }

  function deleteQuestion(questionId) {
    return model.deleteOne({ _id: questionId });
  }

  return {
    findQuestionsForQuiz,
    findQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };
}
