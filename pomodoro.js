// Card flip set-up so timers can change seamlessly between Work & Break
$(cardFlip = ()=>{
    $("#card").flip({
        axis: "x",
        reverse: false,
        trigger: "manual",
        speed: 500,
        autoSize: false
    });
});

let audio = new Audio('flip.wav');

// Breakdown of DOM/jQuery components into variables
let origNum 	= parseFloat($("#breakTimer").text()),
	origTimer	= parseFloat($("#timer").text()),
	clockTxt	= $("#clockTimer").text(),
	clockTimer	= $("#clockTimer"),
	breakClock 	= $("#breakClock"),
	// Status to let program know when the clock is already running 
	status		= "ready";		

// 
let timeSet = (timer)=> {
	let timeArr = timer.text().split(":");
	console.log(timeArr);
	return (parseInt(timeArr[0]) * 60 + parseInt(timeArr[1])).toString();
}

// Function to start timer and esnure seamless flow between the two timers
let startTimer = (duration, display) => {
	let timer = duration, minutes, seconds;
	let runningClock = setInterval(() => {
		if(status == "ready"){
        	return clearInterval(runningClock);
    	}
    	status 	= "running";
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);
        
        if (--timer < 0) {
        	clearInterval(runningClock);
            timer = duration;
            // status = "ready";
			$("#card").flip('toggle');
			audio.play();
			if($("#timerBox").css("z-index") == 1){
				startTimer(timeSet(clockTimer),clockTimer);
			} else {
				startTimer(timeSet(breakClock),breakClock);
			}

        }
	}, 1000);
	
}

// Used to realign timers with the set times above the clock 
let timerReset = (display, timer)=> {
	if(timer > 9){
		display.text(timer.toString() + ":" + "00");
	} else {
		display.text("0" + timer.toString() + ":" + "00");
	}
}

$("#timerBox").on("click", ()=>{
	$("#card").flip(true);
	timerReset(clockTimer, origTimer);
	status = "ready";
});

$("#breakBox").on("click", ()=>{
	$("#card").flip(false);
	timerReset(breakClock, origNum);
	status = "ready";	
});

// Start stop and reset buttons to control the clocks
$("#startBtn").on("click",()=>{
	if(status == "running"){
		return;
	}
	else if($("#timerBox").css("z-index") == 1){
		timerReset(breakClock, origNum);
		startTimer(timeSet(clockTimer), clockTimer);
		status = "running";	
	} else {
		timerReset(clockTimer, origTimer);
		startTimer(timeSet(breakClock), breakClock);
		status = "running";	
	}
	console.log(status);
});

$("#stopBtn").on("click", ()=>{
	status = "ready";
});

$("#resetBtn").on("click", ()=>{
	status = "ready";
	timerReset(clockTimer, origTimer);
	timerReset(breakClock, origNum);	
});

// Plus and minus buttons to increase/decrease session lengths
$("#minusTimer").on("click", ()=>{
	if(origTimer > 1){
		$("#timer").text(origTimer - 1)
		origTimer -= 1;
	} else {
		origTimer = 1;
	}
	if(status == "ready"){
		timerReset(clockTimer, origTimer);	
	}
});

$("#plusTimer").on("click", ()=>{
	if(origTimer > 0){
		$("#timer").text(origTimer + 1)
		origTimer += 1;
	} else {
		origTimer = 1;
	}
	if(status == "ready"){
		timerReset(clockTimer, origTimer);
	}
});

$("#minusBreak").on("click", ()=>{
	if(origNum > 1){
		$("#breakTimer").text(origNum - 1)
		origNum -= 1;
	} else {
		origNum = 1;
	}
	if(status == "ready"){
		timerReset(breakClock, origNum);
	}
});

$("#plusBreak").on("click", ()=>{
	if(origNum > 0){
		$("#breakTimer").text(origNum + 1)
		origNum += 1;
	} else {
		origNum = 1;
	}
	if(status == "ready"){
		timerReset(breakClock, origNum);
	}
});

// Intro and information reveal/hide
$("#expandInfo").on("click", ()=>{
	$("#pomoInfo").show();
	$("#hideInfo").show();
	$("#expandInfo").hide();
});

$("#hideInfo").on("click", ()=>{
	$("#pomoInfo").hide();
	$("#hideInfo").hide();
	$("#expandInfo").show();
});


