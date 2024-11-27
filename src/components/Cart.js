// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import QRCode from 'react-qr-code';

// function Cart() {
//     const [bookedMovies, setBookedMovies] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBookedMovies = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/bookings/cart', {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//                 });
//                 setBookedMovies(response.data);
//             } catch (error) {
//                 console.error('Error fetching booked movies:', error);
//             }
//         };

//         fetchBookedMovies();
//     }, []);

//     return (
//         <div style={styles.container}>
//             <h2 style={styles.title}>Your Booked Movies</h2>
//             {bookedMovies.length > 0 ? (
//                 <div style={styles.grid}>
//                     {bookedMovies.map((movie) => (
//                         <div key={movie.id} style={styles.card}>
//                             <h3>{movie.title}</h3>
//                             <p>Booking Date: {movie.bookingDate}</p>

//                             {movie.qr_code && typeof movie.qr_code === 'string' ? (
//                                 <QRCode
//                                     size={256}
//                                     style={{ height: "auto", maxWidth: "100%", width: "100%" }}
//                                     value={movie.qr_code}
//                                     viewBox={`0 0 256 256`}
//                                 />
//                             ) : (
//                                 <p>QR Code not available or invalid</p>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p style={styles.noMovies}>No booked movies yet.</p>
//             )}
//             <button onClick={() => navigate('/')} style={styles.backButton}>
//                 Back to Home
//             </button>
//         </div>
//     );
// }

// const styles = {
//     container: {
//         padding: '20px',
//         color: '#fff',
//         backgroundColor: '#121212',
//         minHeight: '100vh',
//         fontFamily: 'Arial, sans-serif',
//     },
//     title: {
//         fontSize: '24px',
//         marginBottom: '20px',
//         textAlign: 'center',
//     },
//     grid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//         gap: '20px',
//     },
//     card: {
//         backgroundColor: 'red',
//         padding: '20px',
//         borderRadius: '8px',
//         textAlign: 'center',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     },
//     qrCode: {
//         width: '100%',
//         height: '200px',
//         objectFit: 'cover',
//         borderRadius: '8px',
//         marginTop: '10px',
//     },
//     noMovies: {
//         textAlign: 'center',
//         marginTop: '20px',
//         fontSize: '18px',
//     },
//     backButton: {
//         marginTop: '20px',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         padding: '10px 20px',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         display: 'block',
//         marginLeft: 'auto',
//         marginRight: 'auto',
//     },
// };

// export default Cart;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'react-qr-code';
import { QrScanner } from 'react-qrcode-scanner-mi';  // Correct named import

