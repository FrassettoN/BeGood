import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import Helmet from 'react-helmet';

import { useDispatch, useSelector } from 'react-redux';

import Action from '../components/actions/Action';

// Images
import sdgsWheel from '../images/sdg_goals/sdg_wheel/transparent.png';
import earthGroup from '../images/vendor/earthGroup.svg';
import earthWithHands from '../images/vendor/Environment-bro.svg';
import saveTheEarth from '../images/vendor/SaveEarth.svg';
import motherEarth from '../images/vendor/motherEarth.svg';
import { getActionDetails } from '../redux/actions/actionActions';

const StartPage = () => {
  const dispatch = useDispatch();

  // Get Action Details
  useEffect(() => {
    dispatch(getActionDetails(1));
  }, [dispatch]);

  // Action State
  const {
    loading: actionLoading,
    error: actionError,
    action,
  } = useSelector((state) => state.actionDetails);

  return (
    <>
      {/* <Helmet>
        <title>BeGood</title>
      </Helmet> */}
      <main className='landing'>
        <div className='landing__intro'>
          <link rel='preload' as='image' href={sdgsWheel} />
          <h2 className='landing__title'>
            <span>You</span> <br />
            make the <span>difference</span>.
          </h2>
        </div>

        <section>
          <div className='noise landing__join'>
            <img src={earthGroup} alt='' />
            <div className='landing__join__links'>
              <h3 className='title'>Join us!</h3>
              <NavLink to='/login' className='btn btn--small green'>
                Login
              </NavLink>
              <span> or </span>
              <NavLink to='/signup' className='btn btn--small green'>
                Sign Up
              </NavLink>
            </div>
          </div>
        </section>

        <section id='how_it_works'>
          <h3>How it works</h3>
          <div className='landing__cards '>
            <div className='landing__card'>
              {actionLoading ? (
                <br />
              ) : actionError ? (
                <p>{actionError}</p>
              ) : (
                <Action action={action} className='landing__card__action' />
              )}
              <div className='landing__card__text'>
                <h3 className='title'>Choose an Action</h3>
                <p>
                  Choose <span>every day, week and month</span> the most suited{' '}
                  <span>actions</span> for you to help the world to get better,
                  and do your best to complete them!
                </p>
              </div>
            </div>
            <div className='landing__card'>
              <Action
                action={action}
                className='landing__card__action flip'
                type='user'
              />

              <div className='landing__card__text'>
                <h3>Complete the Task</h3>
                <p>
                  Tick every day the actions that you have accomplished and{' '}
                  <span>record all of your efforts</span>. In exchange, you will
                  receive graphs and data to appreciate how your work is{' '}
                  <span>impacting on the planet</span>, and you will be more and
                  more <span>inspired</span> to get better.
                </p>
              </div>
            </div>
            <div className='landing__card'>
              <img
                className='landing__card__img'
                src={earthWithHands}
                alt='Earth'
              />
              <div className='landing__card__text'>
                <h3>Change the World</h3>
                <p>
                  Every action you complete will be a <span>little brick</span>{' '}
                  to rebuild our Home. Play your part and get ready to improve
                  the Earth by <span>improving your life</span>.
                </p>
              </div>
            </div>
            <NavLink to='/signup' className='getStarted btn btn--big'>
              <span>Create Your Account</span>
            </NavLink>
          </div>
        </section>
        <section className='text_section' id='who_is_it_for'>
          <h3>Who it's for</h3>
          <div>
            <img src={saveTheEarth} alt='Earth' />
            <p>
              No matter if you’re an adult, a student, or a child: your own
              <span> actions</span> can always improve both society and
              environment – but you might be aware of it. <br />
              However, no matter how much we would like to change our lives,
              either we don’t know where to start, or it is a challenge to be{' '}
              <span>consistent</span>. <br />
              If this happens to you as well, then our website is the right
              place for you: here you will learn every day new ways to take
              responsible decisions and you will be able to{' '}
              <span>record all your efforts along this journey</span>, getting
              more and more motivated to do your best.
            </p>
          </div>
        </section>
        <section className='text_section' id='about'>
          <h3>About</h3>
          <div>
            <img src={motherEarth} alt='Earth' />
            <p>
              We are a group of Italian <span>students</span> who firmly believe
              that the only way to improve the world is to change small habits
              of our daily behaviour. <br /> Starting from this{' '}
              <span>idea</span>, we have decided to put ourselves on the
              frontline – together with anyone who wants to <span>join us</span>{' '}
              – to act every day towards a brighter future. <br /> This project
              is the result of a collective contribution of the opinions and
              knowledge of each one of us: we hope you will appreciate the
              result!
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default StartPage;
