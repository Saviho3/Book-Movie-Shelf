import React from 'react'
import {Link} from 'react-router-dom'

function Shelf() {
  return (
    <>
      <h1>Welcome to Home</h1>
      <Link to="/add-book"><button>Add</button></Link>
    </>
  )
}

export default Shelf