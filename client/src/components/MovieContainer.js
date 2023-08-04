import React from 'react';
import { useLocation } from 'react-router-dom';
import ResultCard from './ResultCard';
import SavedCard from './SavedCard';
import { filterResults, limitResults } from '../utils/helpers';

function MovieContainer({ display, limit, data }) {
  const location = useLocation();

  // remove titles that don't have a poster for the
  let resultsArr = filterResults(data);

  // limit results
  let results = limitResults(resultsArr, limit);

  return (
    <section>
      {/* if results should be in row, display this */}
      {display === 'row' && (
        <div className="flex overflow-x-auto whitespace-nowrap">
          {results.map((result, index) => (
            <ResultCard
              display={'row'}
              key={`${index}-${result.id}`}
              data={result}
            />
          ))}
        </div>
      )}

      {/* if results should be in grid, display this */}
      {display === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {results.map((result, index) => (
            <ResultCard
              display={'grid'}
              key={`${index}-${result.id}`}
              data={result}
            />
          ))}
        </div>
      )}

      {/* if looking at results on profile page */}
      {location.pathname === '/profile' && display === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {data.map((result, index) => (
            <SavedCard
              display={'grid'}
              key={`${index}-${result.id}`}
              data={result}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MovieContainer;
