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
// deleteAllButton.addEventListener("click", () => {
//     ul.innerHTML = '';  // Удаляет все задачи из списка
//     saveTasks();        // Сохраняет пустой список в localStorage
//     updateCounter();    // Обновляет счетчик задач
//
// });
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
//     const text = tex.value.trim();
//     const deadline = deadlineInput.value;
//     const time = timeInput.value;
//     const comment = commentInput.value.trim();
//
//     if (!text) return;
//
//     if (editingTask) {
//         updateTask(editingTask, text, deadline, time, comment);
//     } else {
//         addTaskToList(text, false, ul.children.length + 1, deadline, time, comment);
//     }
//
//     resetForm();
//     saveTasks();
//     updateCounter();
// });
//
// // Добавить задачу в список
// function addTaskToList(text, completed = false, index, deadline, time, comment) {
//     const li = document.createElement("li");
//     li.classList.add("task-item");
//
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
//     commentSpan.style.display = "none";
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
//     checkbox.addEventListener("change", () => {
//         li.classList.toggle("completed", checkbox.checked);
//         saveTasks();
//         updateCounter();
//     });
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
//     deleteBtn.addEventListener("click", () => deleteTask(li));
//
//     const editBtn = document.createElement("button");
//     editBtn.textContent = "Редактировать";
//     editBtn.classList.add("edit-button");
//     editBtn.addEventListener("click", () => editTask(li, text, deadline, time, comment));
//
//     li.append(checkbox, span, deadlineSpan, commentToggle, commentSpan, deleteBtn, editBtn);
//     ul.prepend(li);
//     renumberTasks();
// }
//
// // Удаление задачи
// function deleteTask(task) {
//     task.classList.add("fade-out");
//     setTimeout(() => {
//         task.remove();
//         saveTasks();
//         updateCounter();
//         renumberTasks();
//     }, 300);
// }
//
// // Редактирование задачи
// function editTask(task, text, deadline, time, comment) {
//     tex.value = text;
//     deadlineInput.value = deadline;
//     timeInput.value = time;
//     commentInput.value = comment;
//     tex.focus();
//     editingTask = task;
//     btn_add.textContent = 'Сохранить';
// }
//
// // Обновление существующей задачи
// function updateTask(task, text, deadline, time, comment) {
//     task.querySelector("span").textContent = `${Array.from(ul.children).indexOf(task) + 1}. ${text}`;
//     task.querySelector(".deadline-display").textContent = deadline ? `Дедлайн: ${deadline} ${time}` : '';
//     task.querySelector(".comment-display").textContent = comment || 'Комментарий отсутствует';
//     task.dataset.deadline = deadline;
//     task.dataset.time = time;
//     task.dataset.comment = comment;
//     editingTask = null;
//     btn_add.textContent = 'Добавить';
// }
//
// // Сохранение задач в localStorage
// function saveTasks() {
//     const tasks = Array.from(ul.children).map(li => ({
//         text: li.querySelector("span").textContent.split('. ')[1],
//         completed: li.querySelector(".task-checkbox").checked,
//         deadline: li.dataset.deadline,
//         time: li.dataset.time,
//         comment: li.dataset.comment
//     }));
//     localStorage.setItem("tasks", JSON.stringify(tasks));
// }
//
// // Обновление счетчика
// function updateCounter() {
//     const activeTasks = ul.querySelectorAll("li:not(.completed)").length;
//     counter.textContent = `Осталось задач: ${activeTasks}`;
// }
//
// // Фильтрация задач
// filterButtons.forEach(button => {
//     button.addEventListener("click", () => {
//         const filter = button.dataset.filter;
//         ul.querySelectorAll("li").forEach(task => {
//             switch (filter) {
//                 case "all":
//                     task.style.display = "flex";
//                     break;
//                 case "active":
//                     task.style.display = task.classList.contains("completed") ? "none" : "flex";
//                     break;
//                 case "completed":
//                     task.style.display = task.classList.contains("completed") ? "flex" : "none";
//                     break;
//             }
//         });
//     });
// });
//
// // Сброс формы
// function resetForm() {
//     tex.value = '';
//     deadlineInput.value = '';
//     timeInput.value = '';
//     commentInput.value = '';
//     editingTask = null;
//     btn_add.textContent = 'Добавить';
// }
//
// // Перенумерация задач в списке
// function renumberTasks() {
//     const tasks = Array.from(ul.querySelectorAll("li"));
//     tasks.forEach((li, index) => {
//         const span = li.querySelector("span");
//         span.textContent = `${index + 1}. ${span.textContent.split('. ')[1]}`;
//     });
// }
