import { clientCredentials } from '../client';

const getSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${uid}`, {
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

const updateUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

// const updateUser = (payload) => new Promise((resolve, reject) => {
//   console.warn('Updating user with data:', payload); // Debug statement
//   fetch(`${clientCredentials.databaseURL}/users/${payload.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   })
//     .then((response) => {
//       // Check if the response is successful (status code 2xx)
//       if (response.ok) {
//         console.warn('User updated successfully!'); // Debug statement
//         resolve(response.json()); // Parse JSON and resolve the promise
//       } else {
//         // If the response is not successful, reject with an error
//         console.error('Error updating user:', response.status, response.statusText); // Debug statement
//         reject(response.statusText);
//       }
//     })
//     .catch((error) => {
//       console.error('Error updating user:', error); // Debug statement
//       reject(error);
//     });
// });

const deleteUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${id}`, {
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
  getSingleUser,
  updateUser,
  deleteUser,
};
