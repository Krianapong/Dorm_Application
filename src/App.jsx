import React, { useState, useEffect } from 'react';
import './App.css';
import Pages from './pages/Pages';
import AdminPages from './pages/AdminPages';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        // Simulate fetching user data or role from authentication
        const userRole = await getUserRole(); // Replace with your actual authentication logic

        // Set isAdmin based on userRole
        setIsAdmin(userRole === 'admin');
      } catch (error) {
        setError(error.message || 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, []);

  const getUserRole = async () => {
    // Replace this with your actual authentication logic
    // This is just a placeholder for demonstration purposes
    // For example, you might check the user's role in your authentication state
    // or fetch it from the server.
    return new Promise((resolve) => {
      // Simulate a delay to simulate an asynchronous call
      setTimeout(() => {
        resolve('user'); // Assume a regular user by default
      }, 1000);
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <>{isAdmin ? <AdminPages /> : <Pages />}</>;
}

export default App;
