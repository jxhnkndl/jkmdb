import React from 'react';
import Navbar from './Navbar';
import SearchBar from '../components/SearchBar';

function Header() {
  return (
    <header className="bg-base-200 shadow-md shadow-base-200 ">
      <div className="container px-4 md:max-lg:px-0 pb-2">
        <Navbar />
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
