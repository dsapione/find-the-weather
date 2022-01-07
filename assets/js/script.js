var rowOne = document.getElementById('row-1')
var formEl = document.querySelector("#task-form");


var getWeather = function(cityName) {
	var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=51dd21f901f16b9d693c9921904f8b5a&units=imperial`

	fetch(apiUrl).then(function(response) {
		response.json().then(function(data) {
			console.log(data);
			var mainCard = document.createElement('div')
			mainCard.setAttribute('class', 'card col-10')
			var titleCity = document.createElement('h2')
			titleCity.innerHTML = data.name
			var weatherIcon = document.createElement('img')
			weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
			titleCity.appendChild(weatherIcon)
			mainCard.appendChild(titleCity)
			rowOne.appendChild(mainCard)
		})
	})
	
}

var getCity = function() {
	event.preventDefault();
	var city = document.querySelector("input[name='city-name']").value
	console.log(city)
	getWeather(city)
}

formEl.addEventListener("submit", getCity);
