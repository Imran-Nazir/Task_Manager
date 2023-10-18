const express = require("express");
const UsersController = require("../controllers/UsersController");
const TasksController = require("../controllers/TasksController");
const router = new express.Router();
const AuthVerify = require('../middlewares/AuthVerifyMiddleware');

router.post('/registration', UsersController.registration);
router.post('/login', UsersController.login);
router.post('/profileUpdate', AuthVerify, UsersController.profileUpdate);
router.get('/profileDetails', AuthVerify, UsersController.profileDetails);

router.get('/RecoverVerifyEmail/:email', UsersController.RecoverVerifyEmail);
router.get('/RecoverVerifyOTP/:email/:otp', UsersController.RecoverVerifyOTP);
router.post('/RecoverResetPass', UsersController.RecoverResetPass);

router.post('/createTask', AuthVerify, TasksController.createTask);
router.post('/deleteTask/:id', AuthVerify, TasksController.deleteTask);
router.post('/updateTaskStatus/:id/:status', AuthVerify, TasksController.updateTaskStatus);
router.get('/listTaskByStatus/:status', AuthVerify, TasksController.listTaskByStatus);
router.get('/taskStatusCount', AuthVerify, TasksController.taskStatusCount);

module.exports = router;