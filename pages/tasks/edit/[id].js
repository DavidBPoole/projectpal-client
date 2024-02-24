import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTask } from '../../../utils/data/TaskData';
import TaskForm from '../../../components/TaskForm';

export default function EditTask() {
  const [editTask, setEditTask] = useState({});
  const router = useRouter();
  // const { projectId } = router.query;
  // const { id } = router.query;
  const { projectId, id } = router.query;

  useEffect(() => {
    if (projectId && id) {
      getSingleTask(id).then(setEditTask);
    }
  }, [projectId, id]);

  return (
    <>
      {editTask?.name && <TaskForm taskObj={editTask} projectId={projectId} />}
    </>
  );
}
