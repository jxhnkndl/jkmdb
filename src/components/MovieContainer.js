import React from 'react';
import ResultCard from './ResultCard';

function MovieContainer({ display, limit, data }) {
  // remove titles that don't have a poster for the
  let filteredResults = data.filter(
    (result) => result.poster_path && result.vote_average
  );

  let results;

  // determine how many results to display based on limit prop
  if (limit) {
    results = filteredResults.slice(0, limit);
  } else {
    results = filteredResults;
  }

  console.log(results);

  return (
    <section>
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

      {display === 'grid' && (
        <div className="grid grid-cols-2 lg:grid-cols-5">
          {results.map((result, index) => (
            <ResultCard
              display={'row'}
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
