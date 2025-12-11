import QuestionsDao from "./dao.js";

export default function QuestionsRoutes(app) {
  const dao = QuestionsDao();

  app.get("/api/quizzes/:qid/questions", async (req, res) => {
    res.json(await dao.findQuestionsForQuiz(req.params.qid));
  });

  app.get("/api/questions/:qid", async (req, res) => {
    res.json(await dao.findQuestionById(req.params.qid));
  });

  app.post("/api/quizzes/:qid/questions", async (req, res) => {
    res.json(await dao.createQuestion(req.params.qid, req.body));
  });

  app.put("/api/questions/:qid", async (req, res) => {
    res.json(await dao.updateQuestion(req.params.qid, req.body));
  });

  app.delete("/api/questions/:qid", async (req, res) => {
    res.json(await dao.deleteQuestion(req.params.qid));
  });
}
