-- =========================================
-- CSE 340 - Database Setup
-- =========================================

-- 1. ORGANIZATION TABLE
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- 2. PROJECT TABLE
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

-- 3. CATEGORY TABLE
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 4. PROJECT_CATEGORY TABLE
CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id)
        REFERENCES project(project_id),
    FOREIGN KEY (category_id)
        REFERENCES category(category_id)
);

-- =========================================
-- INSERT ORGANIZATIONS
-- =========================================

INSERT INTO organization
(organization_id, name, description, contact_email, logo_filename)
VALUES
(1, 'BrightFuture Builders',
 'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
 'info@brightfuturebuilders.org', 'organizations-1.jpg'),

(2, 'GreenHarvest Growers',
 'An urban farming collective promoting food sustainability and education in local neighborhoods.',
 'contact@greenharvest.org', 'organizations-2.jpg'),

(3, 'UnityServe Volunteers',
 'A volunteer coordination group supporting local charities and service initiatives.',
 'hello@unityserve.org', 'organizations-3.jpg');

-- =========================================
-- INSERT PROJECTS
-- =========================================

INSERT INTO project
(project_id, organization_id, title, description, location, date)
VALUES
(1, 1, 'Community Center Renovation',
 'Renovating a local community center.',
 'Quevedo', '2026-01-15'),

(2, 1, 'School Building Improvement',
 'Improving school infrastructure.',
 'Quevedo', '2026-02-10'),

(3, 1, 'Public Park Construction',
 'Building a sustainable public park.',
 'Guayaquil', '2026-03-05'),

(4, 1, 'Neighborhood Road Repair',
 'Repairing roads in local neighborhoods.',
 'Quevedo', '2026-04-20'),

(5, 1, 'Community Library Project',
 'Building a community library.',
 'Quito', '2026-05-12'),

(6, 2, 'Urban Garden Initiative',
 'Creating urban vegetable gardens.',
 'Guayaquil', '2026-01-20'),

(7, 2, 'Community Farming Workshop',
 'Teaching sustainable farming practices.',
 'Quito', '2026-02-15'),

(8, 2, 'School Garden Program',
 'Establishing gardens in local schools.',
 'Quevedo', '2026-03-10'),

(9, 2, 'Composting Education',
 'Promoting composting and organic waste reduction.',
 'Cuenca', '2026-04-25'),

(10, 2, 'Food Sustainability Campaign',
 'Promoting local food sustainability.',
 'Guayaquil', '2026-05-18'),

(11, 3, 'Food Donation Drive',
 'Collecting food for families in need.',
 'Quevedo', '2026-01-25'),

(12, 3, 'Elderly Assistance Program',
 'Supporting elderly community members.',
 'Quito', '2026-02-20'),

(13, 3, 'Community Cleanup Day',
 'Organizing neighborhood cleanup activities.',
 'Guayaquil', '2026-03-15'),

(14, 3, 'Animal Shelter Support',
 'Helping local animal shelters.',
 'Cuenca', '2026-04-30'),

(15, 3, 'Youth Volunteer Program',
 'Encouraging youth participation in volunteering.',
 'Quevedo', '2026-05-22');

-- =========================================
-- INSERT CATEGORIES
-- =========================================

INSERT INTO category (category_id, name)
VALUES
(1, 'Construction'),
(2, 'Education'),
(3, 'Environment'),
(4, 'Community Service'),
(5, 'Food Security');

-- =========================================
-- INSERT PROJECT-CATEGORY RELATIONSHIPS
-- =========================================

INSERT INTO project_category (project_id, category_id)
VALUES
(1, 1), (1, 4),
(2, 2), (2, 4),
(3, 1), (3, 3),
(4, 1), (4, 4),
(5, 2), (5, 4),
(6, 3), (6, 5),
(7, 2), (7, 3),
(8, 2), (8, 3),
(9, 3), (9, 4),
(10, 3), (10, 5),
(11, 4), (11, 5),
(12, 2), (12, 4),
(13, 3), (13, 4),
(14, 4),
(15, 2), (15, 4);

-- =========================================
-- UPDATE SERIAL SEQUENCES
-- =========================================

SELECT setval('organization_organization_id_seq',
    (SELECT MAX(organization_id) FROM organization));

SELECT setval('project_project_id_seq',
    (SELECT MAX(project_id) FROM project));

SELECT setval('category_category_id_seq',
    (SELECT MAX(category_id) FROM category));