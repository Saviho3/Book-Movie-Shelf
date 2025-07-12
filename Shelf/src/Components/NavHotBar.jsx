import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/NavHotBar.css";

const NavHotBar = () => {

    const handleLogout = () => {
        localStorage.removeItem("username");
        window.location.href = "login.html"
    }

    return (
    <div className="hotbar">
    <div className="hotbar-left">
    </div>
    <div className="hotbar-center">
        <Link to="/" className="hotbar-link">Home</Link>
        <Link to="/shelf" className="hotbar-link">Book Shelf</Link>
        <Link to="/shelf?view=movies" className="hotbar-link">Movie Shelf</Link>
        <Link to="/add-book" className="hotbar-link">Add Book</Link>
        <Link to="/add-movie" className="hotbar-link">Add Movie</Link>
        <Link to="/graphs" className="hotbar-link">Graphs</Link>
    </div>
    <div className="hotbar-right">
        <button onClick={handleLogout} className="hotbar-button">Logout</button>
    </div>
    </div>
    );
};

export default NavHotBar;