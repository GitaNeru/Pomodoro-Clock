$(document).ready(function() {

  var workMinutes = 25;
  var breakMinutes = 5;
  var rest = 10;
  var beep = document.getElementsByTagName("audio")[0];
  var startstop;
  document.getElementById("timer").innerHTML = "<p>" + workMinutes + ":00</p>";

  function getTimeRemaining(finish) {
    var t = Date.parse(finish) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function beginCountdown(end) {

    function runClock() {

      var count = getTimeRemaining(end);
      document.getElementById("timer").innerHTML = "<p>" + count.minutes + ":" + count.seconds + "</p>";
      console.log(count.total);

      if (count.total <= 0) {
        clearInterval(startstop);
        beep.play();
      }

    }

    runClock();
    startstop = setInterval(runClock, 1000);

  }

  function addTime() {
    clearInterval(startstop);
    var time;
    if (this.value == "workMinutes") {
      workMinutes += 1;
      time = workMinutes;
    } else {
      breakMinutes += 1;
      time = breakMinutes;
    }
    document.getElementById("timer").innerHTML = "<p>" + time + ":00</p>";
  }

  function subTime() {
    clearInterval(startstop);
    var time;
    if (this.value == "workMinutes") {
      workMinutes -= 1;
      time = workMinutes;
    } else {
      breakMinutes -= 1;
      time = breakMinutes;
    }
    document.getElementById("timer").innerHTML = "<p>" + time + ":00</p>";
  }

  $('.start-work').click(function() {
    clearInterval(startstop);
    var currentTime = Date.parse(new Date());
    var deadline = new Date(currentTime + workMinutes * 60 * 1000);
    beginCountdown(deadline);
  });

  $('.start-break').click(function() {
    clearInterval(startstop);
    var currentTime = Date.parse(new Date());
    var deadline = new Date(currentTime + breakMinutes * 60 * 1000);
    beginCountdown(deadline);
  });

  $('.minus').click(subTime);

  $('.plus').click(addTime);

});