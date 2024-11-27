import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditMovie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({ title: '', description: '', release_date: '', duration: '' });
    const isAdmin = localStorage.getItem('role') === 'admin'; // Verify if the user is an admin

    useEffect(() => {
        if (!isAdmin) {
            navigate('/'); // Redirect non-admin users to the home page
            return;
        }
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/movies/${id}`);
                setMovieData(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };
        fetchMovie();
    }, [id, isAdmin, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/movies/${id}`, movieData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            navigate('/'); // Redirect back to home page after update
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    return (
        <div>
            <h2>Edit Movie</h2>
            <form onSubmit={handleUpdate}>
                <input
                    name="title"
                    value={movieData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <input
                    name="description"
                    value={movieData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    name="release_date"
                    type="date"
                    value={movieData.release_date}
                    onChange={handleChange}
                    required
                />
                <input
                    name="duration"
                    type="number"
                    value={movieData.duration}
                    onChange={handleChange}
                    placeholder="Duration (minutes)"
                    required
                />
                <button type="submit">Update Movie</button>
            </form>
        </div>
    );
}

export default EditMovie;
