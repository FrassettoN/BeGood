import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updatePassword } from '../../redux/actions/userActions';
import PadlockImage from '../../images/vendor/padlock.png';

const UpdatePassword = ({ user }) => {
  const dispatch = useDispatch();
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { message, error, loading } = useSelector(
    (state) => state.updateAccount
  );

  const onSubmit = async ({ oldPassword, newPassword, confirmPassword }) => {
    dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
    setIsPasswordUpdated(true);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!loading && message && isPasswordUpdated && (
          <div className='passwordSuccessScreen'>
            <h2>You have successfully changed your password!</h2>
            <img src={PadlockImage} alt='' />
          </div>
        )}
        {(!isPasswordUpdated || error) && (
          <>
            <section>
              <label htmlFor='oldPassword'>Old Password</label>
              <input
                type='password'
                {...register('oldPassword', {
                  required: 'Old password is needed',
                  minLength: { value: 8, message: 'Password too short' },
                })}
                id='oldPassword'
                className={`${errors.oldPassword ? 'wrong' : ''}`}
                pb-role='current_password'
                autoComplete='on'
              />
              {errors.oldPassword && (
                <p className='error'>{errors.oldPassword.message}</p>
              )}
            </section>
            <Link to='/auth/restore_password' className='forgotPassword'>
              Forgot password?
            </Link>

            {/* New Password */}
            <section>
              <label htmlFor='newPassword'>New Password</label>
              <input
                type='password'
                {...register('newPassword', {
                  required: 'New password is needed',
                  minLength: { value: 8, message: 'Password too short' },
                })}
                id='newPassword'
                className={`${errors.newPassword ? 'wrong' : ''}`}
                pb-role='new_password'
              />
              {errors.newPassword && (
                <p className='error'>{errors.newPassword.message}</p>
              )}
            </section>

            {/* Confirm Password */}
            <section>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                type='password'
                {...register('confirmPassword', {
                  required: 'Confirm password is needed',
                  minLength: { value: 8, message: 'Password too short' },
                  validate: (value) =>
                    value === watch('newPassword') || "Passwords don't match",
                })}
                id='confirmPassword'
                className={`${errors.confirmPassword ? 'wrong' : ''}`}
                pb-role='confirm_password'
              />
              {errors.confirmPassword && (
                <p className='error'>{errors.confirmPassword.message}</p>
              )}
            </section>

            <input type='submit' value='Update' className='btn green' />
          </>
        )}
        {/* Old Password */}
      </form>
    </>
  );
};

export default UpdatePassword;
