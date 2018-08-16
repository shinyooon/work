
var flashvars = {};
var params = {};
params.wmode = 'opaque';
params.menu = 'false';
params.base = '.';
var attributes = {};
flashvars.debug = 0;
attributes.name = "main_flash";
attributes.id = "main_flash";
swfobject.embedSWF("swf/offline_meeting.swf", "main_flash", "100%", "488", "10.0.0" , null, flashvars , params , attributes  );		





$(document).ready(function(){
	
	$('#gnb li a').setButtonGnb(2);
	
	
	if(ie){
	

	}else{
		
//		$('.visual_container h3').fadeTo(0,0).css({'margin-left':80});
	
//		$('.visual_container .subtitle').fadeTo(0,0).css({'margin-left':80});
	}
	
	
	if(isFlash){
		
		
	
	}else{
		onLoopStart();
		$('.flash_container').html('<img src="'+imgServer+'/images/offline/offline_visual_bg.jpg" alt="" />');
	}
	
	
	
	
	
	
});

onLoopStart = function(){


	if(ie){
	
		$('.visual_container h3').show();
		$('.visual_container .subtitle').show();
	
	}else{
		
//		$('.visual_container h3').stop().delay(0).animate({'margin-left':0, opacity:1}, {duration:800, easing:"easeOutQuad"});
	
//		$('.visual_container .subtitle').stop().delay(200).animate({'margin-left':0, opacity:1}, {duration:800, easing:"easeOutQuad"});
	}
	

}
