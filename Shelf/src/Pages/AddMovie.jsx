import React, { useState } from 'react';
import MovieSearchBar from '../Components/MovieSearchBar';
import DisplayMovieSearchResults from '../Components/DisplayMovieSearchResults';
import { Link } from 'react-router-dom';
import NavHotBar from '../Components/NavHotBar';

const AddMovie = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movieResults, setMovieResults] = useState([]);

    const handleMovieSearch = async (e) => {
        e.preventDefault();
        console.log("Searching for", searchTerm);

        // IMPORTANT: Set VITE_TMDB_API_KEY in your .env file (do NOT commit .env)
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log("TMDb response:", data);

        setMovieResults(data.results || []);
    }


    return (
    <>
        <NavHotBar />
        <h1 style={{ textAlign: "center", color: "#F0EBD8"}}>Movie Search:</h1>
        <MovieSearchBar movieSearchHandler={handleMovieSearch} searchTerm={searchTerm} onTextEdit={setSearchTerm}></MovieSearchBar>
        <DisplayMovieSearchResults movies={movieResults}></DisplayMovieSearchResults>
    </>
    );
}

export default AddMovie;