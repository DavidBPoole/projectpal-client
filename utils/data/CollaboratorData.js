import { clientCredentials } from '../client';

const getCollaborators = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/collaborators`, {
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

const getProjectCollaborators = (projectId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/collaborators?projectId=${projectId}`, {
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

const joinProject = (projectId, userId) => new Promise((resolve, reject) => {
  console.warn('Joining project:', projectId, 'User ID:', userId); // Logging for debugging
  fetch(`${clientCredentials.databaseURL}/collaborators/${projectId}/join_project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: userId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to join project');
      }
      resolve();
    })
    .catch(reject);
});

const leaveProject = (projectId, userId) => new Promise((resolve, reject) => {
  console.warn('Leaving project:', projectId, 'User ID:', userId); // Logging for debugging
  fetch(`${clientCredentials.databaseURL}/collaborators/${projectId}/leave_project`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: userId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to leave project');
      }
      resolve();
    })
    .catch(reject);
});

const removeCollaborator = (projectId, userId, collaboratorId) => new Promise((resolve, reject) => {
  const requestData = {
    userId,
    collaborator: collaboratorId,
  };

  fetch(`${clientCredentials.databaseURL}/collaborators/${projectId}/remove_collaborator`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to remove collaborator');
      }
      resolve();
    })
    .catch(reject);
});

export {
  getCollaborators,
  getProjectCollaborators,
  joinProject,
  leaveProject,
  removeCollaborator,
};
