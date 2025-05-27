import React from 'react';
import supabase from "../config/supabaseClient.js";

function BookSearchBar({searchTerm, onSearchChange, onSearchSubmit}) {
    return (
        <>
        <form onSubmit={onSearchSubmit}>
            <input type="text" name="search" id="book_search" value={searchTerm} onChange={e => onSearchChange(e.target.value)}/>
            <button type="submit">Search</button>
        </form>
        </>
    );
}

export default BookSearchBar;