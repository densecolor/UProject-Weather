// Setup Server
// Setup empty JS object to act as endpoint for all routes
projectData = []
// Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express ()
/* Dependencies */
const bodyParser = require('body-parser')
const cors = require('cors')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));
const port = 3000
// Spin up the server
const server = app.listen(port, listening)
function listening() {
  console.log(port)
}
//GET ROUTE send data
app.get('/all', getData)

function getData(req, res) {
  res.send(projectData)
}
//POST ROUTE post received data
app.post('/add', addWeather)

function addWeather(req, res) {
  newEntry = {
    city: req.body.city,
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse
  }
  projectData.push(newEntry)
  res.send(projectData)
}