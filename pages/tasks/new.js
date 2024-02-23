// import TaskForm from '../../components/TaskForm';
// import { useAuth } from '../../utils/context/authContext';

// 1
// const NewTask = () => {
//   const { user } = useAuth();
//   return (
//     <div>
//       <TaskForm user={user} />
//     </div>
//   );
// };

// 2
// const NewTask = () => {
//   const { user } = useAuth();
//   console.warn('User Project:', user.project);
//   const taskObj = { project: Number(user.project) }; // Convert project to a number if it's a string
//   console.warn('Task Object:', taskObj);
//   return (
//     <div>
//       <TaskForm taskObj={taskObj} />
//     </div>
//   );
// };

// export default NewTask;

// 3
// const NewTask = () => {
//   const { user } = useAuth();
//   const taskObj = { project: Number(user.project) }; // Convert project to a number if it's a string
//   const project = { id: taskObj.project }; // Create a project object

//   return (
//     <div>
//       <TaskForm taskObj={taskObj} project={project} /> {/* Pass project prop */}
//     </div>
//   );
// };

// export default NewTask;

// 4
// import TaskForm from '../../components/TaskForm';
// import { useAuth } from '../../utils/context/authContext';

// const NewTask = () => {
//   const { user } = useAuth();

//   // Convert project to a number if it's a string
//   const project = user && user.project;
//   const taskObj = { project: project ? Number(project) : null }; // Corrected indentation

//   return (
//     <div>
//       <TaskForm taskObj={taskObj} project={project ? { id: Number(project) } : null} />
//     </div>
//   );
// };

// export default NewTask;

// 5
// import TaskForm from '../../components/TaskForm';
// import { useAuth } from '../../utils/context/authContext';

// const NewTask = () => {
//   const { user } = useAuth();
//   const project = { id: Number(user.project) }; // Convert project to a number if it's a string

//   return (
//     <div>
//       <TaskForm taskObj={{ project: null }} project={project} />
//     </div>
//   );
// };

// export default NewTask;

// import TaskForm from '../../components/TaskForm';
// // import { useAuth } from '../../utils/context/authContext';

// const NewTask = () =>
// // const { user } = useAuth();
// // const project = { id: Number(user.project) }; // Convert project to a number if it's a string

//   (
//     <div>
//       {/* <TaskForm taskObj={{ project: null }} project={project} /> */}
//       <TaskForm />
//     </div>
//   );
// export default NewTask;

import TaskForm from '../../components/TaskForm';

const NewTask = () => (
  <div>
    <TaskForm />
  </div>
);

export default NewTask;
