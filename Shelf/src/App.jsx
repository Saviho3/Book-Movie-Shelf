import React from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import Shelf from "./Pages/Shelf.jsx"
import AddBook from "./Pages/AddBook.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shelf/>} />
        <Route path="/add-book" element={<AddBook/>} />
      </Routes>
    </Router>
  )
}

export default App