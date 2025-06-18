import React, { useState, useEffect } from 'react';
import supabase from "../config/supabaseClient.js";
import "../styles/BookShelf.css";

function BookShelf() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 9;
    useEffect(() => {
    async function getBooksForUser() {
        const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('username', localStorage.getItem("username"));

        if (error) {
        console.error("Error getting books for user:", error);
        } else {
        console.log("Books fetched:", data); // <-- Add this
        setBooks(data || []);
        }
    }

    

    getBooksForUser();
    }, []);
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    return (
        <>
        <div class="shelf-grid">
            {currentBooks.map(book => (
                <div class="book-card" key={book.id || book.created_at} style={{ margin: '10px' }}>
                    <h1>{book.title}</h1>
                    <img
                    class = "book-image"
                    src={book.img}
                    alt={book.title}
                    style={{ width: '120px', height: 'auto', borderRadius: '4px' }}
                    />
                    <p>{book.description}</p>
                    <p className="user-movie-note">
                    {book.rating}/10
                    {book.note && `: ${book.note}`}
                    </p>

                </div>
                ))}
        </div>
        <div className="pagination-controls">
      <button 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button 
        onClick={() => setCurrentPage(prev => prev + 1)}
        disabled={indexOfLastBook >= books.length}
      >
        Next
      </button>
    </div>
        </>
    );
}

export default BookShelf;