// pages/projects/[projectId].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
import { getSingleProject } from '../../utils/data/ProjectData';
import TaskCard from '../../components/TaskCard';
import { getTasks } from '../../utils/data/TaskData';

function ProjectDetails() {
  // const { user } = useAuth();
  const router = useRouter();
  const { projectId } = router.query;
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (projectId) {
      getSingleProject(projectId).then((data) => {
        setProject(data);
        setTasks(Array.isArray(data.tasks) ? data.tasks : []);
      });
    }
  }, [projectId]);

  const handleAddTask = () => {
    router.push('/tasks/new');
  };

  return (
    <div className="text-center">
      <h1>{project.name} Details</h1>
      <p>Description: {project.description}</p>
      <p>Status: {project.status}</p>
      <p>Due Date: {project.due_date}</p>

      <Button variant="primary" onClick={handleAddTask}>
        Add Task
      </Button>

      <div className="task-cards-container">
        <h2>Tasks</h2>
        <article className="tasks">
          {tasks.map((task) => (
            <section key={`task--${task.id}`} className="task">
              <TaskCard taskObj={task} onUpdate={getTasks} />
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}

export default ProjectDetails;
