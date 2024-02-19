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
  project: '',
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
      const payload = {
        id: currentTask.id,
        name: currentTask.name,
        description: currentTask.description,
        status: currentTask.status,
      };
      updateTask(payload, user.uid)
        .then(() => router.push(`/projects/${currentTask.id}`)); // Use the project ID
    } else {
      const payload = { ...currentTask };
      createTask(payload)
        .then(() => router.push(`/projects/${currentTask.id}`)); // Use the project ID
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
            <option value="In-Progress">In-Progress</option>
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
  }),
};

TaskForm.defaultProps = {
  taskObj: initialState,
};

export default TaskForm;
