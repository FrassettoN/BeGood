import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/actions/userActions';

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailRegExp =
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit = async ({ fullName, email, username, bio }) => {
    dispatch(updateProfile(fullName, email, username, bio));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Full Name */}
      <section>
        <label htmlFor='fullName'>Full Name</label>
        <input
          className={`${errors.fullName ? 'incorrect' : ''}`}
          type='text'
          {...register('fullName', {
            value: user.full_name,
            maxLength: { value: 150, message: 'Full name too long' },
            required: 'Full name is required',
          })}
          id='fullName'
        />

        {errors.fullName && <p className='error'>{errors.fullName.message}</p>}
      </section>

      {/* Email */}
      <section>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          {...register('email', {
            value: user.email,
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

      {/* Username */}
      <section>
        <label htmlFor='username'>Username</label>
        <input
          className={`${errors.username ? 'incorrect' : ''}`}
          type='text'
          {...register('username', {
            value: user.username,
            maxLength: { value: 150, message: 'Username too long' },
            required: 'Username is required',
          })}
          id='username'
        />
        {errors.username && <p className='error'>{errors.username.message}</p>}
      </section>

      {/* Bio */}
      <section>
        <label htmlFor='bio'>Bio</label>
        <textarea
          maxLength={200}
          type='text'
          {...register('bio', {
            value: user.bio,
            maxLength: { value: 200, message: 'Bio too long' },
          })}
          id='bio'
          className={`${errors.bio ? 'incorrect' : ''}`}></textarea>
        {errors.bio && <p className='error'>{errors.bio.message}</p>}
      </section>

      <input type='submit' value='Update' className='btn green' />
    </form>
  );
};

export default Profile;
