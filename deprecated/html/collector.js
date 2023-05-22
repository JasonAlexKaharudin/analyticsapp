// const staticData = [{
//     outerWidth: window.outerWidth,
//     outerHeight: window.outerHeight,
//     innerWidth: window.innerWidth,
//     innerHeight: window.innerHeight,
//     userAgent: navigator.userAgent,
//     language: navigator.language
//   }];

// let currClickPackage = []; // An array of current click events that have occurred


// //check how long the user is on the page before unload

// // Function that fires whenever there is a click anywhere in the window
// window.addEventListener('click', e => {
//     // Object with some of the data from the click event object
//     let clickEvent = {
//         client: {
//         x: e.clientX,
//         y: e.clientY
//         },
//         page: {
//         x: e.pageX,
//         y: e.pageY
//         }
//     }

//     // Push the new clickEvent object we created above to the array
//     currClickPackage.push(clickEvent);
// });

// const packageQueue = [];

// /**
//  * Pushes the current click package to the queue to be sent, then resets the current
//  * click package (if isCurrClick is set to true)
//  * @param {Object} data - The data that you would like to pacakge and enqueue
//  * @param {Boolean} isCurrClick - If data is the currClickPackage (true) or not (false)
//  */
// function enqueueData(data, isCurrClick) {
//     packageQueue.push(JSON.stringify(data));
//     if (isCurrClick) {
//         currClickPackage = [];
//     }
// }
// function sendData(isTimeout) {
//     if (JSON.parse(packageQueue[0]).length == 0) {
//         packageQueue.shift();
//         return;
//     }
//     fetch('https://httpbin.org/post', {
//         method: 'POST',
//         headers: new Headers({ 'Content-Type': 'application/json' }),
//         body: packageQueue[0]
//     }).then(response => response.json())
//      .then(data => {
//             console.log(data.json);
//             packageQueue.shift(); // Removes the first index from the queue on success
//         })
//         .catch(err => {
//         console.log(`Error: ${err}`); // Log the error if unsuccessful
//         if (!isTimeout) {
//             setTimeout(() => {
//             sendData(true);
//             }, 1000);
//         }
//         });
// }

// document.addEventListener('DOMContentLoaded', () => {
//     // Send the initial static Data
//     enqueueData(staticData, false);
//     sendData();
  
//     // Set interval for the click data
//     setInterval(function () {
//       enqueueData(currClickPackage, true); // Add package to the queue and reset the current package
//       sendData(); // Send data from queue to the endpoint
//     }, 5000); // Execute this code every 5 seconds (5000 ms)
//   });


// const beforeUnloadListener = (event) => {
//     event.preventDefault();
//     return event.returnValue = "Are you sure you want to exit?";
// };

// const nameInput = document.querySelector("#name");

// nameInput.addEventListener("onunload", (event) => {
//     if (event.target.value !== "") {
//         addEventListener("beforeunload", beforeUnloadListener, {capture: true});
//     } else {
//         removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
//     }
// });

let start, end;
window.onload = function(){
    let d = new Date();
    start = d.getTime();
    console.log("start time:" + start);
}

window.onbeforeunload = function(event){
    event.preventDefault();
    let d = new Date(); 
    end = d.getTime(); 
    let timeSpent = end - start; 
    console.log(timeSpent);
    conso
};
