console.log("Hello from Collector.js");

let startTime;
let accumulatedTime = 0;
let isActive = true;


// Button Clicks
const button1 = document.querySelector('.button-1');
const button2 = document.querySelector('.button-2');

function trackButton1Click() {
    console.log('Button 1 clicked!');
}

function trackButton2Click() {
    console.log('Button 2 clicked!');
}

button1.addEventListener('click', trackButton1Click);
button2.addEventListener('click', trackButton2Click);
// Button Clicks


// Tracking
function startTracking() {
  startTime = new Date();
  accumulatedTime = 0;
  
  if (typeof document.hidden !== "undefined") {
    document.addEventListener("visibilitychange", handleVisibilityChange);
  }
  
  setInterval(updateAccumulatedTime, 1000);
}

function updateAccumulatedTime() {
  if (isActive) {
    let currentTime = new Date();
    let elapsedTime = currentTime - startTime;
    accumulatedTime += elapsedTime;
    startTime = currentTime;
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    isActive = false;
  } else {
    isActive = true;
    startTime = new Date();
  }
}

function stopTracking() {
  let endTime = new Date();
  let duration = endTime - startTime + accumulatedTime;
  let seconds = Math.round(duration / 1000); // Convert to seconds
  
  console.log("User spent " + seconds + " seconds on the website.");
}

setInterval(console.log(), 5000);
window.addEventListener("beforeunload", stopTracking);
window.addEventListener("load", startTracking);
// Tracking