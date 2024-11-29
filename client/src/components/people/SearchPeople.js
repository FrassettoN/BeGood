import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchPeople } from '../../redux/actions/peopleActions';
import PersonCard from './PersonCard';

const SearchPeople = () => {
  const dispatch = useDispatch();
  const { people, loading, error } = useSelector((state) => state.people);

  const renderFollowing = (following) => {
    return following.map((person) => (
      <PersonCard key={person.id} person={person} />
    ));
  };

  useEffect(() => {
    dispatch(getSearchPeople());
  }, [dispatch]);

  return (
    <div className='searchPeople'>
      <input
        type='text'
        placeholder='Find your friends'
        id='query'
        onInput={(e) => dispatch(getSearchPeople(e.target.value))}
        autoComplete='off'
      />

      <div className='results'>
        {error && <h2 className='appError'>{error}</h2>}
        {loading && <div className='spinner'></div>}
        <div className='resultsContainer'>
          {people && renderFollowing(people)}
        </div>
      </div>
    </div>
  );
};

export default SearchPeople;
