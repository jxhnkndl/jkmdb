import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import TrendingTV from './pages/TrendingTV';
import TrendingMovies from './pages/TrendingMovies';
import Details from './pages/Details';
import Footer from './layout/Footer';
import { AuthProvider } from './context/auth/AuthContext';
import { MovieProvider } from './context/movie/MovieContext';

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Router>
          <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <main className="container max-w-7xl px-4 md:px-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/trending-tv" element={<TrendingTV />} />
                <Route path="/trending-movies" element={<TrendingMovies />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
