import React from 'react';
import { BiSolidRightArrow } from 'react-icons/bi';

function SectionHeading({ heading }) {
  return (
    <div className="flex items-center mb-3">
      <p className="text-2xl font-semibold mr-2">{heading}</p>
      <BiSolidRightArrow />
    </div>
  );
}

export default SectionHeading;
