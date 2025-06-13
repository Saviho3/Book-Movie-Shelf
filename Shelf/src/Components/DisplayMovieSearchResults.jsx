import React, { useState } from "react";
import addItem from '../util/addItem.js';
import './DisplayMovieSearchResults.css';

//api doesnt return director name when you look up a movie. i added a call  for it
async function fetchDirector(movieId) {
  const apiKey = "0497367e7c46bb332aa647de78248c18";
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
  );
  const { crew } = await res.json();
  const director = crew.find(p => p.job === "Director");
  return director?.name || "Unknown";
} 
//allows us to use text ids in supabase to match formating we have in supabase with books
const GENRE_LOOKUP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

const DisplayMovieSearchResults = ({ movies }) => {
  const [popupMovieID, setPopupMovieID] = useState(null);
  const [rating, setRating] = useState(1);
  const [note, setNote] = useState("");

  const handleAdd = async (movie) => {
    const directorName = await fetchDirector(movie.id);
    const item = {
        id: movie.id,
        title: movie.title || 'Untitled',
        director: directorName,
        genre: movie.genre_ids?.map(id => GENRE_LOOKUP[id]).join(', ') || '',
        img: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '',
        username: localStorage.getItem('username'),
        description: movie.overview || '',
        rating: rating || null,
        note: note || null,
};


    console.log('🎬 Sending to Supabase:', item);
    const result = await addItem(item, 'movies'); // specify 'movies' table

    if (result) alert(`✅ "${item.title}" added!`);
    else alert(`❌ Failed to add "${item.title}".`);

    setPopupMovieID(null);
  };

  if (!movies || movies.length === 0) return <p>No movies found.</p>;

  return (
    <>
      <p>Search Results</p>
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <h2 className="title-text">{movie.title}</h2>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-image"
              />
            ) : <p>No poster available</p>}
            <p className="overview-text">{movie.overview}</p>

            <button
              onClick={() => setPopupMovieID(movie.id)}
              className="add-button"
            >
              Add to Supabase
            </button>

            {popupMovieID === movie.id && (
              <div className="popup">
                    <button
                      onClick={() => setPopupMovieID(null)}
                      className="cancel-button"
                    >
                      x
                    </button>
                <input
                  placeholder="How did you feel about this movie?"
                  className="popup-review-text"
                  onChange={e => setNote(e.target.value)}
                />
                <select
                  className="popup-rating-select"
                  onChange={e => setRating(Number(e.target.value))}
                >
                  {[...Array(10)].map((_, i) =>
                    <option key={i} value={i + 1}>{i + 1}</option>
                  )}
                </select>

                <button
                  onClick={() => handleAdd(movie)}
                  className="popup-add-button"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayMovieSearchResults;
