import React, { useState, useEffect } from 'react';
import supabase from "../config/supabaseClient.js";

function BookShelf() {
    const [books, setBooks] = useState([]);
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
    return (
        <>
            {books.map(book => (
                <div key={book.id || book.created_at} style={{ margin: '10px' }}>
                    <img
                    src={book.img}
                    alt={book.title}
                    style={{ width: '120px', height: 'auto', borderRadius: '4px' }}
                    />
                    <p>{book.title}</p>
                </div>
                ))}
        </>
    );
}

export default BookShelf;