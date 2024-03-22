import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteProject } from '../utils/data/ProjectData';
import { joinProject, leaveProject } from '../utils/data/CollaboratorData';
import { useAuth } from '../utils/context/authContext';

export default function ProjectCard({ projectObj, currentUser, refreshPage }) {
  const router = useRouter();
  const { user } = useAuth();
  const [joining, setJoining] = useState(false);

  const handleJoinProject = async () => {
    setJoining(true);
    try {
      await joinProject(projectObj.id, user.id);
      refreshPage();
    } catch (error) {
      console.error('Error joining project:', error);
    } finally {
      setJoining(false);
    }
  };

  const handleLeaveProject = async () => {
    if (window.confirm('Leave this project?')) {
      try {
        await leaveProject(projectObj.id, user.id);
        refreshPage();
      } catch (error) {
        console.error('Error leaving project:', error);
      }
    }
  };

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

  const userIsOwner = currentUser && projectObj && projectObj.user && currentUser.id === projectObj.user.id;

  const userIsCollaborator = projectObj && currentUser && projectObj.collaborators.some((collaborator) => collaborator.user.id === currentUser.id);

  return (
    <>
      <div className="project-cards-container">
        <Card className="text-center project-card" style={{ width: '25rem', margin: 20 }}>
          <Card.Header><b>{projectObj.name}</b></Card.Header>
          <Card.Body>
            <Card.Text><b>Owner:</b> {projectObj.user.name}</Card.Text>
            <Card.Text><b>Status:</b> {projectObj.status}</Card.Text>
            <Card.Text><b>Due Date:</b> {formatDueDate(projectObj.due_date)}</Card.Text>
            <Card.Text><b>Collaborators:</b> {projectObj.collaborators.length > 0 ? projectObj.collaborators.map((collaborator, index) => {
              if (index === projectObj.collaborators.length - 1) {
                return collaborator.user.name;
              }
              return `${collaborator.user.name}, `;
            }) : 'None'}
            </Card.Text>
            {!userIsOwner && !userIsCollaborator && (
            <Button
              variant="primary"
              onClick={handleJoinProject}
              disabled={joining}
            >
              {joining ? 'Joining...' : 'Join'}
            </Button>
            )}

            {userIsCollaborator && (
            <Button
              variant="danger"
              onClick={handleLeaveProject}
            >
              Leave
            </Button>
            )}
            {userIsOwner && (
              <>
                <Button
                  className="button"
                  variant="warning"
                  onClick={() => {
                    router.push(`/projects/edit/${projectObj.id}`);
                  }}
                >
                  Edit
                </Button>
                &nbsp;
                <Button
                  className="button"
                  variant="danger"
                  onClick={deleteThisProject}
                >
                  Delete
                </Button>
              </>
            )}
                &nbsp;
            {(userIsOwner || userIsCollaborator) && (
              <Link href={`/projects/${projectObj.id}`} passHref>
                <Button variant="primary" as="a">
                  Details
                </Button>
              </Link>
            )}
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
    collaborators: PropTypes.arrayOf(PropTypes.shape),
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  refreshPage: PropTypes.func,
};

ProjectCard.defaultProps = {
  currentUser: null,
  refreshPage: () => {},
};
