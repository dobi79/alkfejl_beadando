$(document).ready( function() {

  function displayTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    var clockDiv = document.getElementById('clock');
    minutes = checkTime(minutes)
    seconds = checkTime(seconds)

    clockDiv.innerText = hours + ":" + minutes + ":" + seconds;
  }

  function checkTime(i) {
      if (i < 10){
          i = "0" + i
      };
      return i;
    }

  setInterval(displayTime, 500);

});