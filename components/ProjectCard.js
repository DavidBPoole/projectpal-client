import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteProject } from '../utils/data/ProjectData';

export default function ProjectCard({ projectObj, refreshPage }) {
  const router = useRouter();
  // const isCurrentUserCreator = user && projectObj.user === user.uid;

  const deleteThisProject = async () => {
    if (window.confirm('Delete this project?')) {
      await deleteProject(projectObj.id);
      refreshPage();
    }
  };

  function formatDueDate(rawDate) {
    const dateObject = new Date(rawDate);
    // Get the time zone offset and adjust the date
    // const timeZoneOffset = dateObject.getTimezoneOffset();
    // dateObject.setMinutes(dateObject.getMinutes() - timeZoneOffset);
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate() + 1;
    const year = dateObject.getFullYear();

    return `${month}-${day}-${year}`;
  }

  return (
    <>
      <div className="project-cards-container">
        <Card className="text-center project-card" style={{ width: '25rem', margin: 20 }}>
          <Card.Header><b>Project ID #{projectObj.id}</b></Card.Header>
          <Card.Body>
            <Card.Text><b>{projectObj.name}</b></Card.Text>
            <Card.Text><b>Status:</b> {projectObj.status}</Card.Text>
            <Card.Text><b>Due Date:</b> {formatDueDate(projectObj.due_date)}</Card.Text>

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
            {/* {isCurrentUserCreator && (
              <>
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
              </>
            )} */}
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
  }).isRequired,
  refreshPage: PropTypes.func,
};

ProjectCard.defaultProps = {
  refreshPage: () => {},
};
