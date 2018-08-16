
$(document).ready(function(){

	$('#gnb li a').setButtonGnb(3);
	
	
	if(ie){
		return;
	}
	$('.event_img').css({'margin-top':-630}).delay(500).animate({'margin-top':-270}, {duration:1000,easing:"easeOutBack"});
	
	var time = 400;
	
	$('.event_title').eq(0).fadeTo(0,0).css({'margin-left':50}).delay(1500).animate({'margin-left':0, opacity:1}, {duration:time,easing:"easeOutQuad"});
	$('.event_desc').eq(0).fadeTo(0,0).css({'margin-left':50}).delay(1600).animate({'margin-left':0, opacity:1}, {duration:time,easing:"easeOutQuad"});
	$('.event_dl').eq(0).fadeTo(0,0).css({'margin-left':50}).delay(1700).animate({'margin-left':0, opacity:1}, {duration:time,easing:"easeOutQuad"});
	$('.event_btn').eq(0).fadeTo(0,0).css({'margin-left':50}).delay(1800).animate({'margin-left':0, opacity:1}, {duration:time,easing:"easeOutQuad"});
	
	$('.event_title').eq(1).fadeTo(0,0).css({'margin-left':50}).delay(1900).animate({'margin-left':0, opacity:1}, {duration:time,easing:"easeOutQuad"});
	$('.event_desc').eq(1).fadeTo(0,0).css({'margin-left':50}).delay(2000).animate({'margin-left':0, opacity:1}, {duration:time,easing:"easeOutQuad"});
	$('.event_dl').eq(1).fadeTo(0,0).css({'margin-left':50}).delay(2100).animate({'margin-left':0, opacity:1}, {duration:time,easing:"easeOutQuad"});
	$('.event_btn').eq(1).fadeTo(0,0).css({'margin-left':50}).delay(2200).animate({'margin-left':0, opacity:1}, {duration:time,easing:"easeOutQuad"});
	
	$('.event_img2').fadeTo(0,0).css({'margin-left':50}).delay(2300).animate({'margin-left':0, opacity:1}, {duration:time,easing:"easeOutQuad"});
});


function goEvent(){
	
	if(User.level == "1"){
		alert("이미 응모 하셨습니다.");
	}else if(User.level == "0"){
		eventConfirm();
	}else{
		notLogin();
		
	}
	
}

onLoopStart = function(){
	//alert('asdf');
}