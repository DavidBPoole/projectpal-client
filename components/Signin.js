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
        <img src="/project-pal-high-resolution-logo-black-transparent.png" width="40%" height="auto" alt="icon" className="nav-logo" />
      </div>
      <p>Click the button below to login!</p>
      <div style={{ width: '100%', margin: '0 auto' }}>
        <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>

    </div>
  );
}

export default Signin;
