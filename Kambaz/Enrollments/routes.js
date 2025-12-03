import CourseModel from "../Courses/model.js";
import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  app.post("/api/users/current/courses/:courseId", async (req, res) => {
    const user = req.session.currentUser;
    if (!user) return res.sendStatus(401);

    const { courseId } = req.params;

    await dao.enrollUserInCourse(user._id, courseId);

    const course = await CourseModel.findById(courseId);  
    res.json(course); 
  });

  app.delete("/api/users/current/courses/:courseId", async (req, res) => {
    const user = req.session.currentUser;
    if (!user) return res.sendStatus(401);

    const { courseId } = req.params;

    await dao.unenrollUserFromCourse(user._id, courseId);
    res.json({ status: "ok" });
  });

  app.get("/api/users/current/courses", async (req, res) => {
    const user = req.session.currentUser;
    if (!user) return res.sendStatus(401);

    const courses = await dao.findCoursesForUser(user._id);
    res.json(courses);
  });
}
