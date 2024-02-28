import ProjectForm from '../../components/ProjectForm';
import { useAuth } from '../../utils/context/authContext';

const NewProject = () => {
  const { user } = useAuth();
  return (
    <div>
      <ProjectForm user={user} />
    </div>
  );
};

export default NewProject;
