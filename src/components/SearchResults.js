import React from 'react';
import PropTypes from 'prop-types';
import ResultCard from './ResultCard';

function SearchResults({ limit, data }) {
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

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5">
      {results.map((result, index) => (
        <ResultCard key={`${index}-${result.id}`} data={result} />
      ))}
    </div>
  );
}

// validate props
SearchResults.propTypes = {
  limit: PropTypes.number,
  data: PropTypes.array,
};

export default SearchResults;
