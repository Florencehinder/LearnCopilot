const express = require("express");
const app = express();
const PORT = 5000;
app.get("/", (req, res) => {
  console.log(colors);
  res.send("Welcome to NodeJS + Express CORS Server! 🎈");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
