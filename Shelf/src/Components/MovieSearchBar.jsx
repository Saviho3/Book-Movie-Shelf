import React, { useState } from "react";

const MovieSearchBar = ({movieSearchHandler, searchTerm, onTextEdit}) => {

    return (
    <>
    <form onSubmit={movieSearchHandler}>
        <input type="text" value={searchTerm} onChange={(e) => onTextEdit(e.target.value)}></input>
        <button type="submit">Search</button>
    </form>
    </>);
}

export default MovieSearchBar;