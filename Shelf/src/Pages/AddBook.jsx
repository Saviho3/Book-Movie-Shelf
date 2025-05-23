import React from 'react'
import {Link} from 'react-router-dom'

function AddBook() {
  return (
    <>
      <h1>Welcome to Add</h1>
      <Link to="/"><button>Cancel</button></Link>
    </>
  )
}

export default AddBook