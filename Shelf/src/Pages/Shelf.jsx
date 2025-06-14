import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import BookShelf from '../Components/BookShelf.jsx'
import MovieShelf from '../Components/MovieShelf.jsx'

function Shelf() {
  const [viewState, setViewState] = useState(0); //0 for books, 1 for movies
  const onSwitchClick = () => {
    setViewState(1 - viewState);
  }
  return (
    <>
      <h1>Welcome to Shelf, {localStorage.getItem("username")}</h1>
      <button onClick={onSwitchClick}>{"\u21C4"}</button>
      {viewState === 0 ?
        <>
        <Link to="/add-book"><button>Add Book</button></Link>
        <BookShelf />
        </>
        :
        <>
        <Link to="/add-movie"><button>Add Movie</button></Link>
        <MovieShelf />
        </>
      }
      
    </>
  )
}

export default Shelf