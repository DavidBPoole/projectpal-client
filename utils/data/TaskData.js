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

const createTask = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `${userId}`,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateTask = (payload, userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${userId}`,
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
