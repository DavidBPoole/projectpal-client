/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      {/* <h1>Hi there!</h1>
       */}
      <div className="signin-logo">
        <img
          style={{ boxShadow: '2px 5px 15px 2px rgba(10, 10, 10, 0.2)' }}
          src="/project-pal-high-resolution-logo-black-transparent.png"
          width="40%"
          height="auto"
          alt="icon"
          className="nav-logo"
        />
      </div>
      <p className="sign-in-text">Sign in with</p>
      <div className="sign-in-btn-container">
        <Button
          className="sign-in-btn"
          variant="outline-dark"
          style={{
            width: '7rem',
            height: '3rem',
            boxShadow: '3px 3px 10px 2px rgba(10, 10, 10, 0.2)',
          }}
          onClick={signIn}
        >
          <img src="/googleLogo.png" width="35%" height="auto" alt="google sign in" className="google-button" />Google
        </Button>
      </div>

    </div>
  );
}

export default Signin;
