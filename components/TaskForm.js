// 1
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { createTask, updateTask } from '../utils/data/TaskData';
// // import { useAuth } from '../utils/context/authContext';

// const initialState = {
//   name: '',
//   description: '',
//   priority: '',
//   status: '',
//   project: 0,
// };

// const TaskForm = ({ taskObj, projectid }) => {
//   const [currentTask, setCurrentTask] = useState(initialState);
//   const router = useRouter();
//   // const { user } = useAuth();
//   console.warn(projectid);

//   useEffect(() => {
//     if (taskObj.id) {
//       setCurrentTask({
//         id: taskObj.id,
//         name: taskObj.name || '',
//         description: taskObj.description || '',
//         priority: taskObj.priority || '',
//         status: taskObj.status || '',
//         project: projectid,
//       });
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [taskObj, projectid]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentTask((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   if (currentTask.id) {
//   //     const payload = {
//   //       id: currentTask.id,
//   //       name: currentTask.name,
//   //       description: currentTask.description,
//   //       priority: currentTask.priority,
//   //       status: currentTask.status,
//   //     };
//   //     updateTask(payload, user.uid)
//   //       .then(() => router.push(`/projects/${currentTask.id}`)); // Use the project ID
//   //   } else {
//   //     const payload = { ...currentTask };
//   //     createTask(payload)
//   //       .then(() => router.push(`/projects/${currentTask.id}`)); // Use the project ID
//   //   }
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (currentTask.id) {
//       // Update an existing task
//       const payload = {
//         id: currentTask.id,
//         name: currentTask.name,
//         description: currentTask.description,
//         priority: currentTask.priority,
//         status: currentTask.status,
//         project: projectid,
//       };
//       updateTask(payload)
//         .then(() => router.push(`/projects/${projectid}`))
//         .catch((error) => console.error(error));
//     } else {
//       // Create a new task
//       const payload = {
//         ...currentTask,
//         project: projectid,
//       };
//       createTask(payload)
//         .then(() => router.push(`/projects/${projectid}`))
//         .catch((error) => console.error(error));
//     }
//   };

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
//         <Button variant="primary" type="submit">
//           {taskObj.id ? 'Update Task' : 'Create Task'}
//         </Button>
//       </Form>
//     </>
//   );
// };

// TaskForm.propTypes = {
//   taskObj: PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string,
//     description: PropTypes.string,
//     priority: PropTypes.string,
//     status: PropTypes.string,
//     projectid: PropTypes.number,
//   }),
//   // project: PropTypes.shape({
//   //   id: PropTypes.number,
//   //   // Add any other project prop types as needed
//   // }),
// };

// TaskForm.defaultProps = {
//   taskObj: initialState,
// };

// export default TaskForm;

// 2
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { createTask, updateTask } from '../utils/data/TaskData';
// import { useAuth } from '../utils/context/authContext';

// const TaskForm = ({ taskObj, projectObj }) => {
//   const [currentTask, setCurrentTask] = useState({
//     name: '',
//     description: '',
//     priority: '',
//     status: '',
//   });
//   const router = useRouter();
//   const { user } = useAuth();

//   useEffect(() => {
//     if (taskObj.id) {
//       setCurrentTask({
//         id: taskObj.id,
//         name: taskObj.name || '',
//         description: taskObj.description || '',
//         priority: taskObj.priority || '',
//         status: taskObj.status || '',
//         // project: projectObj.id,
//       });
//     }
//   }, [taskObj, projectObj.id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentTask((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.warn('Project ID:', projectObj.id); // Log the project ID
//     if (currentTask.id) {
//       // Update an existing task
//       const payload = {
//         id: currentTask.id,
//         name: currentTask.name,
//         description: currentTask.description,
//         priority: currentTask.priority,
//         status: currentTask.status,
//         projectObj,
//       };
//       updateTask(payload, user.uid)
//         .then(() => router.push(`/projects/${projectObj.id}`))
//         .catch((error) => console.error(error));
//     } else {
//       // Create a new task
//       const payload = {
//         ...currentTask,
//         project: projectObj.id || null,
//       };
//       createTask(payload)
//         .then(() => router.push(`/projects/${projectObj.id}`))
//         .catch((error) => console.error(error));
//     }
//   };
//   // const isProjectIdValid = projectObj.id > 0; // Adjust this condition based on your project ID logic
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
//         <Button variant="primary" type="submit">
//           {taskObj.id ? 'Update Task' : 'Create Task'}
//         </Button>
//       </Form>
//     </>
//   );
// };

// TaskForm.propTypes = {
//   taskObj: PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string,
//     description: PropTypes.string,
//     priority: PropTypes.string,
//     status: PropTypes.string,
//     projectObj: PropTypes.number,
//   }),
//   projectObj: PropTypes.shape({
//     id: PropTypes.number,
//   // Add any other project prop types as needed
//   }),
// };

// TaskForm.defaultProps = {
//   taskObj: {
//     id: 0,
//     name: '',
//     description: '',
//     priority: '',
//     status: '',
//     project: 0,
//   },
//   projectObj: {
//     id: 0,
//   // Add default values for other project prop types as needed
//   },
// };

// export default TaskForm;

// 3
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { createTask, updateTask } from '../utils/data/TaskData';

// const initialState = {
//   name: '',
//   description: '',
//   priority: '',
//   status: '',
//   project: 0,
// };

// const TaskForm = ({ taskObj, projectid }) => {
//   const [currentTask, setCurrentTask] = useState(initialState);
//   const router = useRouter();
//   console.warn(projectid);

//   useEffect(() => {
//     if (taskObj.id) {
//       setCurrentTask({
//         id: taskObj.id,
//         name: taskObj.name || '',
//         description: taskObj.description || '',
//         priority: taskObj.priority || '',
//         status: taskObj.status || '',
//         project: projectid,
//       });
//     }
//   }, [taskObj, projectid]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentTask((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (currentTask.id) {
//       // Update an existing task
//       const payload = {
//         id: currentTask.id,
//         name: currentTask.name,
//         description: currentTask.description,
//         priority: currentTask.priority,
//         status: currentTask.status,
//         project: projectid,
//       };
//       updateTask(payload)
//         .then(() => router.push(`/projects/${projectid}`))
//         .catch((error) => console.error(error));
//     } else {
//       // Create a new task
//       const payload = {
//         ...currentTask,
//         project: projectid,
//       };
//       createTask(payload)
//         .then(() => router.push(`/projects/${projectid}`))
//         .catch((error) => console.error(error));
//     }
//   };

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
//         <Button variant="primary" type="submit">
//           {taskObj.id ? 'Update Task' : 'Create Task'}
//         </Button>
//       </Form>
//     </>
//   );
// };

// TaskForm.propTypes = {
//   taskObj: PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string,
//     description: PropTypes.string,
//     priority: PropTypes.string,
//     status: PropTypes.string,
//     project: PropTypes.number,
//   }),
//   projectid: PropTypes.number.isRequired,
// };

// TaskForm.defaultProps = {
//   taskObj: initialState,
// };

// export default TaskForm;

// 4
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createTask, updateTask } from '../utils/data/TaskData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  name: '',
  description: '',
  priority: '',
  status: '',
  // project: '', // No need for project?.id || ''
};

const TaskForm = ({ taskObj }) => {
  const [currentTask, setCurrentTask] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (taskObj.id) {
      setCurrentTask({
        id: taskObj.id,
        name: taskObj.name,
        description: taskObj.description,
        priority: taskObj.priority,
        status: taskObj.status,
        project: taskObj.project || '', // Handle the project ID if available
      });
    }
  }, [taskObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentTask.id) {
      // Update an existing task
      const payload = {
        id: currentTask.id,
        name: currentTask.name,
        description: currentTask.description,
        priority: currentTask.priority,
        status: currentTask.status,
        project: currentTask.project, // Use currentTask.project here
      };

      updateTask(payload, user.uid)
        .then(() => router.push(`/projects/${currentTask.project}`))
        .catch((error) => console.error(error));
    } else {
      // Create a new task
      const payload = {
        ...currentTask,
        project: currentTask.project || null, // Include the project ID or default to null
      };

      createTask(payload)
        .then(() => router.push(`/projects/${payload.project}`))
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <h2 className="form-header">{taskObj.id ? 'Update Task' : 'Create Task'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Task Name</Form.Label>
          <Form.Control name="name" placeholder="enter task name" required value={currentTask.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Task Description</Form.Label>
          <Form.Control name="description" placeholder="enter task description" required value={currentTask.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Priority</Form.Label>
          <Form.Select name="priority" required value={currentTask.priority} onChange={handleChange}>
            <option value="">Select Task Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Task Status</Form.Label>
          <Form.Select name="status" required value={currentTask.status} onChange={handleChange}>
            <option value="">Select Task Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          {taskObj.id ? 'Update Task' : 'Create Task'}
        </Button>
      </Form>
    </>
  );
};

TaskForm.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
    status: PropTypes.string,
    project: PropTypes.string, // Change project type to string
  }),
  project: PropTypes.shape({
    id: PropTypes.number,
    // Add any other project prop types as needed
  }),
};

TaskForm.defaultProps = {
  taskObj: initialState,
  project: {},
};

export default TaskForm;
