//1 enable search and link to each city -- open geo and weather apis
var submitBtn = document.getElementById("searchbtn")
var input = document.getElementById("search")


function getWeather(lat, lon) {

    // fetch method provided by browser takes in a String
    // string with `backticks` is called template literal
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5af394d68aa2f9e751588c135cdf10c8`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            let forecastData = []
            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.slice(11, 13) === "12") {
                    console.log(data.list[i])
                    forecastData.push(data.list[i])
                }
            }
            display5day(forecastData)
        })
}
// .then catches response from server after making a request with fetch
// additionally .then takes a function as an argument
function getLatLon() {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input.value}&appid=5af394d68aa2f9e751588c135cdf10c8`)
        .then(function (response) {
            // converting response to readable JSON format for javascript
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            var latitude = data[0].lat
            var longitude = data[0].lon
            getWeather(latitude, longitude);
            getCurrent(data[0].name)

        })
}

function getCurrent(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?appid=5af394d68aa2f9e751588c135cdf10c8&q=${city}&units=imperial`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            displayCurrent(data);
        })
}

function displayCurrent(data) {
    document.getElementById("city-name").textContent = data.name
    let tempEl = document.createElement("p")
    tempEl.textContent = `Temperature: ${data.main.temp} F` //data.main.temp
    let humidityEl = document.createElement("p")
    humidityEl.textContent = `Humidity: ${data.main.humidity} %`
    let windEl = document.createElement("p")
    windEl.textContent = `Wind Speed: ${data.wind.speed} mph`
    document.getElementById("city").append(tempEl, humidityEl, windEl)
}

function display5day(data) {
    let forecastEl = document.getElementById("5day")
    for (let i = 0; i < data.length; i++) {
        var day1 = document.querySelector(`.flexbox-item-${i + 1}`)
        let tempEl = document.createElement("p")
        tempEl.textContent = `Temperature: ${data[i].main.temp} F` //data.main.temp
        let humidityEl = document.createElement("p")
        humidityEl.textContent = `Humidity: ${data[i].main.humidity} %`
        let windEl = document.createElement("p")
        windEl.textContent = `Wind Speed: ${data[i].wind.speed} mph`
        day1.append(tempEl,humidityEl,windEl)
    }
}
//2 when search button is clicked add city to search history using local storage and display info in the dashboard

$(document).ready(function () {
    $(".saveBtn").on("click", function () {
        var city = $(this).parent().attr("id")
        var name = $(this).siblings(".btn").value()
        localStorage.setItem(city, name)
    })

    $("#searchHistory .btn").val(localStorage.getItem("searchBtn"))
})

//3 display weather conditions in the dashboard for chosen city, showing city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed.

//4 display below chosen city 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

//5 when city in search history is clicked displays current and future conditions for that city 

submitBtn.addEventListener("click", getLatLon)
