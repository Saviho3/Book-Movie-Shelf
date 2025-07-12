import React from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from "./Pages/HomePage.jsx"
import Shelf from "./Pages/Shelf.jsx"
import AddBook from "./Pages/AddBook.jsx"
import AddMovie from "./Pages/AddMovie.jsx";
import Graphs from "./Pages/Graphs.jsx"
import './styles/background.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/shelf" element={<Shelf/>} />
        <Route path="/movies" element={<Shelf/>} />
        <Route path="/add-book" element={<AddBook/>} />
        <Route path="/add-movie" element={<AddMovie/>}/>
        <Route path="/graphs" element={<Graphs/>}/>
      </Routes>
    </Router>
  )
}

export default App