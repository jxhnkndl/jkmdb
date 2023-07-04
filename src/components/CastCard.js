import React from 'react';
import { Link } from 'react-router-dom';
import { formatRoles } from '../utils/helpers';

function CastCard({ data }) {
  const { profile_path, name, roles, character } = data;

  return (
    <div
      className={`card flex flex-col justify-between mr-4 bg-base-200 shadow-xl mb-6 shrink-0 w-40 lg:w-48`}
    >
      <Link to="/">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w342/${profile_path}`}
            alt={`${name} poster`}
          />
        </figure>
      </Link>
      <div className="pb-4">
        <div className="card-body py-2 px-4">
          <h2 className="text-1xl font-semibold truncate">{name}</h2>
          <p className="text-1xl truncate">{formatRoles(roles || character)}</p>
        </div>
      </div>
    </div>
  );
}

export default CastCard;
