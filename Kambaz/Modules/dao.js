import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function ModulesDao() {
  function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
  }

  function createModule(courseId, module) {
    const newModule = {
      ...module,
      _id: uuidv4(),
      course: courseId,
    };
    return model.create(newModule);
  }

  function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
  }

  function updateModule(moduleId, updates) {
    return model.updateOne({ _id: moduleId }, updates);
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}
