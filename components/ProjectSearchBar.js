import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

export default function ProjectSearchBar() {
  const [projectSearchInput, setProjectSearchInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setProjectSearchInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectSearchInput !== '') router.push(`/search/${projectSearchInput}`);
    setProjectSearchInput('');
  };
  return (
    <div>
      <Form onSubmit={handleSubmit} id="searchBar">
        <input className="form-control" type="text" placeholder="Search by.... (name,  status, or yyyy-mm-dd)" onChange={handleChange} value={projectSearchInput} style={{ width: '300px', height: '40px' }} />
      </Form>
    </div>
  );
}
