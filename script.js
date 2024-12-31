// script.js
document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value;

    if (taskText.trim() !== '') {
        const taskList = document.getElementById('task-list');
        const newTask = document.createElement('li');
        
        const date = new Date();
        const formattedDate = date.toLocaleString();

        newTask.textContent = `${taskText} - ${formattedDate}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(newTask);
        });

        newTask.appendChild(deleteButton);
        taskList.appendChild(newTask);

        taskInput.value = '';
    }
});
