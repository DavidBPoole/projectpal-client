import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
// import { useRouter } from 'next/router';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import ProjectCard from '../components/ProjectCard';
import { getUserProjects } from '../utils/data/ProjectData';

function Projects() {
  // const router = useRouter();
  const { user } = useAuth();
  const [userProjects, setUserProjects] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    // Fetch user-specific projects when the user is authenticated
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
    <div className="text-center">
      <h1>Hello {user.fbUser.displayName}!</h1>
      <p>Your Bio: {user.name}</p>
      <Link href="/projects/new" passHref>
        <Button variant="warning" type="button" size="lg">
          Create Project
        </Button>
      </Link>

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
  );
}

export default Projects;

// pages/index.js
// import React, { useState, useEffect } from 'react';
// import { Button, Card } from 'react-bootstrap';
// import Link from 'next/link';
// import { useAuth } from '../utils/context/authContext';
// import { getProjects } from '../utils/data/ProjectData';

// const Home = () => {
//   const { user } = useAuth();
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const projectsData = await getProjects(user.uid);
//         console.warn('Projects Data:', projectsData);
//         setProjects(projectsData);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };

//     fetchProjects();
//   }, [user.uid]);

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Your Projects</h1>
//       <div className="row">
//         {projects.map((project) => (
//           <div key={project.id} className="col-md-4 mb-4">
//             <Card>
//               <Card.Body>
//                 <Card.Title>{project.name}</Card.Title>
//                 <Card.Text>Status: {project.status}</Card.Text>
//                 <Card.Text>Due Date: {project.due_date}</Card.Text>
//                 <Link href={`/projects/${project.id}`} passHref>
//                   <Button variant="primary">Details</Button>
//                 </Link>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//       <div className="text-center mt-4">
//         <Link href="/projects/new" passHref>
//           <Button variant="warning" size="lg">
//             Create Project
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;
