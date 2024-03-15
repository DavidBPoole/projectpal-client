/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { getUserProjects } from '../../utils/data/ProjectData';
import ProjectCard from '../../components/ProjectCard';
import ProjectSearchBar from '../../components/ProjectSearchBar';

export default function SearchResult() {
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { projectSearchInput } = router.query;

  const getProjectSearchResults = () => {
    getUserProjects(user.id).then((searchResultsArray) => {
      const filterResults = searchResultsArray.filter((project) => project.name.toLowerCase().includes(projectSearchInput)
        || project.due_date.toLowerCase().includes(projectSearchInput)
        || project.status.toLowerCase().includes(projectSearchInput));
      setSearchResults(filterResults);
    });
  };

  useEffect(() => {
    getProjectSearchResults();
    return () => {
      setSearchResults([]);
    };
  }, [projectSearchInput]);

  return (
    <div>
      <Head>
        <title>Search</title>
      </Head>
      &nbsp;
      <ProjectSearchBar />
      <h4 className="pageheaderflexwrap">Here are the results...</h4>
      <div className="productcardcontainer">
        {searchResults.length === 0 ? (<h5 className="pageheaderflexwrap">No projects found</h5>)
          : (searchResults.map((project) => (
            <ProjectCard
              key={project.id}
              projectObj={project}
              currentUser={user}
              refreshPage={getProjectSearchResults}
            />
          )))}
      </div>
    </div>
  );
}
