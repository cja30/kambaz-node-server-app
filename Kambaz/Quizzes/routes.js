import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
  const dao = QuizzesDao();

  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const studentId = req.query.uid || null;
    res.json(await dao.findQuizzesWithStats(req.params.cid, studentId));
  });

  app.get("/api/quizzes/:qid", async (req, res) => {
    const studentId = req.query.uid || null;
    res.json(await dao.findQuizByIdWithStats(req.params.qid, studentId));
  });

  // CREATE
  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    res.json(await dao.createQuiz(req.params.cid, req.body));
  });

  // UPDATE
  app.put("/api/quizzes/:qid", async (req, res) => {
    res.json(await dao.updateQuiz(req.params.qid, req.body));
  });

  // DELETE
  app.delete("/api/quizzes/:qid", async (req, res) => {
    res.json(await dao.deleteQuiz(req.params.qid));
  });
}
