import React from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import Shelf from "./Pages/Shelf.jsx"
import AddBook from "./Pages/AddBook.jsx"
import AddMovie from "./Pages/AddMovie.jsx";
import Graphs from "./Pages/Graphs.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shelf/>} />
        <Route path="/add-book" element={<AddBook/>} />
        <Route path="/add-movie" element={<AddMovie/>}/>
        <Route path="/graphs" element={<Graphs/>}/>
      </Routes>
    </Router>
  )
}

export default App