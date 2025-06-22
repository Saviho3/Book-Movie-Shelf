import React, { useState, useEffect } from 'react';
import supabase from "../config/supabaseClient.js";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6384'];


function Graphs() {
    const [genreCounts, setGenreCounts] = useState([]);

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

    console.log(genreCounts);

    return(
        <div>
            <h1>monkey</h1>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={genreCounts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="genre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart width={400} height={300}>
                    <Pie
                        data={genreCounts}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey = "genre"
                        label

                    >
                        {genreCounts.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/> 
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Graphs;