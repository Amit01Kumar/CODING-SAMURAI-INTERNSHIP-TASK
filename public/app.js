// public/app.js
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const deletedTasks = []; // Array to store deleted tasks

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const li = createTaskElement(taskText);
    taskList.appendChild(li);
    taskInput.value = '';
  }
}

function createTaskElement(taskText) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed', checkbox.checked);
  });

  const span = document.createElement('span');
  span.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deleteTask(li);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);

  return li;
}

function deleteTask(taskElement) {
  deletedTasks.push(taskElement.outerHTML);
  taskElement.remove();
}

/*function deleteCompletedTasks() {
  const completedTasks = document.querySelectorAll('.completed');
  completedTasks.forEach(task => {
    deletedTasks.push(task.outerHTML);
    task.remove();
  });
}*/

/*function undoDelete() {
  if (deletedTasks.length > 0) {
    const lastDeletedTask = deletedTasks.pop();
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = lastDeletedTask;
    const restoredTask = tempContainer.firstChild;

    // Remove the "completed" class to unstrike the task
    restoredTask.classList.remove('completed');

    const restoredDeleteButton = restoredTask.querySelector('button');
    restoredDeleteButton.addEventListener('click', () => {
      deleteTask(restoredTask);
    });

    taskList.insertAdjacentElement('beforeend', restoredTask);
  }
}*/
function deleteCompletedTasks() {
  const completedTasks = document.querySelectorAll('.completed');
  completedTasks.forEach(task => {
    deletedTasks.push(task.outerHTML);
    task.remove();
  });
}

function undoDelete() {
  if (deletedTasks.length > 0) {
    const lastDeletedTask = deletedTasks.pop();
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = lastDeletedTask;
    const restoredTask = tempContainer.firstChild;

    const restoredDeleteButton = restoredTask.querySelector('button');
    restoredDeleteButton.addEventListener('click', () => {
      deleteTask(restoredTask);
    });

    taskList.insertAdjacentElement('beforeend', restoredTask);
  }
}