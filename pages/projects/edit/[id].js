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
