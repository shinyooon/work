


var pageType = getURLParameter('pageType');
if(pageType != 'join'){
	pageType = '';
}



	




	var flashvars = {};
	var params = {};
	params.wmode = 'opaque';
	params.menu = 'false';
	params.base = '.';
	var attributes = {};
	flashvars.debug = 0;
	flashvars.pageType = pageType;
	attributes.name = "main_flash";
	attributes.id = "main_flash";
	attributes.title = "마음을 모아 세상을 풍요롭게";
	swfobject.embedSWF("swf/index_.swf", "main_flash", "100%", "710", "10.0.0" , null, flashvars , params , attributes  );			

	getPhoneNumber = function(data){
	

		$('#join_phone1').val(data.phone.p1);
		$('#join_phone2').val(data.phone.p2);
		$('#join_phone3').val(data.phone.p3);

		$('#join_id').focus();

	}
	
	isIndex = true;
	
	var pageType = getURLParameter('pageType');
	
	$(document).ready(function(){
		$('#gnb li a').setButtonGnb(-1);
		
		initIndexContents();
		
		setTimeout(function(){
			loadUserCount();
		}, 2000);
		
		$('.main_popup a').attr('tabindex', -1);
		
		
		
		
		$('input[name=join_select]').click(function(){
			
			var index = $('input[name=join_select]').index(this) + 1;
			$('.user_img_char').attr('src', '/images/join/join_character'+index+'.png');
			
		});
		
		
		
		
		
		if(isFlash){
		
		
	
		}else{
			
			$('.flash_container').html('<img src="'+imgServer+'/images/index/main_visual_bg.jpg" alt="" />');
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	});
	
	
	
	function getPageType(){
		return pageType;
	}


	function mainLoadingComplete(){
	
		
	
		if(pageType != "join"){
			offMainPopup();
			
		}
		if(pageType == "join"){
			//goLogin();
		}
	}
	
	function mainMotionUpComplete(){
		
		$('.join_section').css({'top':-560}).animate({'top':95}, {duration:1000, easing:"easeOutExpo"});
		$('.event_section').css({'top':-560}).animate({'top':95}, {duration:1000, easing:"easeOutExpo"});
		$('.join_step1_section').css({'top':-560}).animate({'top':95}, {duration:1000, easing:"easeOutExpo"});
		
		$('.user_img_char').css({'top':-250}).delay(1000).animate({'top':0}, {duration:1000, easing:"easeOutBack", complete:function(){
			$('#user_profiles').show();
		}});
		
		$('#user_profiles').hide();
		
		if(User.level == "0"){
			
			$('.join_section').hide();
			$('.event_section').show();
			$('.join_step1_section').hide();
			$('.event_section_title').focus();
		}else if(User.level == "1"){
			$('.join_section').show();
			$('.event_section').hide();
			$('.join_step1_section').hide();
		}else if(User.level == "null"){
			$('.join_section').show();
			$('.event_section').hide();
			$('.join_step1_section').hide();
			
			$('.join_section_title').focus();
		}
	
			
	}

	//ADDED BY SANGHUN
	function mainMotionDownComplete(){
		offMainPopup();
	}
	
	function closeJoin(){
	
	
		$('.join_section').animate({'top':-560}, {duration:1000, easing:"easeInExpo"});
		$('.event_section').animate({'top':-560}, {duration:1000, easing:"easeInExpo"});
		$('.join_step1_section').animate({'top':-560}, {duration:1000, easing:"easeInExpo"});
	
	
		/*
$('.join_section').hide();
		$('.event_section').hide();
		$('.join_step1_section').hide();
*/
		thisMovie('main_flash').outLogin();
	}
	

	function offMainPopup(){
		$('.main_popup').animate({'right':0}, {duration:1000, easing:"easeInOutExpo"});
		$('.main_popup a').removeAttr('tabindex');
	}
	

