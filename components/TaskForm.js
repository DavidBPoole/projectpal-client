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

      if (categoryId === undefined) {
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
      categories: selectedCategories.filter((categoryId) => categoryId !== null),
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
