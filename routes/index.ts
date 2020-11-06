const express = require('express');
const ProjectController = require('../controller/project-controller');
const router = express.Router();

router.post('/create', ProjectController.createProject)
router.get('/projects', ProjectController.getProject)
router.get('/info', ProjectController.getInfo)
router.get('/posts', ProjectController.getPosts)

module.exports = router;