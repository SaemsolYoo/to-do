const body = document.querySelector("body");

const IMG_NUMBER = 3;

/* 이미지를 API에서 가져오는거였다면 필요햇을 코드

function handleImgLoad(){

  console.log("finished loading");

}

*/

function paintImage(imgNumber) {
  const image = new Image();

  image.src = `images/${imgNumber + 1}.jpg`;

  image.classList.add("bgImage");

  body.appendChild(image);

  /* 이미지를 API에서 가져오는거였다면 필요햇을 코드

  image.addEventListener("loadend",handleImgLoad);

  */
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);

  return number;
}

// Math.floor 는 숫자를 버림 해주는것. 3.4--> 3으로

// Math.random() * n 는 0부터 5까지 숫자 랜덤으로 잔뜩 나오는거 2.324346 막 이런식으루,,

// 그래서 소수점 많이나온는거 먼저 앞자리 해서 해주고, 그담에 버림 해주는 함수 써준거다.

function init() {
  const randomNumber = genRandom();

  paintImage(randomNumber);
}

init();
