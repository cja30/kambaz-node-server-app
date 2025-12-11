import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AttemptsDao() {

  function findAttemptsForQuizAndUser(quizId, userId) {
    return model.find({ quiz: quizId, student: userId });
  }

  function findLatestAttempt(quizId, userId) {
    return model
      .find({ quiz: quizId, student: userId })
      .sort({ attemptNumber: -1 })
      .limit(1);
  }

  async function createAttempt(quizId, userId, answers, score) {
    const previousAttempts = await model.countDocuments({ quiz: quizId, student: userId });

    const attempt = {
      _id: uuidv4(),
      quiz: quizId,
      student: userId,
      answers,
      score,
      attemptNumber: previousAttempts + 1
    };

    return model.create(attempt);
  }

  return {
    findAttemptsForQuizAndUser,
    findLatestAttempt,
    createAttempt,
  };
}
