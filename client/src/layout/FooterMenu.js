import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';
import { TbSchool, TbClover } from 'react-icons/tb';
import { VscAccount } from 'react-icons/vsc';

const FooterMenu = () => {
  const { pathname } = useLocation();
  let show = () => (pathname === '/' ? 'hidden' : '');

  return (
    <footer className={`footerMenu ${show()}`}>
      <nav>
        <NavLink to='/actions/ongoing' active='active'>
          <FaTasks className='icon' />
        </NavLink>

        <NavLink to='/learn' end active='active'>
          <TbSchool className='icon' />
        </NavLink>
        <NavLink to='/people' end active='active'>
          <TbClover className='icon' />
        </NavLink>
        <NavLink to='/account' end active='active'>
          <VscAccount className='icon' />
        </NavLink>
      </nav>
    </footer>
  );
};

export default FooterMenu;
