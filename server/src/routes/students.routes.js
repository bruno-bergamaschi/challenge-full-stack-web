const express = require('express');
const studentsController = require('../controllers/students');

const studentsRouter = express.Router();

studentsRouter.post('/create', studentsController.Create);
studentsRouter.get('/get-all', studentsController.GetAll);
studentsRouter.patch('/update/:id', studentsController.Update);
studentsRouter.delete('/delete/:id', studentsController.Delete);

module.exports = studentsRouter;
