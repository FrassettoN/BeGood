import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAccount } from '../../redux/actions/userActions';

const DeleteAccount = ({ user }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ password }) => {
    dispatch(deleteAccount(password));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        />
        {errors.password && <p className='error'>{errors.password.message}</p>}
      </section>
      <Link to='/auth/restore_password' className='forgotPassword'>
        Forgot password?
      </Link>

      <input type='submit' value='Delete' className='btn red' />
    </form>
  );
};

export default DeleteAccount;
