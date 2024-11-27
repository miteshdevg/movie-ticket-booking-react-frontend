import React from 'react';

const MovieCard = ({ movie, onBook, token }) => {
    const handleBook = async () => {
        const booking = await onBook(movie.id, token);
        alert(`Movie booked! QR Code: ${booking.qr_code}`);
    };

    return (
        <div className="movie-card">
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Duration: {movie.duration} minutes</p>
            <button onClick={handleBook}>Book</button>
        </div>
    );
};

export default MovieCard;
