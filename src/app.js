const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("express").Router();
const taskInfo = require("./routes/taskInfo.js");

const app = express();

app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

routes.get('/', (req, res) => {
    res.status(200).send("Welcome to IT Filed");
});

routes.use('/task', taskInfo);

app.listen(PORT, (err) => {
    if (!err)
        console.log("server started ")
    else
        console.log("server not running ")
}
)
