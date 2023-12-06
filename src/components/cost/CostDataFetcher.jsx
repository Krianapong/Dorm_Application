// CostDataFetcher.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CostDataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('BT7QJK73CKFEOV35');
        setData(response.data.feeds);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render your component with the fetched data
  return (
    <div>
      {data.map((item) => (
        // Render your data here
        <div key={item.entry_id}>{/* Render individual item */}</div>
      ))}
    </div>
  );
};

export default CostDataFetcher;
