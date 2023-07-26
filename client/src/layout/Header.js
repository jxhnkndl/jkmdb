import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import SearchBar from '../components/SearchBar';

function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="bg-base-200">
      <div className="container max-w-7xl px-4 md:px-8">
        <Navbar />
        {path !== '/register' && path !== '/login' && <SearchBar />}
      </div>
    </header>
  );
}

export default Header;
