const express = require("express");

const app = express();

// View Engine Middleware
app.set("view engine", "ejs");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
  res.send("Hello Express");
});

// My Get route
app.get("/myget", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

// My Post Route
app.post("/mypost", (req, res) => {
  console.log(req.body);
  console.log(req.files);
});

// Rendering the Page
app.get("/getform", (req, res) => {
  res.render("getform");
});

// Rendering page for post
app.get("/postform", (req, res) => {
  res.render("postform");
});

app.listen(4000, () => {
  console.log("Server is running at port 4000");
});
