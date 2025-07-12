import React, { useState } from "react";
import "../styles/SearchBar.css";

const MovieSearchBar = ({movieSearchHandler, searchTerm, onTextEdit}) => {
    const handleClear = () => {
        onTextEdit('');
    };

    return (
    <>
    <form onSubmit={movieSearchHandler} className="search-form">
        <div className="search-input-container">
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => onTextEdit(e.target.value)}
                className="search-input"
                placeholder="Search movies..."
            />
            {searchTerm && (
                <button 
                    type="button" 
                    onClick={handleClear}
                    className="clear-button"
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
        </div>
        <button type="submit" className="search-button">Search</button>
    </form>
    </>);
}

export default MovieSearchBar;