import React from 'react'
import {Link} from 'react-router-dom'

function Shelf() {
  return (
    <>
      <h1>Welcome to Shelf</h1>
      <Link to="/add-book"><button>Add Book</button></Link>
      <Link to="add-movie"><button>Add Movie</button></Link>
    </>
  )
}

export default Shelf