// const tex = document.querySelector(".todo-input");
// const btn_add = document.querySelector(".todo-button");
// const ul = document.querySelector(".todo-list");
// const deadlineInput = document.querySelector(".deadline-input");
// const timeInput = document.querySelector(".time-input");
// const commentInput = document.querySelector(".comment-input");
// const filterButtons = document.querySelectorAll(".filter-button");
// const counter = document.querySelector(".task-counter");
// const deleteAllButton = document.querySelector(".delete-all-button");
//
// let editingTask = null;
//
// // Загрузка задач из localStorage при загрузке страницы
// window.addEventListener("load", () => {
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     tasks.forEach((task, index) => {
//         addTaskToList(task.text, task.completed, index + 1, task.deadline, task.time, task.comment);
//     });
//     updateCounter();
// });
//
// // Добавление задачи
// btn_add.addEventListener("click", () => {
//     const text = tex.value;
//     const deadline = deadlineInput.value;
//     const time = timeInput.value;
//     const comment = commentInput.value;
//
//     if (text.trim() === '') return;
//
//     if (editingTask) {
//         editingTask.querySelector("span").textContent = text;
//         editingTask.querySelector(".deadline-display").textContent = deadline ? `Дедлайн: ${deadline} ${time}` : '';
//         editingTask.querySelector(".comment-display").textContent = comment || 'Комментарий отсутствует';
//         editingTask.dataset.deadline = deadline;
//         editingTask.dataset.time = time;
//         editingTask.dataset.comment = comment;
//         saveTasks();
//         editingTask = null;
//         resetForm();
//         return;
//     }
//
//     addTaskToList(text, false, ul.children.length + 1, deadline, time, comment);
//     resetForm();
//     saveTasks();
//     updateCounter();
// });
//
// // Добавить задачу в список
// function addTaskToList(text, completed = false, index, deadline, time, comment) {
//     const li = document.createElement("li");
//     const span = document.createElement("span");
//     span.textContent = `${index}. ${text}`;
//
//     const deadlineSpan = document.createElement("small");
//     deadlineSpan.textContent = deadline ? `Дедлайн: ${deadline} ${time}` : '';
//     deadlineSpan.classList.add("deadline-display");
//
//     const commentSpan = document.createElement("small");
//     commentSpan.textContent = comment || 'Комментарий отсутствует';
//     commentSpan.classList.add("comment-display");
//
//     const commentToggle = document.createElement("button");
//     commentToggle.textContent = "Показать комментарий";
//     commentToggle.classList.add("comment-toggle");
//
//     commentToggle.addEventListener("click", () => {
//         const isVisible = commentSpan.style.display === 'block';
//         commentSpan.style.display = isVisible ? 'none' : 'block';
//         commentToggle.textContent = isVisible ? 'Показать комментарий' : 'Скрыть комментарий';
//     });
//
//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.checked = completed;
//     checkbox.classList.add("task-checkbox");
//
//     li.dataset.deadline = deadline;
//     li.dataset.time = time;
//     li.dataset.comment = comment;
//
//     if (completed) li.classList.add("completed");
//
//     const deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "Удалить";
//     deleteBtn.classList.add("delete-button");
//
//     const editBtn = document.createElement("button");
//     editBtn.textContent = "Редактировать";
//     editBtn.classList.add("edit-button");
//
//     // Удаление задачи
//     deleteBtn.addEventListener("click", () => {
//         li.classList.add("fade-out");
//         setTimeout(() => {
//             li.remove();
//             saveTasks();
//             updateCounter();
//             renumberTasks();
//         }, 300);
//     });
//
//     // Редактирование задачи
//     editBtn.addEventListener("click", () => {
//         tex.value = span.textContent.split('. ')[1];
//         deadlineInput.value = li.dataset.deadline;
//         timeInput.value = li.dataset.time;
//         commentInput.value = li.dataset.comment;
//         tex.focus();
//         editingTask = li;
//         btn_add.textContent = 'Сохранить';
//     });
//
//     // Отметка задачи как выполненной
//     checkbox.addEventListener("change", () => {
//         li.classList.toggle("completed", checkbox.checked);
//         saveTasks();
//         updateCounter();
//     });
//
//     li.appendChild(checkbox);
//     li.appendChild(span);
//     li.appendChild(deadlineSpan);
//     li.appendChild(commentToggle);
//     li.appendChild(commentSpan);
//     li.appendChild(deleteBtn);
//     li.appendChild(editBtn);
//
//     ul.prepend(li);
//     renumberTasks();
// }
//
// // Перенумерация задач
// function renumberTasks() {
//     const tasks = Array.from(ul.querySelectorAll("li"));
//     tasks.reverse().forEach((li, index) => {
//         li.querySelector("span").textContent = `${index + 1}. ${li.querySelector("span").textContent.split('. ')[1]}`;
//     });
// }
//
// // Сохранение задач в localStorage
// function saveTasks() {
//     const tasks = Array.from(ul.querySelectorAll("li")).map(li => ({
//         text: li.querySelector("span").textContent.split('. ')[1],
//         completed: li.querySelector(".task-checkbox").checked,
//         deadline: li.dataset.deadline,
//         time: li.dataset.time,
//         comment: li.dataset.comment
//     }));
//     localStorage.setItem("tasks", JSON.stringify(tasks));
// }
//
// // Обновление счетчика задач
// function updateCounter() {
//     const activeTasks = ul.querySelectorAll("li:not(.completed)").length;
//     counter.textContent = `Осталось задач: ${activeTasks}`;
// }
//
// // Сброс формы
// function resetForm() {
//     tex.value = '';
//     deadlineInput.value = '';
//     timeInput.value = '';
//     commentInput.value = '';
//     btn_add.textContent = 'Добавить';
//     editingTask = null;
// }
//
// // Удаление всех задач
// deleteAllButton.addEventListener("click", () => {
//     if (confirm("Вы уверены, что хотите удалить все задачи?")) {
//         ul.innerHTML = '';
//         saveTasks();
//         updateCounter();
//     }
// });
