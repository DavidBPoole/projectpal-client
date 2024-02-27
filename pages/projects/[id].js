/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
// import { Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSingleProject } from '../../utils/data/ProjectData';
import TaskCard from '../../components/TaskCard';
import { getTasks } from '../../utils/data/TaskData';

const ProjectDetails = () => {
  const [project, setProject] = useState();
  // const [errorMessage, setErrorMessage] = useState();
  const router = useRouter();
  const { id: projectId } = router.query;

  // useEffect(() => {
  //   const fetchProjectDetails = async () => {
  //     try {
  //       if (projectId) {
  //         const projectData = await getSingleProject(projectId);
  //         const tasksData = await getTasks(projectId);

  //         const projectWithTasks = {
  //           ...projectData,
  //           tasks: tasksData || [],
  //         };

  //         setProject(projectWithTasks);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching project details:', error);
  //       setErrorMessage('Error fetching project details.');
  //     }
  //   };

  //   if (projectId !== undefined) {
  //     fetchProjectDetails();
  //   }
  // }, [projectId]);

  // Define fetchProjectDetails outside of useEffect
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
      // console.error('Error fetching project details:', error);
      // setErrorMessage('Error fetching project details.');
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

  function formatDueDate(rawDate) {
    const dateObject = new Date(rawDate);
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate() + 1;
    const year = dateObject.getFullYear();

    return `${month}-${day}-${year}`;
  }

  //   return (
  //     <div>
  //       {project ? (
  //         <div>
  //           <h1>{project.name}</h1>
  //           <p>Description: {project.description}</p>
  //           <p>Due Date: {formatDueDate(project.due_date)}</p>
  //           <p>Status: {project.status}</p>

  //           <h2>Tasks</h2>
  //           {project.tasks.map((taskObj) => (
  //             <TaskCard key={taskObj.id} taskObj={taskObj} refreshPage={fetchProjectDetails} />
  //           ))}
  //           <Link href={`/tasks/new?projectId=${project.id}`} passHref>
  //             <Button variant="primary" className="m-2" style={{ borderRadius: 50 }}>
  //               <b><em>Add Task</em></b>
  //             </Button>
  //           </Link>
  //         </div>
  //       ) : (
  //         <Alert variant="danger" className="text-center" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
  //           {errorMessage || 'Loading...'}
  //         </Alert>
  //       )}
  //     </div>
  //   );
  // };

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
