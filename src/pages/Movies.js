// src/pages/Movies.js
import React from 'react';
import MovieList from '../components/MovieList';
import { useAuth } from '../components/AuthContext';

const Movies = () => {
    const { user } = useAuth();

    return (
        <div>
            {user ? <MovieList /> : <p>Please log in to see the movie list.</p>}
        </div>
    );
};

export default Movies;
