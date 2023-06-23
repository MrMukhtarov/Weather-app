let form = document.querySelector("form");

form.addEventListener("submit", GetImage);

async function GetImage(e) {
  e.preventDefault();

  const ACCESS_KEY = "ECZyNDcEZAfVruJ82VKJEcQs8Iqep0D4Xa7A84QCVMs";
  let input = document.querySelector("input");
  let img = document.querySelector(".all-left");
  try {
    let response = await fetch(
      `https://api.unsplash.com/search/photos?query=${input.value}&client_id=${ACCESS_KEY}`
    );
    let json = await response.json();
    let url = "";
    json.results.forEach((element) => {
      url = element.urls.full;
    });
    img.style.backgroundImage = `url('${url}')`;
  } catch (err) {
    console.log(err);
    alert('Please enter right city name')
  }

  let week_days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let months_arr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let city = document.querySelector(".city-h1");
  let weather_type = document.querySelector(".weather-span");
  let celcius = document.querySelector(".celcius-h1");
  let cloud = document.querySelector(".right-cloudly-span");
  let humid = document.querySelector(".right-humid-span");
  let wind = document.querySelector(".right-wind-span");
  let desc = document.querySelector(".right-desc-span");
  let day = document.querySelector(".day-span");
  let week = document.querySelector(".week-span");
  let months = document.querySelector(".month-span");
  let hour = document.querySelector(".hour-span");
  let weather_img = document.querySelector(".weather-img");

  let days = new Date().getDate();
  let weeks = new Date().getDay() - 1;
  let monthss = new Date().getMonth();
  let hours = new Date().getHours();
  let minute = new Date().getMinutes();

  const WEAETHER_ACCESS_KEY = "08bea81087462d9194b404b01f8a33bb";
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${WEAETHER_ACCESS_KEY}`
    );
    let result = await response.json();

    city.innerHTML = result.name;
    result.weather.forEach((w) => {
      weather_type.innerHTML = w.main;
      desc.innerHTML = w.description;

      if (w.description.includes("clear sky")) {
        weather_img.src = "../assets/img/sun.png";
      } else if (w.description.includes("rain")) {
        weather_img.src = "../assets/img/rainy.png";
      } else if (w.description.includes("thunderstorm")) {
        weather_img.src = "../assets/img/storm.png";
      } else if (w.description.includes("snow")) {
        weather_img.src = "../assets/img/snowflake.png";
      } else if (w.description.includes("mist")) {
        weather_img.src = "../assets/img/fog.png";
      } else if (w.description.includes("clouds")) {
        weather_img.src = "../assets/img/cloud.png";
      }
    });
    celcius.innerHTML = Math.round(result.main.temp - 273, 15) + "°";
    cloud.innerHTML = result.clouds.all + "%";
    humid.innerHTML = result.main.humidity;
    wind.innerHTML = result.wind.speed;
    day.innerHTML = days;
    week.innerHTML = week_days[weeks];
    months.innerHTML = months_arr[monthss];
    hour.innerHTML = `${hours < 10 ? "0" + hours : hours} : ${
      minute < 10 ? "0" + minute : minute
    }`;

    console.log(result);
  } catch (err) {
    console.log(err);
    alert('Please enter right city name')
  }
  input.value = "";
}
