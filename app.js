/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
// Personal API Key for OpenWeatherMap API
const apiKey = '&APPID=9b12193677cf5ee5ca0e71929a8c2e08'
const localurl = 'http://localhost:3000'
// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction)

/* Function called by event listener */
async function performAction(e) {
  let newWeather = document.getElementById('zip').value
  let feelings = document.getElementById('feelings').value
  let data = await getWeahter(baseURL, newWeather, apiKey)
  await postData(localurl + '/add', {
    city: data.name,
    temperature: data.main.temp,
    date: newDate,
    userResponse: feelings
  })
  await updateUI()
}

/* Function to fetch Web API Data*/
const getWeahter = async (baseURL, weather, key) => {
  const res = await fetch(baseURL + weather + key)
  try {
    const data = await res.json()
    return data
  } catch (error) {
    console.log('error', error)
  }
}

// Function to POST data to server
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  try {
    const newData = await response.json()
    return newData;
  } catch (error) {
    console.log("error", error)
  }
}

/* Function to update UI */
const updateUI = async () => {
  const request = await fetch(localurl + '/all')
  try {
    const allData = await request.json()
    let mostRecentData = allData[allData.length - 1]
    document.getElementById('city').innerHTML = mostRecentData.city
    document.getElementById('date').innerHTML = mostRecentData.date
    document.getElementById('temp').innerHTML = mostRecentData.temperature
    document.getElementById('content').innerHTML = mostRecentData.userResponse
  } catch (error) {
    console.log("error", error)
  }
}