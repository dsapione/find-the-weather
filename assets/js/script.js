var rowOne = document.getElementById('aside')
var formEl = document.querySelector("#task-form");
var todayEl = document.querySelector("#today");
var savedWeather = JSON.parse(localStorage.getItem("weather")) || []
var savedSearch = JSON.parse(localStorage.getItem("search")) || []

var getWeather = function(cityName) {
	var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=51dd21f901f16b9d693c9921904f8b5a&units=imperial`
	
	fetch(apiUrl).then(function(response) {
		response.json().then(function(data) {
			console.log(data);
			var lat = data.coord.lat
			var lon = data.coord.lon
			savedSearch.push(data)
			localStorage.setItem("search", JSON.stringify(savedSearch))
			getForcast(lat, lon)
			printSaved(savedSearch)
		})
	})	
}

var getForcast = function(lat, lon) {
	var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=51dd21f901f16b9d693c9921904f8b5a&units=imperial`
	
	fetch(apiUrl).then(function(response) {
		response.json().then(function(data) {
			console.log(data)
			savedWeather.push(data)
			localStorage.setItem("weather", JSON.stringify(savedWeather))
			printWeather(savedWeather)
		})
	})
}

var getCity = function() {
	event.preventDefault();
	var city = document.querySelector("input[name='city-name']").value
	console.log(city)
	getWeather(city)
}

var printSaved = function() {
	savedSearch.forEach(element => {
		var mainCard = document.createElement('div')
		mainCard.setAttribute('class', 'card col-10')
		var titleCity = document.createElement('h2')
		titleCity.innerHTML = element.name
		mainCard.appendChild(titleCity)
		rowOne.appendChild(mainCard)
	});
}

var printWeather = function(weather) {
	var container =document.createElement('div')
	var title = document.createElement('h2')
	var weatherIcon = document.createElement('img')
	weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
	titleCity.appendChild(weatherIcon)

}

formEl.addEventListener("submit", getCity);
printSaved()