import React from 'react';

function Stat({ title, value, description, textColor }) {
  return (
    <div className="stat text-center md:text-left">
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${textColor ? textColor : ''}`}>{value}</div>
      {description && <div className="stat-desc">{description}</div>}
    </div>
  );
}

export default Stat;
