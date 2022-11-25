class AlarmClock {
  constructor() {
    this.alarmCollection = []; //Создайте свойство для хранения коллекции звонков, изначально пустой массив
    this.timerId = null; // таймер без начального значения.
  }

  addClock(time, callback, id) {
    if (typeof id === "undefined") {
      throw new Error("error text");
    } else if (
      typeof this.alarmCollection.find((clock) => clock.id === id) !=="undefined") 
      {
      return console.error("already exist");
    }
    return this.alarmCollection.push({ id, time, callback });
  }

  removeClock(id) {
    let currentLenght = this.alarmCollection.length;
    this.alarmCollection = this.alarmCollection.filter((clock) => clock.id !== id);
    let newLenght = this.alarmCollection.length;
    return currentLenght > newLenght;
  }

  getCurrentFormattedTime() {
    let addZero = (number) => {
      if (number > 10) {
        return number;
      }
      return "0" + number;
    };
    let currentTime = new Date();
    let minutes = addZero(currentTime.getMinutes());
    let hours = addZero(currentTime.getHours());
    return hours + ":" + minutes;
  }

  start() {
    let checkClock = (clock) => {
      if (this.getCurrentFormattedTime() === clock.time) {
        return clock.callback();
      }
    };
    if (this.timerId === null) {
      this.timerId = setInterval(() => {
        this.alarmCollection.forEach((clock) => checkClock(clock));
      }, 2000);
    }
    return;
  }

  stop() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      return (this.timerId = null);
    }
  }

  printAlarms() {
    return this.alarmCollection.forEach((clock) =>
      console.log(clock.id + ": " + clock.time)
    );
  }

  clearAlarms() {
    this.stop();
    return (this.alarmCollection = []);
  }
}

function testCase (){
    let alarmClock = new AlarmClock();
    alarmClock.addClock("17:34", () => console.log("Пятница, наконец-то!", 1));
    alarmClock.addClock("17:35", () => console.log("А, понедельник близко!", 2));
    alarmClock.removeClock(2);
    alarmClock.addClock("17:36", () => console.log("Но, пока-то пятница!", 3));
    alarmClock.stop();
    alarmClock.printAlarms();
    alarmClock.start();
    alarmClock.clearAlarms();
    alarmClock.printAlarms();
}

