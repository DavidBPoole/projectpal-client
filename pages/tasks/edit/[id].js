import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTask } from '../../../utils/data/TaskData';
import TaskForm from '../../../components/TaskForm';

export default function EditTask() {
  const [editTask, setEditTask] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleTask(id).then(setEditTask);
  }, [id]);

  return (
    <>
      <TaskForm taskObj={editTask} />
    </>
  );
}
