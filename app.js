const testArea = document.querySelector("#test-area");
const theTime = document.querySelector(".timer");
const testWrapper = document.querySelector(".test-wrapper");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");

let timer = [0, 0, 0, 0];
let flag = false;
let interval;

function leadingZero(timer) {
  if (timer < 10) {
    timer = "0" + timer;
  }
  return timer;
}

function timerRunnig() {
  timer[3]++;

  let time =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);
  theTime.innerHTML = time;

  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 100 * 60);
}

function start() {
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength == 0 && !flag) {
    flag = true;
    interval = setInterval(timerRunnig, 10);
  }
}

function spellCheck() {
  let enteredText = testArea.value;
  let originTextMatch = originText.substring(0, enteredText.length);

  if (originText == enteredText) {
    testWrapper.style.borderColor = "green";
    clearInterval(interval);
  } else {
    if (enteredText == originTextMatch) {
      testWrapper.style.borderColor = "yellow";
    } else {
      testWrapper.style.borderColor = "red";
    }
  }
}

function reset() {
  timer = [0, 0, 0, 0];
  flag = false;
  theTime.innerHTML = "00:00:00";
  clearInterval(interval);
  interval = null;
  testWrapper.style.borderColor = "grey";
  testArea.value = "";
}

resetButton.addEventListener("click", reset);
testArea.addEventListener("keyup", spellCheck);
testArea.addEventListener("keypress", start);
