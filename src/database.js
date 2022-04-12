const fs = require("fs");

const readDatabase = () => {
  const path = "./database.json";
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path, "utf8");
    return JSON.parse(data);
  } else {
    return {};
  }
};

const writeDatabase = data => {
  const path = "./database.json";
  const oldValues = readDatabase();
  try {
    fs.writeFileSync(
      path,
      JSON.stringify({ ...oldValues, ...data })
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  readDatabase,
  writeDatabase,
};
