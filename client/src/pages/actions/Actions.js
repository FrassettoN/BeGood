import React from 'react';
import NavActions from '../../components/actions/NavActions';
import Protected from '../../components/Protected';

const Actions = () => {
  return (
    <main className='actionsPage'>
      <Protected />
      <NavActions />
    </main>
  );
};

export default Actions;
