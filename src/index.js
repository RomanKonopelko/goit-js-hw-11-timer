import refs from "./js/refs.js";
import css from "./css/styles.css";

const { days, hours, mins, secs, startBtn, stopBtn } = refs;

class Countdown {
  constructor(targetDate) {
    this.targetDate = new Date(targetDate);
  }
  start() {
    this.countId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      this.updateClockFace(deltaTime);
    }, 1000);
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

const MyTimer = new Countdown("Jan 01 2021");
console.log(MyTimer);

MyTimer.start();
