//-------------------------------ELEMENTS IN DOM-----------------------------------//
const $button = document.querySelector(".header__button");
const $hours = document.querySelector("#hours");
const $minutes = document.querySelector("#minutes");
const $seconds = document.querySelector("#seconds");
const $dayOfTheWeek = document.querySelector(".date__dayOfTheWeek");
const $date = document.querySelector(".date__date");
const $month = document.querySelector(".date__month");
const $year = document.querySelector(".date__year");
const $week = document.querySelector(".date__week");

//-----------------------------ADD ZERO TO HOURS, MINUTES, SECONDS-----------------//
function addZero(number) {
  return number < 10 ? "0" + number : number;
}

//-----------------------------------OBJECT WITH TIME--------------------------------//
const date = new Date();
const fullTime = {
  hours: addZero(date.getHours()),
  minutes: addZero(date.getMinutes()),
  seconds: addZero(date.getSeconds()),
};

//-------------------------------FIRST ADDING TIME TO DOM----------------------------//
$hours.innerHTML = fullTime.hours;
$minutes.innerHTML = fullTime.minutes;
$seconds.innerHTML = fullTime.seconds;

//---------------------------CHANGE FORMAT OF DAY FROM 1 TO ПОНЕДІЛОК...-----------------//
function changeDayFormat(numOfDay) {
  switch (numOfDay) {
    case 1:
      return "понеділок";
    case 2:
      return "вівторок";
    case 3:
      return "середа";
    case 4:
      return "четвер";
    case 5:
      return "п'ятниця";
    case 6:
      return "субота";
    case 7:
      return "неділя";
  }
}

//---------------------------CHANGE FORMAT OF MONTH FROM 0 TO СІЧНЯ...-----------------//
function changeMonthFormat(numOfMonth) {
  switch (numOfMonth) {
    case 0:
      return "січня";
    case 1:
      return "лютого";
    case 2:
      return "березня";
    case 3:
      return "квітня";
    case 4:
      return "травня";
    case 5:
      return "червня";
    case 6:
      return "липня";
    case 7:
      return "серпня";
    case 8:
      return "вересня";
    case 9:
      return "жовтня";
    case 10:
      return "листопада";
    case 11:
      return "грудня";
  }
}

//-----------------------------------OBJECT WITH DATE--------------------------------//
const fullDate = {
  dayOfTheWeek: date.getDay(),
  date: addZero(date.getDate()),
  month: date.getMonth(),
  year: date.getFullYear(),
  week: moment().week(),
};

$dayOfTheWeek.innerHTML = changeDayFormat(fullDate.dayOfTheWeek);
$date.innerHTML = fullDate.date;
$month.innerHTML = changeMonthFormat(fullDate.month);
$year.innerHTML = fullDate.year;
$week.innerHTML = fullDate.week;

let timer = true; // if true -> startInterval, if false ->clearInterval

let intervalId; // there will store intervalId to clear him

//--------------------------------START TIMER FUNCTION-----------------------------//
function startInterval() {
  intervalId = setInterval(() => {
    let sound = new Audio("/audio/click.mp3");
    sound.play(); // play "click.mp3" every second (but there is some troubles which I don't understand =) )

    const now = new Date(); // every sec I create new Date

    if (fullTime.hours !== addZero(now.getHours())) {
      // if hours are different - I change Hours in DOM
      fullTime.hours = addZero(now.getHours());
      $hours.innerHTML = fullTime.hours;
    }
    if (fullTime.minutes !== addZero(now.getMinutes())) {
      // if minutes are different - I change Minutes in DOM
      fullTime.minutes = addZero(now.getMinutes());
      $minutes.innerHTML = fullTime.minutes;
    }
    if (fullTime.seconds !== addZero(now.getSeconds())) {
      // if seconds are different - I change Seconds in DOM
      fullTime.seconds = addZero(now.getSeconds());
      $seconds.innerHTML = fullTime.seconds;
    }
    if (fullDate.dayOfTheWeek !== now.getDay()) {
      // if day of the weak are different - I change Day in DOM
      fullDate.dayOfTheWeek = now.getDay();
      $dayOfTheWeek.innerHTML = changeDayFormat(fullDate.dayOfTheWeek);
    }
    if (fullDate.date !== addZero(now.getDate())) {
      // if day are different - I change Day in DOM
      fullDate.date = addZero(now.getDate());
      $date.innerHTML = fullDate.date;
    }
    if (fullDate.month !== now.getMonth()) {
      // if month are different - I change Month in DOM
      fullDate.month = now.getMonth();
      $month.innerHTML = changeMonthFormat(fullDate.month);
    }
    if (fullDate.year !== now.getFullYear()) {
      // if year are different - I change Year in DOM
      fullDate.year = now.getFullYear();
      $year.innerHTML = fullDate.year;
    }
    if (fullDate.week !== moment().week()) {
      // if week are different - I change Week in DOM
      fullDate.week = moment().week();
      $week.innerHTML = fullDate.week;
    }
  }, 1000); // here I set Interval - 1 second
}

startInterval(); // start Timer

// BUTTON CLICK WILL STOP TIMER OR START HIM
$button.addEventListener("click", function (event) {
  event.preventDefault();
  if (timer === true) {
    // if true => timer = false and clearInterval
    timer = false;
    return clearInterval(intervalId);
  }
  if (timer === false) {
    // if false => timer = true and startInterval
    timer = true;
    return startInterval();
  }
});
