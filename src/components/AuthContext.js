// import React, { useState } from 'react';
// import { loginUser } from '../api';

// const Auth = ({ setToken }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const data = await loginUser({ username, password });
//             setToken(data.token);
//             localStorage.setItem('token', data.token); // Store token in local storage
//         } catch (error) {
//             console.error("Login failed:", error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//             <button type="submit">Login</button>
//         </form>
//     );
// };

// export default Auth;
// src/components/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        const response = await axios.post('/api/login', { username, password });
        setUser(response.data);
        return response.data;
    };

    const signup = async (username, email, password) => {
        const response = await axios.post('/api/signup', { username, email, password });
        setUser(response.data);
        return response.data;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
