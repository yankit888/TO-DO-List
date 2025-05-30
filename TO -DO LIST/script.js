let pendingTasks = [];
let completedTasks = [];

function addTask() {
  const taskInput = document.getElementById('new-task');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    pendingTasks.push({ text: taskText, dateAdded: new Date().toLocaleString() });
    taskInput.value = '';
    renderTasks();
  }
}

function renderTasks() {
  const pendingTasksList = document.getElementById('pending-tasks');
  const completedTasksList = document.getElementById('completed-tasks');

  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  pendingTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${task.text} <span>(${task.dateAdded})</span> 
                    <button onclick="completeTask(${index})">Complete</button>
                    <button onclick="editTask(${index}, 'pending')">Edit</button>
                    <button onclick="deleteTask(${index}, 'pending')">Delete</button>`;
    pendingTasksList.appendChild(li);
  });

  completedTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('completed');
    li.innerHTML = `${task.text} <span>(${task.dateAdded})</span> 
                    <span>(Completed: ${task.dateCompleted})</span>
                    <button onclick="editTask(${index}, 'completed')">Edit</button>
                    <button onclick="deleteTask(${index}, 'completed')">Delete</button>`;
    completedTasksList.appendChild(li);
  });
}

function completeTask(index) {
  const task = pendingTasks.splice(index, 1)[0];
  task.dateCompleted = new Date().toLocaleString();
  completedTasks.push(task);
  renderTasks();
}

function deleteTask(index, type) {
  if (type === 'pending') {
    pendingTasks.splice(index, 1);
  } else {
    completedTasks.splice(index, 1);
  }
  renderTasks();
}

function editTask(index, type) {
  const newTaskText = prompt('Edit task:', type === 'pending' ? pendingTasks[index].text : completedTasks[index].text);
  if (newTaskText !== null && newTaskText.trim() !== '') {
    if (type === 'pending') {
      pendingTasks[index].text = newTaskText.trim();
    } else {
      completedTasks[index].text = newTaskText.trim();
    }
    renderTasks();
  }
}

renderTasks();
