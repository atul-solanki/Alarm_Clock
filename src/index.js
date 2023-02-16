//  Begin of HTML Structure Elements and tag part using javascript 

document.getElementById("body").innerHTML = `
<div id="app">
<section>
<div id="clock-container" class="container-fluid text-center">
        <h1>DIGITAL CLOCK</h1>
        <div id="current-time" class="container fs-2 fw-semibold"></div>
        <form id="setAlarm-conatiner">
<div id="set-alarm-field">
    <input type="number" name="a_hour" id="a_hour" placeholder="hr" maxlength="2" max="12" min="01" required>
    <input type="number" name="a_min" id="a_min" placeholder="min" maxlength="2" max="59" min="00" required>
    <input type="number" name="a_sec" id="a_sec" placeholder="sec" maxlength="2" max="59" min="00" required>
    <select id="zone"  class="" required>
        <option value="zone" selected disabled hidden>zone</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
    </select>
</div>
<div class="controls">
    <button type="submit" class="set-alarm btn btn-primary">Set Alarm</button>
    <button type="reset" id="stop-alarm" class="clear-alarm btn btn-primary">Stop Alarm</button>
</div>
</form>
</div>
<h3 class="container hide">Alarms</h3>

    <div id="alist-conatiner" class="container">
      <ul id="list-group">
      </ul>
    </div>
    <footer class="container-fluid text-bg-secondary text-center">
    &copy; Copyright 2023 Created by ATUL SOLANKI
    </footer>
    </section>
    </div>
`;

// ---------------------------------------End of HTML Structure Elements and tag----------------------------------------------------------------


// create some variable for target elelements
let alarmList = []; // Stores all the alarams in array, when we created the Alarm.
const showAlarmList = document.getElementById("list-group");
const alarmForm = document.querySelector("form");
const currentTime = document.getElementById("current-time");
const stopAlarmBtn = document.getElementById("stop-alarm");
const h3 = document.querySelector(`h3.container`);
let audioPlay = false;
// ---------------------------------End of part variable-------------------------------------------------------------------------------------------


// set audio for alarm
let audio = new Audio(
  "./src/audio.mp3"
);
audio.loop = true;

// -----------------------------------------End of set audio for alarm--------------------------------------------------------------------------


// show display msg
function showNotification(msg) {
  alert(msg);
}


// Plays the alarm audio at correct time
function alarmRinging() {
  audio.play();
  audioPlay = true;
}


// function update Time every second and matching Alaram Time
let updateTime = () => {
  const time = new Date();
  var hours =
    time.getHours() > 12
      ? time.getHours() - 12
      : time.getHours() === 0
        ? "12"
        : time.getHours();
  var minutes =
    time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
  var seconds =
    time.getSeconds() > 9 ? time.getSeconds() : "0" + time.getSeconds();
  var zone = time.getHours() >= 12 ? "PM" : "AM";
  hours = hours < 10 ? "0" + hours : "" + hours;
  const tym = `${hours} : ${minutes} : ${seconds} ${zone}`;
  currentTime.innerHTML = ` Current Time<br><span id="time">${tym}</span>`;
  // console.log(tym);
  if (alarmList.includes(tym)) {
    console.log(tym);
    alarmRinging();
  }
};
// -----------------------End of update time function--------------------------------------------------------------------------------------------------------


// function for input type="number" maxlength work properly
document.querySelectorAll(`input[type="number"]`).forEach((input) => {
  input.oninput = () => {
    if (input.value.length > input.maxLength)
      input.value = input.value.slice(0, input.maxLength);
  };
});
// -----------------------End of part input type="number" maxlength work properly----------------------------------------------------------


// function for Add(Show) Alarm in Document
function addAlarmToDom(time) {
  h3.classList.remove("hide");
  const id = Date.now().toString();
  showAlarmList.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
<span id="${id}" >${time}</span>
<button type="button" id="${id}" class="btn btn-outline-secondary dlt">Delete</button>
</li>`;
}


// begining of part Event Listener to set a new alarm and add to array when form is submitted
alarmForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var hrLength = alarmForm.a_hour.value.length;
  var minLength = alarmForm.a_min.value.length;
  var secLength = alarmForm.a_sec.value.length;
  var aHr = alarmForm.a_hour.value;
  aHr = hrLength === 2 ? aHr : aHr <= 9 ? "0" + aHr : aHr;
  var aMin = alarmForm.a_min.value;
  aMin = minLength === 2 ? aMin : aMin <= 9 ? "0" + aMin : aMin;
  var aSec = alarmForm.a_sec.value;
  aSec = secLength === 2 ? aSec : aSec <= 9 ? "0" + aSec : aSec;
  var aZone = alarmForm.zone.value;
  if (aZone === "zone") {
    return;
  }
  const alarmTime = `${aHr} : ${aMin} : ${aSec} ${aZone}`;
  console.log(alarmTime);  //it's for check gets the correct time and not.


  //     add newAlarm to alarmList 
  if (isNaN(alarmTime)) {
    if (!alarmList.includes(alarmTime)) {
      alarmList.push(alarmTime);
      addAlarmToDom(alarmTime);
      alarmForm.reset();
      showNotification("created Successfully");
    } else {
      showNotification(`Alarm for ${alarmTime} already set.`);
    }
  }
});
// ---------------------------------------End of Event Listener form submit ------------------------------------------------------------------


// stop Alarm sound
function stopAlarm() {
  if (audioPlay) {
    audio.pause();
    audio.currentTime = 0;
    showNotification("Alarm is Stop");
    audioPlay = false;
  } else {
    return;
  }
}

// Click event listener on Stop Alarm Button
stopAlarmBtn.addEventListener("click", stopAlarm);


//  render AlarmList when user call delete Alarm Function
function renderAlarmList() {
  h3.classList.add("hide");
  showAlarmList.innerHTML = "";
  for (let i = 0; i < alarmList.length; i++) {
    addAlarmToDom(alarmList[i]);
  }
  showNotification("Delete successfully");
}

//  delete Alarm in alarm list and document
function deleteAlarm(value) {
  let newAlarmList = alarmList.filter((time) => {
    return time !== value;
  });
  console.log(newAlarmList);
  alarmList = newAlarmList;
  console.log(alarmList);
  renderAlarmList();
}

// Handle Alarm list on delete Button
function handleAlarmList(e) {
  const target = e.target;
  console.log(target);
  if (target.classList.contains("dlt")) {
    const id = target.id;
    const value = document.getElementById(`${id}`).innerText;
    console.log(value);
    deleteAlarm(value);
    return;
  }
}

// Click Event Listener on dlt button
showAlarmList.addEventListener("click", handleAlarmList);

// SetInterval on UpdateTime Function
setInterval(updateTime, 1000);
