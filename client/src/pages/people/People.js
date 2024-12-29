import React from 'react';
import Focus from '../../components/Focus';
import Protected from '../../components/Protected';
// import { Helmet } from 'react-helmet';
import SearchPeople from '../../components/people/SearchPeople';
import Feed from '../../components/people/Feed';
import Title from '../../components/Title';

const People = () => {
  return (
    <>
      <Title title='People - BeGood' />
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
