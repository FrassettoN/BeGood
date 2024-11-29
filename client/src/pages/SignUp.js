import React, { useEffect } from 'react';
// import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { login, signUp } from '../redux/actions/userActions';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

import singUpImage from '../images/vendor/signUp.svg';

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.userSignUp);
  const { user } = useSelector((state) => state.userLogin);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Login After Sign up
    if (data?.message === 'User created!') {
      dispatch(login(getValues('email'), getValues('password'), true));
    }
  }, [data, getValues, dispatch]);

  const emailRegExp =
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit = async ({ ...formData }) => {
    dispatch(signUp(formData));
  };

  return (
    <>
      {/* <Helmet>
        <title>Sign Up - BeGood</title>
      </Helmet> */}
      <main>
        {user && <Navigate to={'/actions/ongoing/'} />}
        {loading && <div className='spinner'></div>}

        <div className='authContainer'>
          <aside>
            <img src={singUpImage} alt='' />
            <p className='switchAuth'>
              Already have an account? <br />
              <Link to='/login'>Log in</Link>
            </p>
          </aside>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className='title'>
              <h2>Welcome to BeGood</h2>
              <small>Create your account and start improving our World!</small>
            </section>
            <section>{error && <p className='error'>{error}</p>}</section>
            {/* Full Name */}
            <section>
              <label htmlFor='fullName'>Full Name</label>
              <input
                className={`${errors.fullName ? 'incorrect' : ''}`}
                type='text'
                {...register('fullName', {
                  maxLength: { value: 150, message: 'Full name too long' },
                  required: 'Full name is required',
                })}
                id='fullName'
              />

              {errors.fullName && (
                <p className='error'>{errors.fullName.message}</p>
              )}
            </section>
            {/* Username */}
            <section>
              <label htmlFor='username'>Username</label>
              <input
                className={`${errors.username ? 'incorrect' : ''}`}
                type='text'
                {...register('username', {
                  maxLength: { value: 150, message: 'Username too long' },
                  required: 'Username is required',
                })}
                id='username'
              />

              {errors.username && (
                <p className='error'>{errors.username.message}</p>
              )}
            </section>
            {/* Email */}
            <section>
              <label htmlFor='email'>Email</label>
              <input
                className={`${errors.email ? 'incorrect' : ''}`}
                type='text'
                {...register('email', {
                  pattern: {
                    value: emailRegExp,
                    message: 'This email is not valid',
                  },
                  maxLength: { value: 150, message: 'Email too long' },
                  required: 'Email is required',
                })}
                id='email'
              />
              {errors.email && <p className='error'>{errors.email.message}</p>}
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
            <section>
              <div className='switchSection'>
                <label
                  htmlFor='privacyPolicy'
                  className='switch'
                  id='privacyPolicySwitch'>
                  <input
                    type='checkbox'
                    {...register('privacyPolicy', {
                      required:
                        'You have to accept the Privacy Policy to use our service',
                    })}
                    id='privacyPolicy'
                  />
                  <span className='slider round'></span>
                </label>
                <label
                  htmlFor='privacyPolicy'
                  id='privacyPolicyLabel'
                  className='switchTextLabel'>
                  I have read and accept the{' '}
                  <a
                    href='https://www.iubenda.com/privacy-policy/99046724'
                    title='Privacy Policy'
                    target='_blank'
                    rel='noreferrer'>
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.privacyPolicy && (
                <p className='error'>{errors.privacyPolicy.message}</p>
              )}
            </section>

            <input type='submit' value='Sign Up' className='btn green btn' />
            <p className='switchAuth switchAuth--smallScreen'>
              Already have an account? <br />
              <Link to='/login'>Log in</Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default SignUp;
