// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go 버튼 누름
// 유저가 랜덤번호 맞추면, 맞췄습니다!
// 랜덤번호 < 유저번호 면 Down!!
// 랜덤번호 > 유저번호 면 UP!!
// reset버튼 누르면 게임 리셋
// 5번의 기회를 다쓰면 게임이 끝난다. (추측 불가 버튼 사라짐)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회 깍지않음
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다 기회X

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
})

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = `1과 100사이 숫자를 입력해 주세요`;
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자입니다";
    return;
  }

  chances--;
  chanceArea.textContent = `남은기회${chances}번`;
  console.log("chance", chances);

  if (userValue < computerNum) {
    resultArea.textContent = "UP!!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "DOWN!!!";
  } else {
    resultArea.textContent = "맞췄습니다!!!";
    gameOver=true;
  }

  history.push(userValue);

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
  } else {
    playButton.disabled = false;
  }
}

function reset() {
  // 유저 인풋창 깨끗하게 정리
  userInput.value = "";
  // 새로운 번호가 생성
  pickRandomNum();
  gameOver=false;

  resultArea.textContent = "결과값이 여기 나옵니다.";
}

pickRandomNum();