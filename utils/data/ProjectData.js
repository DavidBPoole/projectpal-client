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
      console.warn('Projects Data:', data);
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
      console.warn('Projects Data:', data);
      resolve(data);
    })
    .catch(reject);
});

// const getProjectsForUser = (uid) => {
//   // Assuming you have a way to get the current user's ID or UID
//   fetch(`${clientCredentials.databaseURL}/projects/user_projects`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `${uid}`, // Add your authentication token if required
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.warn('User Projects Data:', data);
//       // Update state or perform other actions with the data
//     })
//     .catch((error) => {
//       console.error('Error fetching user projects:', error);
//     });
// };

// const getProjects = (uid) => new Promise((resolve, reject) => {
//   // const userId = encodeURIComponent(uid); // Encode the user ID
//   fetch(`${clientCredentials.databaseURL}/projects?user=${uid}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `${uid}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.warn('Projects Data:', data); // Log the data to the console
//       resolve(data);
//     })
//     .catch(reject);
// });

const getSingleProject = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/projects/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// const createProject = (payload, uid) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/projects`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `${uid}`,
//     },
//     body: JSON.stringify(payload),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       resolve(data);
//     })
//     .catch((error) => {
//       console.error('Create Project Error:', error);
//       reject(error);
//     });
// });

// const createProject = (payload, uid) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/projects`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `${uid}`,
//     },
//     body: JSON.stringify(payload),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then((data) => {
//       resolve(data);
//     })
//     .catch((error) => {
//       console.error('Create Project Error:', error);
//       reject(error);
//     });
// });

// const createProject = (payload) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/projects`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

const createProject = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `${uid}`, not needed? still works
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
      resolve(data.id); // Return the ID of the created project
    })
    .catch((error) => {
      console.error('Create Project Error:', error);
      reject(error);
    });
});

const updateProject = (payload, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/projects/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
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

// // Functions to add and remove tasks from projects :
// const addTaskCategory = (projectId, taskId) => fetch(`${clientCredentials.databaseURL}/projects/${projectId}/add_task_category/${taskId}`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// }).then((response) => response.json());

// const removeTaskCategory = (projectId, projectTaskId) => fetch(`${clientCredentials.databaseURL}/projects/${projectId}/remove_task_category/${projectTaskId}`, {
//   method: 'DELETE',
// }).then(() => {});

export {
  getProjects,
  getUserProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};
