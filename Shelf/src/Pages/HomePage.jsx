import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {

  const handleLogout = () => {
  localStorage.removeItem("username");
  window.location.href = "login.html"
  }
  return (
    <div className="homepage">
      <button onClick={handleLogout} className="logout-button">
        LogOut
      </button>
      <h1>Shelf</h1>
      <div className="grid-container">
        <Link to="/shelf" className="grid-item">
          <span>Book Shelf</span>
        </Link>
        <Link to="/shelf?view=movies" className="grid-item">
          <span>Movie Shelf</span>
        </Link>
        <Link to="/add-book" className="grid-item">
          <span>Add Book</span>
        </Link>
        <Link to="/add-movie" className="grid-item">
          <span>Add Movie</span>
        </Link>
        <Link to="/graphs" className="grid-item graphs-item">
          <span>Graphs</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage; 