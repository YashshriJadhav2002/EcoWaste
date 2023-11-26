const MyRandomForestRegressor = require('./randomForestModel'); // Adjust the path accordingly



const myModel = new MyRandomForestRegressor(); // Instantiate the model

// Train the model with the loaded data from CSV file
myModel.train('path/to/training_data.csv') // Adjust the path accordingly
  .catch((error) => console.error(error));

// Endpoint to predict using the trained model
app.post('/predict', (req, res) => {
  try {
    const inputFeatures = req.body.inputFeatures;
    const prediction = myModel.predict(inputFeatures);
    res.json({ prediction });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
