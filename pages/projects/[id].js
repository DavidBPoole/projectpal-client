/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getSingleProject } from '../../utils/data/ProjectData';
import TaskCard from '../../components/TaskCard';
import { getTasks } from '../../utils/data/TaskData';
import TaskSearchBar from '../../components/TaskSearchBar';
import { removeCollaborator } from '../../utils/data/CollaboratorData';
import Footer from '../../components/Footer';

const ProjectDetails = () => {
  const [project, setProject] = useState();
  const router = useRouter();
  const { user } = useAuth();
  const { id: projectId } = router.query;

  const fetchProjectDetails = async () => {
    try {
      if (projectId) {
        const [projectData, tasksData] = await Promise.all([
          getSingleProject(projectId),
          getTasks(projectId),
        ]);

        const projectWithTasks = {
          ...projectData,
          tasks: tasksData || [],
        };

        setProject(projectWithTasks);
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (projectId !== undefined) {
        await fetchProjectDetails();
      }
    };

    fetchData();
  }, [projectId]);

  const handleRemoveCollaborator = async (collaboratorId) => {
    try {
      const confirmRemove = window.confirm('Are you sure you want to remove this collaborator?');
      if (!confirmRemove) {
        return;
      }

      await removeCollaborator(projectId, user.id, collaboratorId);
      await fetchProjectDetails();
    } catch (error) {
      console.error('Error removing collaborator:', error);
    }
  };

  const formatDueDate = (dueDate) => {
    // Format "YYYY-MM-DD"
    const [year, month, day] = dueDate.split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <>
      <Head>
        <title>ProjectTasks</title>
      </Head>
      <div>
        {project ? (
          <div>
            <h1><b>{project.name}</b></h1>
            <h5><b><u>Project Details</u></b></h5>
            <p><b>Description:</b> {project.description}</p>
            <p><b>Due Date:</b> {formatDueDate(project.due_date)}</p>
            <p><b>Status:</b> {project.status}</p>
            <h5><b><u>Collaborators</u></b></h5>
            {project.collaborators.length > 0 ? (
              <table>
                <tbody>
                  {project.collaborators.map((collaborator) => (
                    <tr key={collaborator.user.id}>
                      <td>{collaborator.user.name}</td>
                      {user.id === project.user.id && (
                      <td>
                        <Button onClick={() => handleRemoveCollaborator(collaborator.id)} variant="clear" style={{ color: 'red', fontWeight: 'bold' }}>✘</Button>
                      </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No collaborators exist on this project.</p>
            )}
            <Link href={`/tasks/new?projectId=${project.id}`} passHref>
              <Button
                className="btn.btn-primary"
                style={{
                  marginBottom: 15,
                  marginTop: 20,
                  backgroundColor: 'gold',
                }}
                as="a"
              >
                Add Task
              </Button>
            </Link>
            <TaskSearchBar projectId={projectId} />
            <div
              className="row mt-4"
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(375px, 1fr))', gap: '10px', alignItems: 'start',
              }}
            >
              {project.tasks.length > 0 ? (
                project.tasks.map((taskObj) => (
                  <div key={taskObj.id}>
                    <TaskCard
                      taskObj={taskObj}
                      projectId={projectId}
                      currentUser={user}
                      refreshPage={fetchProjectDetails}
                    />
                  </div>
                ))
              ) : (
                <p>No tasks available for this project.</p>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetails;
