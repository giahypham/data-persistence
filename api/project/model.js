// build your `Project` model here
const db = require('../../data/dbConfig')

function getProjects() {
    return db('projects');
}

function getProjectById(project_id) {
    return db('projects').where('project_id', project_id).first()
}
async function createProject(project) {
    const [project_id] = await db('projects').insert(project)
    return getProjectById(project_id)
}

module.exports = { getProjects, createProject }