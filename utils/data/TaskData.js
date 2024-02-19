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

const updateTask = (taskId, payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const deleteTask = (taskId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/${taskId}`, {
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
