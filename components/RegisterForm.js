import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Head from 'next/head';
import { Modal, Button, Form } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { registerUser } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  const [showModal, setShowModal] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    uid: user.uid,
  });

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => {
      updateUser(user.uid, user.bio);
      setShowModal(false);
    });
  };

  return (
    <>
      <Head>
        <title>UserRegistration</title>
      </Head>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>User Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                as="textarea"
                name="name"
                required
                placeholder="Enter your display name"
                value={formData.name}
                onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
              />
              <Form.Label>User Bio</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                required
                placeholder="Enter your bio"
                value={formData.bio}
                onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    bio: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
