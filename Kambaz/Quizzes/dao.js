import model from "./model.js";
import questionModel from "../Auestions/model.js";
import attemptModel from "../Attempts/model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao() {

  async function findQuizzesWithStats(courseId, studentId = null) {
    const quizzes = await model.find({ course: courseId });

    const results = await Promise.all(
      quizzes.map(async (quiz) => {
        const quizId = quiz._id;

        const questions = await questionModel.find({ quiz: quizId });
        const questionCount = questions.length;
        const totalPoints = questions.reduce((s, q) => s + (q.points || 0), 0);

        let studentScore = null;

        if (studentId) {
          const latest = await attemptModel
            .find({ quiz: quizId, student: studentId })
            .sort({ attemptNumber: -1 })
            .limit(1);

          if (latest.length > 0) {
            studentScore = latest[0].score;
          }
        }

        return {
          ...quiz.toObject(),
          questionCount,
          points: totalPoints,
          studentScore, // NEW
        };
      })
    );

    return results;
  }

  async function findQuizByIdWithStats(quizId, studentId = null) {
    const quiz = await model.findById(quizId);
    if (!quiz) return null;

    const questions = await questionModel.find({ quiz: quizId });
    const totalPoints = questions.reduce((s, q) => s + (q.points || 0), 0);

    let studentScore = null;

    if (studentId) {
      const latest = await attemptModel
        .find({ quiz: quizId, student: studentId })
        .sort({ attemptNumber: -1 })
        .limit(1);

      if (latest.length > 0) {
        studentScore = latest[0].score;
      }
    }

    return {
      ...quiz.toObject(),
      questionCount: questions.length,
      points: totalPoints,
      studentScore,
    };
  }

  function createQuiz(courseId, quiz) {
    return model.create({
      ...quiz,
      _id: uuidv4(),
      course: courseId,
      published: false,
    });
  }

  function updateQuiz(quizId, updates) {
    return model.findByIdAndUpdate(quizId, updates, { new: true });
  }

  function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
  }

  return {
    findQuizzesWithStats,
    findQuizByIdWithStats,
    createQuiz,
    updateQuiz,
    deleteQuiz,
  };
}
