import React from 'react';
import { useRouter } from 'next/router';
import TaskForm from '../../components/TaskForm';

export default function NewTask() {
  const router = useRouter();
  const { projectId } = router.query;

  return <TaskForm projectId={projectId} />;
}
