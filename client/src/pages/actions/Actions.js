import React from 'react';
// import { Helmet } from 'react-helmet';
import NavActions from '../../components/actions/NavActions';
import Protected from '../../components/Protected';

const Actions = () => {
  return (
    <main className='actionsPage'>
      <Protected />

      {/* <Route path='/actions/ongoing' exact>
        <Helmet>
          <title>My actions - BeGood</title>
        </Helmet>
        <h1 className='appPageTitle'>My Actions</h1>
      </Route> */}

      {/* <Route path='/actions/new' exact>
        <Helmet>
          <title>New actions - BeGood</title>
        </Helmet>
        <h1 className='appPageTitle'>New Actions</h1>
      </Route> */}

      {/* <Route path='/actions/automated' exact>
        <Helmet>
          <title>Auto actions - BeGood</title>
        </Helmet>
        <h1 className='appPageTitle'>Automated Actions</h1>
      </Route> */}

      <NavActions />

      {/* <Routes>

      </Routes> */}
    </main>
  );
};

export default Actions;
