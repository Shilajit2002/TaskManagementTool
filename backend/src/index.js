const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Server</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
