// // ------------------------------------------------------------------
const note = () => {
    const input = document.querySelector(".add .text"),
        addBtn = document.querySelector(".add .add-task"),
        result = document.querySelector(".notes .tasks");
        let arrTasks = [];
    // ------------------------
    // Check Data From Local 
    if (localStorage.getItem("tasks")) {
        arrTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    // Get Data From localStorage 
    getDataFromLocal();
    // ----------
    // Start Click Events 
    // With click BTN
    addBtn.addEventListener("click", () => {
        if (input.value !== "") {
            addTaskToArr(input.value);
            input.value = "";
            input.focus();
        }
    });
    // With click Key (Enter)
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            if (input.value !== "") {
                addTaskToArr(input.value);
                input.value = "";
                input.focus();
            }
        }
    });
    // End Click Events 
    // ----------
    // Add class done to tasks and Delete Task
    result.addEventListener("click", (e) => {
        // Delete Tasks 
        if (e.target.classList.contains("delete")) {
            deleteTaskFromLocal(e.target.parentElement.getAttribute("data-id"));
            e.target.parentElement.remove();
        }
        // Done Tasks 
        if (e.target.classList.contains("task")) {
            changeCompletedInLocal(e.target.getAttribute("data-id"));
            e.target.classList.toggle("done");
        }
        if (e.target.classList.contains("text")) {
            changeCompletedInLocal(e.target.parentElement.getAttribute("data-id"));
            e.target.parentElement.classList.toggle("done");
        }
    });
    // ------------------------
    // Add Task To Array 
    function addTaskToArr(text) {
        task = {
            id: Date.now(),
            title: text,
            completed: false,
        }
        // add tasks to array 
        arrTasks.push(task);
        // add Element to Page 
        addTaskToPageFrom(arrTasks);
        addTaskToLocalFrom(arrTasks);
    }
    // Add Task To Page 
    function addTaskToPageFrom(taskOfArr) {
        result.innerHTML = "";
        // create Elements from array
        taskOfArr.forEach((task) => {
            let div = document.createElement("div"),
                p = document.createElement("p"),
                trash = document.createElement("i");
            // add Attr 
            div.classList.add("task");
            if (task.completed) {
                div.className = "task done";
            }
            div.setAttribute("data-id", task.id);
            p.textContent = task.title;
            p.classList.add("text");
            trash.className = "delete fa-regular fa-trash-can";
            // Append child 
            div.append(p, trash);
            result.appendChild(div);
        });
    }
    // -----------------
    // Add Task To Local
    function addTaskToLocalFrom(taskOfArr) {
        localStorage.setItem("tasks", JSON.stringify(taskOfArr));
    }
    // Get data From Local 
    function getDataFromLocal() {
        let data = localStorage.getItem("tasks");
        if (data) {
            let tasks = JSON.parse(data);
            addTaskToPageFrom(tasks);
        }
    }
    // Delete Task From local 
    function deleteTaskFromLocal(dataId) {
        arrTasks = arrTasks.filter((task) => task.id != dataId);
        addTaskToLocalFrom(arrTasks);
    }
    // Change Completed Status in local
    function changeCompletedInLocal(dataId) {
        for (let i = 0; i < arrTasks.length; i++) {
            if (arrTasks[i].id == dataId) {
                arrTasks[i].completed == false 
                ? (arrTasks[i].completed = true) 
                : (arrTasks[i].completed = false);
            }
        }
        addTaskToLocalFrom(arrTasks);
    }    
};
note();
// // ------------------------------------------------------------------