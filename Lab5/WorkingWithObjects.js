const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

export default function WorkingWithObjects(app) {
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });

  app.get("/lab5/assignment/title", (req, res) => {
    res.send(assignment.title);
  });

  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    assignment.title = req.params.newTitle;
    res.json(assignment);
  });

  app.get("/lab5/assignment/score/:score", (req, res) => {
    assignment.score = parseInt(req.params.score);
    res.json(assignment);
  });

  app.get("/lab5/assignment/completed/:value", (req, res) => {
    assignment.completed = req.params.value === "true";
    res.json(assignment);
  });
}
