// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Home() {
//     const [movies, setMovies] = useState([]);
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [newMovie, setNewMovie] = useState({
//         title: '',
//         description: '',
//         release_date: '',
//         duration: '',
//         tickets: 0, // New field for tickets
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         const role = localStorage.getItem('role');
//         setIsAdmin(role === 'admin'); // Only admins can add, update, or delete movies
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         navigate('/login');
//     };

//     const fetchMovies = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/movies');
//             setMovies(response.data);
//         } catch (error) {
//             console.error('Error fetching movies:', error);
//         }
//     };

//     useEffect(() => {
//         fetchMovies();
//     }, []);

//     const handleAddMovie = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/movies/add', newMovie, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setMovies([...movies, response.data]); // Update the movies list with the new movie
//             setNewMovie({
//                 title: '',
//                 description: '',
//                 release_date: '',
//                 duration: '',
//                 tickets: 0, // Reset ticket count
//             });
//         } catch (error) {
//             console.error('Error adding movie:', error);
//         }
//     };

//     const handleDeleteMovie = async (movieId) => {
//         try {
//             await axios.delete(`http://localhost:5000/movies/${movieId}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//             });
//             setMovies(movies.filter((movie) => movie.id !== movieId)); // Remove the deleted movie
//         } catch (error) {
//             console.error('Error deleting movie:', error);
//         }
//     };

//     const handleTicketChange = async (movieId, newTicketCount) => {
//         try {
//             await axios.patch(
//                 `http://localhost:5000/movies/${movieId}`,
//                 { tickets: newTicketCount },
//                 {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//                 }
//             );
//             // Update the movie list with the new ticket count
//             setMovies(movies.map((movie) =>
//                 movie.id === movieId ? { ...movie, tickets: newTicketCount } : movie
//             ));
//         } catch (error) {
//             console.error('Error updating ticket count:', error);
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <h2>Welcome to the Home Page!</h2>
//                 <button onClick={handleLogout}>Logout</button>
//             </div>
//             <h2>Movies List</h2>
//             {isAdmin && (
//                 <div>
//                     <h3>Add a New Movie</h3>
//                     <input
//                         type="text"
//                         placeholder="Title"
//                         value={newMovie.title}
//                         onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Description"
//                         value={newMovie.description}
//                         onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
//                     />
//                     <input
//                         type="date"
//                         placeholder="Release Date"
//                         value={newMovie.release_date}
//                         onChange={(e) => setNewMovie({ ...newMovie, release_date: e.target.value })}
//                     />
//                     <input
//                         type="number"
//                         placeholder="Duration (minutes)"
//                         value={newMovie.duration}
//                         onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
//                     />
//                     <input
//                         type="number"
//                         placeholder="Number of Tickets"
//                         value={newMovie.tickets}
//                         onChange={(e) => setNewMovie({ ...newMovie, tickets: e.target.value })}
//                     />
//                     <button onClick={handleAddMovie}>Add Movie</button>
//                 </div>
//             )}
//             {movies.length > 0 ? (
//                 <ul>
//                     {movies.map((movie) => (
//                         <li key={movie.id}>
//                             <h3>{movie.title}</h3>
//                             <p>{movie.description}</p>
//                             <p>Release Date: {movie.release_date}</p>
//                             <p>Duration: {movie.duration} minutes</p>
//                             <p>Tickets Available: {movie.tickets}</p>
//                             <Link to={`/movies/${movie.id}`}>View Details</Link>
//                             {isAdmin && (
//                                 <div>
//                                     <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
//                                     <Link to={`/movies/edit/${movie.id}`}>Edit</Link>
//                                     <div>
//                                         <button onClick={() => handleTicketChange(movie.id, movie.tickets - 1)} disabled={movie.tickets <= 0}>Reduce Ticket</button>
//                                         <button onClick={() => handleTicketChange(movie.id, movie.tickets + 1)}>Add Ticket</button>
//                                     </div>
//                                 </div>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No movies available.</p>
//             )}
//         </div>
//     );
// }

// export default Home;

// =========================================
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Home() {
//     const [movies, setMovies] = useState([]);
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [newMovie, setNewMovie] = useState({
//         title: '',
//         description: '',
//         release_date: '',
//         duration: '',
//         tickets: 0, // New field for tickets
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         const role = localStorage.getItem('role');
//         setIsAdmin(role === 'admin'); // Only admins can add, update, or delete movies
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         navigate('/login');
//     };

//     const fetchMovies = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/movies');
//             setMovies(response.data);
//         } catch (error) {
//             console.error('Error fetching movies:', error);
//         }
//     };

//     useEffect(() => {
//         fetchMovies();
//     }, []);

//     const handleAddMovie = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/movies/add', newMovie, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setMovies([...movies, response.data]); // Update the movies list with the new movie
//             setNewMovie({
//                 title: '',
//                 description: '',
//                 release_date: '',
//                 duration: '',
//                 tickets: 0, // Reset ticket count
//             });
//         } catch (error) {
//             console.error('Error adding movie:', error);
//         }
//     };

//     const handleDeleteMovie = async (movieId) => {
//         try {
//             await axios.delete(`http://localhost:5000/movies/${movieId}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//             });
//             setMovies(movies.filter((movie) => movie.id !== movieId)); // Remove the deleted movie
//         } catch (error) {
//             console.error('Error deleting movie:', error);
//         }
//     };

//     const handleTicketChange = async (movieId, newTicketCount) => {
//         try {
//             await axios.patch(
//                 `http://localhost:5000/movies/${movieId}`,
//                 { tickets: newTicketCount },
//                 {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//                 }
//             );
//             // Update the movie list with the new ticket count
//             setMovies(movies.map((movie) =>
//                 movie.id === movieId ? { ...movie, tickets: newTicketCount } : movie
//             ));
//         } catch (error) {
//             console.error('Error updating ticket count:', error);
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <h2>Welcome to the Home Page!</h2>
//                 <button onClick={handleLogout}>Logout</button>
//             </div>
//             <h2>Movies List</h2>
//             {isAdmin && (
//                 <div>
//                     <h3>Add a New Movie</h3>
//                     <input
//                         type="text"
//                         placeholder="Title"
//                         value={newMovie.title}
//                         onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Description"
//                         value={newMovie.description}
//                         onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
//                     />
//                     <input
//                         type="date"
//                         placeholder="Release Date"
//                         value={newMovie.release_date}
//                         onChange={(e) => setNewMovie({ ...newMovie, release_date: e.target.value })}
//                     />
//                     <input
//                         type="number"
//                         placeholder="Duration (minutes)"
//                         value={newMovie.duration}
//                         onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
//                     />
//                     <input
//                         type="number"
//                         placeholder="Number of Tickets"
//                         value={newMovie.tickets}
//                         onChange={(e) => setNewMovie({ ...newMovie, tickets: e.target.value })}
//                     />
//                     <button onClick={handleAddMovie}>Add Movie</button>
//                 </div>
//             )}
//             {movies.length > 0 ? (
//                 <ul>
//                     {movies.map((movie) => (
//                         <li key={movie.id}>
//                             <h3>{movie.title}</h3>
//                             <p>{movie.description}</p>
//                             <p>Release Date: {movie.release_date}</p>
//                             <p>Duration: {movie.duration} minutes</p>
//                             <p>Tickets Available: {movie.tickets}</p>
//                             <Link to={`/movies/${movie.id}`}>View Details</Link>
//                             {isAdmin && (
//                                 <div>
//                                     <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
//                                     <Link to={`/movies/edit/${movie.id}`}>Edit</Link>
//                                     <div>
//                                         <button onClick={() => handleTicketChange(movie.id, movie.tickets - 1)} disabled={movie.tickets <= 0}>Reduce Ticket</button>
//                                         <button onClick={() => handleTicketChange(movie.id, movie.tickets + 1)}>Add Ticket</button>
//                                     </div>
//                                 </div>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No movies available.</p>
//             )}
//         </div>
//     );
// }

// export default Home;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Home() {
//     const [movies, setMovies] = useState([]);
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [newMovie, setNewMovie] = useState({
//         title: '',
//         description: '',
//         release_date: '',
//         duration: '',
//         tickets: 0, // New field for tickets
//         image: null, // New field for image
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         const role = localStorage.getItem('role');
//         setIsAdmin(role === 'admin'); // Only admins can add, update, or delete movies
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         navigate('/login');
//     };

//     const fetchMovies = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/movies');
//             setMovies(response.data);
//         } catch (error) {
//             console.error('Error fetching movies:', error);
//         }
//     };

//     useEffect(() => {
//         fetchMovies();
//     }, []);

//     const handleAddMovie = async () => {
//         const formData = new FormData();
//         formData.append('title', newMovie.title);
//         formData.append('description', newMovie.description);
//         formData.append('release_date', newMovie.release_date);
//         formData.append('duration', newMovie.duration);
//         formData.append('tickets', newMovie.tickets);
//         if (newMovie.image) {
//             formData.append('image', newMovie.image);
//         } else {
//             formData.append('image', null);

//         }

//         try {
//             const response = await axios.post('http://localhost:5000/movies/add', formData, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'multipart/form-data', // Ensure the content type is set to multipart/form-data
//                 },
//             });
//             setMovies([...movies, response.data]); // Update the movies list with the new movie
//             setNewMovie({
//                 title: '',
//                 description: '',
//                 release_date: '',
//                 duration: '',
//                 tickets: 0, // Reset ticket count
//                 image: null, // Reset image
//             });
//         } catch (error) {
//             console.error('Error adding movie:', error);
//         }
//     };

//     const handleImageChange = (e) => {
//         setNewMovie({ ...newMovie, image: e.target.files[0] });
//     };

//     const handleDeleteMovie = async (movieId) => {
//         try {
//             await axios.delete(`http://localhost:5000/movies/${movieId}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//             });
//             setMovies(movies.filter((movie) => movie.id !== movieId)); // Remove the deleted movie
//         } catch (error) {
//             console.error('Error deleting movie:', error);
//         }
//     };

//     const handleTicketChange = async (movieId, newTicketCount) => {
//         try {
//             await axios.patch(
//                 `http://localhost:5000/movies/${movieId}`,
//                 { tickets: newTicketCount },
//                 {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//                 }
//             );
//             // Update the movie list with the new ticket count
//             setMovies(movies.map((movie) =>
//                 movie.id === movieId ? { ...movie, tickets: newTicketCount } : movie
//             ));
//         } catch (error) {
//             console.error('Error updating ticket count:', error);
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <h2>Welcome to the Home Page!</h2>
//                 <button onClick={handleLogout}>Logout</button>
//             </div>
//             <h2>Movies List</h2>
//             {isAdmin && (
//                 <div>
//                     <h3>Add a New Movie</h3>
//                     <input
//                         type="text"
//                         placeholder="Title"
//                         value={newMovie.title}
//                         onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Description"
//                         value={newMovie.description}
//                         onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
//                     />
//                     <input
//                         type="date"
//                         placeholder="Release Date"
//                         value={newMovie.release_date}
//                         onChange={(e) => setNewMovie({ ...newMovie, release_date: e.target.value })}
//                     />
//                     <input
//                         type="number"
//                         placeholder="Duration (minutes)"
//                         value={newMovie.duration}
//                         onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
//                     />
//                     <input
//                         type="number"
//                         placeholder="Number of Tickets"
//                         value={newMovie.tickets}
//                         onChange={(e) => setNewMovie({ ...newMovie, tickets: e.target.value })}
//                     />
//                     <input
//                         type="file"
//                         onChange={handleImageChange}
//                     />
//                     <button onClick={handleAddMovie}>Add Movie</button>
//                 </div>
//             )}
//             {movies.length > 0 ? (
//                 <ul>
//                     {movies.map((movie) => (
//                         <li key={movie.id}>
//                             <img src={movie.imageUrl} />
//                             <h3>{movie.title}</h3>
//                             <p>{movie.description}</p>
//                             <p>Release Date: {movie.release_date}</p>
//                             <p>Duration: {movie.duration} minutes</p>
//                             <p>Tickets Available: {movie.tickets}</p>
//                             {movie.image && <img src={`http://localhost:5000/${movie.image}`} alt={movie.title} />}
//                             <Link to={`/movies/${movie.id}`}>View Details</Link>
//                             {isAdmin && (
//                                 <div>
//                                     <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
//                                     <Link to={`/movies/edit/${movie.id}`}>Edit</Link>
//                                     <div>
//                                         <button onClick={() => handleTicketChange(movie.id, movie.tickets - 1)} disabled={movie.tickets <= 0}>Reduce Ticket</button>
//                                         <button onClick={() => handleTicketChange(movie.id, movie.tickets + 1)}>Add Ticket</button>
//                                     </div>
//                                 </div>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No movies available.</p>
//             )}
//         </div>
//     );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import constant from '../constant';

function Home() {
    const [movies, setMovies] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [edit_ID, setEdit_ID] = useState(false);
    const [newMovie, setNewMovie] = useState({
        title: '',
        description: '',
        release_date: '',
        duration: '',
        tickets: 0, // New field for tickets
        image: null, // New field for image
    });
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        setIsAdmin(role === 'admin'); // Only admins can add, update, or delete movies
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const fetchMovies = async () => {
        try {
            const response = await axios.get(`${constant}/movies`);
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleAddMovie = async () => {
        const formData = new FormData();
        formData.append('title', newMovie.title);
        formData.append('description', newMovie.description);
        formData.append('release_date', newMovie.release_date);
        formData.append('duration', newMovie.duration);
        formData.append('tickets', newMovie.tickets);
        if (newMovie.image) {
            formData.append('image', newMovie.image);
        } else {
            formData.append('image', null);
        }

        try {
            const response = await axios.post(`${constant}/movies/add`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMovies([...movies, response.data]); // Update the movies list with the new movie
            setNewMovie({
                title: '',
                description: '',
                release_date: '',
                duration: '',
                tickets: 0,
                image: null,
            });
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    const handleImageChange = (e) => {
        setNewMovie({ ...newMovie, image: e.target.files[0] });
    };

    const handleDeleteMovie = async (movieId) => {
        try {
            await axios.delete(`${constant}/movies/delete/${movieId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setMovies(movies.filter((movie) => movie.id !== movieId)); // Remove the deleted movie
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };
    // const handleEditMovieSubmit = async () => {
    //     const formData = new FormData();
    //     formData.append('title', newMovie.title);
    //     formData.append('description', newMovie.description);
    //     formData.append('release_date', newMovie.release_date);
    //     formData.append('duration', newMovie.duration);
    //     formData.append('tickets', newMovie.tickets);
    //     if (newMovie.image) {
    //         formData.append('image', newMovie.image);
    //     }

    //     try {
    //         const response = await axios.patch(`http://localhost:5000/movies/edit/${edit_ID}`, formData, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`,
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         // Update the movie in the state
    //         setMovies(movies.map((movie) =>
    //             movie.id === edit_ID ? response.data : movie
    //         ));

    //         // Reset the form and edit state
    //         setEdit_ID(false);
    //         setNewMovie({
    //             title: '',
    //             description: '',
    //             release_date: '',
    //             duration: '',
    //             tickets: 0,
    //             image: null,
    //         });
    //     } catch (error) {
    //         console.error('Error editing movie:', error);
    //     }
    // };

    const handleEditMovieSubmit = async () => {
        if (!edit_ID) {
            console.error("No movie selected for editing.");
            return;
        }

        const formData = new FormData();
        formData.append('title', newMovie.title);
        formData.append('description', newMovie.description);
        formData.append('release_date', newMovie.release_date);
        formData.append('duration', newMovie.duration);
        formData.append('tickets', newMovie.tickets);

        if (newMovie.image) {
            formData.append('image', newMovie.image);
        }

        try {
            const response = await axios.put(
                `${constant}/movies/edit/${edit_ID}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Update the movies list
            setMovies(movies.map(movie =>
                movie.id === edit_ID ? { ...movie, ...response.data } : movie
            ));

            // Reset form state
            setNewMovie({
                title: '',
                description: '',
                release_date: '',
                duration: '',
                tickets: 0,
                image: null,
            });
            setEdit_ID(false); // Exit edit mode
        } catch (error) {
            console.error('Error editing movie:', error);
        }
    };

    const handleEditMovie = async (movie) => {
        setNewMovie({
            title: movie.title,
            description: movie.description,
            release_date: movie.release_date,
            duration: movie.duration,
            tickets: movie.tickets_available,
            image: null,
        });
        setEdit_ID(movie.id)

    }
    const handleTicketChange = async (movieId, newTicketCount) => {
        try {
            await axios.patch(
                `${constant}/movies/${movieId}`,
                { tickets: newTicketCount },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            setMovies(movies.map((movie) =>
                movie.id === movieId ? { ...movie, tickets: newTicketCount } : movie
            ));
        } catch (error) {
            console.error('Error updating ticket count:', error);
        }
    };

    return (
        <div style={styles.container}>
            {/* <div style={styles.header}>
                <Link to="/cart" style={styles.cartButton}>Cart</Link> 
                <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>

            </div> */}
            <div style={styles.header}>
                <h2>Welcome to the Home Page!</h2>
                <div>
                    {isAdmin ?
                        <Link to="/cart" style={styles.cartButton}>Scanner</Link>
                        :
                        <Link to="/cart" style={styles.cartButton}>Cart</Link>}
                    {/* Add Cart button */}
                    <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                </div>
            </div>

            {/* <h2>Welcome to the Home Page!</h2>
                <button onClick={handleLogout} style={styles.logoutButton}>Logout</button> */}

            <h2>Movies List</h2>

            {isAdmin && (
                <div style={styles.addMovieForm}>
                    <h3>Add a New Movie</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newMovie.title}
                        onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newMovie.description}
                        onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="date"
                        value={newMovie.release_date}
                        onChange={(e) => setNewMovie({ ...newMovie, release_date: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="number"
                        placeholder="Duration (minutes)"
                        value={newMovie.duration}
                        onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="number"
                        placeholder="Number of Tickets"
                        value={newMovie.tickets}
                        onChange={(e) => setNewMovie({ ...newMovie, tickets: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        style={styles.input}
                    />
                    {/* <button onClick={handleAddMovie} style={styles.addButton}>{edit_ID !== false ? 'Edit Movie' : 'Add Movie'}</button> */}
                    <button
                        onClick={edit_ID !== false ? handleEditMovieSubmit : handleAddMovie}
                        style={styles.addButton}
                    >
                        {edit_ID !== false ? 'Edit Movie' : 'Add Movie'}
                    </button>

                </div>
            )}

            <div style={styles.movieGrid}>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} style={styles.movieCard}>
                            <img
                                src={movie.imageUrl}
                                alt={movie.title}
                                style={styles.movieImage}
                            />
                            <h3>{movie.title}</h3>
                            {/* <p>{movie.description}</p> */}
                            <p>Release Date: {movie.release_date}</p>
                            <p>Duration: {movie.duration} minutes</p>
                            <p>Tickets Available: {movie.tickets_available}</p>
                            <Link to={`/movies/${movie.id}`} style={styles.detailsLink}>View Details</Link>
                            {isAdmin && (
                                <div style={styles.adminActions}>
                                    <button onClick={() => handleDeleteMovie(movie.id)} style={styles.deleteButton}>Delete</button>
                                    <button
                                        onClick={() => { handleEditMovie(movie) }}
                                        // to={`/movies/edit/${movie.id}`}
                                        style={styles.editLink}>Edit</button>
                                    {/* <div>
                                        <button
                                            onClick={() => handleTicketChange(movie.id, movie.tickets - 1)}
                                            disabled={movie.tickets <= 0}
                                            style={styles.ticketButton}
                                        >
                                            Reduce Ticket
                                        </button>
                                        <button
                                            onClick={() => handleTicketChange(movie.id, movie.tickets + 1)}
                                            style={styles.ticketButton}
                                        >
                                            Add Ticket
                                        </button>
                                    </div> */}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No movies available.</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#121212',
        color: '#ffffff',
        padding: '20px',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        marginRight: '10px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '4px',
        textDecoration: 'none',
    },
    logoutButton: {
        backgroundColor: '#ff5722',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '4px',
    },
    addMovieForm: {
        backgroundColor: '#1e1e1e',
        padding: '20px',
        marginTop: '20px',
        borderRadius: '8px',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        backgroundColor: '#333',
        color: '#fff',
        border: '1px solid #444',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '4px',
    },
    movieGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px',
    },
    movieCard: {
        backgroundColor: '#1e1e1e',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    movieImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
    detailsLink: {
        display: 'inline-block',
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '4px',
        textDecoration: 'none',
    },
    adminActions: {
        marginTop: '10px',
    },
    deleteButton: {
        backgroundColor: '#f44336',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        borderRadius: '4px',
    },
    editLink: {
        display: 'inline-block',
        marginLeft: '10px',
        padding: '10px 20px',
        backgroundColor: '#ff9800',
        color: '#fff',
        borderRadius: '4px',
        textDecoration: 'none',
    },
    ticketButton: {
        backgroundColor: '#2196f3',
        color: '#fff',
        padding: '8px 16px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        borderRadius: '4px',
        marginTop: '5px',
    },
};

export default Home;
