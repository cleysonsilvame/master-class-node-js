const express = require("express");
const { addTask, getTasks } = require("./models/tasks");

const app = express();

app.use(express.json({}));

app.use((error, _, res, next) => {
  if (error instanceof SyntaxError)
    res.status(500).json({ message: error.message });
  else next();
});

app.get("/", (_, res) => {
  return res.json({
    message: "Hello World",
  });
});

app.get("/tasks", (_, res) => {
  return res.json(getTasks());
});

app.get("/tasks/:id", (req, res) => {
  const task = getTasks(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  return res.json(task);
});

app.post("/tasks", (req, res) => {
  const { body } = req;

  try {
    addTask(body.title, body.description);
    return res.status(201).json({
      message: "Task added",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
