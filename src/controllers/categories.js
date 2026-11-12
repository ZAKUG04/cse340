import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
} from '../models/categories.js';

// Display all categories
const showCategoriesPage = async (req, res) => {
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
};

// Display details for a single category
const showCategoryDetailsPage = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const category = await getCategoryById(categoryId);

        if (!category) {
            return res.status(404).send('Category not found.');
        }

        const projects = await getProjectsByCategoryId(categoryId);

        res.render('category', {
            title: category.name,
            category,
            projects
        });

    } catch (error) {
        console.error('Error getting category details:', error);
        res.status(500).send('Something went wrong.');
    }
};

export {
    showCategoriesPage,
    showCategoryDetailsPage
};