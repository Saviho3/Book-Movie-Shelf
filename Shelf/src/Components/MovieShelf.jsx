import React, { useState, useEffect } from 'react';
import supabase from "../config/supabaseClient.js";
import "./MovieShelf.css";

const MovieShelf = () => {
  const [userMovies, setUserMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ rating: '', note: '' });
  const moviesPerPage = 9;

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .eq('username', localStorage.getItem("username"));

    if (error) {
      console.error("Error getting user movies: ", error);
    } else {
      setUserMovies(data || []);
    }
  };

  const handleEdit = async () => {
    if (!selectedMovie) return;

    const { data, error } = await supabase
      .from('movies')
      .update({
        rating: editData.rating,
        note: editData.note
      })
      .eq('id', selectedMovie.id)
      .eq('username', localStorage.getItem("username"));

    if (error) {
      console.error("Error updating movie:", error);
      alert("Failed to update the movie.");
    } else {
      alert("Movie successfully updated.");
      fetchMovies();
      setEditMode(false);
      setShowPopup(false);
      setSelectedMovie(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedMovie) return;

    const { data, error } = await supabase
      .from('movies')
      .delete()
      .eq('id', selectedMovie.id)
      .eq('username', localStorage.getItem("username"))
      .select();

    if (error || !data || data.length === 0) {
      console.error("Error or no movie deleted:", error, data);
      alert("Failed to delete the movie.");
    } else {
      alert("Movie successfully deleted.");
      fetchMovies();
      setShowPopup(false);
      setSelectedMovie(null);
    }
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = userMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <>
      <div className='movie-grid'>
        {currentMovies.map(movie => (
          <div key={movie.id} className="movie-card">
            <div
              className="movie-options"
              onClick={() => {
                setSelectedMovie(movie);
                setShowPopup(true);
                setEditData({ rating: movie.rating, note: movie.note });
              }}
            >
              ⋮
            </div>
            <h2 className="title-text">{movie.title}</h2>
            {movie.img !== '' ? (
              <img
                src={movie.img}
                alt={movie.title}
                className="movie-image"
              />
            ) : <p>No poster available</p>}
            <p className="overview-text">{movie.description}</p>
            <p className="user-movie-note">
              {movie.rating}/10
              {movie.note && `: ${movie.note}`}
            </p>
          </div>
        ))}
      </div>

      {showPopup && selectedMovie && (
        <div className="popup-overlay">
          <div className="popup-content">
            {!editMode ? (
              <>
                <h3>Options for "{selectedMovie.title}"</h3>
                <button onClick={() => {
                  setEditMode(true);
                  setEditData({ rating: selectedMovie.rating, note: selectedMovie.note });
                }}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => {
                  setShowPopup(false);
                  setSelectedMovie(null);
                }}>Cancel</button>
              </>
            ) : (
              <>
                <h3>Edit "{selectedMovie.title}"</h3>
                <div className="edit-form">
                  <select name="rating options" 
                  id="ratingOptions"
                  value= {editData.rating}
                  onChange={(e)=> setEditData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                  className="popup-select">
                    <option value="" disabled>
                      Out of 10
                    </option>
                    {[...Array(10)].map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>

                  <label>
                    Note:
                    <textarea
                      value={editData.note}
                      onChange={(e) =>
                        setEditData((prev) => ({ ...prev, note: e.target.value }))
                      }
                    />
                  </label>

                  <button onClick={handleEdit}>Save</button>
                  <button onClick={() => setEditMode(false)}>Back</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={indexOfLastMovie >= userMovies.length}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MovieShelf;
