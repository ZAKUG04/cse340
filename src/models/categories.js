import db from './db.js';

// Get all categories
const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM category
        ORDER BY category_id;
    `;

    const result = await db.query(query);
    return result.rows;
};

// Get a single category by ID
const getCategoryById = async (id) => {
    const query = `
        SELECT category_id, name
        FROM category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [id]);
    return result.rows[0];
};

// Get all categories associated with a project
const getCategoriesByProjectId = async (id) => {
    const query = `
        SELECT
            c.category_id,
            c.name
        FROM category c
        JOIN project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const result = await db.query(query, [id]);
    return result.rows;
};

// Get all projects associated with a category
const getProjectsByCategoryId = async (id) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.date,
            p.location
        FROM project p
        JOIN project_category pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.date ASC;
    `;

    const result = await db.query(query, [id]);
    return result.rows;
};

export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId
};