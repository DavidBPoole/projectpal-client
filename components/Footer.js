import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer id="app-footer">
        <p>
          Full-stack Capstone Developed By: David Poole | Github: <Link href="https://github.com/DavidBPoole">@davidbpoole</Link>
        </p>
        <p>
          © 2024
        </p>
      </footer>
    </>
  );
}
