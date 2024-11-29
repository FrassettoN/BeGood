import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Logo from '../../components/Logo';

import AuthenticationLinks from './Links/AuthenticationLinks';
import LandingPageLinks from './Links/LandingPageLinks';
import AccountLink from './Links/AccountLink';
import AppLinks from './Links/AppLinks';
import { useSelector } from 'react-redux';

const Header = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.userLogin);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  let fixHeader = () => (pathname === '/' ? 'fixed' : '');

  return (
    <header className={`header ${fixHeader()}`}>
      <Logo />
      <p className='header__openMenu' onClick={toggleMenu}>
        &#9776;
      </p>
      <div className={`header__menu ${isOpen && 'open'}`}>
        <p className='header__closeMenu' onClick={toggleMenu}>
          &times;
        </p>
        <div onClick={toggleMenu}>
          <Routes>
            <Route path='/' element={<LandingPageLinks />} />
            <Route path='/login' element={<LandingPageLinks />} />
            <Route path='/signup' element={<LandingPageLinks />} />
            <Route path='*' element={<AppLinks />} />
          </Routes>
        </div>
      </div>
      {user && <AccountLink />}
      {!user && <AuthenticationLinks />}
    </header>
  );
};

export default Header;
