import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BookShelf from '../Components/BookShelf.jsx'
import MovieShelf from '../Components/MovieShelf.jsx'
import NavHotBar from '../Components/NavHotBar.jsx'


function Shelf() {
  const [searchParams] = useSearchParams();
  const [viewState, setViewState] = useState(0);
  
  useEffect(() => {
    const param = searchParams.get("view");
    setViewState(param === "movies" ? 1 : 0);
  },[searchParams]);

  const onSwitchClick = () => {
    setViewState(1 - viewState);
  }

  return (
    <>
      <NavHotBar />
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
      <Link to="/graphs"><button>to graphs</button></Link>
    </>
  )
}

export default Shelf