function Cart() {
    const [bookedMovies, setBookedMovies] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [scannedData, setScannedData] = useState(null);  // Store the scanned QR code value
    const navigate = useNavigate();
    console.log("scannedData-->>>", scannedData);

    useEffect(() => {
        const role = localStorage.getItem('role');
        setIsAdmin(role === 'admin'); // Only admins can add, update, or delete movies

        const fetchBookedMovies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/bookings/cart', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setBookedMovies(response.data);
            } catch (error) {
                console.error('Error fetching booked movies:', error);
            }
        };

        fetchBookedMovies();
    }, []);


    const handleScan = async (data) => {
        if (data) {
            setScannedData(data); // Set the scanned QR code value to state

            try {
                const response = await axios.post(
                    'https://55sa85tdki.execute-api.us-east-1.amazonaws.com/dev',
                    { qr_code: data }, // Send the scanned QR code to the backend
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    }
                );

                // Check the response status and handle accordingly
                if (response.status === 200) {
                    alert('QR code verified successfully!');
                } else if (response.status === 400) {
                    alert('QR code is required.');
                } else if (response.status === 404) {
                    alert('No booking found for the given QR code.');
                } else if (response.status === 500) {
                    alert('Server error occurred. Please try again later.');
                } else {
                    alert('An unexpected error occurred. Please try again.');
                }
            } catch (error) {
                // Check for specific error details
                if (error.response) {
                    // Server responded with a status outside 2xx range
                    console.error('Error response:', error.response);
                    alert(`Error: ${error.response.data.message || 'Something went wrong.'}`);
                } else if (error.request) {
                    // Request was made but no response received
                    console.error('Error request:', error.request);
                    alert('No response from the server. Please check your connection.');
                } else {
                    // Something happened while setting up the request
                    console.error('Error message:', error.message);
                    alert('An error occurred while sending the request. Please try again.');
                }
            }
        }
    };

    // This function will be triggered if there's an error while scanning
    const handleError = (err) => {
        console.error("Error scanning QR Code: ", err);
    };

    return (
        <div style={styles.container}>
            {isAdmin ?
                <QrScanner
                    onScan={handleScan}
                    onError={handleError}
                />
                :
                <>
                    <h2 style={styles.title}>Your Booked Movies</h2>
                    {bookedMovies.length > 0 ? (
                        <div style={styles.list}>
                            {bookedMovies.map((movie) => (
                                <div key={movie.id} style={styles.row}>
                                    {/* Poster Image */}
                                    <img
                                        src={movie.imageUrl} // Replace with movie.posterUrl from backend
                                        alt={`${movie.title} Poster`}
                                        style={styles.poster}
                                    />

                                    {/* Movie Details */}
                                    <div style={styles.details}>
                                        {/* Movie Title */}
                                        <p style={styles.movieTitle}>{movie.title}</p>

                                        {/* Movie Description */}
                                        <p style={styles.description}>{movie.description}</p>

                                        {/* Release Date and Number of Tickets */}
                                        <p style={styles.releaseDate}>
                                            <strong>Release Date:</strong> {movie.release_date}
                                        </p>
                                        <p style={styles.releaseDate}>
                                            <strong>Number of Tickets:</strong> {movie.num_tickets}
                                        </p>
                                    </div>
                                    <div style={styles.posterSection}>
                                        {movie.watched === 1 ? (
                                            // Show Poster Image if watched is 1
                                            <img
                                                src={'https://cdn11.bigcommerce.com/s-m0qlmr2tdw/images/stencil/1280x1280/b/apiso4z3y__16641.original.png'}
                                                alt={`${movie.title} Poster`}
                                                style={styles.poster}
                                            />
                                        ) : (
                                            // Show QR Code if watched is 0
                                            <QRCode value={movie.qr_code} size={130} />
                                        )}
                                    </div>
                                    {/* QR Code and Title */}
                                    {/*<div style={styles.qrSection}>
                                        {movie.qr_code && typeof movie.qr_code === 'string' ? (
                                            <QRCode value={movie.qr_code} size={130} />
                                        ) : (
                                            <p style={styles.qrFallback}>QR Code not available</p>
                                        )}
                                    </div> */}
                                    {/* <p style={styles.movieName}>{movie.title}</p> */}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={styles.noMovies}>No booked movies yet. Start exploring now!</p>
                    )}
                </>
            }

            <button onClick={() => navigate('/')} style={styles.backButton}>
                Back to Home
            </button>
        </div >

    );
}

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#121212',
        minHeight: '100vh',
        fontFamily: 'Roboto, Arial, sans-serif',
        color: '#f5f5f5',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '30px',
        textAlign: 'center',
        color: '#e50914',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',  // Ensures QR code is pushed to the right
        alignItems: 'center',
        backgroundColor: '#1c1c1c',
        padding: '15px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    poster: {
        width: '150px',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginRight: '20px',
    },
    details: {
        flex: 1,
        paddingRight: '20px',
        color: '#ccc',
    },
    movieTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '10px',
    },
    description: {
        fontSize: '16px',
        marginBottom: '10px',
        color: '#bbb',
    },
    releaseDate: {
        fontSize: '14px',
        color: '#ccc',
    },
    qrSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        paddingLeft: '20px',  // Adds space between movie details and QR section
    },
    qrFallback: {
        fontSize: '14px',
        color: '#ff5252',
    },
    movieName: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
    },
    noMovies: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#aaa',
        marginTop: '30px',
    },
    backButton: {
        marginTop: '30px',
        backgroundColor: '#e50914',
        color: '#fff',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'block',
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        marginLeft: 'auto',
        marginRight: 'auto',
        transition: 'background-color 0.3s ease',
    },
};


export default Cart;


// This function will be triggered when a QR code is scanned
// const handleScan = (data) => {
//     if (data) {
//         setScannedData(data);  // Set the scanned QR code value to state
//     }
// };

// This function will be triggered when a QR code is scanned
// const handleScan = async (data) => {
//     if (data) {
//         setScannedData(data); // Set the scanned QR code value to state

//         try {
//             const response = await axios.post(
//                 'https://55sa85tdki.execute-api.us-east-1.amazonaws.com/dev',
//                 { qr_code: data }, // Send the scanned QR code to the backend
//                 {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//                 }
//             );

