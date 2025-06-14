import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import BookShelf from '../Components/BookShelf.jsx'
import MovieShelf from '../Components/MovieShelf.jsx'

function Shelf() {
  return (
    <>
      <h1>Welcome to Shelf, {localStorage.getItem("username")}</h1>
      <Link to="/add-book"><button>Add Book</button></Link>
      <Link to="/add-movie"><button>Add Movie</button></Link>
      <MovieShelf />
      
    </>
  )
}

export default Shelf