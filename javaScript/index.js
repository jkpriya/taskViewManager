
function setMinDate(){
    var today =  new Date().toISOString().slice(0,10);
    document.getElementById('task-due-date').setAttribute("min", today);
}

const taskViewManager = new TaskViewManager();
const taskManager = new TaskManager();

taskViewManager.render();