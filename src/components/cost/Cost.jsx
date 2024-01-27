import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const years = [2021, 2022, 2023];

const chartContainerStyle = {
  margin: '20px',
  padding: '20px',
};

const dropdownContainerStyle = {
  marginBottom: '20px',
  alignSelf: 'flex-end',
};

export default function SimpleLineChart() {
  const [selectedYear, setSelectedYear] = React.useState(years[0]);
  const [electricityData, setElectricityData] = React.useState([]);
  const [waterData, setWaterData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const fetchData = async (url, setData, dataType) => {
    try {
      const response = await fetch(url);
      const result = await response.json();

      // Filter data based on the correct field for each type
      let filteredData;
      if (dataType === 'electricity') {
        filteredData = result.feeds.filter(feed => !isNaN(parseFloat(feed.field5)));
      } else if (dataType === 'water') {
        filteredData = result.feeds.filter(feed => !isNaN(parseFloat(feed.field1)));
      }

      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData('https://api.thingspeak.com/channels/429105/fields/5.json?', setElectricityData, 'electricity');
  }, []);

  React.useEffect(() => {
    fetchData('https://api.thingspeak.com/channels/624218/fields/1.json?', setWaterData, 'water');
  }, []);

  // แปลงค่าไฟจาก Volt และ Watt เป็น Ampere
  const electricityValues = electricityData.map((feed) => parseFloat(feed.field5)) || [];
  const voltage = 220; // แรงดันไฟฟ้า (Volt)
  const electricityCurrentValues = electricityValues.map((power) => (power / voltage)*7) || [];

  // แปลงค่าน้ำจากลิตรเป็นคิวบิกเมตร
  const waterValues = waterData.map((feed) => parseFloat(feed.field1) * 0.001) || [];

  return (
    <div style={chartContainerStyle}>
      <div style={dropdownContainerStyle}>
        <label htmlFor="yearDropdown">Select Year: </label>
        <select id="yearDropdown" value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <LineChart
          width={1400}
          height={600}
          series={[
            {
              data: electricityCurrentValues,
              label: `$ค่าไฟ (฿บาท) - ${selectedYear}`,
              key: 'electricityCurrent',
            },

            {
              data: waterValues,
              label: `$ค่าน้ำ (คิวบิกเมตร) - ${selectedYear}`,
              key: 'water',
            },
          ]}
          xAxis={[{ scaleType: 'point', data: electricityValues.map((_, index) => index + 1) }]}
        />
      )}
    </div>
  );
}
