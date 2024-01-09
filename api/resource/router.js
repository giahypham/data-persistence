// build your `/api/resources` router here
const router = require('express').Router();

const Resource = require('./model')

router.get('/', (req, res, next) => {
    Resource.getResources()
        .then(resources => {
            res.json(resources)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Resource.createResource({
        resource_name: req.body.resource_name,
        resource_description: req.body.resource_description
    })
        .then(newResource => {
            res.status(201).json(newResource)
        })
        .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: "something happened with resource router",
        message: err.message,
    })
})

module.exports = router