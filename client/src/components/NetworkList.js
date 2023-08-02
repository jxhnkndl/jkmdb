import React from 'react';

function NetworkList({networks, title}) {
  return (
    <div className="flex items-center mb-10">
      {networks &&
        networks.map((network, index) => (
          <div key={network.id} className="mr-4">
            <img
              className="max-h-10"
              src={`https://image.tmdb.org/t/p/w154/${network.logo_path}`}
              alt={`Watch ${title} on ${network.name}`}
            />
          </div>
        ))}
      {!networks && <p>Networks Unavailable</p>}
    </div>
  );
}

export default NetworkList;
