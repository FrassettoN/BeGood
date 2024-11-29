import React from 'react';
import { NavLink } from 'react-router-dom';
import { projectName } from '../index';

const Logo = () => {
  return (
    <h1 className='logo'>
      <NavLink to='/' end>
        {projectName}
      </NavLink>
    </h1>
  );
};

export default Logo;
