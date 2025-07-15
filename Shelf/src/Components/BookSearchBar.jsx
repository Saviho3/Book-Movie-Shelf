import React from 'react';
import supabase from "../config/supabaseClient.js";
import "../styles/SearchBar.css";

function BookSearchBar({searchTerm, onSearchChange, onSearchSubmit}) {
    const handleClear = () => {
        onSearchChange('');
    };

    return (
        <>
        <form onSubmit={onSearchSubmit} className="search-form">
            <div className="search-input-container">
                <input 
                    type="text" 
                    name="search" 
                    id="book_search" 
                    value={searchTerm} 
                    onChange={e => onSearchChange(e.target.value)}
                    className="search-input"
                    placeholder="Search books..."
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
        </>
    );
}

export default BookSearchBar;