// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { createTask, updateTask } from '../utils/data/TaskData';
// import { getSingleProject } from '../utils/data/ProjectData';
// import { useAuth } from '../utils/context/authContext';
// import { getAllCategories } from '../utils/data/CategoryData';

// const initialState = {
//   name: '',
//   description: '',
//   priority: '',
//   status: '',
//   project: '',
//   categories: [], // Add a property to store selected categories
// };

// // const categoryShape = PropTypes.shape({
// //   id: PropTypes.number.isRequired,
// //   name: PropTypes.string.isRequired,
// //   // Add other properties if needed
// // });

// function TaskForm({ taskObj }) {
//   const [currentTask, setCurrentTask] = useState({
//     ...initialState,
//     categories: [], // Initialize categories as an empty array
//   });
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const router = useRouter();
//   const { user } = useAuth();
//   const { projectId } = router.query;

//   useEffect(() => {
//     // Fetch all categories
//     getAllCategories().then(setCategories);
//     // Fetch project details based on projectId
//     // console.warn(projectId);
//     if (projectId) {
//       getSingleProject(projectId)
//         // eslint-disable-next-line no-unused-vars
//         .then((response) => {
//           // You can use 'response.data' here if needed
//         })
//         .catch((error) => {
//           console.error('Error fetching project details:', error);
//         });
//     }

