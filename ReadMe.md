# Alarm-Clock App
The project contains a Digital Alarm Clock here you can set as many alarms as you want. 
The first part of the project contains the heading and a digital clock which give the accurate time in seconds, where we can set an alarm also and stop ringing music. In the second part all the new alarms being set will be showing to an alarm list on screen and will the played at the right time. Every new alarm being set a delete button will be given. When on clicking that button you will be able to delete to alarm and remove it's from the webpage.
No Javascript library is used.

### General steps to follow when creating a project

- Thinking about the UI
- Functionality
    - Display time (hr : min : sec AM/PM)
    - Add an Alarm
    - Display an Alarm list
    - Delete an Alarm
    - Play an Alarm
    - Stop an Alarm
- Data
    -Alarm-List - an array
    -Alarm - ("time")
- Functions (in code)
    - showNotification
    - formSubmit
    - addAlarmToDom
    - renderAlarmList
    - deleteAlarm
    - handleAlarmList
    - stopAlarm
    - alarmRinging
    - updateTime


## Set an Alarm 
- User can set the alarm by putting the value of Hour Minute Second and select Meridiem.
- User can't enter other numbers in Hours 1 to 12 as it's a 12 hour based clock.
- If you do so, you will see a popup msg.

## Functionality
- User can set alarm after putting the values and clicking on the Set Alarm button.
- User can delete the alarm.
- When the alarm time match the current time, then alarm sound is play.
- Sound will play, whenever the user Set Alarm, Delete Alarm and not select Meridiem.
- When you have already set alarm and you set again same time alarm, you will see a popup msg.

## TechStack: 
<img align="left" src="https://user-images.githubusercontent.com/18380165/224329335-3cdf989b-bdce-41e6-82dc-7d4c50d5f283.png" width="100" height="100">
<img align="left" src="https://user-images.githubusercontent.com/18380165/224329345-7363d693-4f27-4a58-8c9e-086d8a3fa420.png" width="100" height="100">
<img align="left" src="https://user-images.githubusercontent.com/18380165/224332427-426a3fbb-e25d-4deb-a832-666ae2e2e418.png" width="100" height="100">
<img  src="https://user-images.githubusercontent.com/18380165/224329339-a5174b23-1a5c-4ae4-95c8-ead20a29d77e.png" width="100" height="100">

- FrontEnd - HTML & CSS
- Scripting/Programming - Javascript
- IDE - VSCode

### Have a look at the project via this link :https://atul-solanki.github.io/Alarm_Clock/

## Approach:
When user give the input time and click set alarm. Then alarms being set will be added to an array and add to Alarm list. The array will be checked on every second, if it contains the current time it's match, then the alarm's sound will be played. 
when clicking on "Stop alarm" the audio will be paused and reset duration, when clicking on "Delete Alarm" check the target alarm time and said alarm will be removed from the array and render the alarm list. 
