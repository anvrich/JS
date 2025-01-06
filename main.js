document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.querySelector(".todo-input");
    const ul = document.querySelector(".todo-list");
    const deadlineInput = document.querySelector(".deadline-input");
    const timeInput = document.querySelector(".time-input");
    const commentInput = document.querySelector(".comment-input");
    const btn_add = document.querySelector(".todo-button");
    const detailView = document.querySelector(".task-details-view");
    const todoContainer = document.querySelector(".todo-container");


    btn_add.addEventListener("click", () => {
        const taskText = textInput.value.trim();
        const deadline = deadlineInput.value;
        const time = timeInput.value;
        const comment = commentInput.value;

        if (taskText === "") return;

        const li = document.createElement("li");
        li.classList.add("task-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const span = document.createElement("span");
        span.textContent = `${ul.children.length + 1}) ${taskText}`;

        const commentToggle = document.createElement("button");
        commentToggle.textContent = 'Показать детали';
        commentToggle.classList.add("comment-toggle");

        commentToggle.addEventListener("click", () => {
            showTaskDetails(taskText, deadline, time, comment);
            detailView.classList.add("active");
            todoContainer.classList.add("expanded");
        });

        li.append(checkbox, span, commentToggle);
        ul.prepend(li);

        // Очистка полей
        textInput.value = "";
        deadlineInput.value = "";
        timeInput.value = "";
        commentInput.value = "";
    });

    function showTaskDetails(taskText, deadline, time, comment) {
        detailView.innerHTML = "";

        const taskTitle = document.createElement("h2");
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

        detailView.append(taskTitle, deadlineDisplay, commentDisplay, closeButton);
    }
});
