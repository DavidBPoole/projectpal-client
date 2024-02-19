import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProject } from '../../../utils/data/ProjectData';
import ProjectForm from '../../../components/ProjectForm';

export default function EditProject() {
  const [editProject, setEditProject] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleProject(id).then(setEditProject);
  }, [id]);

  return (
    <>
      <ProjectForm projectObj={editProject} />
    </>
  );
}

// import ProjectForm from '../../../components/ProjectForm';

// export default function EditProject() {
//   const [editProject, setEditProject] = useState({});
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const { id } = router.query;

//   useEffect(() => {
//     setLoading(true);
//     getSingleProject(id)
//       .then((projectData) => {
//         setEditProject(projectData);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching project data:', error);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <ProjectForm projectObj={editProject} />
//     </>
//   );
// }
