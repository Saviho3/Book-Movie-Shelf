import React from "react";

const DisplayMovieSearchResults = ({ movies }) => {
    if (!movies || movies.length === 0) {
        return <p>b</p>
    }

    return (
    <>
    <p>results</p>
    <div className="grid grid-cols-2 gap-4 p-4">
        {movies.map((movie) => {
            return (
            <div key={movie.id} className="movie-card">
                <h2>{movie.title}</h2>
                {movie.poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
                ) : (
                    <p>No poster available</p>
                )}
            <h4>{movie.overview}</h4>
            </div>
            )
        })}
    </div>
    </>)
}

export default DisplayMovieSearchResults;