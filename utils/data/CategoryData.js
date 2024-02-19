import { clientCredentials } from '../client';

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories/${categoryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createCategory = (category) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateCategory = (categoryId, payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const deleteCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories/${categoryId}`, {
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
  getCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
