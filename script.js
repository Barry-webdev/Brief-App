const taskList = document.getElementById('task-list');
        const addTaskButton = document.getElementById('add-task');
        const searchTaskInput = document.getElementById('search-task');
        const resetButton = document.getElementById('reset-tasks');

        // Ajouter une tâche
        addTaskButton.addEventListener('click', function () {
            const taskText = document.getElementById('new-task').value.trim();
            const taskDeadline = document.getElementById('task-deadline').value;
            const taskCategory = document.getElementById('task-category').value;
            const taskPriority = document.getElementById('task-priority').value;

            if (taskText) {
                const taskItem = document.createElement('li');
                taskItem.classList.add('task');
                taskItem.dataset.priority = taskPriority;
                taskItem.dataset.category = taskCategory;
                taskItem.dataset.deadline = taskDeadline;

                const taskContent = document.createElement('div');
                taskContent.innerHTML = `<strong>${taskText}</strong> - ${taskCategory} - ${taskDeadline} - Priorité: ${taskPriority}`;

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.addEventListener('change', function () {
                    taskItem.classList.toggle('complete', checkbox.checked);
                });

                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
                deleteButton.addEventListener('click', function () {
                    taskList.removeChild(taskItem);
                });

                taskItem.appendChild(checkbox);
                taskItem.appendChild(taskContent);
                taskItem.appendChild(deleteButton);
                taskList.appendChild(taskItem);
            }
        });

        // Filtrer les tâches par mots-clés
        searchTaskInput.addEventListener('input', function () {
            const keyword = searchTaskInput.value.toLowerCase();
            Array.from(taskList.children).forEach(task => {
                const text = task.querySelector('div').textContent.toLowerCase();
                task.style.display = text.includes(keyword) ? '' : 'none';
            });
        });

        // Réinitialiser la liste
        resetButton.addEventListener('click', function () {
            localStorage.clear();
            taskList.innerHTML = '';
        });

        // Sauvegarder et charger les tâches
        function saveTasks() {
            const tasks = Array.from(taskList.children).map(task => ({
                text: task.querySelector('div').textContent,
                complete: task.classList.contains('complete'),
                priority: task.dataset.priority,
                category: task.dataset.category,
                deadline: task.dataset.deadline
            }));
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.forEach(taskData => {
                const taskItem = document.createElement('li');
                taskItem.classList.add('task');
                if (taskData.complete) taskItem.classList.add('complete');
                taskItem.dataset.priority = taskData.priority;
                taskItem.dataset.category = taskData.category;
                taskItem.dataset.deadline = taskData.deadline;

                const taskContent = document.createElement('div');
                taskContent.innerHTML = `<strong>${taskData.text}</strong>`;

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = taskData.complete;
                checkbox.addEventListener('change', function () {
                    taskItem.classList.toggle('complete', checkbox.checked);
                });

                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
                deleteButton.addEventListener('click', function () {
                    taskList.removeChild(taskItem);
                    saveTasks();
                });

                taskItem.appendChild(checkbox);
                taskItem.appendChild(taskContent);
                taskItem.appendChild(deleteButton);
                taskList.appendChild(taskItem);
            });
        }

        loadTasks();

        // Sauvegarde automatique
        window.addEventListener('beforeunload', saveTasks);