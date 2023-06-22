import React from 'react';
import SearchBar from '../components/SearchBar';
import { FaUserAlt } from 'react-icons/fa';

function Header() {
  return (
    <header className="p-4 md:px-0 bg-base-200">
      <div className="container">
        <div className="flex justify-between items-center mb-4">
          <p className="text-3xl">JKMDB</p>
          <FaUserAlt className='text-2xl' />
        </div>
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
