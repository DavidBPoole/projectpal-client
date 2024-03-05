import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function TaskSearchBar({ projectId }) {
  const [taskSearchInput, setTaskSearchInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setTaskSearchInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskSearchInput !== '') router.push(`/search/tasks/${taskSearchInput}?projectId=${projectId}`);
    setTaskSearchInput('');
  };
  return (
    <div>
      <Form onSubmit={handleSubmit} id="searchBar">
        <input className="form-control" type="text" placeholder="Search by.... (name,  priority, or status)" onChange={handleChange} value={taskSearchInput} style={{ width: '300px', height: '40px' }} />
      </Form>
    </div>
  );
}

TaskSearchBar.propTypes = {
  projectId: PropTypes.string.isRequired,
};
