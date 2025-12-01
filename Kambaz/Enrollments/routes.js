import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enroll = (req, res) => {
    const user = req.session.currentUser;
    if (!user) return res.sendStatus(401);

    const { courseId } = req.params;
    const result = dao.enroll(user._id, courseId);
    res.json(result);
  };

  const unenroll = (req, res) => {
    const user = req.session.currentUser;
    if (!user) return res.sendStatus(401);

    const { courseId } = req.params;
    const status = dao.unenroll(user._id, courseId);
    res.json(status);
  };

  const myEnrollments = (req, res) => {
    const user = req.session.currentUser;
    if (!user) return res.sendStatus(401);

    const list = dao.findEnrollmentsForUser(user._id);
    res.json(list);
  };

  app.post("/api/users/current/courses/:courseId/enroll", enroll);
  app.delete("/api/users/current/courses/:courseId/enroll", unenroll);
  app.get("/api/users/current/enrollments", myEnrollments);
}
