const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoSubmitBtn = toDoForm.querySelector("button");

const pendingList = document.querySelector(".js-pendingList");
const finishedList = document.querySelector(".js-finishedList");

const statusBtn = document.querySelector(".status");

const TODOS_LS = "toDos";
const FINISHED_LS = "finished";
const STATUS_LS = "status";

let toDos = [];
let finishedToDos = [];
let status = [];

function handleFinishedDelete(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);

  const cleanToDos = finishedToDos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });

  finishedToDos = cleanToDos;
  saveFinishedTodos();
}

function handleRedoBtn(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span").innerText;
  finishedList.removeChild(li);
  const cleanToDos = finishedToDos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });

  finishedToDos = cleanToDos;
  saveFinishedTodos();

  paintToDos(span);
}

function saveFinishedTodos() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedToDos));
}

function paintFinishedToDos(text) {
  const finishedLi = document.createElement("li");
  const redoBtn = document.createElement("i");
  const finishedSpan = document.createElement("span");
  const deleteFinishedTodoBtn = document.createElement("i");
  const finishedId =
    finishedList.lastElementChild === null
      ? 1
      : parseInt(finishedList.lastElementChild.id) + 1;

  finishedSpan.innerText = text;
  redoBtn.setAttribute("class", "fa fa-check-circle-o");
  redoBtn.classList.add("check");
  redoBtn.addEventListener("click", handleRedoBtn);
  deleteFinishedTodoBtn.setAttribute("class", "fa fa-trash-o");
  deleteFinishedTodoBtn.classList.add("delete");
  deleteFinishedTodoBtn.addEventListener("click", handleFinishedDelete);
  finishedLi.appendChild(redoBtn);
  finishedLi.appendChild(finishedSpan);
  finishedLi.appendChild(deleteFinishedTodoBtn);
  finishedLi.id = finishedId;
  finishedList.appendChild(finishedLi);

  const finishedObj = {
    text: text,
    id: finishedId,
  };

  finishedToDos.push(finishedObj);
  saveFinishedTodos();

  //여기
}

function handleFinished(event) {
  const finishBtn = event.target;
  const finishedLi = finishBtn.parentNode;
  const span = finishedLi.querySelector("span").innerText;

  pendingList.removeChild(finishedLi);
  const cleanToDos = toDos.filter(function (todo) {
    return todo.id !== parseInt(finishedLi.id);
  });

  toDos = cleanToDos;
  saveToDos();
  paintFinishedToDos(span);
}

function handleToDoDelete(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);

  const cleanToDos = toDos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });

  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDos(text) {
  const li = document.createElement("li");
  const checkBtn = document.createElement("i");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("i");
  //const statusBtn = document.createElement("button");

  const newId =
    pendingList.lastElementChild === null
      ? 1
      : parseInt(pendingList.lastElementChild.id) + 1;

  checkBtn.setAttribute("class", "fa fa-circle-o");
  span.innerText = text;
  deleteBtn.setAttribute("class", "fa fa-trash-o");

  checkBtn.classList.add("check");
  checkBtn.addEventListener("click", handleFinished);
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", handleToDoDelete);

  li.id = newId;
  li.appendChild(checkBtn);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  //li.appendChild(statusBtn);
  pendingList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const userInput = toDoInput.value;
  paintToDos(userInput);
  toDoInput.value = "";
}

function loadToDos() {
  const savedToDos = localStorage.getItem(TODOS_LS);
  const savedFinishedToDos = localStorage.getItem(FINISHED_LS);

  if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    parsedToDos.forEach(function (todo) {
      paintToDos(todo.text);
    });
  }
  if (savedFinishedToDos !== null) {
    const parsedFinishedToDos = JSON.parse(savedFinishedToDos);
    parsedFinishedToDos.forEach(function (todo) {
      paintFinishedToDos(todo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
