import React from 'react';
import Navbar from './Navbar';
import SearchBar from '../components/SearchBar';

function Header() {
  return (
    <header className="bg-base-200">
      <div className="container max-w-7xl px-4 md:px-8 pb-4">
        <Navbar />
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
