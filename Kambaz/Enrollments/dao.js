import model from "./model.js";

export default function EnrollmentsDao() {

  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map(e => e.course);
  }

  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map(e => e.user);
  }

  async function enrollUserInCourse(userId, courseId) {
    return model.create({
      _id: `${userId}-${courseId}`,
      user: userId,
      course: courseId,
      enrollmentDate: new Date(),
      status: "ENROLLED",
    });
  }

  async function unenrollUserFromCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });
  }

  async function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse
  };
}
