class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;

        this.generateDefaultTasks(8);//Generate default 8 cards
    }
//Find the task from tasks array using given task-id
    getTask(taskId) {
        return this.tasks.find(task => task.taskId == taskId);
    }
//get all the tasks from tasks array
    getAllTasks() {
        return this.tasks;
    }
//use task object to push the task into tasks array
    addTask(taskObj) {
        taskObj.taskId = this.currentId++;
        this.tasks.push(taskObj);
    }
//use task object property task id  to match the specefic task and update the task details in a tasks array 
    updateTask(taskObj) {
        const matchedTask = this.tasks.find(x => x.taskId == taskObj.taskId);

        matchedTask.title = taskObj.title;
        matchedTask.details = taskObj.details;
        matchedTask.status = taskObj.status;
        matchedTask.assignedTo = taskObj.assignedTo;
        matchedTask.dueDate = taskObj.dueDate;
    }
//use task object property task id  to match the specefic task and delete  the tasks from the  tasks array 
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(x => x.taskId != taskId);
    }
//generate the default tasks of given count 
    generateDefaultTasks(count) {
        let statuses = ['ToDo','InProgress','Review','Done'];
        for (let i = 0; i < count; i++) {
            var taskObj = {
                taskId: this.currentId++,
                title: "Title "+ i,
                details: "dkgjkljjkl",
                assignedTo: "dkgjkljjkl",
                dueDate:  new Date(2021, 9, i+1).toISOString().slice(0,10),
                status: statuses[i%4],
            };

            this.tasks.push(taskObj);
        }
    }
}