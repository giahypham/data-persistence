// build your `/api/tasks` router here
const router = require('express').Router()

const Task = require('./model')

router.get('/', (req, res, next) => {
    Task.getTasks()
        .then(tasks => {
            const modifiedTasks = tasks.map(task => ({
                ...task, 
                task_completed: Boolean(task.task_completed)
            }))
            res.json(modifiedTasks)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Task.createTask({
        task_description: req.body.task_description,
        task_notes: req.body.task_notes,
        task_completed: req.body.task_completed,
        project_id: req.body.project_id,
    })
        .then(newTask => {
            const modifiedNewTask = {
            ...newTask,
            task_completed: Boolean(newTask.task_completed)
            }
            res.status(201).json(modifiedNewTask)
        })
        .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: "something happened with projects router",
        message: err.message,
    })
})
module.exports = router 