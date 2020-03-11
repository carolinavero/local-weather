var celsius = 0;
var fahrenheit = 0;
var temp = 0;

const btnEl = document.querySelector('[scale]');
var tempValue = document.querySelector('[weather-temp]');

function success(pos) {
    var crd = pos.coords;
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);

    const url = `https://fcc-weather-api.glitch.me/api/current?lon=${crd.longitude}&lat=${crd.latitude}`
    fetch(url)

        .then(resp => resp.json())
        .then((data) => {
            temp = data.main.temp;
            tempValue.textContent = temp + '°C';
            document.body.insertAdjacentHTML('beforeend', `<h3>${data.name}, ${data.sys.country}</h3>`)
            document.body.insertAdjacentHTML('beforeend', `<h2>${data.weather[0].main}</h2>`)
            document.body.insertAdjacentHTML('beforeend', `<div><img src="${data.weather[0].icon}"/></div>`)
        });
};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error);

btnEl.addEventListener('click', function () {
    fahrenheit = temp * 9 / 5 + 32;
    if (btnEl.classList.contains('celsius')) {
        btnEl.textContent = 'Change to Celsius'
        tempValue.textContent = fahrenheit + '°F'
        btnEl.classList.remove('celsius')
    } else {
        btnEl.textContent = 'Change to Fahrenheit'
        tempValue.textContent = temp + '°C'
        btnEl.classList.add('celsius')
    }
});