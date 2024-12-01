// // MovieDetails.js
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function MovieDetails() {
//     const { id } = useParams(); // Get movie ID from the URL
//     const [movie, setMovie] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchMovieDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/movies/${id}`);
//                 setMovie(response.data);
//             } catch (error) {
//                 console.error('Error fetching movie details:', error);
//             }
//         };

//         fetchMovieDetails();
//     }, [id]);

//     const handleBack = () => {
//         navigate(-1); // Navigate back to the previous page
//     };

//     if (!movie) {
//         return <p>Loading movie details...</p>;
//     }

//     return (
//         <div style={styles.container}>
//             <button onClick={handleBack} style={styles.backButton}>Back</button>

//             <div style={styles.movieDetailsCard}>
//                 <img
//                     src={movie.imageUrl}
//                     alt={movie.title}
//                     style={styles.movieImage}
//                 />
//                 <h2 style={styles.title}>{movie.title}</h2>
//                 <p style={styles.description}>{movie.description}</p>
//                 <p><strong>Release Date:</strong> {movie.release_date}</p>
//                 <p><strong>Duration:</strong> {movie.duration} minutes</p>
//                 <p><strong>Tickets Available:</strong> {movie.tickets_available}</p>
//             </div>
//         </div>
//     );
// }

// const styles = {
//     container: {
//         backgroundColor: '#121212',
//         color: '#ffffff',
//         padding: '20px',
//         minHeight: '100vh',
//         fontFamily: 'Arial, sans-serif',
//     },
//     backButton: {
//         backgroundColor: '#007bff',
//         color: '#fff',
//         padding: '10px 20px',
//         border: 'none',
//         cursor: 'pointer',
//         fontSize: '16px',
//         borderRadius: '4px',
//         marginBottom: '20px',
//     },
//     movieDetailsCard: {
//         backgroundColor: '#1e1e1e',
//         padding: '20px',
//         borderRadius: '8px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     },
//     movieImage: {
//         width: '100%',
//         height: '300px',
//         objectFit: 'cover',
//         borderRadius: '8px',
//         marginBottom: '20px',
//     },
//     title: {
//         fontSize: '24px',
//         marginBottom: '10px',
//     },
//     description: {
//         fontSize: '16px',
//         marginBottom: '20px',
//     },
// };

// export default MovieDetails;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import constant from '../constant';


function MovieDetails() {
    const { id } = useParams(); // Get movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [bookingStatus, setBookingStatus] = useState(null); // Track booking status
    const [numTickets, setNumTickets] = useState(1); // State for number of tickets
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${constant}/movies/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    const handleBook = async () => {
        try {
            if (movie.tickets_available >= numTickets) {
                const response = await axios.post(
                    `${constant}/bookings/book`,
                    { movie_id: id, num_tickets: numTickets }, // Include num_tickets in the request body
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Headers
                    }
                );

                console.log("Booking response:", response);
                setMovie({ ...movie, tickets_available: movie.tickets_available - numTickets })
                swal({
                    title: "Booking Successful!",
                    text: `You have successfully booked ${numTickets} ticket(s) for the movie.`,
                    icon: "success",
                    button: "Great!"
                });
                setBookingStatus('Booking successful!');
            } else {
                swal({
                    title: "Ticket Unavailable",
                    text: `Sorry, there are only ${movie.tickets_available} tickets available for this movie.`,
                    icon: "error",
                    button: "Try Again"
                });
            }

        } catch (error) {
            console.error('Error booking movie:', error);
            setBookingStatus('Booking failed. Please try again.');
        }
    };

    if (!movie) {
        return <p>Loading movie details...</p>;
    }

    return (
        <div style={styles.container}>
            <button onClick={handleBack} style={styles.backButton}>Back</button>

            <div style={styles.movieDetailsCard}>
                <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    style={styles.movieImage}
                />
                <h2 style={styles.title}>{movie.title}</h2>
                <p style={styles.description}>{movie.description}</p>
                <p><strong>Release Date:</strong> {movie.release_date}</p>
                <p><strong>Duration:</strong> {movie.duration} minutes</p>
                <p><strong>Tickets Available:</strong> {movie.tickets_available}</p>

                {/* Input for number of tickets */}
                <div style={styles.ticketInput}>
                    <label htmlFor="numTickets" style={styles.label}>Number of Tickets:</label>
                    <input
                        type="number"
                        id="numTickets"
                        min="1"
                        max={movie.tickets_available}
                        value={numTickets}
                        onChange={(e) => setNumTickets(e.target.value)}
                        style={styles.input}
                    />
                </div>

                {/* Book button */}
                <button onClick={handleBook} style={styles.bookButton}>Book</button>
                {bookingStatus && <p style={styles.statusMessage}>{bookingStatus}</p>}
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
    backButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '4px',
        marginBottom: '20px',
    },
    movieDetailsCard: {
        backgroundColor: '#1e1e1e',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    movieImage: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    title: {
        fontSize: '24px',
        marginBottom: '10px',
    },
    description: {
        fontSize: '16px',
        marginBottom: '20px',
    },
    ticketInput: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    label: {
        marginRight: '10px',
        fontSize: '16px',
    },
    input: {
        width: '50px',
        padding: '5px',
        fontSize: '16px',
        textAlign: 'center',
    },
    bookButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '4px',
        marginTop: '20px',
    },
    statusMessage: {
        marginTop: '10px',
        fontSize: '14px',
        color: 'lightgreen',
    },
};

