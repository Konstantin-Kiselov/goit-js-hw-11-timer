import './sass/main.scss';

const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};

const targetDate = new Date('31 Dec, 2021 23:59:59');
console.log('targetDate:', targetDate);

let timerId = null;
let secs = null;
let mins = null;
let hours = null;
let days = null;

function timer() {
  const time = targetDate - Date.now();
  //   console.log(time);

  /*
   * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
   * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
   */
  days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  //   console.log(days);

  /*
   * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
   * остатка % и делим его на количество миллисекунд в одном часе
   * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
   */
  hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  //   console.log(hours);

  /*
   * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
   * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
   */
  mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  //   console.log(mins);

  /*
   * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
   * миллисекунд в одной секунде (1000)
   */
  secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  //   console.log(secs);

  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function startTimer() {
  timerId = setInterval(timer, 1000);
}

function stopTimer() {
  clearInterval(timerId);
}

document.addEventListener('DOMContentLoaded', startTimer);
