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

  // useEffect(() => {
  //   if (projectId && id) {
  //     getSingleTask(id).then((task) => {
  //       // Ensure taskObj.categories is an array of numbers
  //       const updatedTask = {
  //         ...task,
  //         categories: Array.isArray(task.categories) ? task.categories.map((category) => category.id) : [],
  //       };
  //       setEditTask(updatedTask);
  //     });
  //   }
  // }, [projectId, id]);

  return (
    <>
      {/* {editTask?.name && <TaskForm taskObj={editTask} projectId={projectId} />} */}
      {/* {editTask?.name && <TaskForm taskObj={editTask} projectId={projectId} />} */}
      {editTask && editTask.name && <TaskForm taskObj={editTask} projectId={projectId} />}
    </>
  );
}
