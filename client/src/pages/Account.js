import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Helmet from 'react-helmet';
import Focus from '../components/Focus';
import Protected from '../components/Protected';
import { getUserDetails } from '../redux/actions/userActions';

import { BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Chart from '../components/Chart';

const Account = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userDetails);
  const [profileImgPath, setProfileImgPath] = useState();

  const getProfileImagePath = async (name) => {
    const { default: path } = await import(`../images/vendor/${name}.jpg`);
    setProfileImgPath(path);
  };

  useEffect(() => {
    dispatch(getUserDetails());
    getProfileImagePath('profilo');
  }, [dispatch]);

  return (
    <>
      {/* <Helmet>
        <title>{user?.info?.username || 'Account'} - BeGood</title>
      </Helmet> */}
      <main className='accountPage'>
        <Focus />
        <Protected />
        {loading && <div className='spinner'></div>}
        {error && <p className='appError'>{error}</p>}
        {user && (
          <div className='accountInfo'>
            <section className='settings'>
              <Link to='/account/settings/profile'>
                <BsFillGearFill />
              </Link>
            </section>
            <div className='head'>
              <section className='userInfo'>
                <img className='profileImg' src={profileImgPath} alt='' />
                <h2>{user.info.username}</h2>
                <small>Echeveria Peacockii</small>
              </section>

              <section className='userProgress'>
                <div>
                  <h4>Level</h4>
                  <h3>{user.info.level}</h3>
                </div>

                <div>
                  <h4>{user.actions[0] === 1 ? 'Action' : 'Actions'}</h4>
                  <h3>{user.actions[0]}</h3>
                </div>

                <div>
                  <h4>{user.lessons[0] === 1 ? 'Lesson' : 'Lessons'}</h4>
                  <h3>{user.lessons[0]}</h3>
                </div>
              </section>

              <section className='bio'>
                <p>{user.info.bio}</p>
              </section>
            </div>

            <section className='chart'>
              <Chart stats={{ actions: user.actions, lessons: user.lessons }} />
            </section>
          </div>
        )}
      </main>
    </>
  );
};

export default Account;
