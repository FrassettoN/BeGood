import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Helmet from 'react-helmet';
import { login } from '../redux/actions/userActions';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import LoginImage from '../images/vendor/login.svg';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userLogin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const redirectLocation = location.search
    ? location.search.split('=')[1]
    : '/actions/ongoing/';

  const emailRegExp =
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit = async ({ email, password, rememberMe }) => {
    dispatch(login(email, password, rememberMe));
  };

  return (
    <>
      {/* <Helmet>
        <title>Login - BeGood</title>
      </Helmet> */}
      <main className='loginPage'>
        {user && <Navigate to={redirectLocation} />}
        {loading && <div className='spinner'></div>}

        <div className='authContainer'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className='title'>
              <h2>Welcome back</h2>
              <small>Find what you can do today for a better tomorrow!</small>
            </section>
            {/* Errors */}
            <section>{error && <p className='error'>{error}</p>}</section>

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
                autoComplete='on'
              />
              {errors.email && <p className='error'>{errors.email.message}</p>}
            </section>

            {/* Password */}
            <section>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                {...register('password', {
                  required: 'Please provide a password',
                  minLength: { value: 8, message: 'Password too short' },
                })}
                id='password'
                className={`${errors.password ? 'wrong' : ''}`}
                autoComplete='on'
              />
              {errors.password && (
                <p className='error'>{errors.password.message}</p>
              )}
            </section>
            <Link to='/auth/restore_password' className='forgotPassword'>
              Forgot password?
            </Link>

            {/* Remember Me */}
            <section className='rememberMeSection switchSection'>
              <label
                htmlFor='rememberMe'
                className='switch'
                id='rememberMeSwitch'>
                <input
                  type='checkbox'
                  {...register('rememberMe')}
                  id='rememberMe'
                />
                <span className='slider round'></span>
              </label>
              <label
                htmlFor='rememberMe'
                id='rememberMeLabel'
                className='switchTextLabel'>
                Remember me
              </label>
            </section>

            <input type='submit' value='Login' className='btn green' />

            <p className='switchAuth switchAuth--smallScreen'>
              Don’t have an account yet? <br />
              <Link to='/signup'>Sign up</Link>
            </p>
          </form>

          <aside>
            <img src={LoginImage} alt='' />
            <p className='switchAuth '>
              Don’t have an account yet? <br />
              <Link to='/signup'>Sign up</Link>
            </p>
          </aside>
        </div>
      </main>
    </>
  );
};

export default Login;
