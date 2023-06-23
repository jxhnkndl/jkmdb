import React from 'react';
import Navbar from './Navbar';
import SearchBar from '../components/SearchBar';

function Header() {
  return (
    <header className="p-4 md:px-0 bg-base-200">
      <div className="container">
        <Navbar />
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
