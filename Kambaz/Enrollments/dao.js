import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function findEnrollmentsForUser(userId) {
    return db.enrollments.filter((e) => e.user === userId);
  }

  function enroll(userId, courseId) {
    const enrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId,
    };
    db.enrollments.push(enrollment);
    return enrollment;
  }

  function unenroll(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    return { status: "ok" };
  }

  return {
    findEnrollmentsForUser,
    enroll,
    unenroll,
  };
}

