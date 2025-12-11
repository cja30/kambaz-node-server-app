import AttemptsDao from "./dao.js";

export default function AttemptsRoutes(app) {
  const dao = AttemptsDao();

  app.get("/api/quizzes/:qid/attempts/:uid/latest", async (req, res) => {
    const { qid, uid } = req.params;
    const result = await dao.findLatestAttempt(qid, uid);
    res.json(result[0] || null);
  });

  app.get("/api/quizzes/:qid/attempts/:uid", async (req, res) => {
    const { qid, uid } = req.params;
    res.json(await dao.findAttemptsForQuizAndUser(qid, uid));
  });
  
  app.post("/api/quizzes/:qid/attempts/:uid", async (req, res) => {
    const { qid, uid } = req.params;
    const { answers, score } = req.body;

    const attempt = await dao.createAttempt(qid, uid, answers, score);
    res.json(attempt);
  });
}