//             if (response.status === 200) {
//                 alert('QR code verified successfully!');
//             } else {
//                 alert('QR code verification failed.');
//             }
//         } catch (error) {
//             console.error('Error verifying QR code:', error);
//             alert('An error occurred while verifying the QR code. Please try again.');
//         }
//     }
// };

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import QRCode from 'react-qr-code';

// function Cart() {
//     const [bookedMovies, setBookedMovies] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBookedMovies = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/bookings/cart', {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//                 });
//                 setBookedMovies(response.data);
//             } catch (error) {
//                 console.error('Error fetching booked movies:', error);
//             }
//         };

//         fetchBookedMovies();
//     }, []);

//     return (
//         <div style={styles.container}>
//             <h2 style={styles.title}>Your Booked Movies</h2>
//             {bookedMovies.length > 0 ? (
//                 <div style={styles.grid}>
//                     {bookedMovies.map((movie) => (
//                         <div key={movie.id} style={styles.card}>
//                             <div style={styles.posterWrapper}>
//                                 <img
//                                     src={movie.posterUrl} // Replace with movie.posterUrl from backend
//                                     alt={`${movie.title} Poster`}
//                                     style={styles.poster}
//                                 />
//                             </div>
//                             <div style={styles.details}>
//                                 <h3 style={styles.movieTitle}>{movie.title}</h3>
//                                 <p style={styles.bookingDate}>Booking Date: {movie.bookingDate}</p>
//                                 {movie.qr_code && typeof movie.qr_code === 'string' ? (
//                                     <div style={styles.qrContainer}>
//                                         <QRCode value={movie.qr_code} size={100} />
//                                     </div>
//                                 ) : (
//                                     <p style={styles.qrFallback}>QR Code not available</p>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p style={styles.noMovies}>No booked movies yet. Start exploring now!</p>
//             )}
//             <button onClick={() => navigate('/')} style={styles.backButton}>
//                 Back to Home
//             </button>
//         </div>
//     );
// }

// const styles = {
//     container: {
//         padding: '20px',
//         backgroundColor: '#0e0e0e',
//         minHeight: '100vh',
//         fontFamily: 'Roboto, Arial, sans-serif',
//         color: '#f5f5f5',
//     },
//     title: {
//         fontSize: '36px',
//         fontWeight: 'bold',
//         marginBottom: '30px',
//         textAlign: 'center',
//         color: '#e50914',
//     },
//     grid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//         gap: '20px',
//         justifyItems: 'center',
//     },
//     card: {
//         backgroundColor: '#1c1c1c',
//         borderRadius: '12px',
//         overflow: 'hidden',
//         boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
//         maxWidth: '300px',
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     posterWrapper: {
//         width: '100%',
//         height: '450px',
//         overflow: 'hidden',
//     },
//     poster: {
//         width: '100%',
//         height: '100%',
//         objectFit: 'cover',
//     },
//     details: {
//         padding: '15px',
//         textAlign: 'center',
//     },
//     movieTitle: {
//         fontSize: '18px',
//         fontWeight: 'bold',
//         color: '#fff',
//         marginBottom: '10px',
//     },
//     bookingDate: {
//         fontSize: '14px',
//         color: '#ccc',
//         marginBottom: '15px',
//     },
//     qrContainer: {
//         marginTop: '10px',
//         backgroundColor: '#fff',
//         padding: '10px',
//         borderRadius: '8px',
//         display: 'inline-block',
//     },
//     qrFallback: {
//         color: '#ff5252',
//         fontSize: '14px',
//         marginTop: '10px',
//     },
//     noMovies: {
//         textAlign: 'center',
//         fontSize: '18px',
//         color: '#aaa',
//         marginTop: '30px',
//     },
//     backButton: {
//         marginTop: '30px',
//         backgroundColor: '#e50914',
//         color: '#fff',
//         padding: '12px 24px',
//         border: 'none',
//         borderRadius: '6px',
//         cursor: 'pointer',
//         display: 'block',
//         fontSize: '16px',
//         fontWeight: 'bold',
//         textTransform: 'uppercase',
//         letterSpacing: '1px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         transition: 'background-color 0.3s ease',
//     },
//     backButtonHover: {
//         backgroundColor: '#b20610',
//     },
// };

// export default Cart;
