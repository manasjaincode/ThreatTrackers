const express = require('express');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const app = express();
const port = 3000;

app.get('/api/data', (req, res) => {
  try {
    // Load and parse the CSV file
    const filePath = path.join(process.cwd(), 'public', 'dummy_water_management_data.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsedData = Papa.parse(fileContent, { header: true, dynamicTyping: true }).data;

    // Convert to required format
    const data = parsedData.map(row => ({
      Timestamp: new Date(row.Timestamp),
      Water_Usage_Liters: row.Water_Usage_Liters,
    }));

    // Aggregate daily data
    const dailyDataMap = data.reduce((acc, curr) => {
      const date = curr.Timestamp.toISOString().split('T')[0];
      if (!acc[date]) acc[date] = 0;
      acc[date] += curr.Water_Usage_Liters;
      return acc;
    }, {});

    const dailyData = Object.keys(dailyDataMap).map(date => ({
      Date: date,
      Total_Water_Usage_Liters: dailyDataMap[date],
    }));

    // Create lag features
    dailyData.forEach((row, index) => {
      if (index >= 3) {
        row.Lag_1 = dailyData[index - 1].Total_Water_Usage_Liters;
        row.Lag_2 = dailyData[index - 2].Total_Water_Usage_Liters;
        row.Lag_3 = dailyData[index - 3].Total_Water_Usage_Liters;
      } else {
        row.Lag_1 = row.Lag_2 = row.Lag_3 = null;
      }
    });

    const filteredData = dailyData.slice(3).filter(row => row.Lag_1 !== null);

    const X = filteredData.map(row => [row.Lag_1, row.Lag_2, row.Lag_3]);
    const y = filteredData.map(row => row.Total_Water_Usage_Liters);

    // For simplicity, we're not training a model here. Just returning the data.
    const response = {
      TestSetPredictions: [], // Placeholder for actual predictions
      ActualValues: y,
      MeanAbsoluteError: 0, // Placeholder for actual MAE
      DailyData: filteredData,
    };

    res.json(response);
  } catch (error) {
    console.error('Error processing data:', error);
    res.status(500).json({ error: 'Error processing data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
