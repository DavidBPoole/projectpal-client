/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { getTasks } from '../../../utils/data/TaskData';
import TaskCard from '../../../components/TaskCard';
import TaskSearchBar from '../../../components/TaskSearchBar';

export default function SearchResult() {
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const { taskSearchInput, projectId } = router.query;

  const getTaskSearchResults = useCallback(async () => {
    try {
      const finalProjectId = projectId || '';
      const searchResultsArray = await getTasks(finalProjectId);
      const filterResults = searchResultsArray.filter((task) => task.name.toLowerCase().includes(taskSearchInput)
        || task.priority.toLowerCase().includes(taskSearchInput)
        || task.status.toLowerCase().includes(taskSearchInput));

      setSearchResults(filterResults);
    } catch (error) {
      console.error('Error fetching task search results:', error);
    }
  }, [taskSearchInput, projectId]);

  useEffect(() => {
    getTaskSearchResults();

    return () => {
      setSearchResults([]);
    };
  }, [getTaskSearchResults]);

  return (
    <div>
      <Head>
        <title>Search</title>
      </Head>
      &nbsp;
      <TaskSearchBar projectId={projectId} />
      <h4 className="pageheaderflexwrap">Here are the results...</h4>
      <div
        className="row mt-4"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(375px, 1fr))',
          gap: '10px',
          alignItems: 'start',
        }}
      >
        {searchResults.length === 0 ? (
          <div className="centered-message">
            <h5>No tasks found.</h5>
          </div>
        ) : (
          searchResults.map((taskObj) => (
            <TaskCard
              key={taskObj.id}
              taskObj={taskObj}
              projectId={projectId}
              refreshPage={getTaskSearchResults}
            />
          ))
        )}
      </div>
    </div>
  );
}
