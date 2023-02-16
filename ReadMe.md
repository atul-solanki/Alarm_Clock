# Alarm-Clock App
The project contains a Digital Alarm Clock here you can set as many alarms as you want. 
The first part of the project contains the heading and a digital clock which give the accurate time in seconds, where we can set an alarm also and stop the alarm. In the second part all the new alarms being set will be showing to a list on screen and will the played at the right time. With every new alarm being set a delete button will be given. When on clicking that button you will be able to delete to alarm and remove it's from the webpage.


### General steps to follow when creating a project

- Thinking about the UI
- Functionality
    - Display time (hr : min : sec AM/PM)
    - Add a Alarm
    - Display a Alarm list
    - Delete a Alarm
    - Play a Alarm
    - Stop Alarm
- Data
    -Alarm-List - an array
    -Alarm - ("time")
- Functions (in code)
    - formSubmit
    - addAlarmToDom
    - renderAlarmList
    - deleteAlarm
    - handleAlarmList
    - stopAlarm
    - alarmRinging
    - updateTime

# TechStack: 
HTML, CSS, JavaScript

# Approach:
When user give the input time and click set alarm. Then alarms being set will be added to an array and add to Alarm list. The array will be checked on every second, if it contains the current time it's match, then the alarm's sound will be played. 
when clicking on "Stop alarm" the audio will be paused and reset duration, when clicking on "Delete Alarm" check the target alarm time and said alarm will be removed from the array and render the alarm list. 