dueDate.min = new Date().toISOString().split("T")[0]; // sets a limit on the date picker so cant choose a date before today


function validateForm() { // validates the inputs on the form
    const name = document.forms["myForm"]["name"].value;
    const description = document.forms["myForm"]["description"].value;
    const assignedTo = document.forms["myForm"]["assignedto"].value;
    const dueDate = document.forms["myForm"]["dueDate"].value;
    const status = document.forms["myForm"]["status"].value;
    const urgency = document.forms["myForm"]["urgency"].value
    if ((name == "") || (name.length > 20)) {
        alert("Enter a valid name!");
        return false;
    } else if ((description == "") || (description.length > 20)) {
        alert("Enter valid description");
        return false;
    } else if ((assignedTo == "") || (assignedTo.length > 20)) {
        alert("Enter valid Assigned to");
        return false;
    } else if (dueDate == "") {
        alert("Select a valid date")
        return false;
    } else if (status == "") {
        alert("Select a valid status")
        return false;
    } else if (urgency == "") {
        alert("Select a valid urgency")
    }
    return true
}

class TaskManager {
    constructor() {
        this.taskList = [];
        this.nextTaskID = 1; //needed???
    }

    getAllTask() {
        return this.taskList
    }

    addTask(task) {
        this.taskList.push(task);
        this.updateLocalStorage();
    }

    updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.taskList));
        location.reload()
    }

    loadFromLocalStorage() {
        const taskList = JSON.parse(localStorage.getItem('tasks'))
        if (taskList) {
            this.taskList = taskList
        }
        for (let x in this.taskList) {
            display()
        }
    }

    deleteTask() {
        let event = window.event.target;
        console.log(event);

        let taskID = event.parentNode.parentNode.parentNode.attributes.id.value;

        console.log(event.parentNode.parentNode.parentNode);

        console.log(taskID);

        let x = 0;

        while (x < 2) {
            let deletedElement = document.getElementById(taskID);
            deletedElement.remove();
            x++
        }

        for (x in this.taskList) {
            console.log(this.taskList[x].ID)
            if (this.taskList[x].ID == taskID) {
                this.taskList.splice(x, 1)
                console.log(this.taskList)
            } else {
                console.log("Not ID")
            }
        }

        this.updateLocalStorage();

    }

    updateTask() {
        let updatedTask = {}
        let event = window.event.target
        let updatedTaskID = event.parentNode.parentNode.parentNode.attributes.id.value;
        
        
        for(x=0; x<this.taskList.length; x++){
            if(this.taskList[x].ID == updatedTaskID){
                updatedTask = this.taskList[x]
            }
        }
        
        document.querySelector("#name").value = updatedTask.Name
        document.querySelector("#description").value = updatedTask.Description
        document.querySelector("#assignedto").value = updatedTask.AssignedTo
        document.querySelector("#dueDate").value = updatedTask.DueDate
        document.querySelector("#status").value = updatedTask.Status
        document.querySelector("#urgency").value = updatedTask.Urgency

        document.querySelector('#addTask').outerHTML = `<button type="button" id="updateTask" class="btn btn-info">Save</button>`

        document.querySelector('#updateTask').addEventListener('click', function(){
            const name = document.querySelector('#name').value;
            const description = document.querySelector('#description').value;
            const assignedTo = document.querySelector('#assignedto').value;
            const dueDate = document.querySelector('#dueDate').value;
            const status = document.querySelector('#status').value;
            const urgency = document.querySelector('#urgency').value;

            if (validateForm() == true){
                updatedTask.Name = name
                updatedTask.AssignedTo = assignedTo
                updatedTask.Description = description
                updatedTask.DueDate = dueDate
                updatedTask.Status = status
                updatedTask.Urgency = urgency

                tm.updateLocalStorage();

            }
        })
    }
}

let tm = new TaskManager();
tm.loadFromLocalStorage()

document.querySelector("#addTask").addEventListener("click", function () {

    if (validateForm() == true) { // let id = tm.taskList.length + 1
        let assignedBy = document.querySelector("#name").value;
        let description = document.querySelector("#description").value;
        let assignedTo = document.querySelector("#assignedto").value;
        let dueDate = document.querySelector("#dueDate").value;
        let status = document.querySelector("#status").value;
        let urgency = document.querySelector("#urgency").value

        let newTask = createTask(assignedBy, description, assignedTo, dueDate, status, urgency)

        tm.addTask(newTask)
        console.log("Your tasks: ", tm.getAllTask())

        display()
    }
})

function createTask(assignedBy, description, assignedTo, dueDate, status, urgency) { // create ID
    let id = 0

    if (tm.taskList.length == 0) {
        id = 1
    } else {
        let lastItemID = tm.taskList[tm.taskList.length - 1].ID
        id = lastItemID + 1
    }

    let newTask = {
        "ID": id,
        "Name": assignedBy,
        "Description": description,
        "AssignedTo": assignedTo,
        "DueDate": dueDate,
        "Status": status,
        "Urgency": urgency,
    }
    return newTask
}

function display() {
    let outputSection = document.querySelector("#taskOutput")
    outputSection.innerHTML = ""

    for (x in tm.taskList) {
        let taskHTML = `<div id="${
            tm.taskList[x]["ID"]
        }" class="card cardSpace" style="width: 18rem; border-color: #${
            tm.taskList[x]["Urgency"]
        };">
        <div class="card-header">
            <h5>
                <strong>Assigned To:
                </strong>${
            tm.taskList[x]["AssignedTo"]
        }</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <strong>Assigned By:
                </strong>${
            tm.taskList[x]["Name"]
        }</li>
            <li class="list-group-item">
                <strong>Due:
                </strong>${
            tm.taskList[x]["DueDate"]
        }</li>
            <li class="list-group-item">
                <strong>To-Do:
                </strong>${
            tm.taskList[x]["Description"]
        }</li>
            <li class="list-group-item">
                <strong>Status:
                </strong>${
            tm.taskList[x]["Status"]
        }</li>
            <li class="list-group-item">
            <button type="button" class="btn btn-labeled btn-danger" id="delete" onclick="tm.deleteTask()">
            <span class="btn-label"><i class="fa fa-trash"></i></span> Delete</button>
            <button type="button" class="btn btn-labeled btn-info" id="update" onclick="tm.updateTask()">
            <span class="btn-label"><i class="fa fa-edit"></i></span> Update</button>
        </li>
        </ul>
        </div>`
        outputSection.innerHTML += taskHTML


        let outputSummarySection = document.querySelector("#taskSummaryOutput")
        outputSummarySection.innerHTML = ""

        for (x in tm.taskList) {
            let summaryHTML = `<a href="#" id="${tm.taskList[x]["ID"]}" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">
                    <strong>Assigned to: </strong>${tm.taskList[x]["AssignedTo"]}
                </h5>
                <small>
                    <strong>Due: </strong>${tm.taskList[x]["DueDate"]}
                </small>
            </div>
            <div class="d-flex w-100 justify-content-between">
                <small><strong>Status: </strong>${tm.taskList[x]["Status"]}
                </small>
                <small>
                    <button type="button" class="${tm.taskList[x]["Urgency"]}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                    </button>
                </small>
            </div>
            </a>`
            outputSummarySection.innerHTML += summaryHTML
        }
    }
}