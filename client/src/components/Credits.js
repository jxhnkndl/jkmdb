import React from 'react';
import CastCard from './CastCard';

function Credits({ credits }) {
  return (
    <div className="flex overflow-x-auto whitespace-nowrap mb-6">
      {/* render cast cards only for actors with profile photos */}
      {credits &&
        credits.cast.map((actor, index) => {
          if (actor.profile_path) {
            return <CastCard key={`${index}-${actor.id}`} data={actor} />;
          }
        })}
      {!credits && (
        <p className="mb-10">Cast Details Unavailable</p>
      )}
    </div>
  );
}

export default Credits;
