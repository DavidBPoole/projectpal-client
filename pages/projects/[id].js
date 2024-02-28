/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSingleProject } from '../../utils/data/ProjectData';
import TaskCard from '../../components/TaskCard';
import { getTasks } from '../../utils/data/TaskData';

const ProjectDetails = () => {
  const [project, setProject] = useState();
  const router = useRouter();
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

  const formatDueDate = (dueDate) => {
    // Format "YYYY-MM-DD"
    const [year, month, day] = dueDate.split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <div>
      {project ? (
        <div>
          <h1>{project.name}</h1>
          <h2>ID#: <b>{project.id}</b></h2>
          <p>Description: {project.description}</p>
          <p>Due Date: {formatDueDate(project.due_date)}</p>
          <p>Status: {project.status}</p>

          <h2>Tasks</h2>
          {project.tasks.map((taskObj) => (
            <TaskCard
              key={taskObj.id}
              taskObj={taskObj}
              projectId={projectId}
              refreshPage={fetchProjectDetails}
            />
          ))}
          <Link href={`/tasks/new?projectId=${project.id}`} passHref>
            <Button variant="primary" className="m-2" style={{ borderRadius: 50 }}>
              <b><em>Add Task</em></b>
            </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
export default ProjectDetails;
