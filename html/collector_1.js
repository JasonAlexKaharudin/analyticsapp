function collectStaticData(){
    // user agent string
    var userAgent = navigator.userAgent;
    console.log("User agent is: ", userAgent);

    // the user's language
    var userLang = navigator.language;  
    console.log("User's language is: ", userLang);

    // if the user accepts cookies
    var cookieEnabled = navigator.cookieEnabled;
    console.log("User cookie enabled? ", cookieEnabled);

    // User's screen dimensions
    var screenWidth = screen.width;
    var screenHeight = screen.height;
    console.log("User's screen dimensions: ", screenWidth,"x",screenHeight);

    // User's window dimensions
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;
    var outerWidth = window.outerWidth;
    var outerHeight = window.outerHeight;
    console.log("User's inner window dimensions: ", innerWidth,"x",innerHeight);
    console.log("User's outer window dimensions: ", outerWidth,"x",outerHeight);

    // User's network connection type
    var connectionType = navigator.connection.effectiveType; 
    console.log("User's connection effective type: ", connectionType);
}

//collect after the page has loaded
window.onload = collectStaticData(); 

// Performance (collected after the page has loaded)
function collectPerformanceData(){
    // The whole timing object
    let time = window.performance.timing
    console.log("Whole timing object: ", time);

    // Specifically when the page started loading
    var startLoad = time.domContentLoadedEventStart
    console.log("Page loading start: ", startLoad);

    // // Specifically when the page ended loading

    var endLoad = time.domContentLoadedEventEnd
    console.log("Page loading end: ", endLoad);

    // // The total load time (manually calculated - in milliseconds)
    var totalLoadTime = endLoad - startLoad;
    console.log("Total Load time: ", totalLoadTime);
}

//collect after the page has loaded
window.onload = collectPerformanceData();

function collectActivityData(){
    // Mouse Activity
        //cursor position (coordinates)
        onmousemove = function(e){
            var x = e.clientX;
            var y = e.clientY;
            console.log("mouse location:", x, y);
        }

        //clicks (which mouse button it was)
        //1 is for left click, 4 is for middle click, 2 is for right click
        // 0 is when mouse is not being clicked
        function logBtns(e){
            var btn = `${e.buttons} (${e.type})`;
            console.log(btn);
        }
        // document.addEventListener('mouseup', logBtns);
        document.addEventListener('mousedown', logBtns);
        //Scrolling (coordinates of the scroll)
        

    //Keyboard Activity
        //key down or key up events
        function keys(e){
            var key = `${e.key} (${e.type})`;
            console.log(key);
        }
        // document.addEventListener('keyup', keys);
        document.addEventListener('keydown', keys);

        //check idle activity
        //Idle time where no activity happened for a period of 2 or more seconds
        //record when the break ended
        //record how long it lasted (in ms)
        // let timer, currSeconds = 0;

        let timer, currSeconds = 0;
        function startIdleTimer() {
            currSeconds++;
            //currSeconds will represent the break length 
            let currMiliSeconds = currSeconds * 1000; 
            console.log("Break lasted for: ", currMiliSeconds)
        }

        function resetTimer() {
            //time will break whenever resetTimer is triggered
            let timeEnded = new Date(); 
            clearInterval(timer);
            currSeconds = 0;
            timer = setInterval(startIdleTimer, 2000);
            console.log("Break ended at", timeEnded)
        }

        //events that would trigger activity
        window.onload = resetTimer;
        window.onmousemove = resetTimer;
        window.onmousedown = resetTimer;
        window.onclick = resetTimer;
        window.onkeypress = resetTimer;
}

// collectActivityData();








