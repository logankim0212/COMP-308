//
//https://github.com/PacktPublishing/Hands-on-Machine-Learning-with-TensorFlow.js/tree/master/Section5_4
//
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
//load iris training and testing data
const iris = require('./iris.json');
const irisTesting = require('./iris-testing.json');
//
// convert/setup our data for tensorflow.js
//
//tensor of features for training data
const trainingData = tf.tensor2d(iris.map(item => [
    item.sepal_length, item.sepal_width, item.petal_length, item.petal_width,
]))
//tensor of output for training data
const outputData = tf.tensor2d(iris.map(item => [
    item.species === "setosa" ? 1 : 0,
    item.species === "virginica" ? 1 : 0,
    item.species === "versicolor" ? 1 : 0,
]))
//
//tensor of features for testing data
const testingData = tf.tensor2d(irisTesting.map(item => [
    item.sepal_length, item.sepal_width, item.petal_length, item.petal_width,
]))

// build neural network using a sequential model
const model = tf.sequential()
//add the first layer
model.add(tf.layers.dense({
    inputShape: [4], // four input neurons
    activation: "sigmoid",
    units: 5, //dimension of output space (first hidden layer)
}))
//add the hidden layer
model.add(tf.layers.dense({
    inputShape: [5], //dimension of hidden layer
    activation: "sigmoid",
    units: 3, //dimension of final output
}))
//add output layer
model.add(tf.layers.dense({
    activation: "sigmoid",
    units: 3, //dimension of final output
}))
//compile the model with an MSE loss function and Adam algorithm
model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.adam(.06),
})
// train/fit the model for the fixed number of epochs
const startTime = Date.now()
model.fit(trainingData, outputData, { epochs: 100 })
    .then((history) => {
        //console.log(history)
        //display prediction results for the inpud samples
        model.predict(testingData).print()
        elapsedTime = Date.now() - startTime;
        console.log(elapsedTime)

    })
// test network