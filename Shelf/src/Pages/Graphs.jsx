import React, { useState, useEffect } from 'react';
import supabase from "../config/supabaseClient.js";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import NavHotBar from '../Components/NavHotBar.jsx';
import CustomBarChart from '../Components/CustomBarChart.jsx';
import CustomPieChart from '../Components/CustomPieChart.jsx';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6384'];


function Graphs() {
    const [viewState, setViewState] = useState(0);

    const [genreCounts, setGenreCounts] = useState([]);
    const [movieGenreCounts, setMovieGenreCounts] = useState([]);

    useEffect(() => {
        async function getGenreCounts() {
            const { data, error } = await supabase.rpc('count_books_by_genre', {
            username: localStorage.getItem('username')
            });

            if (error) {
                console.error('Error fetching genre:', error);
            } else {
                const cleanedData = data
                .filter(item => item.genre && item.genre !== '{}')
                .map(item => ({
                    ...item,
                    genre: item.genre.replace(/[{""}]/g, '')
                }));
                setGenreCounts(cleanedData);
            }
        }
        getGenreCounts();
        

    }, []);

    useEffect(() => {
        async function getMovieGenreCounts() {
            const {data, error} = await supabase.rpc("count_movies_by_genre", {username: localStorage.getItem('username')});

            if (error) {
                console.error("Error fetching movie genre: ", error);
            } else {
                const cleanedData = data
                .filter(item => item.genre && item.genre !== "{}")
                .map(item => ({
                    ...item,
                    genre: item.genre.replace(/[{""}]/g, '')
                }));
                setMovieGenreCounts(cleanedData);
            }

        }
        getMovieGenreCounts();
    }, []);

    const onSwitchClick = () => {
    setViewState(1 - viewState);
  }

    //console.log(movieGenreCounts);

    return(
        <div>
            <NavHotBar />
            <button onClick={onSwitchClick}>{"\u21C4"}</button>
            <h1>Books</h1>
            {viewState === 0 ?
            <CustomBarChart genreCounts = {genreCounts}/>
            :
            <CustomPieChart genreCounts={genreCounts}/>
}

            <h1>Movies</h1>
            {viewState === 0 ?
            <CustomBarChart genreCounts = {movieGenreCounts}/>
            :
            <CustomPieChart genreCounts={movieGenreCounts}/>
}
        </div>
    )
}

export default Graphs;