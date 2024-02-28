import { clientCredentials } from '../client';

const getTasks = (projectId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks?project=${projectId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleTask = (taskId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/${taskId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createTask = (task) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateTask = (task) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then(resolve)
    .catch(reject);
});

const deleteTask = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resolve();
    })
    .catch(reject);
});

export {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
