import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao() {

  function findAllCourses() {
    return model.find({}, { name: 1, description: 1 });
  }

  function createCourse(course) {
    return model.create({
      ...course,
      _id: uuidv4(),
    });
  }

  function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
  }

  function updateCourse(courseId, updates) {
    return model.updateOne({ _id: courseId }, updates);
  }

  return {
    findAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
