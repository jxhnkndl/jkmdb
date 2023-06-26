import React from 'react';
import PropTypes from 'prop-types'
import ResultCard from './ResultCard';

function SearchResults({ limit, data }) {
  let results;
  
  // determine how many results to display based on limit prop
  if (limit) {
    results = data.slice(0, limit);
  } else {
    results = data;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5">
      {results.map((result) => (
        <ResultCard key={result.id} data={result} />
      ))}
    </div>
  );
}

// validate props
SearchResults.propTypes = {
  limit: PropTypes.number,
  data: PropTypes.object.isRequired,
}

export default SearchResults;
