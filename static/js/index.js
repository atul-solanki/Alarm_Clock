// Alarm list and set audio variables for alarm
let arrayAlarmList = []; // Stores all the alarams in array, when we created the Alarm.
let audioSound = new Audio('static/audio/audio.mp3');
let audioDelete = new Audio('static/audio/delete.mp3');
let audioSet = new Audio('static/audio/set.mp3');
let audioAlert = new Audio('static/audio/alert.mp3')
let audioPlay = false;

// set some variable to modify the DOM
const currentTime = document.getElementById("time");  // current time
const alarmList = document.getElementById("alarm-list");
const alarmForm = document.querySelector("form");
const stopAlarmBtn = document.getElementById("stop-alarm");
const headingAlarmList = document.querySelector(`h3.container`);

// show display msg
function showNotification(msg) {
  alert(msg);
}

// Plays the alarm audio at correct time
function alarmRinging() {
  audioSound.play();
  audioSound.loop = true;
  audioPlay = true;
}

// function update Time every second and matching Alaram Time
let updateTime = () => {
  const time = new Date();
  var hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours() === 0 ? "12" : time.getHours();
  var minutes = time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
  var seconds = time.getSeconds() > 9 ? time.getSeconds() : "0" + time.getSeconds();
  var Meridiem = time.getHours() >= 12 ? "PM" : "AM";
  hours = hours < 10 ? "0" + hours : "" + hours;
  const tym = `${hours} : ${minutes} : ${seconds} ${Meridiem}`;
  currentTime.innerText = `${tym}`;
  if (arrayAlarmList.includes(tym)) {
    console.log(tym);
    alarmRinging();
  }
};

// function for input type="number" maxlength work properly
document.querySelectorAll(`input[type="number"]`).forEach((input) => {
  input.oninput = () => {
    if (input.value.length > input.maxLength)
      input.value = input.value.slice(0, input.maxLength);
  };
});

// function for Add(Show) Alarm in Document
function addAlarmToDom(time) {
  headingAlarmList.classList.remove("hide");
  const id = Date.now().toString();
  alarmList.innerHTML += 
  `<li class="d-flex justify-content-between align-items-center">
    <span id="${id}" >
    <i class="bi bi-alarm"></i>${time}
    </span>
    <button type="button" id="${id}" class="btn btn-outline-danger dlt"></button>
</li>`;
}

// begining of part Event Listener to set a new alarm and add to array when form is submitted
alarmForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var hrLength = alarmForm.alarm_hour.value.length;
  var minLength = alarmForm.alarm_min.value.length;
  var secLength = alarmForm.alarm_sec.value.length;
  var alarmHr = alarmForm.alarm_hour.value;
  alarmHr = hrLength === 2 ? alarmHr : alarmHr <= 9 ? "0" + alarmHr : alarmHr;
  var alarmMin = alarmForm.alarm_min.value;
  alarmMin = minLength === 2 ? alarmMin : alarmMin <= 9 ? "0" + alarmMin : alarmMin;
  var alarmSec = alarmForm.alarm_sec.value;
  alarmSec = secLength === 2 ? alarmSec : alarmSec <= 9 ? "0" + alarmSec : alarmSec;
  var aMeridiem = alarmForm.meridiem.value;
  if (aMeridiem === "Meridiem") {
    audioAlert.play();
    showNotification("select time Meridiem");
    return;
  }
  const alarmTime = `${alarmHr} : ${alarmMin} : ${alarmSec} ${aMeridiem}`;
  console.log(alarmTime);  //it's for check gets the correct time and not.
  // set newAlarm to arrayAlarmList 
  if (isNaN(alarmTime)) {
    if (!arrayAlarmList.includes(alarmTime)) {
      arrayAlarmList.push(alarmTime);
      addAlarmToDom(alarmTime);
      alarmForm.reset();
      setTimeout(() => showNotification("created Successfully"), 500)
      audioSet.play();

    } else {
      audioAlert.play();
      setTimeout(() => showNotification(`Alarm for ${alarmTime} already set.`), 500);
    }
  }
});

// Click event listener on Stop Ringing
stopAlarmBtn.addEventListener("click", () =>{
  if (audioPlay) {
    audioSound.pause();
    audioSound.currentTime = 0;
    showNotification("Alarm is Stopped");
    audioPlay = false;
  } else {
    return;
  }
});


//  render AlarmList when user call delete Alarm Function
function renderAlarmList() {
  headingAlarmList.classList.add("hide");
  alarmList.innerHTML = "";
  for (let i = 0; i < arrayAlarmList.length; i++) {
    addAlarmToDom(arrayAlarmList[i]);
  }
  setTimeout(() => showNotification("Delete successfully"), 500)
  audioDelete.play();
}

//  delete Alarm in alarm list and document
function deleteAlarm(value) {
  let newAlarmList = arrayAlarmList.filter((time) => {
    return time !== value;
  });
  console.log(newAlarmList);
  arrayAlarmList = newAlarmList;
  console.log(arrayAlarmList);
  renderAlarmList();
}

// Click Event Listener on delete Button
alarmList.addEventListener("click", (e) =>{
  const target = e.target;
  console.log(target);
  if (target.classList.contains("dlt")) {
    const id = target.id;
    const value = document.getElementById(`${id}`).innerText;
    console.log(value);
    deleteAlarm(value);
    return;
  }
});

// SetInterval on UpdateTime Function
setInterval(updateTime, 1000);
