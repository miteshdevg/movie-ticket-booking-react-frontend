// // // // import React, { useState } from 'react';
// // // // import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// // // // import Auth from './components/Auth';
// // // // import MovieList from './components/MovieList';
// // // // import Cart from './components/Cart';
// // // // import { bookMovie } from './api';

// // // // const App = () => {
// // // //   const [token, setToken] = useState(localStorage.getItem('token') || '');
// // // //   const [bookings, setBookings] = useState([]);

// // // //   const handleBookMovie = async (movieId) => {
// // // //     const booking = await bookMovie(movieId, token);
// // // //     setBookings(prevBookings => [...prevBookings, { movieTitle: booking.movieTitle, qr_code: booking.qr_code }]);
// // // //     return booking;
// // // //   };

// // // //   return (
// // // //     <Router>
// // // //       <Routes>
// // // //         <Route path="/" element={token ? <Navigate to="/movies" /> : <Auth setToken={setToken} />} />
// // // //         <Route path="/movies" element={token ? <MovieList token={token} onBook={handleBookMovie} /> : <Navigate to="/" />} />
// // // //         <Route path="/cart" element={<Cart bookings={bookings} />} />
// // // //       </Routes>
// // // //     </Router>
// // // //   );
// // // // };

// // // // export default App;
// // // import React, { useState } from 'react';
// // // import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// // // import Auth from './components/AuthContext';
// // // import Register from './components/Register'; // Import Register component
// // // import MovieList from './components/MovieList';
// // // import Cart from './components/Cart';
// // // import { bookMovie } from './api';

// // // const App = () => {
// // //   const [token, setToken] = useState(localStorage.getItem('token') || '');
// // //   const [bookings, setBookings] = useState([]);

// // //   const handleBookMovie = async (movieId) => {
// // //     const booking = await bookMovie(movieId, token);
// // //     setBookings(prevBookings => [...prevBookings, { movieTitle: booking.movieTitle, qr_code: booking.qr_code }]);
// // //     return booking;
// // //   };

// // //   return (
// // //     <Router>
// // //       <Routes>
// // //         <Route path="/" element={token ? <Navigate to="/movies" /> : <Auth setToken={setToken} />} />
// // //         <Route path="/register" element={token ? <Navigate to="/movies" /> : <Register />} />
// // //         <Route path="/movies" element={token ? <MovieList token={token} onBook={handleBookMovie} /> : <Navigate to="/" />} />
// // //         <Route path="/cart" element={<Cart bookings={bookings} />} />
// // //       </Routes>
// // //     </Router>
// // //   );
// // // };

// // // export default App;
// // // src/App.js
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { AuthProvider } from './components/AuthContext';
// // import Home from './pages/Home';
// // import Movies from './pages/Movies';
// // import Login from './components/Login';
// // import Signup from './components/Signup';
// // import ProtectedRoute from './components/ProtectedRoute';
// // import './styles/App.css';

// // const App = () => {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<Signup />} />
// //           <ProtectedRoute path="/movies" element={<Movies />} />
// //         </Routes>
// //       </Router>
// //     </AuthProvider>
// //   );
// // };

// // export default App;
// // src/App.js
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { AuthProvider } from './components/AuthContext';
// // import Home from './pages/Home';
// // import Movies from './pages/Movies';
// // import Login from './components/Login';
// // import Signup from './components/Signup';
// // import ProtectedRoute from './components/ProtectedRoute';
// // import './styles/App.css';

// // const App = () => {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<Signup />} />
// //           {/* Use ProtectedRoute for protected routes */}
// //           <ProtectedRoute path="/movies" element={<Movies />} />
// //         </Routes>
// //       </Router>
// //     </AuthProvider>
// //   );
// // };

// // export default App;
// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './components/AuthContext';
// import Home from './pages/Home';
// import Movies from './pages/Movies';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import ProtectedRoute from './components/ProtectedRoute';
// import './styles/App.css';
// const App = () => {
//   const { user } = useAuth();
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route
//             element={user && <Navigate to="/login" replace />} // Redirect if not authenticated
//           />
//           {/* Use ProtectedRoute properly here */}
//           {/* <>

//             <ProtectedRoute path="/movies" element={<Movies />} />
//           </> */}
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// ============================================================================================
// ============================================================================================
// ============================================================================================

// src/App.js
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import Home from './components/Home';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

//   useEffect(() => {
//     // Listen for changes to localStorage to detect login status updates
//     const handleStorageChange = () => {
//       setIsAuthenticated(!!localStorage.getItem('token'));
//     };
//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);
//   console.log("isAuthenticated-->>", isAuthenticated);

//   return (
//     <Router>
//       <Routes>
//         {
//           <>
//             <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
//             <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//             <Route path="/register" element={<Register />} />
//           </>
//         }
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import EditMovie from './components/Editmovies';
import MovieDetails from './components/MovieDetail';
import Cart from './components/Cart';
// import Admin from './components/Admin';
// import MovieDetail from './components/MovieDetail';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies/edit/:id" element={<EditMovie />} />
        {/* <Route path="/movies" element={<Home />} /> */}
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/cart" element={<Cart />} /> {/* Add Cart Route */}
        {/* <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/" />} /> */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
