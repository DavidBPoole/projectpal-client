/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { getAllProjects, getUserProjects } from '../../utils/data/ProjectData';
import ProjectCard from '../../components/ProjectCard';
import ProjectSearchBar from '../../components/ProjectSearchBar';

export default function SearchResult() {
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { projectSearchInput } = router.query;
  const [searchAllProjects, setSearchAllProjects] = useState(false);

  const getProjectSearchResults = (searchInput) => {
    if (searchAllProjects && searchInput) {
      getAllProjects().then((projects) => {
        const filterResults = projects.filter((project) => project.name.toLowerCase().includes(searchInput)
          || project.due_date.toLowerCase().includes(searchInput)
          || project.status.toLowerCase().includes(searchInput)
          || project.user.name.toLowerCase().includes(searchInput));
        setSearchResults(filterResults);
      });
    } else {
      getUserProjects(user.id).then((searchResultsArray) => {
        const filterResults = searchResultsArray.filter((project) => project.name.toLowerCase().includes(searchInput)
          || project.due_date.toLowerCase().includes(searchInput)
          || project.status.toLowerCase().includes(searchInput));
        setSearchResults(filterResults);
      });
    }
  };

  useEffect(() => {
    if (projectSearchInput) {
      getProjectSearchResults(projectSearchInput.toLowerCase());
    } else {
      setSearchResults([]);
    }
  }, [projectSearchInput, searchAllProjects]);

  const handleSearchSubmit = (searchInput) => {
    router.push(`/search/${searchInput}`);
  };

  return (
    <div>
      <Head>
        <title>Search</title>
      </Head>
      &nbsp;
      <ProjectSearchBar onSearchSubmit={handleSearchSubmit} />
      <div className="searchToggle form-check form-switch">
        <input
          type="checkbox"
          className="form-check-input"
          id="toggleSearch"
          checked={searchAllProjects}
          onChange={(e) => setSearchAllProjects(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="toggleSearch">Search Community Projects</label>
      </div>
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
        {searchResults.length === 0 && projectSearchInput ? (
          <div className="centered-message">
            <h5>No projects found.</h5>
          </div>
        ) : (
          searchResults.map((project) => (
            <ProjectCard
              key={project.id}
              projectObj={project}
              currentUser={user}
              refreshPage={() => getProjectSearchResults(projectSearchInput.toLowerCase())}
            />
          ))
        )}
      </div>
    </div>
  );
}
