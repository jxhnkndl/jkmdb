import React from 'react';
import { useParams } from 'react-router-dom';
import ShowDetails from '../components/ShowDetails';

function Details() {
  const { mediaType } = useParams();

  const renderDetails = () => {
    if (mediaType === 'tv') {
      return <ShowDetails />;
    }
  };

  return <>{renderDetails()}</>;
}

export default Details;
