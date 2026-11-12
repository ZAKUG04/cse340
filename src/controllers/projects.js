import {
    getAllProjects,
    getProjectDetails
} from '../models/projects.js';
import {
    getCategoriesByProjectId
} from '../models/categories.js';

// Display upcoming service projects
// Display all service projects
const showProjectsPage = async (req, res) => {
    try {
        const projects = await getAllProjects();

        res.render('projects', {
            title: 'All Service Projects',
            projects
        });

    } catch (error) {
        console.error('Error getting projects:', error);
        res.status(500).send('Something went wrong.');
    }
};

// Display details for a single service project
// Display details for a single service project
const showProjectDetailsPage = async (req, res) => {
    try {
        const projectId = req.params.id;

        const project = await getProjectDetails(projectId);

        if (!project) {
            return res.status(404).send('Project not found.');
        }

        const categories = await getCategoriesByProjectId(projectId);

        const title = project.title;

        res.render('project', {
            title,
            project,
            categories
        });

    } catch (error) {
        console.error('Error getting project details:', error);
        res.status(500).send('Something went wrong.');
    }
};
export {
    showProjectsPage,
    showProjectDetailsPage
};