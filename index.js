let hrs = document.getElementById("hours");
let min = document.getElementById("min");
let day = document.getElementById("day");

setInterval(()=>{
    let currentTime = new Date();
    day.innerHTML = currentTime.toDateString('en-us', {weekday: 'long'});
    hrs.innerHTML = (currentTime.getHours()<10?"0" : "") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes()<10?"0" : "") + currentTime.getMinutes();
},1000)

const apiKey = "28d4e9d496374aeb8d388ce182c21ef7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".searchbox input");
const searchbtn = document.querySelector(".searchbox button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch (apiUrl + city + `&appId=${apiKey}`);
    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".middle").style.display = "none";
    }

    else  {
        var data = await response.json();
    document.querySelector(".city").innerHTML= data.name;
    document.querySelector(".temperature").innerHTML= Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML= data.main.humidity + "%";
    document.querySelector(".wind").innerHTML= Math.round(data.wind.speed) + " km/h";
    document.querySelector(".feels").innerHTML= Math.round(data.main.feels_like) + "°";

    if(data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png"
    }
    else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png"
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png"
    }

    else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png"
    }

    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png"
    }

    document.querySelector(".middle").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }

}

searchbtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})



