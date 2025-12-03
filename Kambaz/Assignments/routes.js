import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {
  const dao = AssignmentsDao();

  app.get("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    res.json(await dao.findAssignmentsForCourse(cid));
  });

  app.post("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    res.json(await dao.createAssignment(cid, req.body));
  });

  app.delete("/api/assignments/:aid", async (req, res) => {
    res.json(await dao.deleteAssignment(req.params.aid));
  });

  app.put("/api/assignments/:aid", async (req, res) => {
    res.json(await dao.updateAssignment(req.params.aid, req.body));
  });
}
