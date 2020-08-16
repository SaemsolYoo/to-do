const weather = document.querySelector(".js-weather");

const API_KEY = "3b900a64810796e453ebf664f5ca157c";
const COORDS = "coords";

function getWeather(lat, lng) {
  /*js에서 데이터를 가져오는방법은!

    fetch()안에 가져올 데이터 넣어주면된다. 이런식으로

    앞에 https:// 넣어주고 ! *주의*따옴표가 아닌 backtick(`) 사용하기 */

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })

    .then(function (json) {
      const temperature = json.main.temp;

      const place = json.name;

      //console.log(temperature, place);

      weather.innerText = `${temperature} @ ${place}`;
    });

  //then()은 함수를 하나 호출하는데, 언제하냐면 데이터가 우리한테 넘어왔을때! 데이터가 들어오는데 시간이 좀 걸리는 경우도 있어서.

  //그러니까 then이 하는 역할은 기본적으로 함수를 호출하는 것이지만, 데이터가 완전히 들어온 다음에 호출하는거지
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;

  const longitude = position.coords.longitude;

  const coordsObj = {
    /* 자바스크립에서 이렇게 객체에다가

     변수의 이름과 객체의 key이름을 같게 해주려면

       이거 아래코드처럼 하면 된다!

    latitude: latitude,

    longitude: longitude */

    latitude,

    longitude,

    //이렇게하면 알아서 해석한다. 위 코드와 같은 의미로!
  };

  saveCoords(coordsObj);

  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);

    console.log(parseCoords);

    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
