// // src/components/Register.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function Register() {
//   const [formData, setFormData] = useState({ username: '', email: '', password: '' });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/register', formData);
//       alert('Registration successful');
//     } catch (error) {
//       alert('Error registering user');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="username"
//         placeholder="Username"
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         onChange={handleChange}
//         required
//       />
//       <button type="submit">Register</button>
//     </form>
//   );
// }

// export default Register;


// src/components/Register.js
import React, { useState, useEffect } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already authenticated
        if (localStorage.getItem('token')) {
            navigate('/'); // Redirect to home if logged in
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            alert('Registration successful! You can now log in.');
            navigate('/login'); // Redirect to login after successful registration
        } catch (err) {
            setError(err.message || 'Failed to register.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Register to Book Your Movie Ticket</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
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
                <button type="submit" style={styles.registerButton}>Register</button>
                {error && <p style={styles.errorMessage}>{error}</p>}
            </form>
            <p style={styles.loginText}>
                Already have an account? <a href="/login" style={styles.link}>Login here</a>
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
    registerButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    errorMessage: {
        color: 'red',
        fontSize: '14px',
        marginTop: '10px',
    },
    loginText: {
        marginTop: '20px',
        fontSize: '14px',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    }
};

export default Register;
