import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import ProjectCard from '../components/ProjectCard';
import { getUserProjects } from '../utils/data/ProjectData';
import ProjectSearchBar from '../components/ProjectSearchBar';

function Projects() {
  const { user } = useAuth();
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

  const refreshHomePage = () => {
    setRefresh((prevVal) => prevVal + 1);
  };

  return (
    <>
      <Head>
        <title>ProjectPal</title>
      </Head>
      <div className="text-center">
        <h1>Hello {user.fbUser.displayName}!</h1>
        <p>Your Bio: {user.name}</p>
        <Link href="/projects/new" passHref>
          <Button variant="warning" type="button" size="lg">
            Create Project
          </Button>
        </Link>
        <ProjectSearchBar />
        <div className="row mt-4">
          {userProjects.length > 0 ? (
            userProjects.map((project) => (
              <div key={`project--${project.id}`} className="col-md-4 mb-4">
                <ProjectCard
                  projectObj={project}
                  viewProject
                  refreshPage={refreshHomePage}
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
