
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// EJS configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Home route
app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

// Organizations route
app.get("/organizations", (req, res) => {
  res.render("organizations", { title: "Organizations" });
});

// Projects route
app.get("/projects", (req, res) => {
  res.render("projects", { title: "Projects" });
});

// Categories route
app.get("/categories", (req, res) => {
  res.render("categories", { title: "Categories" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
