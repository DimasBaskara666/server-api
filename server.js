const express = require("express");
const app = express();
const port = 3000;

// Function to generate random date between 2010-2020
function randomDate(
  start = new Date(2010, 0, 1),
  end = new Date(2020, 11, 31)
) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Function to format date as timestamp string
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
 
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Function to generate random sensor data
function generateRandomData() {
  // Generate random values for first record
  const date1 = randomDate();
  const record1 = {
    idx: Math.floor(Math.random() * 1000),
    suhu: Math.floor(Math.random() * (38 - 20) + 20), // Random temperature between 20-38
    humid: Math.floor(Math.random() * (40 - 30) + 30), // Random humidity between 30-40
    kecerahan: Math.floor(Math.random() * (30 - 20) + 20), // Random brightness between 20-30
    timestamp: formatDate(date1),
  };

  // Generate random values for second record
  const date2 = randomDate();
  const record2 = {
    idx: Math.floor(Math.random() * 1000),
    suhu: Math.floor(Math.random() * (38 - 20) + 20),
    humid: Math.floor(Math.random() * (40 - 30) + 30),
    kecerahan: Math.floor(Math.random() * (30 - 20) + 20),
    timestamp: formatDate(date2),
  };

  // Generate random min, max, and average temperature
  const suhumin = Math.floor(Math.random() * (25 - 20) + 20); // Random min between 20-25
  const suhumax = Math.floor(Math.random() * (38 - 35) + 35); // Random max between 35-38
  const suhurata = Number(
    (Math.random() * (suhumax - suhumin) + suhumin).toFixed(2)
  );

  // Create month_year records from timestamps
  const monthYear1 = {
    month_year: `${date1.getMonth() + 1}-${date1.getFullYear()}`,
  };
  const monthYear2 = {
    month_year: `${date2.getMonth() + 1}-${date2.getFullYear()}`,
  };

  return {
    suhumax,
    suhumin,
    suhurata,
    nilai_suhu_max_humid_max: [record1, record2],
    month_year_max: [monthYear1, monthYear2],
  };
}

// Initialize data store
let sensorData = generateRandomData();

// Update data every 5 seconds
setInterval(() => {
  sensorData = generateRandomData();
}, 1000);

// API endpoint
app.get("/api/sensor-data", (req, res) => {
  res.json(sensorData);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