//     // Update currentTask when taskObj or projectId changes
//     if (taskObj.id) {
//       setCurrentTask({
//         id: taskObj.id,
//         name: taskObj.name,
//         description: taskObj.description,
//         priority: taskObj.priority,
//         status: taskObj.status,
//         project: projectId,
//         categories: taskObj.categories.map((category) => category.id) || [], // Initialize as an empty array if undefined
//         // categories: taskObj.categories.map((category) => category.id), // Store category IDs
//       });
//       // Set selected categories
//       const categoryIds = taskObj.categories.map((category) => category.id);
//       setSelectedCategories(categoryIds);
//     } else {
//       setCurrentTask((prevState) => ({
//         ...prevState,
//         categories: taskObj.categories || [], // Initialize as an empty array if undefined
//       }));
//     }
//   }, [taskObj, projectId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentTask((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleCategoryCheckChange = (categoryId) => {
//     setSelectedCategories((prevCategories) => {
//       if (prevCategories.includes(categoryId)) {
//         return prevCategories.filter((id) => id !== categoryId);
//       }
//       return [...prevCategories, categoryId];
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (currentTask.id) {
//       const payload = {
//         id: currentTask.id,
//         name: currentTask.name,
//         description: currentTask.description,
//         priority: currentTask.priority,
//         status: currentTask.status,
//         project: projectId,
//         categories: selectedCategories,
//       };

//       updateTask(payload)
//         .then(() => router.push(`/projects/${projectId}`))
//         .catch((error) => console.error(error));
//     } else {
//       const payload = {
//         ...currentTask,
//         project: projectId,
//       };

//       createTask(payload, user.userId, projectId)
//         .then(() => router.push(`/projects/${projectId}`))
//         .catch((error) => console.error(error));
//     }
//   };

//   // ALTERNATE HANDLE SUBMIT:
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const payload = {
//   //     ...currentTask,
//   //     project: projectId,
//   //   };
//   //   // Send POST or PUT request to your API
//   //   if (currentTask.id) {
//   //     updateTask(payload)
//   //       .then(() => router.push(`/projects/${projectId}`))
//   //       .catch((error) => console.error(error));
//   //   } else {
//   //     createTask(payload, user.userId, projectId)
//   //       .then(() => router.push(`/projects/${projectId}`))
//   //       .catch((error) => console.error(error));
//   //   }
//   // };
//   return (
//     <>
//       <h2 className="form-header">{taskObj.id ? 'Update Task' : 'Create Task'}</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label className="form-text">Task Name</Form.Label>
//           <Form.Control name="name" placeholder="enter task name" required value={currentTask.name} onChange={handleChange} />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label className="form-text">Task Description</Form.Label>
//           <Form.Control name="description" placeholder="enter task description" required value={currentTask.description} onChange={handleChange} />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label className="form-text">Priority</Form.Label>
//           <Form.Select name="priority" required value={currentTask.priority} onChange={handleChange}>
//             <option value="">Select Task Priority</option>
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </Form.Select>
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label className="form-text">Task Status</Form.Label>
//           <Form.Select name="status" required value={currentTask.status} onChange={handleChange}>
//             <option value="">Select Task Status</option>
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Completed">Completed</option>
//           </Form.Select>
//         </Form.Group>
//         {categories.map((category) => (
//           <div key={category.id} className="mb-3">
//             <Form.Check
//               // key={category.id}
//               type="checkbox"
//               id={category.id}
//               label={category.name}
//               checked={selectedCategories.includes(category.id)}
//               onChange={() => handleCategoryCheckChange(category.id)}
//             />
//           </div>
//         ))}
//         <Button variant="primary" type="submit">
//           {taskObj.id ? 'Update Task' : 'Create Task'}
//         </Button>
//       </Form>
//     </>
//   );
// }

// TaskForm.defaultProps = {
//   taskObj: {
//     id: undefined,
//     name: '',
//     description: '',
//     priority: '',
//     status: '',
//     categories: [], // Default to an empty array for categories
//   },
// };

// TaskForm.propTypes = {
//   taskObj: PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     priority: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     // categories: PropTypes.arrayOf(PropTypes.number).isRequired, // Change this to PropTypes.arrayOf(PropTypes.number)
//     categories: PropTypes.arrayOf(PropTypes.string).isRequired,
//   }),
// };

// export default TaskForm;

// 2nd attempt:
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { createTask, updateTask } from '../utils/data/TaskData';
// import { getSingleProject } from '../utils/data/ProjectData';
// // import { useAuth } from '../utils/context/authContext';
// import { getAllCategories } from '../utils/data/CategoryData';

// const initialState = {
//   name: '',
//   description: '',
//   priority: '',
//   status: '',
//   project: '',
//   categories: [],
// };

// function TaskForm({ taskObj }) {
//   const [task, setTask] = useState({
//     ...initialState,
//   });
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const router = useRouter();
//   // const { user } = useAuth();
//   const { projectId } = router.query;

//   const categoriesIdFromTask = (arry) => {
//     const categoryArry = Array.isArray(arry) ? arry.map((category) => category.id) : [];
//     setSelectedCategories(categoryArry);
//   };

//   useEffect(() => {
//     getAllCategories().then(setCategories);
//     if (taskObj) {
//       setTask(taskObj);
//       categoriesIdFromTask(taskObj.categories || []);
//     }
//   }, [taskObj]);

//     if (taskObj.id) {
//       setTask({
//         id: taskObj.id,
//         name: taskObj.name,
//         description: taskObj.description,
//         priority: taskObj.priority,
//         status: taskObj.status,
//         project: projectId,
//       });

//       const categoryIds = taskObj.categories.map((category) => category.id);
//       setSelectedCategories(categoryIds);
//     }
//   }, [taskObj, projectId];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTask((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleCategoryCheckChange = (categoryId) => {
//     setSelectedCategories((prevCategories) => {
//       if (prevCategories.includes(categoryId)) {
//         return prevCategories.filter((id) => id !== categoryId);
//       }
//       return [...prevCategories, categoryId];
//     });
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   const payload = {
//   //     id: task.id,
//   //     name: task.name,
//   //     description: task.description,
//   //     priority: task.priority,
//   //     status: task.status,
//   //     project: projectId,
//   //     categories: selectedCategories,
//   //   };

//   //   if (task.id) {
//   //     updateTask({ ...task, categories: selectedCategories }).then(() => router.push(`/projects/${projectId}`));
//   //   } else {
//   //     createTask(payload).then(() => router.push(`/projects/${projectId}`));
//   //   }
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const payload = {
//       id: task.id,
//       name: task.name,
//       description: task.description,
//       priority: task.priority,
//       status: task.status,
//       project: projectId,
//       categories: selectedCategories, // Make sure this contains only category IDs
//     };

//     if (task.id) {
//       updateTask(payload)
//         .then(() => router.push(`/projects/${projectId}`))
//         .catch((error) => console.error('Error updating task:', error));
//     } else {
//       createTask(payload)
//         .then(() => router.push(`/projects/${projectId}`))
//         .catch((error) => console.error('Error creating task:', error));
//     }
//   };

//   return (
//     <>
//       <h2 className="form-header">{taskObj.id ? 'Update Task' : 'Create Task'}</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label className="form-text">Task Name</Form.Label>
//           <Form.Control name="name" placeholder="enter task name" required value={task.name} onChange={handleChange} />

//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label className="form-text">Task Description</Form.Label>
//           <Form.Control name="description" placeholder="enter task description" required value={task.description} onChange={handleChange} />

//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label className="form-text">Priority</Form.Label>
//           <Form.Select name="priority" required value={task.priority} onChange={handleChange}>
//             <option value="">Select Task Priority</option>
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>

//           </Form.Select>

//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label className="form-text">Task Status</Form.Label>
//           <Form.Select name="status" required value={task.status} onChange={handleChange}>
//             <option value="">Select Task Status</option>
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Completed">Completed</option>

//           </Form.Select>

//         </Form.Group>
//         {categories.map((category) => (
//           <div key={category.id} className="mb-3">
//             <Form.Check
//               type="checkbox"
//               id={category.id}
//               label={category.name}
//               checked={selectedCategories.includes(category.id)}
//               onChange={() => handleCategoryCheckChange(category.id)}
//             />
//           </div>
//         ))}
//         <Button variant="primary" type="submit">
//           {taskObj.id ? 'Update Task' : 'Create Task'}
//         </Button>
//       </Form>
//     </>
//   );
// }

// TaskForm.defaultProps = {
//   taskObj: {
//     id: undefined,
//     name: '',
//     description: '',
//     priority: '',
//     status: '',
//     categories: [],
//   },
// };

// TaskForm.propTypes = {
//   taskObj: PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     priority: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     categories: PropTypes.oneOfType([
//       PropTypes.arrayOf(
//         PropTypes.shape({
//           id: PropTypes.number,
//           name: PropTypes.string,
//         }),
//       ),
//       PropTypes.arrayOf(PropTypes.string),
//     ]).isRequired,
//   }),
// };

// export default TaskForm;

import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createTask, updateTask } from '../utils/data/TaskData';
import { getAllCategories } from '../utils/data/CategoryData';

const initialState = {
  name: '',
  description: '',
  priority: '',
  status: '',
  project: '',
  categories: [],
};

function TaskForm({ taskObj }) {
  const [task, setTask] = useState({ ...initialState });
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const router = useRouter();
  const { projectId } = router.query;

  const categoriesIdFromTask = (arry) => {
    const categoryArry = Array.isArray(arry) ? arry.map((category) => category.id) : [];
    setSelectedCategories(categoryArry);
  };

  useEffect(() => {
    getAllCategories().then(setCategories);
    if (taskObj) {
      setTask(taskObj);
      categoriesIdFromTask(taskObj.categories || []);
    }
  }, [taskObj, projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryCheckChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = [...prevCategories];

      // Check if categoryId is already in the array, if yes, remove it; if not, add it
      if (categoryId === undefined) {
        // Exclude undefined values
        return updatedCategories.filter((id) => id !== undefined);
      }

      if (updatedCategories.includes(categoryId)) {
        return updatedCategories.filter((id) => id !== categoryId);
      }

      return [...updatedCategories, categoryId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: task.id,
      name: task.name,
      description: task.description,
      priority: task.priority,
      status: task.status,
      project: projectId,
      categories: selectedCategories.filter((categoryId) => categoryId !== null), // Filter out null values
    };

    if (task.id) {
      updateTask(payload)
        .then(() => router.push(`/projects/${projectId}`))
        .catch((error) => console.error('Error updating task:', error));
    } else {
      createTask(payload)
        .then(() => router.push(`/projects/${projectId}`))
        .catch((error) => console.error('Error creating task:', error));
    }
  };

  return (
    <>
      <h2 className="form-header">{taskObj.id ? 'Update Task' : 'Create Task'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Task Name</Form.Label>
          <Form.Control name="name" placeholder="enter task name" required value={task.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Task Description</Form.Label>
          <Form.Control name="description" placeholder="enter task description" required value={task.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Priority</Form.Label>
          <Form.Select name="priority" required value={task.priority} onChange={handleChange}>
            <option value="">Select Task Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Task Status</Form.Label>
          <Form.Select name="status" required value={task.status} onChange={handleChange}>
            <option value="">Select Task Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </Form.Group>
        {categories.map((category) => (
          <div key={category.id} className="mb-3">
            <Form.Check
              type="checkbox"
              id={category.id}
              label={category.name}
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryCheckChange(category.id)}
            />
          </div>
        ))}
        <Button variant="primary" type="submit">
          {taskObj.id ? 'Update Task' : 'Create Task'}
        </Button>
      </Form>
    </>
  );
}

TaskForm.defaultProps = {
  taskObj: {
    id: undefined,
    name: '',
    description: '',
    priority: '',
    status: '',
    categories: [],
  },
};

TaskForm.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    categories: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      ),
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  }),
};

export default TaskForm;
