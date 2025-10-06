const express = require("express");
const app = express();

// Use the port Render gives you, or default to 3000 locally
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Render!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
