import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {

  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();

  app.post("/api/courses", async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const course = await dao.createCourse(req.body);

    if (currentUser.role === "FACULTY") {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    }

    res.json(course);
  });

  app.get("/api/courses", async (req, res) => {
    res.json(await dao.findAllCourses());
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    res.json(await dao.updateCourse(req.params.courseId, req.body));
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    res.json(await dao.deleteCourse(courseId));
  });

  app.get("/api/users/:uid/courses", async (req, res) => {
    let { uid } = req.params;
    if (uid === "current") {
      const user = req.session.currentUser;
      if (!user) return res.sendStatus(401);
      uid = user._id;
    }
    res.json(await enrollmentsDao.findCoursesForUser(uid));
  });

  app.get("/api/courses/:cid/users", async (req, res) => {
    res.json(await enrollmentsDao.findUsersForCourse(req.params.cid));
  });
}
