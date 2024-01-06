import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
const years = [2021, 2022, 2023];

const uData = [
  [10000, 10000, 12000, 12780, 10890, 10390, 10490, 10000, 10000, 10000, 10708, 10089],
  [10500, 10200, 12200, 12980, 10990, 10490, 10590, 10100, 10100, 10100, 10808, 10099],
  [10000, 10500, 12500, 13180, 10090, 10590, 10690, 10200, 10200, 10300, 10908, 10009],
];

const pData = [
  [100, 198, 98, 298, 248, 180, 143, 100, 198, 98, 298, 248],
  [120, 210, 110, 320, 270, 200, 163, 120, 218, 118, 318, 268],
  [150, 240, 140, 350, 300, 230, 193, 150, 248, 148, 348, 298],
];

const uDataUnitPrice = 3.75 / 150; 
const pDataUnitPrice = 3.25;

const calculateCosts = (data, unitPrice) => {
  return data.map((values) => values.map((value) => value * unitPrice));
};

const xLabels = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม',
];

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

  const uCosts = calculateCosts(uData, uDataUnitPrice);
  const pCosts = calculateCosts(pData, pDataUnitPrice);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  return (
    <div style={chartContainerStyle}>
      <div classNamestyle={dropdownContainerStyle}>
        <label htmlFor="yearDropdown">Select Year: </label>
        <select
          id="yearDropdown"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <LineChart
        width={1400}
        height={600}
        series={[
          {
            data: pCosts[years.indexOf(selectedYear)],
            label: `ค่าไฟฟ้า (฿บาท) - ${selectedYear}`,
          },
          {
            data: uCosts[years.indexOf(selectedYear)],
            label: `ค่าน้ำ (฿บาท) - ${selectedYear}`,
          },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </div>
  );
}
