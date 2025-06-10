import React, { useState } from "react";
import addItem from '../util/addItem.js';

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
      <div className="grid grid-cols-2 gap-4 p-4">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card border p-4 rounded shadow">
            <h2 className="font-bold mb-2">{movie.title}</h2>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="mb-2"
              />
            ) : <p>No poster available</p>}
            <p className="text-sm text-gray-700">{movie.overview}</p>

            <button
              onClick={() => setPopupMovieID(movie.id)}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 mt-2"
            >
              Add to Supabase
            </button>

            {popupMovieID === movie.id && (
              <div className="mt-2 bg-gray-100 p-2 rounded">
                <textarea
                  placeholder="Your thoughts?"
                  className="w-full border p-1 mt-1 text-sm"
                  onChange={e => setNote(e.target.value)}
                />
                <select
                  className="w-full mt-2 p-1 text-sm"
                  onChange={e => setRating(Number(e.target.value))}
                >
                  {[...Array(10)].map((_, i) =>
                    <option key={i} value={i + 1}>{i + 1}</option>
                  )}
                </select>

                <button
                  onClick={() => handleAdd(movie)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 mt-2"
                >
                  Submit
                </button>
                <button
                  onClick={() => setPopupMovieID(null)}
                  className="text-red-500 text-xs ml-2"
                >
                  Cancel
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
