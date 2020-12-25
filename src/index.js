import refs from "./js/refs.js";
import css from "./css/styles.css";
import debounce from "lodash.debounce";

const { days, hours, mins, secs, btnStart, btnStop, inputRef } = refs;

class Countdown {
  constructor(targetDate) {
    this.targetDate = new Date(targetDate);
    this.active = false;
    if (localStorage.time) {
      this.targetDate = new Date(localStorage.time);
      this.start();
    }
  }

  start() {
    this.timer();
    this.active = true;
    this.countId = setInterval(() => {
      this.timer();
    }, 1000);
  }
  timer() {
    const currentTime = Date.now();
    const deltaTime = this.targetDate - currentTime;
    this.updateClockFace(deltaTime);
  }
  updateClockFace(time) {
    const daysFace = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hoursFace = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minsFace = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secsFace = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    days.textContent = daysFace;
    hours.textContent = hoursFace;
    mins.textContent = minsFace;
    secs.textContent = secsFace;
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const MyTimer = new Countdown();
let inputValue = "";

//Где-то тут должна быть адекватная валидация даты "404 not Found" :)

inputRef.addEventListener(
  "input",
  debounce((event) => {
    inputValue = event.target.value;
  }, 1000),
);
btnStart.addEventListener("click", startCount);

btnStop.addEventListener("click", stopCount);

function stopCount() {
  localStorage.removeItem("time");
  MyTimer.active = false;
  inputRef.value = "";
  inputValue = "";
  MyTimer.updateClockFace(0);
  clearInterval(MyTimer.countId);
}

function startCount() {
  if (MyTimer.active) return alert("Timer is running already!:)");
  if (inputValue.length !== 11 || inputValue === null) return alert("wrong date format dude:)");

  MyTimer.targetDate = new Date(inputValue);
  localStorage.setItem("time", inputValue);
  MyTimer.start();
  console.log(MyTimer);
}
