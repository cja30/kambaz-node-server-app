import ModulesDao from "./dao.js";

export default function ModulesRoutes(app) {
  const dao = ModulesDao();

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const modules = await dao.findModulesForCourse(req.params.courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const module = await dao.createModule(req.params.courseId, req.body);
    res.json(module);
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    const status = await dao.deleteModule(req.params.moduleId);
    res.json(status);
  });

  app.put("/api/modules/:moduleId", async (req, res) => {
    const updated = await dao.updateModule(req.params.moduleId, req.body);
    res.json(updated);
  });
}
