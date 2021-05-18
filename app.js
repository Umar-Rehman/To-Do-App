// dueDate.min = new Date().toISOString().split("T")[0];


// function validateForm() {
//     let name = document.forms["myForm"]["name"].value;
//     let description = document.forms["myForm"]["description"].value;
//     let assignedTo = document.forms["myForm"]["assignedto"].value;
//     let dueDate = document.forms["myForm"]["dueDate"].value;
//     let status = document.forms["myForm"]["status"].value;
//     if ((name == "") || (name.length > 20)) {
//         alert("Enter a valid name!");
//         return false;
//     } else if ((description == "") || (description.length > 20)) {
//         alert("Enter valid description");
//         return false;
//     } else if ((assignedTo == "") || (assignedTo.length > 20)) {
//         alert("Enter valid Assigned to");
//         return false;
//     } else if (dueDate == "") {
//         alert("Select a valid date")
//     } else if (status == "") {
//         alert("Select a valid status")
//     }
//     return true
// }

// Task 2

// document.querySelector("#addTask").addEventListener("click", function () {

//     if (validateForm() == true) {
//         let id = taskList.length + 1
//         let assignedBy = document.querySelector("#name").value;
//         let description = document.querySelector("#description").value;
//         let assignedTo = document.querySelector("#assignedto").value;
//         let dueDate = document.querySelector("#dueDate").value;
//         let status = document.querySelector("#status").value;

//         createTask(id, assignedBy, description, assignedTo, dueDate, status)
//         display()
//     }
// })

// function createTask(id, assignedBy, description, assignedTo, dueDate, status) {
//     let newTask = {
//         "ID": id,
//         "Name": assignedBy,
//         "Description": description,
//         "AssignedTo": assignedTo,
//         "DueDate": dueDate,
//         "Status": status
//     }

//     taskList.push(newTask)
//     localStorage.setItem("allTaskList", JSON.stringify(taskList))
//     console.log(taskList)
// }

// function display() {
//     let outputSection = document.querySelector("#taskOutput")
//     outputSection.innerHTML = ""

//     for (x in taskList) {
//         let taskHTML = `<div class="card cardSpace" style="width: 18rem; border-color: #dc3545;">
//         <div class="card-header">
//             <h5>
//                 <strong>Assigned To:
//                 </strong>${
//             taskList[x]["AssignedTo"]
//         }</h5>
//         </div>
//         <ul class="list-group list-group-flush">
//             <li class="list-group-item">
//                 <strong>Assigned By:
//                 </strong>${
//             taskList[x]["Name"]
//         }</li>
//             <li class="list-group-item">
//                 <strong>Due:
//                 </strong>${
//             taskList[x]["DueDate"]
//         }</li>
//             <li class="list-group-item">
//                 <strong>To-Do:
//                 </strong>${
//             taskList[x]["Description"]
//         }</li>
//             <li class="list-group-item">
//                 <strong>Status:
//                 </strong>${
//             taskList[x]["Status"]
//         }</li>
//         </ul>
//     </div>`
//         outputSection.innerHTML += taskHTML
//     }
// }

// let taskList = []

// Task 4 part 1
// Creating the task objects

// document.querySelector("#submit").addEventListener("click", function () {
//     getItems()
// });

// function getItems() {
// taskList = []
//     id = taskList.length +1
//     nameTask = document.querySelector("#nameForm").value;
//     description = document.querySelector("#Description").value;
//     assign = document.querySelector("#assignForm").value;
//     date = document.querySelector("#dateForm").value;
//     status = document.querySelector("#statusForm").value;

//     let taskAllObject = taskObject(nameTask, description, assign, date, status);
//     return taskAllObject;
// }

// function taskObject(nameTask, description, assign, date, status) {
//     let taskAllObject = {
//         Name: nameTask,
//         Description: description,
//         AssignedTo: assign,
//         DueDate: date,
//         Status: status
//     }
//     console.log(taskAllObject);
// }


// // Task 4 Part 2
// // Task Manager Class
// class TaskManager {
//     constructor() {
//         this.tasks = []

//     }
//     getTasks() {
//         return this.tasks
//     }
//     addTask(task) {
//         this.tasks.push(task);
//     }
//     deleteTask() {
//         return this.tasks
//     }
//     updateTaskStatus() {
//         return this.tasks
//     }
// }

dueDate.min = new Date().toISOString().split("T")[0]; //sets a limit on the date picker so cant choose a date before today


function validateForm() { //validates the inputs on the form
    let name = document.forms["myForm"]["name"].value;
    let description = document.forms["myForm"]["description"].value;
    let assignedTo = document.forms["myForm"]["assignedto"].value;
    let dueDate = document.forms["myForm"]["dueDate"].value;
    let status = document.forms["myForm"]["status"].value;
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
    } else if (status == "") {
        alert("Select a valid status")
    }
    return true
}

class TaskManager {
    constructor() {
        this.taskList = [];
    }

    getAllTask() {
        return this.taskList
    }

    addTask(task) {
        this.taskList.push(task)
    }

    deleteTask(task) {

    }


    updateTask(taskId, status) {}
        
};

let tm = new TaskManager();

document.querySelector("#addTask").addEventListener("click", function () {

    if (validateForm() == true) {
        let id = tm.taskList.length + 1
        let assignedBy = document.querySelector("#name").value;
        let description = document.querySelector("#description").value;
        let assignedTo = document.querySelector("#assignedto").value;
        let dueDate = document.querySelector("#dueDate").value;
        let status = document.querySelector("#status").value;

        let newTask = createTask(id, assignedBy, description, assignedTo, dueDate, status)

        tm.addTask(newTask)
        console.log("Your tasks: ", tm.getAllTask())

        display()
    }
})


function createTask(id, assignedBy, description, assignedTo, dueDate, status) {
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

console.log("Testing Testing One Two One Two")

function display() {
    let outputSection = document.querySelector("#taskOutput")
    outputSection.innerHTML = ""

    for (x in tm.taskList) {
        let taskHTML = `<div class="card cardSpace" style="width: 18rem; border-color: #dc3545;">
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
        </ul>
    </div>`
        outputSection.innerHTML += taskHTML
    }
}