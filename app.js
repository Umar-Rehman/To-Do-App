dueDate.min = new Date().toISOString().split("T")[0]; // sets a limit on the date picker so cant choose a date before today


function validateForm() { // validates the inputs on the form
    const name = document.forms["myForm"]["name"].value;
    const description = document.forms["myForm"]["description"].value;
    const assignedTo = document.forms["myForm"]["assignedto"].value;
    const dueDate = document.forms["myForm"]["dueDate"].value;
    const status = document.forms["myForm"]["status"].value;
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
    }
    return true
}

class TaskManager {
    constructor() {
        this.taskList = [];
        this.nextTaskID = 1;
    }

    getAllTask() {
        return this.taskList
    }

    addTask(task) {
        // const taskID = this.nextTaskID;
        // this.nextTaskID++;
        // this.taskList[taskID] = task;
        // this.taskList.push(task);
        this.taskList.push(task);
        this.updateLocalStorage();
    }

    updateLocalStorage(){
        localStorage.setItem('tasks', JSON.stringify(this.taskList));
    }

    loadFromLocalStorage(){
        this.taskList = JSON.parse(localStorage.getItem('tasks'));
        for (let x in this.taskList){
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

    updateTask(taskId, status) {}

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

        let newTask = createTask(assignedBy, description, assignedTo, dueDate, status)

        tm.addTask(newTask)
        console.log("Your tasks: ", tm.getAllTask())

        display()
    }
})

function createTask(assignedBy, description, assignedTo, dueDate, status) { // create ID
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
        "Status": status
    }

    // taskList.push(newTask)
    // localStorage.setItem("allTaskList", JSON.stringify(taskList))
    // console.log(taskList)
    // this.display()
    return newTask
}

function display() {
    let outputSection = document.querySelector("#taskOutput")
    outputSection.innerHTML = ""

    for (x in tm.taskList) {
        let taskHTML = `<div id="${
            tm.taskList[x]["ID"]
        }" class="card cardSpace" style="width: 18rem; border-color: #dc3545;">
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
                <button type="button" class="btn btn-labeled btn-info" id="update">
                <span class="btn-label"><i class="fa fa-edit"></i></span> Update</button>
            </li>
        </ul>
    </div>`
        outputSection.innerHTML += taskHTML


        let outputSummarySection = document.querySelector("#taskSummaryOutput")
        outputSummarySection.innerHTML = ""

        for (x in tm.taskList) {
            let summaryHTML = `<a href="#" id="${
                tm.taskList[x]["ID"]
            }" class="list-group-item list-group-item-action" aria-current="true">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1"><strong>Assigned to: </strong>${
                tm.taskList[x]["AssignedTo"]
            }</h5>
            <small><strong>Due: </strong>${
                tm.taskList[x]["DueDate"]
            }</small>
        </div>
        <small><strong>Status: </strong>${
                tm.taskList[x]["Status"]
            }</small>
    </a>`
            outputSummarySection.innerHTML += summaryHTML
        }
    }

}
