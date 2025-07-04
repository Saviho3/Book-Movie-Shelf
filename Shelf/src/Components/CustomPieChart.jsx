import React from 'react';
import supabase from "../config/supabaseClient.js";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6384', '#4BC0C0', '#36A2EB', '#9966FF', '#FF9F40', 
    '#66FF66', '#FF66CC', '#FF4444', '#33CCFF', '#FFCC00', '#99CC00', '#CC3366', '#6699FF', '#FF9933', '#33FF99'];


function CustomPieChart({genreCounts}) {
    return(
        <>
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
        </>
    )
}

export default CustomPieChart;
