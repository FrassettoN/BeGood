import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdLibraryAdd, MdAutoMode } from 'react-icons/md';
import { BsCheckCircle } from 'react-icons/bs';

const NavActions = () => {
  return (
    <>
      <nav className='navActions'>
        <NavLink to='/actions/ongoing'>
          <BsCheckCircle className='icon' />
        </NavLink>
        <NavLink to='/actions/new'>
          <MdLibraryAdd className='icon' />
        </NavLink>
        <NavLink to='/actions/automated'>
          <MdAutoMode className='icon' />
        </NavLink>
      </nav>
      <nav className='navActions large_screen'>
        <NavLink to='/actions/automated'>
          <MdAutoMode className='icon' />
        </NavLink>
      </nav>
    </>
  );
};

export default NavActions;
