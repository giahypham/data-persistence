// build your `/api/projects` router here
const router = require('express').Router();

const Project = require('./model')

router.get('/', (req, res, next) => {
    Project.getProjects()
        .then(projects => {
            const modifiedProjects = projects.map(project => ({
                ...project,
                project_completed: Boolean(project.project_completed)
            }))
            res.json(modifiedProjects)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Project.createProject({
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        project_completed: req.body.project_completed,
    })
        .then(newProject => {
            const modifiedProject = {
                ...newProject,
                project_completed: Boolean(newProject.project_completed)
            }
            res.status(201).json(modifiedProject)
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: "something happened with projects router",
        message: err.message,
    })
})

module.exports = router