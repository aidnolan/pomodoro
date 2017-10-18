let origNum 	= parseFloat($("#breakTimer").text()),
	origTimer	= parseFloat($("#timer").text()),
	clockTxt	= $("#clockTimer").text(),
	clockTimer	= $("#clockTimer"),
	breakClock 	= $("#breakClock"),
	status		= "ready";		

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
			if($("#timerBox").css("z-index") == 1){
				startTimer(timeSet(clockTimer),clockTimer);
			} else {
				startTimer(timeSet(breakClock),breakClock);
			}

        }
	}, 1000);
	
}

let timeSet = (timer)=> {
	let timeArr = timer.text().split(":");
	console.log(timeArr);
	return (parseInt(timeArr[0]) * 60 + parseInt(timeArr[1])).toString();
}

let timerReset = (display, timer)=> {
	if(timer > 9){
		display.text(timer.toString() + ":" + "00");
	} else {
		display.text("0" + timer.toString() + ":" + "00");
	}
}



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
	// if(origTimer > 9){
	// 		$("#clockTimer").text(origTimer.toString() + ":" + "00");
	// 	} else {
	// 		$("#clockTimer").text("0" + origTimer.toString() + ":" + "00");
	// 	}	
});

$("#minusTimer").on("click", ()=>{
	if(origTimer > 0){
		$("#timer").text(origTimer - 1)
		origTimer -= 1;
	} else {
		origTimer = 0;
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
		origTimer = 0;
	}
	if(status == "ready"){
		timerReset(clockTimer, origTimer);
	}
});

// $("#minusBreak").on("click", function(){
// 	if(origNum > 0){
// 		$("#breakTimer").text(origNum - 1);
// 		origNum -= 1;
// 	} else {
// 		origNum = 0;
// 	}
// });

$("#minusBreak").on("click", function(){
	if(origNum > 0){
		$("#breakTimer").text(origNum - 1)
		origNum -= 1;
	} else {
		origNum = 0;
	}
	if(status == "ready"){
		timerReset(breakClock, origNum);
	}
});

$("#plusBreak").on("click", function(){
	if(origNum > 0){
		$("#breakTimer").text(origNum + 1)
		origNum += 1;
	} else {
		origNum = 0;
	}
	if(status == "ready"){
		timerReset(breakClock, origNum);
	}
});

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


$(function cardFlip(){
    $("#card").flip({
        axis: "x", // y or x
        reverse: false, // true and false
        trigger: "manual", // click, hover or manual
        speed: 500,
        autoSize: false
    });
    	
});





// $("#startBtn").on("click", function(){
// 	if(status == "stopped"){
// 		jQuery(function ($) {
// 			console.log(clockTxt);
// 			console.log(clockTimer);
	    	
// 		})
// 	} else {
// 		jQuery(function ($) {
//     		startTimer(timeSet, clockTimer);
//     		console.log(clockTimer);
// 		})
// 	;}
// 	// origTimer = timeSet;
// 	// if($("#clockTimer").text("00:00")){
// 	// 	jQuery(function ($) {
//  //    	timeSet = 60 * ,
//  //        display = $('#clockTimer');
//  //    	startTimer(timeSet, display);
// 	// });
// 	// };
// 	//review toggle to pause timer
// 	//make clock roll over onto break
// 	//add changing background images to signify break or work
// });

// $("#stopBtn").on("click", function(){
// 	return status = "stopped";
// });

// $("#resetBtn").on("click", function(){
// 	status = "stopped";



// });


// 	// function(){$("#pomoInfo").css({"display":"inline"});},
// 	// function(){$("#pomoInfo").css({"display":"none"});};
// 	// function(){$("pomoInfo").css({"color": "blue"});},
//  //    function(){$("pomoInfo").css({"color": "green"});}
//  //   );


