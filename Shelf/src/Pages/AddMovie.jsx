import React, { useState } from 'react';
import MovieSearchBar from '../Components/MovieSearchBar';
import DisplayMovieSearchResults from '../Components/DisplayMovieSearchResults';
import { Link } from 'react-router-dom';

const AddMovie = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movieResults, setMovieResults] = useState([]);

    const handleMovieSearch = async (e) => {
        e.preventDefault();
        console.log("Searching for", searchTerm);

        const apiKey = "0497367e7c46bb332aa647de78248c18";
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log("TMDb response:", data);

        setMovieResults(data.results || []);
    }


    return (<><h1>Movie Search:</h1>
    <MovieSearchBar movieSearchHandler={handleMovieSearch} searchTerm={searchTerm} onTextEdit={setSearchTerm}></MovieSearchBar>
    <Link to="/"><button>Cancel</button></Link>
    <DisplayMovieSearchResults movies={movieResults}></DisplayMovieSearchResults>
    </>
    );
}

export default AddMovie;