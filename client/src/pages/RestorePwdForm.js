import React from 'react';
import { useForm } from 'react-hook-form';
// import Helmet from 'react-helmet';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import resetPwdImage from '../images/vendor/reset_pwd.svg';
import { resetPassword } from '../redux/actions/userActions';
import Title from '../components/Title';

const RestorePwdForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const { loading, error, message } = useSelector(
    (state) => state.restorePassword
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async ({ password }) => {
    reset();
    dispatch(resetPassword(password, token));
  };

  return (
    <>
      <Title title='Reset Password - BeGood' />
      {loading && <div className='spinner'></div>}
      <div className='authContainer'>
        <aside>
          <a
            href='https://storyset.com/people'
            target='_blank'
            rel='noreferrer'>
            <img src={resetPwdImage} alt='' />
          </a>
        </aside>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className='title'>
            <h2>Reset password</h2>
            <small>Create a new password and remember to save it!</small>
          </section>

          {/* Errors */}
          <section>
            {!token && <h1 className='error'>Missing token</h1>}
            {error && (
              <p className='error'>
                An error has occurred! Try using a stronger password...
              </p>
            )}
          </section>

          {/* Message */}
          <section>
            {message?.status === 'OK' && (
              <p className='message'>Password successfully updated!</p>
            )}
          </section>

          {/* Password */}
          <section>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                },
              })}
              id='password'
              className={`${errors.password ? 'incorrect' : ''}`}
            />
            {errors.password && (
              <p className='error'>{errors.password.message}</p>
            )}
          </section>

          <input type='submit' value='Reset' className='btn green btn' />
        </form>
      </div>
    </>
  );
};

export default RestorePwdForm;
