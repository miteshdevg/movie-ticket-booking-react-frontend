// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// function Login({ setIsAuthenticated }) {
//     const [formData, setFormData] = useState({ username: '', password: '' });
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Check if the user is already authenticated
//         if (localStorage.getItem('token')) {
//             navigate('/'); // Redirect to home if logged in
//         }
//     }, [navigate]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/auth/login', {
//                 username: formData.username,
//                 password: formData.password,
//                 email: formData.username
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             localStorage.setItem('token', response?.data?.token);
//             localStorage.setItem('role', response?.data?.role)
//             setIsAuthenticated(true); // Update authentication status
//             navigate('/');
//         } catch (error) {
//             console.log("error-->>", error);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     name="username"
//                     placeholder="Username"
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     name="password"
//                     type="password"
//                     placeholder="Password"
//                     onChange={handleChange}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             <p>
//                 Don't have an account? <Link to="/register">Register here</Link>
//             </p>
//         </div>
//     );
// }

// export default Login;
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already authenticated
        if (localStorage.getItem('token')) {
            navigate('/home'); // Redirect to home if logged in
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simulate the API call here
            const response = await axios.post('http://localhost:5000/auth/login', {
                username: formData.username,
                password: formData.password
            });

            // Simulating saving the response token and role
            localStorage.setItem('token', response?.data?.token);
            localStorage.setItem('role', response?.data?.role);
            setIsAuthenticated(true); // Update authentication status

            // Redirect to home after login
            navigate('/home');
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid username or password. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login to Book Your Movie Ticket</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    name="username"
                    type="text"
                    placeholder="Username or Email"
                    value={formData.username}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.loginButton}>Login</button>
            </form>
            <p style={styles.registerText}>
                Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
            </p>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#121212',
        color: '#fff',
        padding: '40px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '32px',
        marginBottom: '20px',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#1e1e1e',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        backgroundColor: '#2b2b2b',
        color: '#fff',
        border: '1px solid #444',
        borderRadius: '5px',
        fontSize: '16px',
    },
    loginButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    registerText: {
        marginTop: '20px',
        fontSize: '14px',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    }
};

export default Login;
