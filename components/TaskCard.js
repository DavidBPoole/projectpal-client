import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteTask } from '../utils/data/TaskData';

export default function TaskCard({ taskObj, onUpdate }) {
  const router = useRouter();

  const deleteThisTask = () => {
    if (window.confirm('Delete this task?')) {
      if (taskObj && taskObj.project && taskObj.id) {
        deleteTask(taskObj.project, taskObj.id).then(() => onUpdate && onUpdate());
      }
    }
  };

  return (
    <>
      <div className="task-cards-container">
        <Card className="text-center task-card" style={{ width: '25rem', margin: 20 }}>
          <Card.Header><b>Task #{taskObj.id}</b></Card.Header>
          <Card.Body>
            <Card.Title><b>Task Name: {taskObj.name}</b></Card.Title>
            <Card.Text><b>Description:</b> {taskObj.description}</Card.Text>
            <Card.Text><b>Priority:</b> {taskObj.priority}</Card.Text>
            <Card.Text><b>Status:</b> {taskObj.status}</Card.Text>

            <Button
              variant="warning"
              onClick={() => {
                router.push(`/tasks/edit/${taskObj.id}`);
              }}
            >
              Edit
            </Button>

            &nbsp;

            <Button variant="danger" onClick={deleteThisTask}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

TaskCard.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    project: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func,
};

TaskCard.defaultProps = {
  onUpdate: () => {},
};
