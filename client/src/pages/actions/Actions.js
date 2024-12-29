import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavActions from '../../components/actions/NavActions';
import Protected from '../../components/Protected';
import Title from '../../components/Title';

const Actions = () => {
  return (
    <main className='actionsPage'>
      <Protected />
      <NavActions />
    </main>
  );
};

export default Actions;