export default MovieDetails;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function MovieDetails() {
//     const { id } = useParams(); // Get movie ID from the URL
//     const [movie, setMovie] = useState(null);
//     const [bookingStatus, setBookingStatus] = useState(null); // Track booking status
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchMovieDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/movies/${id}`);
//                 setMovie(response.data);
//             } catch (error) {
//                 console.error('Error fetching movie details:', error);
//             }
//         };

//         fetchMovieDetails();
//     }, [id]);

//     const handleBack = () => {
//         navigate(-1); // Navigate back to the previous page
//     };

//     const handleBook = async () => {
//         try {
//             const response = await axios.post(
//                 `http://localhost:5000/bookings/book`,
//                 { movie_id: id }, // Body of the POST request
//                 {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Headers
//                 }
//             );

//             console.log("response----???", response);

//             setBookingStatus('Booking successful!');
//         } catch (error) {
//             console.error('Error booking movie:', error);
//             setBookingStatus('Booking failed. Please try again.');
//         }
//     };
//     if (!movie) {
//         return <p>Loading movie details...</p>;
//     }

//     return (
//         <div style={styles.container}>
//             <button onClick={handleBack} style={styles.backButton}>Back</button>

//             <div style={styles.movieDetailsCard}>
//                 <img
//                     src={movie.imageUrl}
//                     alt={movie.title}
//                     style={styles.movieImage}
//                 />
//                 <h2 style={styles.title}>{movie.title}</h2>
//                 <p style={styles.description}>{movie.description}</p>
//                 <p><strong>Release Date:</strong> {movie.release_date}</p>
//                 <p><strong>Duration:</strong> {movie.duration} minutes</p>
//                 <p><strong>Tickets Available:</strong> {movie.tickets_available}</p>

//                 {/* Book button */}
//                 <button onClick={handleBook} style={styles.bookButton}>Book</button>
//                 {bookingStatus && <p style={styles.statusMessage}>{bookingStatus}</p>}
//             </div>
//         </div>
//     );
// }

// const styles = {
//     container: {
//         backgroundColor: '#121212',
//         color: '#ffffff',
//         padding: '20px',
//         minHeight: '100vh',
//         fontFamily: 'Arial, sans-serif',
//     },
//     backButton: {
//         backgroundColor: '#007bff',
//         color: '#fff',
//         padding: '10px 20px',
//         border: 'none',
//         cursor: 'pointer',
//         fontSize: '16px',
//         borderRadius: '4px',
//         marginBottom: '20px',
//     },
//     movieDetailsCard: {
//         backgroundColor: '#1e1e1e',
//         padding: '20px',
//         borderRadius: '8px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     },
//     movieImage: {
//         width: '100%',
//         height: '300px',
//         objectFit: 'cover',
//         borderRadius: '8px',
//         marginBottom: '20px',
//     },
//     title: {
//         fontSize: '24px',
//         marginBottom: '10px',
//     },
//     description: {
//         fontSize: '16px',
//         marginBottom: '20px',
//     },
//     bookButton: {
//         backgroundColor: '#28a745',
//         color: '#fff',
//         padding: '10px 20px',
//         border: 'none',
//         cursor: 'pointer',
//         fontSize: '16px',
//         borderRadius: '4px',
//         marginTop: '20px',
//     },
//     statusMessage: {
//         marginTop: '10px',
//         fontSize: '14px',
//         color: 'lightgreen',
//     },
// };

// export default MovieDetails;
