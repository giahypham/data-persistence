// build your `Task` model here
const db = require('../../data/dbConfig')

function getTasks() {
    return db('tasks as t')
        .leftJoin('projects as p', 't.project_id', 'p.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes',
            't.task_completed',
            'p.project_name',
            'p.project_description'
        )
}

function getTaskById(task_id) {
    return db('tasks as t')
        .where('t.task_id', task_id)
        .leftJoin('projects as p', 't.project_id', 'p.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes',
            't.task_completed',
            'p.project_name',
            'p.project_description'
        )
        .first()

}

async function createTask(task) {
    const [task_id] = await db('tasks').insert(task)
    return getTaskById(task_id)
}

module.exports = { getTasks, createTask }