document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.querySelector(".todo-input");
    const ul = document.querySelector(".todo-list");
    const deadlineInput = document.querySelector(".deadline-input");
    const timeInput = document.querySelector(".time-input");
    const commentInput = document.querySelector(".comment-input");
    const btn_add = document.querySelector(".todo-button");
    const detailView = document.querySelector(".task-details-view");
    const todoContainer = document.querySelector(".todo-container");
    const btn_delete_all = document.querySelector(".delete-all-button");
    const filterButtons = document.querySelectorAll(".filter-button");
    const emptyMessage = document.querySelector(".empty-message");

    loadTasks();

    btn_add.addEventListener("click", () => {
        const taskText = textInput.value.trim();
        const deadline = deadlineInput.value;
        const time = timeInput.value;
        const comment = commentInput.value;

        if (taskText === "") return;

        const task = {
            id: Date.now(),
            text: taskText,
            deadline,
            time,
            comment,
            completed: false
        };

        addTaskToDOM(task);
        saveTask(task);

        textInput.value = "";
        deadlineInput.value = "";
        timeInput.value = "";
        commentInput.value = "";

        updateEmptyMessage();
    });

    btn_delete_all.addEventListener("click", () => {
        localStorage.removeItem("tasks");
        ul.innerHTML = "";

        detailView.innerHTML = "";
        detailView.classList.remove("active");
        todoContainer.classList.remove("expanded");
        updateTaskCounter();
        updateEmptyMessage();
    });

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");
            filterTasks(filter);
        });
    });

    function addTaskToDOM(task) {
        const li = document.createElement("li");
        li.classList.add("task-item");
        li.setAttribute("data-id", task.id);
        li.setAttribute("data-completed", task.completed);

        const taskContent = document.createElement("div");
        taskContent.classList.add("task-content");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            updateTaskInStorage(task);
            li.setAttribute("data-completed", task.completed);
        });

        const span = document.createElement("span");
        span.textContent = `${ul.children.length + 1}) ${task.text}`;

        const commentToggle = document.createElement("button");
        commentToggle.textContent = 'Показать детали';
        commentToggle.classList.add("comment-toggle");

        commentToggle.addEventListener("click", () => {
            showTaskDetails(task.text, task.deadline, task.time, task.comment, task.id);
            detailView.classList.add("active");
            todoContainer.classList.add("expanded");
        });

        taskContent.append(checkbox, span);
        li.append(taskContent, commentToggle);
        ul.prepend(li);
        updateTaskCounter();
    }

    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToDOM(task));
        updateEmptyMessage();
    }

    function updateTaskInStorage(updatedTask) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function showTaskDetails(taskText, deadline, time, comment, taskId) {
        detailView.innerHTML = "";

        const taskTitle = document.createElement("h3");
        taskTitle.textContent = taskText;

        const deadlineDisplay = document.createElement("p");
        deadlineDisplay.textContent = `Дедлайн: ${deadline || 'Нет'} ${time || ''}`;

        const commentDisplay = document.createElement("p");
        commentDisplay.textContent = comment || 'Комментарий отсутствует';

        const closeButton = document.createElement("button");
        closeButton.textContent = "Закрыть";
        closeButton.classList.add("close-button");

        closeButton.addEventListener("click", () => {
            detailView.classList.remove("active");
            todoContainer.classList.remove("expanded");
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить задачу";
        deleteBtn.classList.add("delete-button");

        deleteBtn.addEventListener("click", () => {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));

            const taskElement = document.querySelector(`.task-item[data-id="${taskId}"]`);
            if (taskElement) taskElement.remove();
            updateTaskCounter();
            updateEmptyMessage(); // Обновляем состояние сообщения

            detailView.classList.remove("active");
            todoContainer.classList.remove("expanded");
            detailView.innerHTML = "";
        });

        detailView.append(taskTitle, deadlineDisplay, commentDisplay, closeButton, deleteBtn);
    }

    function updateTaskCounter() {
        const taskCounter = document.querySelector(".task-counter");
        const taskCount = ul.children.length;
        taskCounter.textContent = `Осталось задач: ${taskCount}`;
    }

    function filterTasks(filter) {
        const tasks = document.querySelectorAll(".task-item");

        tasks.forEach(task => {
            const isCompleted = task.getAttribute("data-completed") === "true";

            if (filter === "all") {
                task.style.display = "";
            } else if (filter === "active") {
                task.style.display = isCompleted ? "none" : "";
            } else if (filter === "completed") {
                task.style.display = isCompleted ? "" : "none";
            }
        });
    }

    function updateEmptyMessage() {
        if (ul.children.length === 0) {
            emptyMessage.style.display = "block";
        } else {
            emptyMessage.style.display = "none";
        }
    }
});
