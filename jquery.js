$(function(){
var mode; 
var lapCounter=0;
var timeCounter=0;
var numboflap=0;
mode=0;
var lapNumber=0;
var action;
var timeminutes,timeseconds,timecentiseconds,lapminutes,lapseconds,lapcentiseconds;
$(".startbtn").click(function(){
   
    if(mode==0){ // mode 0:stopped
        mode=1;    // mode 1:running
        $(".startbtn").text("Stop");
        $(".lapbtn").text("Lap");
        startAction();
    }
    else if(mode==1){  // when mode :1 is clicked 
        mode=2;    // mode =2 stopped / resumed 
        $(".startbtn").text("Resume");
        $(".lapbtn").text("Reset");
        clearInterval(action);
        
    }
    else if(mode==2){ // when mode 2 is clicked 
        mode=1; // mode=1 running
        $(".startbtn").text("Stop"); 
        $(".lapbtn").text("Lap");
        startAction();
    }
 
});
    $(".lapbtn").click(function(){
        if(mode==2){
            mode=0;
         location.reload();
        }else if(mode==1){
           addLap();
            lapCounter=0;
 
            
         }
    });
    function startAction(){
        action=setInterval(function(){
            timeCounter++;
            if(timeCounter==100*60*100){
                timeCounter=0;
            }
            lapCounter++;
             if(lapCounter==100*60*100){
                lapCounter=0;
            }
            updateTimer();
            updateLap();
        },10);
    }
    
    function updateTimer(){
        // 1 min=100*60 centiseconds=6000centiseconds
        timeminutes=Math.floor(timeCounter/6000);
        // 1 sec=100 centiseconds
        timeseconds=Math.floor((timeCounter%6000)/100);
        timecentiseconds=Math.floor((timeCounter%6000)%100);
        $("#timermin").text(format(timeminutes));
        $("#timersec").text(format(timeseconds));
        $("#timercs").text(format(timecentiseconds));
    }
    function updateLap(){
         // 1 min=100*60 centiseconds=6000centiseconds
        lapminutes=Math.floor(lapCounter/6000);
        // 1 sec=100 centiseconds
        lapseconds=Math.floor((lapCounter%6000)/100);
        lapcentiseconds=Math.floor((lapCounter%6000)%100);
         $("#lapmin").text(format(lapminutes));
        $("#lapsec").text(format(lapseconds));
        $("#lapcs").text(format(lapcentiseconds));
    }
    function format(num){
    return num < 10 ? "0" + num : num;
}
    function addLap(){
        lapNumber++;
        var myLapdetails='<div class="lapend">'+'<div class="laptitle">'+'Lap'+lapNumber+'</div>'+'<div class="laptime">'+'<span>'+format(lapminutes)+'</span>'+':'+'<span>'+format(lapseconds)+'</span>'+':'+'<span>'+format(lapcentiseconds)+'</span>'+'</div>'+'</div>';
        $(myLapdetails).appendTo("#Laps");
    }
});