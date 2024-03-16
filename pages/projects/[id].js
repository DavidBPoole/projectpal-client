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

  // const handleRemoveCollaborator = async (userId, collaborator) => {
  //   try {
  //     // const userId = user.id; // Assuming `user` is accessible in this scope
  //     await removeCollaborator(projectId, userId, collaborator);
  //     // Refresh project details after removing the collaborator
  //     await fetchProjectDetails();
  //   } catch (error) {
  //     console.error('Error removing collaborator:', error);
  //     // Handle error
  //   }
  // };

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
            <h1>{project.name}</h1>
            <h3><b>ID#:</b> <b>{project.id}</b></h3>
            <h4><b><u>Project Details:</u></b></h4>
            <p><b>Description:</b> {project.description}</p>
            <p><b>Due Date:</b> {formatDueDate(project.due_date)}</p>
            <p><b>Status:</b> {project.status}</p>
            {/* <p><b>Collaborators:</b> {project.collaborators.map((collaborator, index) => {
              if (index === project.collaborators.length - 1) {
                return collaborator.user.name;
              }
              return `${collaborator.user.name}, `;
            })}
            </p> */}
            <h5><b><u>Collaborators:</u></b></h5>
            {project.collaborators.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    {/* <th>Name</th>
                    <th>Remove</th> */}
                  </tr>
                </thead>
                <tbody>
                  {project.collaborators.map((collaborator) => (
                    <tr key={collaborator.user.id}>
                      <td>{collaborator.user.name}</td>
                      {user.id === project.user.id && (
                      <td>
                        {/* <Button onClick={() => handleRemoveCollaborator(collaborator.id)} variant="clear" style={{ color: 'red', fontWeight: 'bold' }}>☒✗✘✕-❌🚫</Button> */}
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
            <h2>Tasks</h2>
            <Link href={`/tasks/new?projectId=${project.id}`} passHref>
              <Button style={{ marginBottom: 10 }} variant="primary" as="a">
                Add Task
              </Button>
            </Link>
            <TaskSearchBar projectId={projectId} />
            {project.tasks.length > 0 ? (
              project.tasks.map((taskObj) => (
                <TaskCard
                  key={taskObj.id}
                  taskObj={taskObj}
                  projectId={projectId}
                  currentUser={user}
                  refreshPage={fetchProjectDetails}
                />
              ))
            ) : (
              <p>No tasks exist for this project.</p>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};
export default ProjectDetails;
