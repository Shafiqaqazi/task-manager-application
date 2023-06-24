class validator {
    static validateTaskInfo(taskInfo, taskData) {
        if (taskInfo.hasOwnProperty("id") &&
            taskInfo.hasOwnProperty("title") &&
            taskInfo.hasOwnProperty("description") &&
            taskInfo.hasOwnProperty("completed") && this.validateUniqueTaskId(taskInfo, taskData)) {
            return {
                "status": true,
                "message": "task has been added"
            };
        }
        if (!this.validateUniqueTaskId(taskInfo, taskData)) {
            return {
                "status": false,
                "message": "task id has to be unique"
            };
        }
        return {
            "status": false,
            "message": "Data that you provide is malformed please provide all the properties"
        };
    }

    static validateUniqueTaskId(taskInfo, taskData) {
        let valueFound = taskData.shafiqa.some(el => el.id === taskInfo.id);
        if (valueFound) return false;
        return true;
    }
}

module.exports = validator;