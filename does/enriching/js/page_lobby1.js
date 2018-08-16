





function inLobby(){


}

$(document).ready(function(){
		
	$('#gnb li a').setButtonGnb(-1);
	initIndexContents();
		
	setTimeout(function(){
		loadUserCount();
	}, 2000);
	
	
	if(isFlash){
		
		
	
	}else{
		onLoopStart();
		$('.flash_container').html('<img src="'+imgServer+'/images/index/lobby_visual_bg.jpg" alt="" />');
	}
	
	
});

onLoopStart = function(){
	//alert('asdf');
	$('.idCard').show().css({'margin-top':-630}).delay(500).animate({'margin-top':-270}, {duration:1000,easing:"easeOutBack"});
	
}


function initFlash () {
	var flashvars;
	if(facebookLogin){
		flashvars = {"fb_friendList":fb_friendList,"appid":593070714069553,"id_type":"facebook"};
	}else{
		flashvars = {};
	}
	
	var params = {};
	params.wmode = 'transparent';
	params.menu = 'false';
	params.base = '.';
	var attributes = {};
	flashvars.debug = 0;
	//flashvars.loginCheck = loginCheck;  //0:이미 응모한사람, 1:처음 응모한사람
	attributes.name = "lobby_flash";
	attributes.id = "lobby_flash";
	swfobject.embedSWF("swf/lobby_.swf", "lobby_flash", "100%", "710", "10.0.0" , null, flashvars , params , attributes  );
}
//ADDED BY SANGHUN
var facebookLogin = true;
var fb_friendList;
$(function () {
	var tmpFunc = window.fbAsyncInit;
	window.fbAsyncInit = function () {
		tmpFunc();
		FB.getLoginStatus(function(response) {
			console.log(response);
			if(response.status == "connected"){
				facebookLogin = true;
			}else{
				facebookLogin = false;
			}
			initFlash();
		});
	}
	
})