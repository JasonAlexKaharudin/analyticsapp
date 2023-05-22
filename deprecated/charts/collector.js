window.onload = function (){
    let startTime = window.performance.timing.navigationStart;
    let endTime = window.performance.timing.domContentLoadedEventEnd;
    
    console.log(window.performance.timing.domContentLoadedEventEnd)
    console.log(window.performance.timing.domContentLoadedEventStart)
    console.log(window.performance.timing.requestStart)
}
