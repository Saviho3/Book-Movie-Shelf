import supabase from '../config/supabaseClient.js';
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import BookSearchBar from '../Components/BookSearchBar.jsx'
import DisplaySearchedBooks from '../Components/DisplaySearchedBooks.jsx';

function AddBook() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  async function getBooks(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm.trim())}&maxResults=9`);
    const result = await response.json();
    setBooks(result.items || []);
  }

  async function addBookToShelf(book) {
    const book_id = crypto.randomUUID();
    const username = localStorage.getItem("username");

    const { error } = await supabase.from("books").insert({
      book_id,
      title: book.volumeInfo?.title || "Untitled",
      img: book.volumeInfo?.imageLinks?.thumbnail || "",
      description: book.volumeInfo?.description || "",
      rating: null,
      note: "",
      username
    });

    if (error) {
      alert("Failed to add book.");
      console.error(error);
    } else {
      alert("Book added to shelf!");
    }
  }
  return (
    <>
      <h1>Welcome to Add</h1>
      <BookSearchBar 
      searchTerm = {searchTerm}
      onSearchChange = {setSearchTerm}
      onSearchSubmit={getBooks}/>
      <Link to="/"><button>Cancel</button></Link>
      <DisplaySearchedBooks books={books} onAddBook={addBookToShelf}/>
    </>
  )
}

export default AddBook