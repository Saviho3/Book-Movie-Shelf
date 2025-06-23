import React, { useState, useEffect } from 'react';
import supabase from "../config/supabaseClient.js";
import "../styles/BookShelf.css";

function BookShelf() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({ rating: '', note: '' });
    const booksPerPage = 9;

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const { data, error } = await supabase
            .from('books')
            .select('*')
            .eq('username', localStorage.getItem("username"));

        if (error) {
            console.error("Error getting books for user:", error);
        } else {
            setBooks(data || []);
        }
    };

    const handleEdit = async () => {
        if (!selectedBook) return;
        console.log('Edit handler triggered for book:', selectedBook);
        const { data, error } = await supabase
            .from('books')
            .update({
                rating: editData.rating,
                note: editData.note
            })
            .eq('id', selectedBook.id);
        console.log('Supabase edit response:', { data, error });
        if (error) {
            console.error("Error updating book:", error, { data, error });
            alert("Failed to update the book.");
        } else {
            console.log(`Book (ID: ${selectedBook.id}) successfully edited.`);
            alert("Book successfully updated.");
            fetchBooks();
            setEditMode(false);
            setShowPopup(false);
            setSelectedBook(null);
        }
    };

    const handleDelete = async () => {
        if (!selectedBook) return;
        console.log('Delete handler triggered for book:', selectedBook);
        const { data, error } = await supabase
            .from('books')
            .delete()
            .eq('title', selectedBook.title)
            .eq('username', localStorage.getItem("username"));
        console.log('Supabase delete response:', { data, error });
        if (error) {
            console.error("Error deleting book:", error, { data, error });
            alert("Failed to delete the book.");
        } else {
            console.log(`Book (ID: ${selectedBook.id}) successfully deleted.`);
            alert("Book successfully deleted.");
            fetchBooks();
            setShowPopup(false);
            setSelectedBook(null);
        }
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    return (
        <>
            <div className="shelf-grid">
                {currentBooks.map(book => (
                    <div className="book-card" key={book.id || book.created_at}>
                        <div className="book-menu-icon" onClick={() => {
                            setSelectedBook(book);
                            setShowPopup(true);
                            setEditData({ rating: book.rating, note: book.note });
                        }}>
                            ⋮
                        </div>
                        <h1>{book.title}</h1>
                        <img
                            className="book-image"
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

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        {!editMode ? (
                            <>
                                <h3>Options for "{selectedBook?.title}"</h3>
                                <button onClick={() => setEditMode(true)}>Edit</button>
                                <button onClick={handleDelete}>Delete</button>
                                <button onClick={() => {
                                    setShowPopup(false);
                                    setSelectedBook(null);
                                }}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h3>Edit "{selectedBook?.title}"</h3>
                                <div className="edit-form">
                                    <label>
                                        Rating (0-10):
                                        <input
                                            type="number"
                                            min="0"
                                            max="10"
                                            value={editData.rating}
                                            onChange={(e) => setEditData(prev => ({ ...prev, rating: e.target.value }))}
                                        />
                                    </label>
                                    <label>
                                        Note:
                                        <textarea
                                            value={editData.note}
                                            onChange={(e) => setEditData(prev => ({ ...prev, note: e.target.value }))}
                                        />
                                    </label>
                                    <button onClick={handleEdit}>Save</button>
                                    <button onClick={() => setEditMode(false)}>Back</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

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