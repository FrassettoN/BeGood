import React from 'react';
import { NavLink } from 'react-router-dom';

const AppLinks = () => {
  return (
    <nav>
      <NavLink to='/actions/ongoing' end active='currentPage'>
        My Actions
      </NavLink>
      <NavLink to='/actions/new' end active='currentPage'>
        New Actions
      </NavLink>
      <NavLink to='/learn' end active='currentPage'>
        Learn
      </NavLink>
      <NavLink to='/people' end active='currentPage'>
        People
      </NavLink>
    </nav>
  );
};

export default AppLinks;
