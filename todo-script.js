document.addEventListener('DOMContentLoaded', function() {
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const clearCompletedButton = document.getElementById('clearCompletedButton');
    const clearAllButton = document.getElementById('clearAllButton');

    // Function to add a new task
    function addTask() {
        const taskText = newTaskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create new list item (li)
        const listItem = document.createElement('li');

        // Create span for task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.addEventListener('click', toggleTaskCompleted); // Toggle completion on text click

        // Create div for buttons
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('task-buttons');

        // Create toggle (complete/uncomplete) button
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '&#10003;'; // Checkmark symbol
        toggleButton.classList.add('toggle-btn');
        toggleButton.title = 'Mark as complete/incomplete';
        toggleButton.addEventListener('click', toggleTaskCompleted);

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&times;'; // Multiplication sign (looks like an 'x')
        deleteButton.classList.add('delete-btn');
        deleteButton.title = 'Delete task';
        deleteButton.addEventListener('click', deleteTask);

        // Append elements
        buttonDiv.appendChild(toggleButton);
        buttonDiv.appendChild(deleteButton);
        listItem.appendChild(taskSpan);
        listItem.appendChild(buttonDiv);
        taskList.appendChild(listItem);

        // Clear input field
        newTaskInput.value = '';
        newTaskInput.focus(); // Keep focus on input for quick entry
    }

    // Function to toggle task completion
    function toggleTaskCompleted(event) {
        // Find the parent <li> element
        const listItem = event.target.closest('li');
        if (listItem) {
            listItem.classList.toggle('completed');
        }
    }

    // Function to delete a task
    function deleteTask(event) {
        // Find the parent <li> element and remove it
        const listItem = event.target.closest('li');
        if (listItem) {
            taskList.removeChild(listItem);
        }
    }

    // Function to clear all completed tasks
    function clearCompletedTasks() {
        const completedTasks = taskList.querySelectorAll('li.completed');
        if (completedTasks.length === 0) {
            alert('No completed tasks to clear!');
            return;
        }
        if (confirm('Are you sure you want to clear all completed tasks?')) {
            completedTasks.forEach(task => {
                taskList.removeChild(task);
            });
        }
    }

    // Function to clear all tasks
    function clearAllTasks() {
        if (taskList.children.length === 0) {
            alert('No tasks to clear!');
            return;
        }
        if (confirm('Are you sure you want to clear ALL tasks?')) {
            taskList.innerHTML = ''; // Clears all children of the ul
        }
    }

    // Event listeners
    addTaskButton.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    clearCompletedButton.addEventListener('click', clearCompletedTasks);
    clearAllButton.addEventListener('click', clearAllTasks);
});