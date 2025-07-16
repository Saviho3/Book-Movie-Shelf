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
      <h1 style={{ textAlign: "center", color: "#F0EBD8"}}>Welcome to Shelf, {localStorage.getItem("username")}</h1>
      
      {viewState === 0 ?
        <>
        <BookShelf />
        </>
        :
        <>
        <MovieShelf />
        </>
      }
      
    </>
  )
}

export default Shelf