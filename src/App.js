import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Home from './pages/Home';
import Footer from './layout/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <main className="container px-4 md:px-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
