import React from 'react';
import Focus from '../../components/Focus';
import Protected from '../../components/Protected';
// import { Helmet } from 'react-helmet';
import SearchPeople from '../../components/people/SearchPeople';
import Feed from '../../components/people/Feed';

const People = () => {
  return (
    <>
      {/* <Helmet>
        <title>People - BeGood</title>
      </Helmet> */}
      <main className='peoplePage'>
        <Focus />
        <Protected />
        <h1 className='appPageTitle'>People</h1>
        <div className='content'>
          <SearchPeople />
          <Feed />
        </div>
      </main>
    </>
  );
};

export default People;
