const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// APIs
const api = require("./routes/api/general");
app.use("api/general", api);

const posts = require("./routes/api/posts");
app.use("/api/posts", posts);

// Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.user(express.static(__dirname + "/public"));

  // Handle Single Page Application (SPA)
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));
