
//create a function called searchWeather
function searchWeather() {

// Create a variable called `searchCity` that will use `document.querySelector()` to target the `id` of the input
// Use `.value` to capture the value of the input and store it in the variable
const searchCity = document.querySelector("#city-input").value


fetch (`http://api.openweathermap.org/geo/1.0/direct?q=`+
searchCity +
`&limit=5&appid=75cb3a1aef14540eff42305c1ab0888d`)


.then(function(response) {
  return response.json();
})
.then(function(response) {
  console.log(response[0])

  //create a variable for latitude and longitude
  const lat = response[0].lat
  console.log(lat)

  const lon = response[0].lon
  console.log(lon)

  const cityName = response[0].name
  console.log(cityName)
return fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=` + 
 lat +
 `&lon=` +
 lon +
 `&units=imperial&exclude={part}&appid=75cb3a1aef14540eff42305c1ab0888d`)


 .then(function(response) {
     return response.json();
   })
   .then(function(response) {
     console.log(response);
  
   
    //convert dt time to local time
    let utcTime = response.current.dt*1000
      console.log(utcTime)
    var local_date = moment.utc(utcTime).local().format('MM-DD-YYYY')
      console.log(local_date)

      //create variable for icon
      let weatherIcon = response.current.weather[0].icon
      console.log(weatherIcon)
      iconEl = document.querySelector("#current-pic")
      iconEl.setAttribute('src', "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")
      
      // Display the city name in the span input
    const cityEl = document.querySelector("#city-name")
    cityEl.textContent = cityName + " " + "(" + local_date + ")"
      
      
     //create a variable to hold the temperature
  const temp = response.current.temp
  console.log(temp)
     //Display the temperature
  const tempEl = document.querySelector("#temperature")
  tempEl.textContent =("Temp:" + " " + temp + "°F")

  //create a variable to hold the wind
  const wind = response.current.wind_speed
  console.log(wind)
    //Display the wind speed in MPH
  const windEl = document.querySelector("#wind-speed")
  windEl.textContent = ("Wind:" + " " + wind + "MPH")
  
  //create a variable to hold the humidity
  const humidity = response.current.humidity
  console.log(humidity)
    //Display the humidity in %
  const humidityEl = document.querySelector("#humidity")
  humidityEl.textContent = ("Humidity:" + " " + humidity + "%")

  //create a variable to hold the UV index
  const uvIndex = response.current.uvi
  console.log(uvIndex)
    //Display the uv index
  const uvIndexEl = document.querySelector("#UV-index")
  uvIndexEl.textContent = ("UV" + " " + "Index:" + " " + uvIndex)


  //create variables for the 5 day forecast

})
})

}

// .then(function(wikiResponse) {
//   return wikiResponse.json();
// })
// .then(function(wikiResponse) {
//   console.log(wikiResponse)
//   // Create a variable to hold the title of the Wikipedia article
//   // YOUR CODE HERE
//   var title = wikiResponse.query.random[0].title
//   
//   // YOUR CODE HERE
//   var headingEl = document.createElement("h2")
//   headingEl.textContent = title
//   var responseEl = document.getElementById("response-container")
//   responseEl.innerHTML = ""
//   responseEl.appendChild(headingEl)
//   var rating = document.getElementById("rating").nodeValue
//   return fetch( 'https://api.giphy.com/v1/gifs/search?q=' +
//   searchTerm +
//   '&rating=' +
//   rating +
//   '&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1')
  // Return a fetch request to the Giphy search API with the article title and rating parameters
  // YOUR CODE HERE
  //
  // Remember to add your API key at the end