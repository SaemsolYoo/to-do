const todayContainer = document.querySelector(".js-today");
const calendar = todayContainer.querySelector(".js-calendar");
const today = calendar.querySelector("h2");

const clock = todayContainer.querySelector(".js-clock");
const currentTime = clock.querySelector("h1");

function getTime() {
  const now = new Date();
  const years = now.getFullYear();
  const days = now.getDay();
  const dates = now.getDate();
  const months = now.getMonth();

  const hours = now.getHours();
  const minutes = now.getMinutes();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  today.innerText = `${years}, ${dayNames[days]}, ${
    dates < 10 ? `0${dates}` : dates
  } ${monthNames[months]}`;
  currentTime.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
