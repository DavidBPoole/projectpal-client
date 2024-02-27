import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteTask } from '../utils/data/TaskData';

// eslint-disable-next-line react/prop-types
export default function TaskCard({ taskObj, projectId, refreshPage }) {
  const router = useRouter();
  // const { projectId } = router.query;
  // console.warn(projectId);

  const deleteThisTask = async () => {
    if (window.confirm('Delete this task?')) {
      await deleteTask(taskObj.id);
      refreshPage();
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
            <Card.Text><b>Categories:</b> {taskObj.categories.join(', ')}</Card.Text>
            <Button
              variant="warning"
              onClick={() => {
                router.push(`/tasks/edit/${taskObj.id}?projectId=${projectId}`);
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
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    project: PropTypes.number,
  }).isRequired,
  refreshPage: PropTypes.func,
};

TaskCard.defaultProps = {
  refreshPage: () => {},
};
