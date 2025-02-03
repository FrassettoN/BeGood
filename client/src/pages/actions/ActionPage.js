import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';
import {
  getActionDetails,
  getSavedActions,
} from '../../redux/actions/actionActions';
import Title from '../../components/Title';
import Action from '../../components/actions/Action';

const ActionPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { action, loading, error } = useSelector(
    (state) => state.actionDetails
  );
  const { user: userLogin } = useSelector((state) => state.userLogin);
  const { actions: savedActions } = useSelector((state) => state.savedActions);

  const isSaved = savedActions.some((action) => action.id === Number(id));

  useEffect(() => {
    dispatch(getActionDetails(id));
    if (userLogin) {
      dispatch(getSavedActions());
    }
  }, [dispatch, id, userLogin]);

  const components = {
    a: ({ href, children }) => (
      <a href={href} target='_blank' rel='noopener noreferrer'>
        {children}
      </a>
    ),
  };

  const sanitizedDescription = action
    ? DOMPurify.sanitize(action.description)
    : '';

  return (
    <>
      <Title title={`${action?.title} - BeGood`} />
      <main className='appPage actionPage'>
        {loading && <div className='spinner'></div>}
        {error && <p className='appError'>{error}</p>}
        {action && (
          <>
            <h1 className='appPageTitle'>{action.title}</h1>
            <section className='author'>
              <p>
                By{' '}
                <strong>
                  <Link className='author' to={`/people/${action.author_name}`}>
                    {action.author_name}
                  </Link>
                </strong>
              </p>
            </section>
            <div className='content'>
              <aside>
                <Action
                  type={!isSaved && userLogin ? 'new' : 'none'}
                  action={action}
                />
                <section className='duration'>
                  <p>{action.duration}</p>
                </section>
              </aside>

              {action.description ? (
                <section className='description'>
                  <h2>Something more:</h2>
                  <ReactMarkdown components={components}>
                    {sanitizedDescription}
                  </ReactMarkdown>
                </section>
              ) : (
                <section className='description'></section>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default ActionPage;
