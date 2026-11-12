import {
    getAllOrganizations,
    getOrganizationDetails
} from '../models/organizations.js';

import {
    getProjectsByOrganizationId
} from '../models/projects.js';

// Display all organizations
const showOrganizationsPage = async (req, res) => {
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
};

// Display organization details
const showOrganizationDetailsPage = async (req, res) => {
    try {
        const organizationId = req.params.id;

        const organization = await getOrganizationDetails(organizationId);

        if (!organization) {
            return res.status(404).send('Organization not found.');
        }

        const projects = await getProjectsByOrganizationId(organizationId);

        res.render('organization', {
            title: organization.name,
            organization,
            projects
        });

    } catch (error) {
        console.error('Error getting organization details:', error);
        res.status(500).send('Something went wrong.');
    }
};

export {
    showOrganizationsPage,
    showOrganizationDetailsPage
};