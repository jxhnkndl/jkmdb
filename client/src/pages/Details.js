import React from 'react';
import { useParams } from 'react-router-dom';
import ShowDetails from '../components/ShowDetails';
import MovieDetails from '../components/MovieDetails';

function Details() {
  const { mediaType } = useParams();

  const renderDetails = () => {
    if (mediaType === 'tv') {
      return <ShowDetails />;
    } else {
      return <MovieDetails />;
    }
  };

  return <>{renderDetails()}</>;
}

export default Details;
