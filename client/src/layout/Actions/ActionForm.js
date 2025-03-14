import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  createAction,
  deleteAction,
  modifyAction,
} from '../../redux/actions/actionActions';

const ActionForm = ({ type, action }) => {
  const dispatch = useDispatch();
  const [iconsPaths, setIconsPaths] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const selectedLevel = watch('level');
  const selectedDuration = watch('duration');
  const SDGs = watch('SDGs') || [];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updatedSDGs = checked
      ? [...SDGs, value].sort((a, b) => a - b)
      : SDGs.filter((sdg) => sdg !== value);

    if (updatedSDGs.length > 3) {
      setError('SDGs', {
        type: 'manual',
        message: 'You can select up to 3 SDGs only.',
      });
      event.target.checked = false;
    } else {
      clearErrors('SDGs');
      setValue('SDGs', updatedSDGs);
    }
  };

  const getIconPaths = async () => {
    const paths = {};
    for (let i = 1; i <= 17; i++) {
      const { default: path } = await import(
        `../../images/sdg_goals/goal_${i}/color_icon.png`
      );
      paths[i] = path;
    }
    setIconsPaths(paths);
  };

  useEffect(() => {
    getIconPaths();
  }, []);

  const sdgImages = Array.from({ length: 17 }, (_, index) => {
    const id = index + 1;
    return {
      id,
      src: iconsPaths[id],
      alt: `SDG ${id}`,
    };
  });

  const durationOptions = {
    day: 'Day',
    week: 'Week',
    month: 'Month',
  };

  const levelOptions = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
  };

  const onSubmit = async (details) => {
    reset();
    if (type === 'new') {
      dispatch(createAction(details));
    } else if (type === 'modify') {
      dispatch(modifyAction(action.id, details));
    }
  };

  const handleDeleteAction = async () => {
    reset();
    dispatch(deleteAction(action.id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='actionForm'>
      {/* Title */}
      <section>
        <label htmlFor='title'>Title</label>
        <input
          maxLength={25}
          className={`${errors.title ? 'incorrect' : ''}`}
          type='text'
          {...register('title', {
            value: action?.title,
            maxLength: { value: 25, message: 'Title too long' },
            required: 'Please provide a title!',
          })}
          id='title'
        />
        {errors.title && <p className='error'>{errors.title.message}</p>}
      </section>

      {/* Caption */}
      <section>
        <label htmlFor='caption'>Caption</label>
        <textarea
          type='text'
          maxLength={150}
          {...register('caption', {
            value: action?.caption,
            maxLength: { value: 150, message: 'Caption too long' },
            required: 'Please provide a caption!',
          })}
          id='caption'
          className={`${errors.caption ? 'incorrect' : ''}`}
        />
        {errors.caption && <p className='error'>{errors.caption.message}</p>}
      </section>

      {/* Description */}
      <section>
        <label htmlFor='description'>Description</label>
        <textarea
          className={`${errors.description ? 'incorrect' : ''}`}
          {...register('description', {
            value: action?.description,
            required: 'Please provide a description!',
          })}
          id='description'
          placeholder='Describe your action. Use Markdown to style it!'
        />
        {errors.description && (
          <p className='error'>{errors.description.message}</p>
        )}
      </section>

      {/* Level */}
      <section className='level'>
        <label>Level</label>
        {errors.level && <p className='error'>{errors.level.message}</p>}
        <div className='options'>
          {Object.entries(levelOptions).map(([value, label]) => (
            <label
              key={value}
              className={`option ${selectedLevel === value ? 'selected' : ''}`}>
              <input
                type='radio'
                value={value}
                {...register('level', {
                  required: 'Select a difficulty',
                  value: action?.level,
                })}
              />
              {label}
            </label>
          ))}
        </div>
      </section>

      {/* Duration */}
      <section className='duration'>
        <label>Duration</label>
        {errors.duration && <p className='error'>{errors.duration.message}</p>}
        <div className='options'>
          {Object.entries(durationOptions).map(([value, label]) => (
            <label
              key={value}
              className={`option ${
                selectedDuration === value ? 'selected' : ''
              }`}>
              <input
                type='radio'
                value={value}
                {...register('duration', {
                  required: 'Select a duration',
                  value: action?.duration,
                })}
              />
              {label}
            </label>
          ))}
        </div>
      </section>

      {/* SDGs */}
      <section className='sdgs'>
        <label>Sustainable Development Goals</label>
        {errors.SDGs && <p className='error'>{errors.SDGs.message}</p>}
        <div className='inputs'>
          {sdgImages.map(({ id, src, alt }) => {
            // Check if this SDG is in the action's SDGs array
            const isSelected = action?.SDGs?.some(
              (sdg) =>
                // Convert both to strings for comparison since values might be numbers or strings
                String(sdg) === String(id)
            );

            return (
              <label key={id} className={isSelected ? 'selected' : ''}>
                <input
                  type='checkbox'
                  value={id}
                  defaultChecked={isSelected}
                  {...register('SDGs', {
                    required: 'Select at least one SDG',
                  })}
                  onChange={handleCheckboxChange}
                />
                <img src={src} alt={alt} />
              </label>
            );
          })}
        </div>
      </section>

      {/* Submit */}
      <section className='submit'>
        {type === 'new' && (
          <input type='submit' value='Create' className='btn green' />
        )}
        {type === 'modify' && (
          <input type='submit' value='Update' className='btn green' />
        )}
      </section>

      {type === 'modify' && (
        <section>
          <button className='deleteAction' onClick={handleDeleteAction}>
            Delete Action
          </button>
        </section>
      )}
    </form>
  );
};

export default ActionForm;
