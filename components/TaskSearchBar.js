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
        <input
          className="form-control"
          type="text"
          placeholder="Search by.... ( task name, priority, or status)"
          onChange={handleChange}
          value={taskSearchInput}
          style={{
            marginBottom: 20, border: '1px solid black', borderRadius: 10, padding: '10px',
          }}
        />
      </Form>
    </div>
  );
}

TaskSearchBar.propTypes = {
  projectId: PropTypes.string.isRequired,
};
