const path = require("path");
const express = require("express");

const publicDirectory = path.join(__dirname, "../dist");

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("X-Line-Request-Id");

  next();
});
app.get("/", function(req, res) {
  res.sendFile(path.join(publicDirectory, "index.html"));
});

app.use(express.static(publicDirectory));

app.listen(process.env.PORT || 3000);
