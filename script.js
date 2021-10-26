const key = 'd719f7b622c3b5fc0ef77f8a2887f352';

const select = document.querySelector(".select");
const city = document.querySelector(".city")
const icon = document.querySelector(".icon");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const weather = document.querySelector(".weather");
const wind = document.querySelector(".wind");
const time = document.querySelector(".time");

let cityId = 681290;





const KelvintoCelsius = (kelvin) => {
    const celsius = kelvin - 273.15;
    return celsius.toFixed(1);
}

const GetCities = () => {
  fetch(`cities.json` , {
    method: 'GET'
    
  })
  .then(response => response.json())
  .then(data => {
    data.forEach(city => {
      const option = document.createElement("option");
      option.value = city.id;
      option.text = city.name;
      
      if(city.id === 681290) {
        option.setAttribute('selected', true)
      }
      select.appendChild(option);
    
    });
    
    
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}










const GetWheather = (cityId = 681290 ) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${key}` , {
    method: 'GET'
    
  })
  .then(response => response.json())
  .then(data => {
    const date = new Date();
   
    city.innerHTML = data.name;
    temp.innerHTML = KelvintoCelsius(data.main.temp) + '\xB0C';
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    humidity.innerHTML = `Humidity :  ${data.main.humidity}  %`;
    weather.innerHTML = data.weather[0].descriprion;
    wind.innerHTML = `Wind: ${data.wind.speed} m/s`;
    time.innerHTML = `${date.toLocaleTimeString()}, ${date.toLocaleDateString()} `;

    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  

}
GetCities();
GetWheather();


select.addEventListener("change", function(e){
  const cityId = e.target.value;
  GetWheather(cityId);
})

