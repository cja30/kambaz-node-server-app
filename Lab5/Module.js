export default function Module(app) {
  let module = {
    id: "M101",
    name: "Module",
    description: "This is a sample module.",
    course: "CS1234",
  };

  app.get("/lab5/module", (req, res) => {
    res.json(module);
  });

  app.get("/lab5/module/name", (req, res) => {
    res.send(module.name);
  });

  app.get("/lab5/module/name/:newName", (req, res) => {
    module.name = req.params.newName;
    res.json(module);
  });

  app.get("/lab5/module/description/:newDescription", (req, res) => {
    module.description = req.params.newDescription;
    res.json(module);
  });
}
