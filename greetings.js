const form = document.querySelector(".js-greetingFrom");
const input = form.querySelector("input");
const area = document.querySelector(".userNameArea");
const greeting = area.querySelector(".js-greetings");
const rename = area.querySelector(".js-rename");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function resetUserName(event) {
  localStorage.clear();
  location.reload(true);
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  rename.classList.add(SHOWING_CN);
  greeting.innerText = `Hello! ${text}'s Tasks 🌈💘`;
  rename.addEventListener("click", resetUserName);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
