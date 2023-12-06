// Cost.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const Cost = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.thingspeak.com/channels/2366489/fields/1.json?results=2"
        );

        const data = response.data.feeds;
        const labels = data.map((entry) => entry.created_at);
        const values = data.map((entry) => parseFloat(entry.field1));

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Cost Data",
              data: values,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>ThingSpeak Data Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Cost;
