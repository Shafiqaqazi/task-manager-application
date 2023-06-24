const taskRoutes = require("express").Router();
const taskData = require("../tasks.json");
const validator = require("../helpers/validator.js");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

//GET /tasks: Retrieve all tasks.
taskRoutes.get('/', (req, res) => {
    res.status(200);
    res.send(taskData);
});

//GET /tasks/:id: Retrieve a single task by its ID.
taskRoutes.get('/:id', (req, res) => {
    let shafiqaTask = taskData.shafiqa;
    let taskIdPassed = req.params.id;
    let result = shafiqaTask.filter(val => val.id == taskIdPassed);

    res.status(200).send(result);
});

//POST /tasks: Create a new task.
taskRoutes.post('/', (req, res) => {
    const taskDetails = req.body;
    let writePath = path.join(__dirname, '..', 'tasks.json');
    if (validator.validateTaskInfo(taskDetails, taskData).status) {
        let taskDataModified = taskData;
        taskDataModified.shafiqa.push(taskDetails);
        fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf8', flag: 'w' });
        res.status(200).send("Task has been added successfully");
    } else {
        res.status(400).json(validator.validateTaskInfo(taskDetails, taskData));
    }
});

// PUT /tasks/:id: Update an existing task by its ID
taskRoutes.put('/:id', (req, res) => {

    let shafiqaTask = taskData.shafiqa;
    const taskIdPassed = req.params.id;
    const updatedTask = req.body;
    const index = shafiqaTask.findIndex((task) => task.id === taskIdPassed);
    if (index !== -1) {
        shafiqaTask[index] = updatedTask;
        res.json(updatedTask);
    } else {
        res.status(400).send('Task not found');
    }

});

// DELETE /tasks/:id: Delete a task by its ID
/*app.delete('/:id', (req, res) => {

    const taskIdPassed = req.params.id;
    let shafiqaTask = taskData.shafiqa;
    const index = shafiqaTask.findIndex((task) => task.id === taskIdPassed);
    if (index !== -1) {
        const deletedTask = shafiqaTask.splice(index, 1);
        res.json(deletedTask[0]);
    } else {
        res.status(400).send('Task not found');
    }
});*/

taskRoutes.delete('/:id', (req, res) => {
    const taskIdPassed = req.params.id;
    let shafiqaTask = taskData.shafiqa;
    const index = shafiqaTask.findIndex((task) => task.id === taskIdPassed);
    if (index === -1) {
        return res.status(400).send('Task not found');
    }

    const deletedTask = shafiqaTask.splice(index, 1);
    res.json(deletedTask[0]);
});

module.exports = taskRoutes;