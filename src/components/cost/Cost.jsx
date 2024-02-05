import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Chart = () => {
  const [electricityData, setElectricityData] = useState([]);
  const [waterData, setWaterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDataType, setSelectedDataType] = useState('electricity'); // Declare selectedDataType here
  let unit = ''; // Move the unit definition to a broader scope

  useEffect(() => {
    fetchData('https://api.thingspeak.com/channels/2366489/fields/5.json?', setElectricityData, 'electricity');
    fetchData('https://api.thingspeak.com/channels/2409831/feeds.json?results=100', setWaterData, 'water');
  }, []);

  const fetchData = async (url, setData, dataType) => {
    try {
      const response = await fetch(url);
      const result = await response.json();

      let fieldKey, costPerUnit;
      if (dataType === 'electricity') {
        fieldKey = 'field5';
        unit = 'kWh';
        costPerUnit = 7;
      } else if (dataType === 'water') {
        fieldKey = 'field2';
        unit = 'm³';
        costPerUnit = 4;
      }

      let filteredData;
      if (fieldKey) {
        filteredData = result.feeds.map(feed => ({
          created_at: new Date(feed.created_at).toLocaleTimeString(),
          cumulative_cost: parseFloat(feed[fieldKey]),
          cost: parseFloat(feed[fieldKey]) * costPerUnit,
        }));
      }

      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleGraph = (dataType) => {
    setSelectedDataType(dataType);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: "20px" }}>{selectedDataType === 'electricity' ? 'Electricity' : 'Water'} Data - {currentDate}</h1>
      
      <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: "20px" }}>
        <button
          onClick={() => handleToggleGraph('electricity')}
          style={{ background: selectedDataType === 'electricity' ? '#3498db' : 'transparent', color: selectedDataType === 'electricity' ? '#fff' : '#000' }}
        >
          Show Electricity Usage
        </button>
        <button
          onClick={() => handleToggleGraph('water')}
          style={{ background: selectedDataType === 'water' ? '#3498db' : 'transparent', color: selectedDataType === 'water' ? '#fff' : '#000' }}
        >
          Show Water Consumption
        </button>
      </div>

      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={selectedDataType === 'electricity' ? electricityData : waterData} margin={{ top: 5, right: 20, left: 10, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="created_at" label={{ value: 'Time', position: 'insideBottom', offset: -10 }} />
          <YAxis label={{ value: `Unit (${unit})`, angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cumulative_cost" name={`${selectedDataType === 'electricity' ? 'Electricity' : 'Water'} (unit )`} stroke="#3498db" />
          <Line type="monotone" dataKey="cost" name="Cost (THB)" stroke="#e74c3c" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
