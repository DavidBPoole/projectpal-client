/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateUserProfile } from '../utils/data/UserData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  name: '',
  bio: '',
};

const UserForm = ({ userObj }) => {
  const [currentUser, setCurrentUser] = useState(initialState);
  const router = useRouter();
  const { user, updateUser } = useAuth();

  useEffect(() => {
    if (userObj) {
      setCurrentUser({
        id: userObj.id,
        name: userObj.name || '',
        bio: userObj.bio || '',
      });
    }
  }, [userObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (currentUser.id) {
  //     const payload = {
  //       id: currentUser.id,
  //       name: currentUser.name,
  //       bio: currentUser.bio,
  //     };
  //     updateUser(payload)
  //       .then(() => router.push('/'));
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser.id) {
      const payload = {
        id: currentUser.id,
        name: currentUser.name,
        bio: currentUser.bio,
      };
      updateUserProfile(payload)
        .then(() => {
          updateUser(user.uid);
          router.push('/');
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }
  };

  return (
    <>
      <Head>
        <title>UserForm</title>
      </Head>
      <h2 className="form-header">Update Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Display Name</Form.Label>
          <Form.Control name="name" placeholder="Enter your display name" required value={currentUser.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-text">Bio</Form.Label>
          <Form.Control name="bio" placeholder="Enter your bio" required value={currentUser.bio} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </>
  );
};

UserForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    bio: PropTypes.string,
  }),
};

UserForm.defaultProps = {
  userObj: initialState,
};

export default UserForm;
