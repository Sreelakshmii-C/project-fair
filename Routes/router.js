// 1. Import
const express = require('express');

// 2. Import controllers and middlewares
const userController = require('../Controllers/userController');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const projecController = require('../Controllers/projectController');
const multerMiddleWare = require('../Middlewares/multerMiddleWare');

// 3. Create router
const router = express.Router();

// Define routes for register and login
router.post('/api/register', userController.registerAPI);
router.post('/api/login', userController.loginAPI);

// Define routes for projects
router.post('/api/addProject', jwtMiddleware, multerMiddleWare.single('projectImg'), projecController.addProjectAPI);
router.get('/api/getAllUserProject', jwtMiddleware, projecController.getAllUserProject);
router.get('/api/getUserProject', jwtMiddleware, projecController.getUserProject);
router.get('/api/getHomeProject', projecController.getHomeProject);
router.put('/api/editProject/:projectId', jwtMiddleware, multerMiddleWare.single('projectImg'), projecController.editProjectAPI);
router.delete('/api/deleteProject/:projectId', jwtMiddleware, projecController.deleteProjectAPI); // Fixed delete route

// Export the router
module.exports = router;
