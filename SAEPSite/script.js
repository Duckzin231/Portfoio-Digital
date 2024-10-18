const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

function addTask(){
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const lii = document.createElement("lii");
        lii.innerHTML = `
            <span>${taskText}</span>
            <button class="editButton" onClick="editTask(this)">Editar</button>
            <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
        `;
        taskList.appendChild(lii);
        taskInput.value = "";
    }
}

function editTask(button) {
    const lii = button.parentElement;
    const span = lii.querySelector("span");
    const newText = prompt("Editar tarefa:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
    }
}

function deleteTask(button) {
    const lii = button.parentElement;
    taskList.removeChild(lii);
}