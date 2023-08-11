import React from 'react';

function Stat({ title, size, value, description, textColor }) {
  return (
    <div className="stat text-center md:text-left">
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${textColor ? textColor : ''} ${size}`}>{value}</div>
      {description && <div className="stat-desc">{description}</div>}
    </div>
  );
}

export default Stat;
