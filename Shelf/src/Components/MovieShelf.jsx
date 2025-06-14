import React, { useState, useEffect } from 'react';
import supabase from "../config/supabaseClient.js";
import "./MovieShelf.css";

const MovieShelf = () => {
    const [userMovies, setUserMovies] = useState([]);
    const getUserMovies = async () => {
        const {data, error} = await supabase
        .from("movies")
        .select("*")
        .eq("username", localStorage.getItem("username"));

        if (error) {console.log("Error getting user movies: ", error);}
        else {
            console.log("User movies successfully retreived: ", data);
            setUserMovies(data || []);
        }
    }

    useEffect(() => {
        getUserMovies();
    },[])

    return (
    <div className='movie-grid'>
    {userMovies.map(movie => (
        <div key={movie.id} className="movie-card">
        <h2 className="title-text">{movie.title}</h2>
            {movie.img !== '' ? (
            <img
                src={`${movie.img}`}
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
    );
}

export default MovieShelf;