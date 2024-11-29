import React from 'react';
import { useDispatch } from 'react-redux';

import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '../../../redux/actions/userActions';

const AccountLink = () => {
  const dispatch = useDispatch();
  let { pathname } = useLocation();

  const renderLink = () => {
    switch (pathname) {
      case '/':
        return (
          <NavLink
            to='/actions/ongoing'
            active='currentPage'
            className='greenActivation'
            end>
            Actions
          </NavLink>
        );

      case '/account':
        return (
          <NavLink onClick={() => dispatch(logout())} to='/login'>
            Logout
          </NavLink>
        );

      default:
        return (
          <NavLink
            to='/account'
            active='currentPage'
            className='greenActivation'
            end>
            Account
          </NavLink>
        );
    }
  };

  return <nav className='header__account'>{renderLink()}</nav>;
};

export default AccountLink;
