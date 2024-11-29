import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Protected = () => {
  const { user } = useSelector((state) => state.userLogin);
  const currentLocation = useLocation().pathname;
  return <>{!user && <Navigate to={`/login?next=${currentLocation}`} />}</>;
};

export default Protected;
