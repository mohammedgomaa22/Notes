// ------------------------------------------------------------------
const note = () => {
    let inputText = document.querySelector(".notes .add .text"),
        addBtn = document.querySelector(".notes .add .add-task"),
        showTasks = document.querySelector(".notes .tasks"),
        arrTask = [];
    // ---------------------------------------
    // Add Task To Array
    function addTaskToArray(taskText) {
        let task = {
            id: Date.now(),
            title: taskText,
            complated: false,
        };
        arrTask.push(task);
    };
    // ---------------------------------------
    // Add Task To Page From Array
    function addTaskToPageFrom(arrTask) {
        showTasks.innerHTML = "";
        arrTask.forEach((task) => {
            // Create Task
            let div = document.createElement("div"),
                text = document.createElement("p"),
                deleteBtn = document.createElement("i");
            // Append Attributes
            div.className = "task";
            if (task.complated === true) {
                div.classList.add("done");
            }
            div.setAttribute("data-id", task.id);
            text.textContent = task.title;
            deleteBtn.className = "delete fa-regular fa-trash-can";
            // Append Child
            div.append(text, deleteBtn);
            showTasks.append(div);
            // ---------------------------------------
        });
    };
    // ---------------------------------------
    // Add Task To LocalStorage From Array
    function addTaskToLocalStorageFrom(arrTask) {
        localStorage.setItem("tasks", JSON.stringify(arrTask));
    };
    // ---------------------------------------
    // Add Click Event To Add Task (Add Task To Page And LocalStorage)
    addBtn.addEventListener("click", () => {
        if (inputText.value !== "") {
            addTaskToArray(inputText.value);
            addTaskToPageFrom(arrTask);
            addTaskToLocalStorageFrom(arrTask);    
        };
        inputText.value = "";
        inputText.focus();
    });
    // ---------------------------------------
    inputText.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            if (inputText.value !== "") {
                addTaskToArray(inputText.value);
                addTaskToPageFrom(arrTask);
                addTaskToLocalStorageFrom(arrTask);    
            };
            inputText.value = "";
            inputText.focus();
        }
    });
    // ---------------------------------------
    // Add Click Event To Delete And Complated Task (Remove Task From Page And LocalStorage)
    showTasks.addEventListener("click", (ev) => {
        if (ev.target.classList.contains("delete")) {
            deleteTaskWithDataId(ev.target.parentElement.getAttribute("data-id"));
            ev.target.parentElement.remove();
        };
        // Start More Style to Task
        if (ev.target.classList.contains("task")) {
            complateTaskWith(ev.target.getAttribute("data-id"));
            ev.target.classList.toggle("done");
        };
        // End More Style to Task            
    });
    // ---------------------------------------
    // Delete Task With data-id From Array And LocalStorage
    function deleteTaskWithDataId(idTask) {
        arrTask = arrTask.filter((task) => task.id != idTask);
        addTaskToLocalStorageFrom(arrTask);
    };
    // ---------------------------------------
    // Save Tasks To Page With LocalStorage
    function saveTasks() {
        if (localStorage.getItem("tasks")) {
            arrTask = JSON.parse(localStorage.getItem("tasks"));
            addTaskToPageFrom(arrTask);
        }
    };
    saveTasks();    
    // ---------------------------------------
    // Complate Task
    function complateTaskWith(idTask) {
        for (let i = 0; i < arrTask.length; i++) {
            if (arrTask[i].id == idTask) {
                arrTask[i].complated == false
                ? arrTask[i].complated = true
                : arrTask[i].complated = false;
            }
        }
        addTaskToLocalStorageFrom(arrTask);
    };
};
note();
// ------------------------------------------------------------------