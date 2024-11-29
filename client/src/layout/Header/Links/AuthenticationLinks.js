import React from 'react';
import { NavLink } from 'react-router-dom';

const AuthenticationLinks = () => {
  return (
    <nav className='header__authentication'>
      <NavLink
        to='/login'
        className='header__logIn greenActivation'
        end
        active='currentPage'>
        Login
      </NavLink>
      <NavLink
        to='/signup'
        end
        className='header__signUp btn green'
        active='currentPage'
        id='signUpBtn'>
        Sign up
      </NavLink>
    </nav>
  );
};

export default AuthenticationLinks;
