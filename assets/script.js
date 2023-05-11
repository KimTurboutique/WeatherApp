//1 enable search and link to each city -- open geo and weather apis

function getWeather(lat, lon) {
    // fetch method provided by browser takes in a String
    // string with `backticks` is called template literal
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5af394d68aa2f9e751588c135cdf10c8`)
    .then(function (response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
    })
}
// .then catches response from server after making a request with fetch
// additionally .then takes a function as an argument
function getLatLon(){
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=orlando&appid=5af394d68aa2f9e751588c135cdf10c8")
    .then(function (response){
        // converting response to readable JSON format for javascript
        return response.json()
    })
    .then(function(data){
        var latitude = data[0].lat
        var longitude = data[0].lon
        getWeather(latitude, longitude);
    })
}

getLatLon();


//2 search history using local storage

//3 display weather conditions in the dashboard for chosen city, showing  city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed.

//4 display below chosen city 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

//5 when city in search history is clicked displays current and future conditions for that city 

