import React from 'react';
import { Link } from 'react-router-dom';
import { IoBarbell } from 'react-icons/io5';


function Navigation() {
  return (
    <nav>
      <a id="siteName"><IoBarbell id="icon" /> Workout App</a>
      <Link to="/" id="page1">Home</Link>
      <Link to="../create-exercise" id="page2">Create Exercise</Link>
    </nav>
  );
}

export default Navigation;
