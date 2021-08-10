import './sass/main.scss';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.element = document.querySelector(selector);
    this.targetDate = targetDate;

    this.start();
  }

  start() {
    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = this.targetDate - startTime;
      const time = this.getTimeComponents(deltaTime);

      this.showDate(time);
      // console.log(timeComponents);
      // console.log(`${time.days}:${time.hours}:${time.mins}:${time.secs}`);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  /* Формулы для получения значений с миллисекунд в дни:часы:минуты:секунды */
  getTimeComponents(time) {
    /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  /* Принимает число, приводит к строке и добавляет 0, если число меньше 2-х знаков*/
  pad(value) {
    return String(value).padStart(2, '0');
  }

  /* Обновляем данные в index.html { days, hours, mins, secs } */
  showDate({ days, hours, mins, secs }) {
    this.element.querySelector('[data-value = "days"]').textContent = days;
    this.element.querySelector('[data-value = "hours"]').textContent = hours;
    this.element.querySelector('[data-value = "mins"]').textContent = mins;
    this.element.querySelector('[data-value = "secs"]').textContent = secs;
  }
}

/* Создаем экземпляр класса CountdownTimer */
const timerSummer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Sep 01, 2021 00:00:00'),
});

console.log(timerSummer);

/* Создаем экземпляр класса CountdownTimer */
const timerNY = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Dec 31, 2021 23:59:59'),
});

console.log(timerNY);
