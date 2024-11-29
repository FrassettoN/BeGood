import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { pathname } = useLocation();
  let show = () => (pathname === '/' ? '' : 'hidden');

  return (
    <footer className={`footer ${show()}`}>
      <div className='credits'>
        <h4>Credits:</h4>
        <p>
          Illustrations made with ❤️ by authors at{' '}
          <a href='https://storyset.com/' target='_blank' rel='noreferrer'>
            Storyset
          </a>
          .
          <br />
          Deepest thanks to Pana, Bro, Cuate and Rafiki 🌟
        </p>
      </div>
      <br />
      <div>
        <a
          href='https://www.iubenda.com/privacy-policy/99046724'
          title='Privacy Policy '
          target='_blank'
          rel='noreferrer'>
          Privacy Policy
        </a>
        <p>We only use Technical Cookies</p>
      </div>
      <br />
    </footer>
  );
};

export default Footer;
