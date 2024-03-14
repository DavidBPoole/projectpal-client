import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteProject } from '../utils/data/ProjectData';

export default function ProjectCard({ projectObj, refreshPage }) {
  const router = useRouter();

  const deleteThisProject = async () => {
    if (window.confirm('Delete this project?')) {
      await deleteProject(projectObj.id);
      refreshPage();
    }
  };

  const formatDueDate = (dueDate) => {
    // Format "YYYY-MM-DD"
    const [year, month, day] = dueDate.split('-');
    return `${month}-${day}-${year}`;
  };

  return (
    <>
      <div className="project-cards-container">
        <Card className="text-center project-card" style={{ width: '25rem', margin: 20 }}>
          <Card.Header><b>Project ID #{projectObj.id}</b></Card.Header>
          <Card.Body>
            <Card.Text><b>{projectObj.name}</b></Card.Text>
            <Card.Text><b>Status:</b> {projectObj.status}</Card.Text>
            <Card.Text><b>Due Date:</b> {formatDueDate(projectObj.due_date)}</Card.Text>
            <Card.Text><b>Collaborators:</b> {projectObj.collaborators.map((collaborator, index) => {
              if (index === projectObj.collaborators.length - 1) {
                return collaborator.user.name;
              }
              return `${collaborator.user.name}, `;
            })}
            </Card.Text>
            <Link href={`/projects/${projectObj.id}`} passHref>
              <Button variant="primary" as="a">
                Details
              </Button>
            </Link>
            &nbsp;
            <Button
              variant="warning"
              onClick={() => {
                router.push(`/projects/edit/${projectObj.id}`);
              }}
            >
              Edit
            </Button>
                &nbsp;
            <Button variant="danger" onClick={deleteThisProject}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

ProjectCard.propTypes = {
  projectObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    collaborators: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  refreshPage: PropTypes.func,
};

ProjectCard.defaultProps = {
  refreshPage: () => {},
};
