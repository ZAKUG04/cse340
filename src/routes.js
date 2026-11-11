import express from 'express';

import {
    showProjectsPage,
    showProjectDetailsPage
} from './controllers/projects.js';

import {
    getAllOrganizations,
    getOrganizationDetails
} from './models/organizations.js';
import { getAllCategories } from './models/categories.js';

const router = express.Router();

// Organizations route
router.get('/organizations', async (req, res) => {
    try {
        const organizations = await getAllOrganizations();

        res.render('organizations', {
            title: 'Our Partner Organizations',
            organizations
        });
    } catch (error) {
        console.error('Error getting organizations:', error);
        res.status(500).send('Something went wrong.');
    }
});
router.get('/organization/:id', async (req, res) => {
    try {
        const organizationId = req.params.id;

        const organization = await getOrganizationDetails(organizationId);

        if (!organization) {
            return res.status(404).send('Organization not found.');
        }

        res.render('organization', {
            title: organization.name,
            organization
        });

    } catch (error) {
        console.error('Error getting organization details:', error);
        res.status(500).send('Something went wrong.');
    }
});
// Projects routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// Categories route
router.get('/categories', async (req, res) => {
    try {
        const categories = await getAllCategories();

        res.render('categories', {
            title: 'Project Categories',
            categories
        });
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).send('Something went wrong.');
    }
});

export default router;