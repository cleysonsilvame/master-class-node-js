const crypto = require("crypto");
const { readDatabase, writeDatabase } = require("../database");
const tasks = [];

const getTasks = (id = "") => {
  if (!tasks.length) {
    const database = readDatabase();
    if (database.tasks) {
      tasks.push(...database.tasks);
    }
  }

  if (id) {
    return tasks.find(task => task.id === id);
  }

  return tasks;
};

const addTask = (title, description) => {
  if (!title || !description) {
    console.log(!title || !description);
    throw new Error("Title and description are required");
  }

  tasks.push({
    id: crypto.randomUUID(),
    title,
    description,
    done: false,
    archived: false,
  });

  writeDatabase({ tasks });
};

module.exports = {
  getTasks,
  addTask,
};
