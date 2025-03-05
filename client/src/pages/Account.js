import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Helmet from 'react-helmet';
import Focus from '../components/Focus';
import Protected from '../components/Protected';
import { getUserDetails } from '../redux/actions/userActions';

import { BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Chart from '../components/Chart';
import Title from '../components/Title';
import Action from '../components/actions/Action';
import { getSavedActions } from '../redux/actions/actionActions';

const Account = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userDetails);
  const { actions: savedActions } = useSelector((state) => state.savedActions);
  const [profileImgPath, setProfileImgPath] = useState();

  const getProfileImagePath = async (name) => {
    const { default: path } = await import(`../images/vendor/${name}.jpg`);
    setProfileImgPath(path);
  };

  const [visible, setVisible] = useState('progress');
  const buttons = [
    { label: 'Progress', value: 'progress' },
    { label: 'Actions', value: 'actions' },
    // { label: 'People', value: 'people' },
  ];

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getSavedActions());
    getProfileImagePath('profilo');
  }, [dispatch]);

  return (
    <>
      <Title title='Account - BeGood' />
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

              <section className='bio'>
                <p>{user.info.bio}</p>
              </section>
            </div>

            <nav className='visualize'>
              {buttons.map((button) => (
                <button
                  className={`${visible === button.value ? 'active' : ''}`}
                  key={button.value}
                  onClick={() => setVisible(button.value)}>
                  {button.label}
                </button>
              ))}
            </nav>

            {visible === 'progress' && (
              <section className='progress'>
                <section className='progressRecap'>
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
                <section className='chart'>
                  <Chart
                    stats={{ actions: user.actions, lessons: user.lessons }}
                  />
                </section>
              </section>
            )}

            {visible === 'actions' && (
              <section className='actionsCreated'>
                <h2>Actions created:</h2>
                <div className='actions'>
                  {user?.actionsCreated?.map((action) => (
                    <Action
                      key={action.id}
                      action={action}
                      type={
                        savedActions.some(
                          (savedAction) => savedAction.id === action.id
                        )
                          ? 'author'
                          : 'author new'
                      }
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Account;
