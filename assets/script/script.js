
//create a function called searchWeather
function searchWeather() {

// Create a variable called `searchCity` that will use `document.querySelector()` to target the `id` of the input
// Use `.value` to capture the value of the input and store it in the variable
const searchCity = document.querySelector("#city-input").value


  
fetch (`https://api.openweathermap.org/geo/1.0/direct?q=`+
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
 `&units=imperial&exclude=hourly,minutely&appid=75cb3a1aef14540eff42305c1ab0888d`)


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

      // Display the city name in the span input
      const cityEl = document.querySelector("#city-name")
      cityEl.textContent = cityName + " " + "(" + local_date + ")"
      
      
      //create variable for icon
      let weatherIcon = response.current.weather[0].icon
      console.log(weatherIcon)
      iconEl = document.querySelector("#current-pic")
      iconEl.setAttribute('src', "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")
      
      
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
      const forecastEls = document.querySelectorAll(".forecast");
            for (i=0; i<5; i++) {

              const forecastIndex = i+1
                
              let utcTimeForecast = response.daily[forecastIndex].dt*1000
              console.log(utcTime)
              var date = moment.utc(utcTimeForecast).local().format('MM-DD-YYYY')
              console.log(date)

              forecastEls[i].innerHTML = ""
              
              
                const forecastDateEl = document.createElement("p")
                forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
                forecastDateEl.innerHTML = date
                forecastEls[i].append(forecastDateEl)

                const forecastWeatherEl = document.createElement("img");
                forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.daily[forecastIndex].weather[0].icon + "@2x.png");
                forecastEls[i].append(forecastWeatherEl)

                const forecastTemp = response.daily[forecastIndex].temp.day
                console.log(forecastTemp)
                const forecastTempEl = document.createElement("p")
                forecastTempEl.setAttribute("class","mt-3 mb-0 forecast-temp");
                forecastTempEl.innerHTML = ("Temp:" + " " + forecastTemp + "°F")
                forecastEls[i].append(forecastTempEl)

                const forecastWind = response.daily[forecastIndex].wind_speed
                const forecastWindEl = document.createElement("p")
                forecastWindEl.setAttribute("class","mt-3 mb-0 forecast-wind_speed");
                forecastWindEl.innerHTML = ("Wind:" + " " + forecastWind + "MPH")
                forecastEls[i].append(forecastWindEl)

                const forecastHumidity = response.daily[forecastIndex].humidity
                const forecastHumidityEl = document.createElement("p")
                forecastHumidityEl.setAttribute("class","mt-3 mb-0 forecast-humidity");
                forecastHumidityEl.innerHTML = ("Humidity:" + " " + forecastHumidity + "%")
                forecastEls[i].append(forecastHumidityEl)


            }
            
            
            
            
            //local storage
            //variables for local storage and search menu
            const historyEl = document.getElementById("history");
            let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
                  console.log(searchHistory)
                  checkAppendLength()
                  renderSearchHistory()

            searchHistory.push(searchCity)
            localStorage.setItem("search", JSON.stringify(searchHistory))

             
            
            const clearEl = document.getElementById("clear-history")
            clearEl.addEventListener("click",function() {
              searchHistory = []
              localStorage.clear()
              renderSearchHistory();
          })
                  

            function renderSearchHistory() {
              historyEl.innerHTML = "";
                for (let i=0; i<searchHistory.length; i++) {
                const historyItem = document.createElement("input");
            // <input type
            historyItem.setAttribute("type","text");
            historyItem.setAttribute("readonly",true);
            historyItem.setAttribute("id", "list")
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click",function() {
                searchWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }

      }

      function checkAppendLength() {
      const howManyNewDivs = document.querySelectorAll("#list")
      console.log(howManyNewDivs)

        if(howManyNewDivs.length > 3) {
        howManyNewDivs[0].remove()
        }
      }
            
})
})

}


