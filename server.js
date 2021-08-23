const express = require("express");
const path = require("path");
const dbData = require("./db/db.json");
const fs = require("fs").promises;

const PORT = 3001;

const app = express();

let db = [...dbData];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", async (req, res) => {
  // ... = spread
  // ['hello', 'test'] = 'hello', 'test'
  // req.body = { title: 'hello', text: 'whats up' }
  const notes = [...db];
  notes.push(req.body);
  await fs.writeFile("./db/db.json", JSON.stringify(db));
  db = notes;
  res.json(notes);
});

app.get("/api/notes", (req, res) => res.json(db));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
