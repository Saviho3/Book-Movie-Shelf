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
        <Link to="/" className="hotbar-link">Book Shelf</Link>
        <Link to="/?view=movies" className="hotbar-link">Movie Shelf</Link>
        <Link to="/add-book" className="hotbar-link">Add Book</Link>
        <Link to="/add-movie" className="hotbar-link">Add Movie</Link>
        <button onClick={handleLogout} className="hotbar-button">Logout</button>
    </div>
    );
};

export default NavHotBar;