import { clientCredentials } from '../client';

const getProjects = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

const getUserProjects = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/projects?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${userId}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

const getSingleProject = (projectId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/projects/${projectId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch project: ${response.status}`);
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

function createProject(payload) {
  return new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        resolve(data.id);
      })
      .catch((error) => {
        console.error('Create Project Error:', error);
        reject(error);
      });
  });
}

const updateProject = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/projects/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const deleteProject = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/projects/${id}`, {
    method: 'DELETE',
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
  getProjects,
  getUserProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};
