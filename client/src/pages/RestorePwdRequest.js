import React from 'react';
import { useForm } from 'react-hook-form';
// import Helmet from 'react-helmet';

import { useDispatch, useSelector } from 'react-redux';
import restorePwdImage from '../images/vendor/restore_pwd.svg';
import { restorePasswordRequest } from '../redux/actions/userActions';
import Title from '../components/Title';

const RestorePwd = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(
    (state) => state.restorePassword
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async ({ email }) => {
    reset();
    dispatch(restorePasswordRequest(email));
  };

  const emailRegExp =
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <>
      <Title title='Restore Password - BeGood' />
      {loading && <div className='spinner'></div>}
      <div className='authContainer'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className='title'>
            <h2>Restore my password</h2>
            <small>Check your email inbox and follow the instructions</small>
          </section>

          {/* Errors */}
          <section>
            {error && (
              <p className='error'>
                An error has occurred! Make sure your email is correct
              </p>
            )}
          </section>

          {/* Message */}
          <section>
            {message?.status === 'OK' && <p className='message'>Email sent!</p>}
          </section>

          {/* Email */}
          <section>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              {...register('email', {
                pattern: {
                  value: emailRegExp,
                  message: 'Please provide a valid email',
                },
                maxLength: { value: 150, message: 'Email too long' },
                required: 'Please provide an email',
              })}
              id='email'
              className={`${errors.email ? 'wrong' : ''}`}
            />
            {errors.email && <p className='error'>{errors.email.message}</p>}
          </section>
          <input type='submit' value='Send email' className='btn green' />
        </form>

        <aside>
          <a
            href='https://storyset.com/online'
            target='_blank'
            rel='noreferrer'>
            <img src={restorePwdImage} alt='' />
          </a>
        </aside>
      </div>
    </>
  );
};

export default RestorePwd;
