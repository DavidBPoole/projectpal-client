import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Modal, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import ProjectCard from '../components/ProjectCard';
import { getAllProjects, getUserProjects } from '../utils/data/ProjectData';
import ProjectSearchBar from '../components/ProjectSearchBar';
import { deleteUser, updateUserProfile } from '../utils/data/UserData';
import { signOut } from '../utils/auth';
import Footer from '../components/Footer';

function Projects() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [userProjects, setUserProjects] = useState([]);
  const [filterOption, setFilterOption] = useState('myProjects');
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const fetchProjects = useCallback(async () => {
    try {
      let fetchedProjects = [];
      if (filterOption === 'myProjects' && user) {
        fetchedProjects = await getUserProjects(user.id);
      } else if (filterOption === 'allProjects') {
        fetchedProjects = await getAllProjects();
      }
      setUserProjects(fetchedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }, [filterOption, user]);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user, fetchProjects]);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const deleteThisUser = async () => {
    if (window.confirm('Delete your profile?')) {
      await deleteUser(user.id);
      signOut();
      router.push('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ id: user.id, name, bio });
      handleCloseModal();
      updateUser(user.uid);
      router.push('/');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <>
      <Head>
        <title>ProjectPal</title>
      </Head>
      <div className="text-center">
        <h1>Hello {user.fbUser.displayName}!  ID# {user.id}</h1>
        <p>Display Name: {user.name}</p>
        <p>Your Bio: {user.bio}</p>
        <Button
          variant="primary"
          style={{ marginRight: 10 }}
          onClick={handleShowModal}
          // onClick={() => {
          //   router.push(`/users/edit/${user.id}`);
          // }}
        >
          ⚙️ Edit Profile
        </Button>
        {/* User Form Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header className="modalHeader" closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="form-text">Display Name</Form.Label>
                <Form.Control name="name" placeholder="Enter your display name" required value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="form-text">Bio</Form.Label>
                <Form.Control name="bio" placeholder="Enter your bio" required value={bio} onChange={(e) => setBio(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Button
          className="button"
          variant="danger"
          onClick={deleteThisUser}
        >
          Delete Profile
        </Button>
        <div className="d-flex justify-content-center align-items-center flex-column mb-4">
        &nbsp;
          <Link href="/projects/new" passHref>
            <Button
              className="button"
              variant="warning"
              type="button"
              size="lg"
            >
              Create Project
            </Button>
          </Link>
          &nbsp;
          <ProjectSearchBar />
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="myProjects">My Projects</option>
            <option value="allProjects">All Projects</option>
          </select>
        </div>
        {userProjects.length > 0 ? (
          <div
            className="row mt-4"
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(375px, 1fr))', gap: '10px', alignItems: 'start',
            }}
          >
            {userProjects.map((project) => (
              <div key={`project--${project.id}`} className="col-md-4 mb-4">
                <ProjectCard
                  projectObj={project}
                  viewProject
                  currentUser={user}
                  refreshPage={fetchProjects}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-center">No projects available.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Projects;
