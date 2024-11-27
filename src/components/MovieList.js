// import React, { useEffect, useState } from 'react';
// import { fetchMovies } from '../api';
// import MovieCard from './MovieCard';

// const MovieList = ({ token, onBook }) => {
//     const [movies, setMovies] = useState([]);

//     useEffect(() => {
//         const getMovies = async () => {
//             const data = await fetchMovies();
//             setMovies(data);
//         };
//         getMovies();
//     }, []);

//     return (
//         <div>
//             <h1>Movie List</h1>
//             <div className="movie-list">
//                 {movies.map(movie => (
//                     <MovieCard key={movie.id} movie={movie} onBook={onBook} token={token} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MovieList;
// src/components/MovieList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
// import { QRCode } from 'qrcode.react';

const MovieList = () => {
    const { user } = useAuth();
    const [movies, setMovies] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await axios.get('/api/movies');
            setMovies(response.data);
        };
        fetchMovies();
    }, []);

    const handleBook = (movie) => {
        setCart([...cart, movie]);
    };

    return (
        <div>
            <h1>Movie List</h1>
            {movies.map((movie) => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>
                    <button onClick={() => handleBook(movie)}>Book</button>
                </div>
            ))}
            <h2>Your Cart</h2>
            {cart.map((movie) => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>
                    {/* <QRCode value={`Booking for ${movie.title}`} /> */}
                </div>
            ))}
        </div>
    );
};

export default MovieList;
