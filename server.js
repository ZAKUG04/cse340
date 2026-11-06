
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';
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
app.get('/organizations', async (req, res) => {
    try {
        const organizations = await getAllOrganizations();

        const title = 'Our Partner Organizations';

        res.render('organizations', {
            title,
            organizations
        });
    } catch (error) {
        console.error('Error getting organizations:', error);
        res.status(500).send('Something went wrong.');
    }
});

// Projects route
app.get('/projects', async (req, res) => {
    try {
        const projects = await getAllProjects();

        const title = 'Our Service Projects';

        res.render('projects', {
            title,
            projects
        });
    } catch (error) {
        console.error('Error getting projects:', error);
        res.status(500).send('Something went wrong.');
    }
});
// Categories route
app.get('/categories', async (req, res) => {
    try {
        const categories = await getAllCategories();

        const title = 'Project Categories';

        res.render('categories', {
            title,
            categories
        });
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).send('Something went wrong.');
    }
});

// Start server
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await testConnection();
});