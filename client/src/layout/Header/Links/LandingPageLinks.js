import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const LandingPageLinks = () => {
  const { user } = useSelector((state) => state.userLogin);

  return (
    <nav>
      <HashLink
        to='/#how_it_works'
        className='greenActivation'
        active='currentPage'>
        How&nbsp;it&nbsp;works
      </HashLink>
      <HashLink
        to='/#who_is_it_for'
        className='greenActivation'
        active='currentPage'>
        Who&nbsp;it's&nbsp;for
      </HashLink>
      <HashLink to='/#about' className='greenActivation' active='currentPage'>
        About
      </HashLink>
      {!user && (
        <NavLink
          to='/signup'
          className='greenActivation'
          id='signUpLink'
          active='currentPage'>
          Sign Up
        </NavLink>
      )}
    </nav>
  );
};

export default LandingPageLinks;
