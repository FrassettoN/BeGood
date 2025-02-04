import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Helmet from 'react-helmet';
import Focus from '../../components/Focus';
import { getPerson } from '../../redux/actions/peopleActions';

import Chart from '../../components/Chart';
import { useParams } from 'react-router-dom';
import FollowButtons from '../../components/people/FollowButtons';
import Title from '../../components/Title';
import {
  getAuthorActions,
  getSavedActions,
} from '../../redux/actions/actionActions';
import Action from '../../components/actions/Action';

const PersonPage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { person, loading, error } = useSelector((state) => state.person);
  const { actions } = useSelector((state) => state.authorActions);
  const [profileImgPath, setProfileImgPath] = useState();

  const getProfileImagePath = async (name) => {
    const { default: path } = await import(`../../images/vendor/${name}.jpg`);
    setProfileImgPath(path);
  };

  const { actions: savedActions } = useSelector((state) => state.savedActions);

  useEffect(() => {
    dispatch(getPerson(username));
    dispatch(getAuthorActions(username));
    dispatch(getSavedActions());
    getProfileImagePath('profilo');
  }, [dispatch, username]);

  return (
    <>
      <Title title={`${person?.info?.username || 'Account'} - BeGood`} />
      <main className='personPage'>
        <Focus />
        <div className='content'>
          {loading && <div className='spinner'></div>}
          {error && <p className='appError'>{error}</p>}
          {person && (
            <div className='accountInfo'>
              <div className='general'>
                <img className='profileImg' src={profileImgPath} alt='' />
                <div className='head'>
                  <h2>{person.info.username}</h2>
                  <FollowButtons
                    username={username}
                    isFollowing={person.isFollowing}
                  />
                </div>

                <section className='bio'>
                  <p>{person.info.bio}</p>
                </section>

                <section className='userProgress'>
                  <div>
                    <h4>Level</h4>
                    <h3>{person.info.level}</h3>
                  </div>

                  <div>
                    <h4>{person.actions[0] === 1 ? 'Action' : 'Actions'}</h4>
                    <h3>{person.actions[0]}</h3>
                  </div>

                  <div>
                    <h4>{person.lessons[0] === 1 ? 'Lesson' : 'Lessons'}</h4>
                    <h3>{person.lessons[0]}</h3>
                  </div>
                </section>
              </div>

              <section className='chart'>
                <Chart
                  stats={{ actions: person.actions, lessons: person.lessons }}
                />
              </section>
            </div>
          )}
          <section className='actionsCreated'>
            <h2>Actions created:</h2>
            <div className='actions'>
              {actions?.map((action) => (
                <Action
                  key={action.id}
                  action={action}
                  type={
                    savedActions.some(
                      (savedAction) => savedAction.id === action.id
                    )
                      ? 'none'
                      : 'new'
                  }
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default PersonPage;
