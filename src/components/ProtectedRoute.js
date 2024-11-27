// // src/components/ProtectedRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const ProtectedRoute = ({ element, ...rest }) => {
//     const { user } = useAuth();

//     return (
//         <Route
//             {...rest}
//             element={user ? element : <Navigate to="/login" />}
//         />
//     );
// };

// export default ProtectedRoute;
// src/components/ProtectedRoute.js
// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
    const { user } = useAuth(); // Get user authentication state

    return (
        <Route
            {...rest}
            element={user ? element : <Navigate to="/login" replace />} // Redirect if not authenticated
        />
    );
};

export default ProtectedRoute;
