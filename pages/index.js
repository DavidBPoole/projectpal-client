import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import ProjectCard from '../components/ProjectCard';
import { getUserProjects } from '../utils/data/ProjectData';
import ProjectSearchBar from '../components/ProjectSearchBar';
// import { deleteUser, getSingleUser } from '../utils/data/UserData';
import { deleteUser } from '../utils/data/UserData';
import { signOut } from '../utils/auth';

function Projects() {
  // const { user, setUser } = useAuth();
  const { user } = useAuth();
  const router = useRouter();
  const [userProjects, setUserProjects] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (user) {
      getUserProjects(user.id).then((data) => {
        if (Array.isArray(data)) {
          const updatedProjects = data.map((project) => ({ ...project }));
          setUserProjects(updatedProjects);
        }
      });
    }
  }, [user, refresh]);

  // const refreshUserInfo = () => {
  //   setRefresh((prevVal) => prevVal + 1);
  //   try {
  //     const userData = getSingleUser(user.id);
  //     setUser(userData);
  //   } catch (error) {
  //     console.error('Error refreshing user data:', error);
  //   }
  // };

  const refreshProjects = () => {
    setRefresh((prevVal) => prevVal + 1);
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
        <h1>Hello {user.fbUser.displayName}!</h1>
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
        </div>
        <div className="row mt-4">
          {userProjects.length > 0 ? (
            userProjects.map((project) => (
              <div key={`project--${project.id}`} className="col-md-4 mb-4">
                <ProjectCard
                  projectObj={project}
                  viewProject
                  refreshPage={refreshProjects}
                />
              </div>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Projects;
