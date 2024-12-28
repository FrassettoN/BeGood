import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refreshLogin } from './redux/actions/userActions';
import Header from './layout/Header';
import Login from './pages/Login.js';
import StartPage from './pages/Start';
import Account from './pages/Account';
import SignUp from './pages/SignUp';
import RestorePwdRequest from './pages/RestorePwdRequest';
import RestorePwdForm from './pages/RestorePwdForm';
import AccountSettings from './pages/AccountSettings';
import Learn from './pages/learn/Learn';
import Course from './pages/learn/Course';
import LearnTopic from './pages/learn/Topic';
// import Actions from './pages/actions/Actions';
import People from './pages/people/People';
import Footer from './layout/Footer';
import FooterMenu from './layout/FooterMenu';
import OngoingActions from './pages/actions/OngoingActions.js';
import NewActions from './pages/actions/NewActions.js';
import AutomatedActions from './pages/actions/AutomatedActions.js';
import PersonPage from './pages/people/PersonPage.js';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshLogin());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Start Page and Authentication */}
        <Route element={<StartPage />} path='/' exact />
        <Route element={<Login />} path='/login' exact />
        <Route element={<SignUp />} path='/signup' exact />
        <Route
          element={<RestorePwdRequest />}
          path='/auth/restore_password'
          exact
        />
        <Route element={<RestorePwdForm />} path='/auth/password_reset' exact />

        {/* Account pages */}
        <Route element={<Account />} path='/account' exact />
        <Route element={<AccountSettings />} path='/account/settings/*' />

        {/* Actions Pages */}
        <Route path='/actions/ongoing' element={<OngoingActions />} />
        <Route path='/actions/new' element={<NewActions />} />
        <Route path='/actions/automated' element={<AutomatedActions />} />

        {/* Learn Pages */}
        <Route element={<Learn />} path='/learn' exact />
        <Route element={<Course />} path='/learn/courses/:course_id' exact />
        <Route
          element={<LearnTopic />}
          path='/learn/courses/:course_id/:topic_number/*'
        />

        {/* People Pages */}
        <Route element={<People />} path='/people/' />
        <Route path='/people/:username' exact element={<PersonPage />} />
      </Routes>
      <FooterMenu />
      <Footer />
    </Router>
  );
};

export default App;
