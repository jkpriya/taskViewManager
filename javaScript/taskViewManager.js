class TaskViewManager {
    render() {
        let tasks = taskManager.tasks;

        tasks.forEach(currentTask => {
            const column = document.querySelector(`.${currentTask.status}`);
            const taskHtml = this.generateTaskCardHtml(currentTask);

            column.innerHTML += taskHtml;
        });
    }

    saveTask() {
        var taskObj = this.getTaskObjectFromForm('task-form');

        if (!taskObj.taskId)
            taskManager.addTask(taskObj);
        else
            taskManager.updateTask(taskObj);

        this.clearColumns();
        this.render();
    }

    displayTask(btnObj) {
        var taskId = btnObj.dataset.taskId;

        var taskObj = taskManager.getTask(taskId);

        this.setTaskObjectInForm('task-form', taskObj);

        //display of form is taken care of in editbutton attribute: data-bs-target="#staticBackdrop"
    }

    getTaskObjectFromForm(formId) {
        const formElements = document.getElementById(formId).elements;

        var obj = {
            taskId: formElements["task-id"].value,
            title: formElements["task-title"].value,
            details: formElements["task-details"].value,
            assignedTo: formElements["task-assigned-to"].value,
            dueDate: formElements["task-due-date"].value,
            status: formElements["task-status"].value,
        };

        document.getElementById(formId).reset();

        return obj;
    }

    setTaskObjectInForm(formId, taskObj) {
        const formElements = document.getElementById(formId).elements;

        formElements["task-id"].value = taskObj.taskId;
        formElements["task-title"].value = taskObj.title;
        formElements["task-details"].value = taskObj.details;
        formElements["task-assigned-to"].value = taskObj.assignedTo;
        formElements["task-due-date"].value = new Date(taskObj.dueDate);
        formElements["task-status"].value = taskObj.status;
    }


    deleteTask(btnObj) {
        taskManager.deleteTask(btnObj.dataset.taskId);

        this.clearColumns();
        this.render();
    }

    generateTaskCardHtml(taskObj) {
        var taskCardHtml =
            `<div id="draggable-handle" class="card mt-2  " >                     
        <!-- Card content -->
        <div class="card-body" >
            <!-- Title -->
            <h4 class="card-title"><a>${taskObj.title}</a></h4>
            <!-- TaskId -->
            <h4><a>${taskObj.taskId}</a></h4>
            <!-- Text -->
            <div class="card-text taskDescription">
                <label for="cardLabelDescription">Task Description: </label>
                <p class="cardDescriptionValue">${taskObj.details}</p>
            </div>
            <!-- Assign To -->
            <div class="card-text assignto">
                <label for="cardLabelAssign">Assign To: </label>
                <p class="cardAssignedToValue"> ${taskObj.assignedTo}</p>
            </div>
            <!-- Due Date -->
            <div class="card-text duedate">
                <label for="cardLabelDueDate">DueDate: </label>
                <p class="cardDueDateValue"> ${taskObj.dueDate}</p>
            </div>
            <!-- Status -->
            <div class="card-text status">
                <label for="cardLabelStatus">Status: </label>
                <p id="${taskObj.status}" class="cardStatusValue">${taskObj.status}</p>
            </div>
            <!-- Button -->
            <button data-task-id=${taskObj.taskId} onclick="taskViewManager.displayTask(this)"
            data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-primary edit-button">Edit</button>
            <button data-task-id=${taskObj.taskId} onclick="taskViewManager.deleteTask(this)" class="btn btn-primary del-button">Delete</button>
        </div>                              
    </div> <br>`;

        return taskCardHtml;
    }

    clearColumns() {
        var todoColumn = document.querySelector(".ToDo");
        var inProgressColumn = document.querySelector(".InProgress");
        var reviewColumn = document.querySelector(".Review");
        var doneColumn = document.querySelector(".Done");

        todoColumn.innerHTML = "";
        inProgressColumn.innerHTML = "";
        reviewColumn.innerHTML = "";
        doneColumn.innerHTML = "";
    }

}

