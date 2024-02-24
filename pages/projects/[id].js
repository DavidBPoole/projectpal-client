/* eslint-disable no-unused-vars */
// THIS PAGE IS FOR THE TRIP DETAILS VIEW
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import TaskCard from '../../components/TaskCard';
// import ProjectCard from '../../components/ProjectCard';
// import { getSingleProject, updateProject } from '../../utils/data/ProjectData';

// const initialState = {
//   name: '',
//   description: '',
//   due_date: '',
//   status: '',
//   expense_details: [],
//   id: 0,
//   user_details: '',
// };

// export default function ProjectDetails() {
//   const router = useRouter();
//   const { projectId } = router.query;
//   const [project, setProject] = useState(initialState);
//   const [refreshProject, setRefreshProject] = useState(0);

//   useEffect(() => {
//     getSingleProject(projectId).then((projectData) => {
//       const projectCopy = projectData;
//       const tasks = projectData.task_details;
//       const updatedTasks = tasks.map((item) => ({
//         ...item,
//         taskId: projectId,
//       }));
//       projectCopy.task_details = updatedTasks;
//       setProject(projectCopy);
//     });
//   }, [projectId, refreshProject]);

//   // const handleClick = () => {
//   //   router.push(`/tasks/new/${project.id}`);
//   // };

//   const handleClick = () => {
//     router.push(`/tasks/new/${projectId}`);
//   };

//   const changeRefreshProject = () => {
//     setRefreshProject((prevVal) => prevVal + 1);
//   };

//   return (
//     <>
//       {/* ------------project--card---------------------------------- */}
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignContent: 'center',
//           justifyContent: 'center',
//           marginTop: '4%',
//           marginBottom: '4%',
//         }}
//       >
//         <div id="header" style={{ textAlign: 'center', marginBottom: '4%' }}>
//           <h2>Your Project:</h2>
//         </div>
//         <div id="tripCard" style={{ display: 'flex', justifyContent: 'center' }}>
//           <ProjectCard projectObj={project} viewProject={false} />
//         </div>
//       </div>
//       <div style={{ textAlign: 'center' }}>
//         <button
//           type="button"
//           className="btn btn-primary"
//           onClick={handleClick}
//           style={{ marginBottom: '4%' }}
//         >
//           {[project].task_details.length === 0 ? 'Add your first task' : 'Add a Task'}
//         </button>
//         {/* -----------task--cards------ */}
//       </div>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//         {project.expense_details.map((item, index) => (
//           <TaskCard
//             key={item.id}
//             taskObj={item}
//             refreshProject={changeRefreshProject}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

// THIS IS THE INITIAL WORKING CODE FOR PROJECT DETAILS PAGE:
// import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
// import { getSingleProject } from '../../utils/data/ProjectData';
// import TaskCard from '../../components/TaskCard';
// import { getTasks } from '../../utils/data/TaskData';

// const ProjectDetails = () => {
//   const [project, setProject] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     // console.warn('router.query:', router.query);
//     const fetchProjectDetails = async () => {
//       try {
//         const projectData = await getSingleProject(router.query.id);
//         const tasksData = await getTasks(router.query.id);

//         const projectWithTasks = {
//           ...projectData,
//           tasks: tasksData || [],
//         };

//         setProject(projectWithTasks);
//       } catch (error) {
//         console.error('Error fetching project details:', error);
//       }
//     };

//     if (router.query.id) {
//       fetchProjectDetails();
//     }
//   }, [router.query.id, router.query]);

//   const handleAddTask = () => {
//     router.push('/tasks/new');
//   };

//   return (
//     <div>
//       {project && (
//         <div>
//           <h2>{project.name}</h2>
//           <p>Description: {project.description}</p>
//           <p>Due Date: {project.due_date}</p>
//           <p>Status: {project.status}</p>

//           <h2>Tasks</h2>
//           {project.tasks.map((task) => (
//             <TaskCard key={task.id} taskObj={task} />
//           ))}

//           <Button onClick={handleAddTask}>Add Task</Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectDetails;

// THIS METHOD IS BEST VERSION TO DATE - DONT LOSE ***********
// Second method with original id destructuring from router query, but with enhanced if blocks to prevent failures:
// import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// // import PropTypes from 'prop-types';
// import { Alert } from 'react-bootstrap';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { getSingleProject } from '../../utils/data/ProjectData';
// import TaskCard from '../../components/TaskCard';
// import { getTasks } from '../../utils/data/TaskData';

// const ProjectDetails = () => {
//   const [project, setProject] = useState();
//   const [errorMessage, setErrorMessage] = useState();
//   const router = useRouter();
//   const { id } = router.query;
//   // const projectId = id ? parseInt(id, 10) : null;

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         if (id) {
//           const projectData = await getSingleProject(id);
//           const tasksData = await getTasks(id);

//           const projectWithTasks = {
//             ...projectData,
//             tasks: tasksData || [],
//           };

//           setProject(projectWithTasks);
//         }
//       } catch (error) {
//         console.error('Error fetching project details:', error);
//         setErrorMessage('Error fetching project details.');
//       }
//     };

//     fetchProjectDetails();
//   }, [id]);
//   // KEEP THIS COMMENTED OUT **********
//   // const handleAddTask = () => {
//   //   router.push(`/tasks/new?projectId=${project?.id}`);
//   // };

//   // 2
//   // useEffect(() => {
//   //   if (project) {
//   //     handleAddTask();
//   //   }
//   // }, [project, handleAddTask]);
//   // *************************************
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const handleAddTask = () => {
//     router.push(`/tasks/new?projectId=${project?.id}`);
//   };

//   useEffect(() => {
//     if (project) {
//       handleAddTask();
//     }
//   }, [project, handleAddTask]);

//   function formatDueDate(rawDate) {
//     const dateObject = new Date(rawDate);
//     const month = dateObject.getMonth() + 1;
//     const day = dateObject.getDate() + 1;
//     const year = dateObject.getFullYear();

//     return `${month}-${day}-${year}`;
//   }

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
//             <TaskCard
//               key={taskObj.id}
//               taskObj={taskObj}
//             />
//           ))}
//           <Link href={`/tasks/new/${project.id}`} passHref>
//             <Button variant="primary" className="m-2" style={{ borderRadius: 50 }}>
//               <b><em>2nd Add Task</em></b>
//             </Button>
//           </Link>
//           <Button projectid={project.id} onClick={handleAddTask}>Add Task</Button>
//           {/* <Button onClick={handleAddTask}>Add Task</Button> */}
//         </div>
//       ) : (
//         <Alert variant="danger" className="text-center" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
//           {errorMessage || 'Loading...'}
//         </Alert>
//       )}
//     </div>
//   );
// };

// export default ProjectDetails;
// *******************************************

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSingleProject } from '../../utils/data/ProjectData';
import TaskCard from '../../components/TaskCard';
import { getTasks } from '../../utils/data/TaskData';

const ProjectDetails = () => {
  const [project, setProject] = useState();
  const [errorMessage, setErrorMessage] = useState();
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

  const fetchProjectDetails = async () => {
    try {
      if (projectId) {
        const projectData = await getSingleProject(projectId);
        const tasksData = await getTasks(projectId);

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
    if (projectId !== undefined) {
      fetchProjectDetails();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <p>Description: {project.description}</p>
          <p>Due Date: {formatDueDate(project.due_date)}</p>
          <p>Status: {project.status}</p>

          <h2>Tasks</h2>
          {project.tasks.map((taskObj) => (
            <TaskCard key={taskObj.id} taskObj={taskObj} projectId={projectId} refreshPage={fetchProjectDetails} />
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
