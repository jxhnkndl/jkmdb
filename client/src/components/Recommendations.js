import React from 'react';
import ResultCard from './ResultCard';

function Recommendations({ recommendations }) {
  return (
    <>
      <div className="flex overflow-x-auto whitespace-nowrap mb-10">
        {/* render cast cards only for actors with profile photos */}
        {recommendations &&
          recommendations.results.map((result, index) => {
            if (result.poster_path) {
              return (
                <ResultCard
                  key={`${index}-${result.id}`}
                  data={result}
                  display={'row'}
                />
              );
            }
          })}
        {!recommendations && <p>Recommendations Unavailable</p>}
      </div>
    </>
  );
}

export default Recommendations;
