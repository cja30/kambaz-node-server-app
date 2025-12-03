import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao() {

  function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  function createAssignment(courseId, assignment) {
    return model.create({
      ...assignment,
      _id: uuidv4(),
      course: courseId,
    });
  }

  function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
  }

  function updateAssignment(assignmentId, updates) {
    return model.findByIdAndUpdate(assignmentId, updates, { new: true });
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
