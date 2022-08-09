require("moment-precise-range-plugin");
const moment = require("moment");
const EventEmitter = require("events");
const [myDate] = process.argv.slice(2);

const getDate = (myDate) => {
  const [hour, day, month, year] = myDate.split("-");
  return new Date(Date.UTC(year, month - 1, day, hour));
};

const showTimeEnd = (timer) => {
  clearInterval(timer);
  console.log("END");
};

const showTime = (dateFuture) => {
  const dateNow = new Date();
  if (dateNow >= dateFuture) {
    emitter.emit("timeEnd");
  } else {
    const currentDate = moment(dateNow, "YYYY-MM-DD HH:mm:ss");
    const futureDate = moment(dateFuture, "YYYY-MM-DD HH:mm:ss");
    const diff = moment.preciseDiff(currentDate, futureDate);
    console.clear();
    console.log(diff);
  }
};

const emitter = new EventEmitter();
const dateFuture = getDate(myDate);
const timer = setInterval(() => {
  emitter.emit("timeTick", dateFuture);
}, 1000);
emitter.on("timeTick", showTime);
emitter.on("timeEnd", () => {
  showTimeEnd(timer);
});
