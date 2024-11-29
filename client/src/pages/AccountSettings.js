import React, { useEffect } from 'react';
// import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';
import Protected from '../components/Protected';
import UpdatePassword from '../components/settings/UpdatePassword';
// import Notifications from '../components/Settings/Notifications';
import DeleteAccount from '../components/settings/DeleteAccount';
import Profile from '../components/settings/Profile';
import { getUserDetails } from '../redux/actions/userActions';
import SettingsImage from '../images/vendor/settings.svg';

const AccountSettings = () => {
  const dispatch = useDispatch();
  const {
    user,
    loading: loadingUser,
    error: errorUser,
  } = useSelector((state) => state.userDetails);
  const {
    loading: loadingUpdate,
    message: messageUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.updateAccount);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <>
      {/* <Helmet>
        <title>Settings - BeGood</title>
      </Helmet> */}

      <main className='settingsPage'>
        <h1 className='appPageTitle'>Settings</h1>
        <Protected />
        {loadingUser && <div className='spinner'></div>}
        {loadingUpdate && <div className='spinner'></div>}
        {errorUser && <p className='appError'>{errorUser}</p>}
        {errorUpdate && <p className='appError'>{errorUpdate}</p>}
        {messageUpdate && <p className='appMessage'>{messageUpdate.message}</p>}
        {user && (
          <div className='container'>
            <aside>
              <nav>
                <NavLink to='/account/settings/profile'>Profile</NavLink>

                <NavLink to='/account/settings/change_password'>
                  Change your Password
                </NavLink>

                {/* <NavLink
                to='/account/settings/notifications'>
                Notifications
              </NavLink> */}

                <NavLink to='/account/settings/delete_account'>
                  Delete your Account
                </NavLink>
              </nav>

              <img src={SettingsImage} alt='' />
            </aside>
            <Routes>
              <Route
                path='profile/'
                user={user}
                exact
                element={<Profile user={user.info} />}
              />

              <Route
                path='change_password/'
                user={user}
                element={<UpdatePassword user={user.info} />}
                exact
              />
              <Route path='notifications/' user={user} exact>
                {/* <Notifications user={user.info} /> */}
              </Route>

              <Route
                path='delete_account/'
                user={user}
                exact
                element={<DeleteAccount user={user.info} />}
              />
            </Routes>
          </div>
        )}
      </main>
    </>
  );
};

export default AccountSettings;
