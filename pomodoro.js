$(document).ready(function(){
	
});

var origNum 	= parseFloat($("#break").text()),
	origTimer	= parseFloat($("#timer").text()),
	clockTimer	= $("#clockTimer");

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}



$("#minusBreak").on("click", function(){
	if(origNum > 0){
		$("#break").text(origNum - 1)
		origNum -= 1;
	} else {
		origNum = 0;
	}
});

$("#plusBreak").on("click", function(){
	$("#break").text(origNum + 1)
	origNum += 1;
});

$("#minusTimer").on("click", function(){
	if(origTimer > 0){
		$("#timer").text(origTimer - 1)
		origTimer -= 1;
	} else {
		origTimer = 0;
	}
	$("#clockTimer").text(origTimer);
});

$("#plusTimer").on("click", function(){
	$("#timer").text(origTimer + 1)
	origTimer += 1;
	$("#clockTimer").text(origTimer);
});

$("#clockTimer").on("click", function(){
	jQuery(function ($) {
    var timeSet = 60 * origTimer,
        display = $('#clockTimer');
    startTimer(timeSet, display);
	});
	origTimer = fiveMinutes;

	//review toggle to pause timer
	//make clock roll over onto break
	//add changing background images to signify break or work
});

$("#expandInfo").toggle(
        function(){$("#pomoInfo").css({"color": "red"});},
        function(){$("#pomoInfo").css({"color": "blue"});},
        function(){$("#pomoInfo").css({"color": "green"});
    });


