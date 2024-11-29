import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postSurvey } from '../redux/actions/eventsActions';
import { HashLink } from 'react-router-hash-link';
import Focus from '../components/Focus';
import { useParams } from 'react-router-dom';

const Survey = ({ survey }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { event_id, topic_number } = useParams();

  const onSubmit = async (answers) => {
    let results = [];
    for (const [key, value] of Object.entries(answers)) {
      results[key] = value;
    }
    dispatch(postSurvey(event_id, topic_number, results));
  };

  const renderAnswers = (answers, radioID) =>
    answers.map((answer) => (
      <label htmlFor={`answer-${answer.id}`} key={`${answer.id}`}>
        <input
          {...register(`${radioID}`)}
          type='radio'
          name={`${radioID}`}
          value={answer.number}
          id={`answer-${answer.id}`}
        />
        {answer.text}
      </label>
    ));

  return (
    <>
      <div className='eventSurvey'>
        <Focus />
        <form className='' onSubmit={handleSubmit(onSubmit)}>
          <article className='card surveyStart'>
            <h3>Un piccolo sondaggio da cui partire...</h3>
            <HashLink to='#1' className='btn'>
              Inizia
            </HashLink>
            <input type='submit' value='Salta' className='skipSurvey' />
          </article>

          {survey.questions?.map((question) => (
            <article
              className='card'
              key={`${question.info.id}`}
              id={`${question.info.number}`}>
              <h3>{question.info.text}</h3>
              <div>
                {renderAnswers(question?.answers, question.info.number)}
              </div>
            </article>
          ))}

          <article className='card surveyEnd' id='submit'>
            <h3>Invia le tue risposte:</h3>
            <input
              type='submit'
              value='Invia'
              id='invia'
              className='btn'></input>
          </article>
        </form>
      </div>
    </>
  );
};

export default Survey;
