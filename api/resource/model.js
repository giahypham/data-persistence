// build your `Resource` model here
const db = require('../../data/dbConfig')

function getResources() {
    return db('resources')
}

function getResourceById(resource_id) {
    return db('resources').where('resource_id', resource_id).first()
}

async function createResource(resource) {
    const [resource_id] = await db('resources').insert(resource)
    return getResourceById(resource_id)
}

module.exports = { getResources, createResource}