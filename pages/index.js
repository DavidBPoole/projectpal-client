import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import ProjectCard from '../components/ProjectCard';
import { getAllProjects, getUserProjects } from '../utils/data/ProjectData';
import ProjectSearchBar from '../components/ProjectSearchBar';
import { deleteUser } from '../utils/data/UserData';
import { signOut } from '../utils/auth';

function Projects() {
  const { user } = useAuth();
  const router = useRouter();
  const [userProjects, setUserProjects] = useState([]);
  const [filterOption, setFilterOption] = useState('myProjects');

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
          onClick={() => {
            router.push(`/users/edit/${user.id}`);
          }}
        >
          Edit Profile
        </Button>
        <Button variant="danger" onClick={deleteThisUser}>
          Delete Profile
        </Button>
        <div className="d-flex justify-content-center align-items-center flex-column mb-4">
        &nbsp;
          <Link href="/projects/new" passHref>
            <Button variant="warning" type="button" size="lg">
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
        <div className="row mt-4">
          {userProjects.length > 0 ? (
            userProjects.map((project) => (
              <div key={`project--${project.id}`} className="col-md-4 mb-4">
                <ProjectCard
                  projectObj={project}
                  viewProject
                  currentUser={user}
                  refreshPage={fetchProjects}
                />
              </div>
            ))
          ) : (
            <p>No projects available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Projects;
