// randomForestModel.js

const tf = require('@tensorflow/tfjs');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');


class MyRandomForestRegressor {
    
  constructor() {
    this.model = null;

  }

  // Load training data from a CSV file
  loadTrainingData() {
    return new Promise((resolve, reject) => {
        const trainingData = [];
        const filePath = path.join(__dirname, 'dataset.csv'); // Assumes the file is named 'training_data.csv'

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          // Parse the CSV row into numeric format
          const parsedRow = {
            cost: parseFloat(row.cost),
            Age: parseFloat(row.Age),
            Price: parseFloat(row.Price),
          };
          trainingData.push(parsedRow);
        })
        .on('end', () => {
          console.log('Training data loaded from CSV file');
          resolve(trainingData);
          console.log(trainingData)
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  async train() {
    try {
      // Load training data from the CSV file
      const trainingData = await this.loadTrainingData();

      // Assuming trainingData is an array of objects with properties 'cost', 'Age', and 'Price'
      const features = trainingData.map((dataPoint) => [dataPoint.cost, dataPoint.Age]);
      const labels = trainingData.map((dataPoint) => dataPoint.Price);

      // Create and train the Random Forest Regressor model
      const xs = tf.tensor2d(features);
      const ys = tf.tensor1d(labels);

      // Create and train a simple model using TensorFlow.js
      this.model = tf.sequential();
      this.model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [2] }));
      this.model.add(tf.layers.dense({ units: 1, activation: 'linear' }));  // Adjust units based on the number of values to predict
        
      this.model.compile({ optimizer: tf.train.adam(0.001), loss: 'meanSquaredError' });

      await this.model.fit(xs, ys, {
        epochs: 200,  // Adjust as needed
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`Epoch ${epoch + 1}, Loss: ${logs.loss}`);
          },
        },
      });
    } catch (error) {
      throw new Error(`Error loading training data or training model: ${error.message}`);
    }
  }

  predict(inputFeatures) {
    if (!this.model) {
      throw new Error('Model not trained');
    }

    // Assuming inputFeatures is an object with properties 'cost' and 'Age'
    console.log(" Input features" +inputFeatures)
    const inputTensor = tf.tensor2d([[inputFeatures.cost, inputFeatures.Age]]);
    console.log("inputTensor" , inputTensor)
    console.log('Input Tensor:', inputTensor.arraySync());
    if (!inputFeatures || typeof inputFeatures.cost !== 'number' || typeof inputFeatures.Age !== 'number') {
      console.log('Invalid input features');
    }
    const prediction = this.model.predict(inputTensor);
    console.log("Predicted value ",prediction)
    console.log('Raw Prediction:', prediction.arraySync());
    return prediction.dataSync()[0];
  }
}


module.exports = MyRandomForestRegressor;