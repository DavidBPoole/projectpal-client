import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createProject, updateProject } from '../utils/data/ProjectData';

const initialState = {
  name: '',
  description: '',
  due_date: '',
  status: '',
  // user: '',
};

const ProjectForm = ({ projectObj }) => {
  const [currentProject, setCurrentProject] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (projectObj) {
      setCurrentProject({
        id: projectObj.id,
        name: projectObj.name || '',
        description: projectObj.description || '',
        due_date: projectObj.due_date || '',
        status: projectObj.status || '',
        user: user.id,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentProject.id) {
      const payload = {
        id: currentProject.id,
        name: currentProject.name,
        description: currentProject.description,
        due_date: currentProject.due_date,
        status: currentProject.status,
        // userId: user.id,
      };
      updateProject(payload, user.userId)
        .then(() => router.push('/'));
    } else {
      const payload = { ...currentProject, userId: user.id };
      createProject(payload, user.userId)
        .then(() => router.push('/'));
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const action = projectObj ? updateProject : createProject;
  //   action({
  //     ...currentProject,
  //     userId: user.id,
  //     id: projectObj?.id,
  //   })
  //     .then((projectData) => {
  //       if (projectObj) { router.push(`/projects/${projectObj.id}`); } else {
  //         router.push(`/projects/${projectData.id}`);
  //       }
  //     });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const action = projectObj ? updateProject : createProject;

  //   const payload = {
  //     ...currentProject,
  //     userId: user.id,
  //     id: projectObj?.id, // This is fine even if projectObj is undefined
  //   };

  //   action(payload)
  //     .then((projectData) => {
  //       if (projectObj) {
  //         router.push(`/projects/${projectObj.id}`);
  //       } else {
  //         router.push(`/projects/${projectData.id}`);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error updating/creating project:', error);
  //       // Handle the error as needed
  //     });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const action = projectObj ? updateProject : createProject;

  //   const payload = {
  //     ...currentProject,
  //     userId: user.id,
  //     id: projectObj?.id, // This is fine even if projectObj is undefined
  //   };

  //   if (projectObj && projectObj.id) {
  //     // Only update the project if projectObj.id is defined
  //     action(payload)
  //       .then(() => router.push(`/projects/${projectObj.id}`))
  //       .catch((error) => {
  //         console.error('Error updating project:', error);
  //         // Handle the error as needed
  //       });
  //   } else {
  //     // Create a new project if projectObj.id is undefined
  //     action(payload)
  //       .then((projectData) => router.push(`/projects/${projectData.id}`))
  //       .catch((error) => {
  //         console.error('Error creating project:', error);
  //         // Handle the error as needed
  //       });
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const action = projectObj ? updateProject : createProject;

  //   const payload = {
  //     ...currentProject,
  //     userId: user.id,
  //     id: projectObj?.id, // This is fine even if projectObj is undefined
  //   };

  //   if (projectObj && projectObj.id !== undefined) {
  //     // Only update the project if projectObj.id is defined and not undefined
  //     action(payload)
  //       .then(() => router.push(`/projects/${projectObj.id}`))
  //       .catch((error) => {
  //         console.error('Error updating project:', error);
  //         // Handle the error as needed
  //       });
  //   } else {
  //     // Create a new project if projectObj.id is undefined or undefined
  //     action(payload)
  //       .then((projectData) => router.push(`/projects/${projectData.id}`))
  //       .catch((error) => {
  //         console.error('Error creating project:', error);
  //         // Handle the error as needed
  //       });
  //   }
  // };

  return (
    <>
      <h2 className="form-header">{projectObj.id ? 'Update Project' : 'Create Project'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Project Name</Form.Label>
          <Form.Control name="name" placeholder="enter your project's name" required value={currentProject.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Project Description</Form.Label>
          <Form.Control name="description" placeholder="enter your project's description" required value={currentProject.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Project Due Date</Form.Label>
          <Form.Control type="date" name="due_date" placeholder="enter your project's due date" required value={currentProject.due_date} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Project Status</Form.Label>
          <Form.Select name="status" required value={currentProject.status} onChange={handleChange}>
            <option value="">Select Project Status</option>
            <option value="Pending">Pending</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          {projectObj.id ? 'Update Project' : 'Create Project'}
        </Button>
      </Form>
    </>
  );
};

ProjectForm.propTypes = {
  projectObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    due_date: PropTypes.string,
    status: PropTypes.string,
    // user: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

ProjectForm.defaultProps = {
  projectObj: initialState,
};

export default ProjectForm;
