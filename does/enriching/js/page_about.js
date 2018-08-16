

$(document).ready(function(){
	
	
	$('#gnb li a').setButtonGnb(0);
	$('.video_list').setImgButton(0, true);

	
	if(ie){
	

	}else{
		
		//$('.visual_container h3').fadeTo(0,0).show().css({'margin-left':80});
		//$('.visual_container .about_subtitle').fadeTo(0,0).show().css({'margin-left':80});
		//$('.visual_container .vedio_area_btn').fadeTo(0,0).show().css({'margin-left':80});
		
		/*var con1 = $('.about_con1');
		con1.data('ani', [
			{ obj:con1.find('h4 img').fadeTo(0,0).css({'margin-left':50}), animate:{'margin-left':0, opacity:1}, delay:0, isAnimate:false },
			{ obj:con1.find('.subtitle img').fadeTo(0,0).css({'margin-left':-50}), animate:{'margin-left':0, opacity:1}, delay:200, isAnimate:false },
			{ obj:con1.find('.desc').fadeTo(0,0).css({'margin-left':-50}), animate:{'margin-left':0, opacity:1}, delay:400, isAnimate:false },
		]);
		
		
		var con2 = $('.about_con2');	
		con2.data('ani', [
			{ obj:con2.find('h4 img').fadeTo(0,0).css({'margin-left':50}), animate:{'margin-left':0, opacity:1}, delay:0, isAnimate:false },
			{ obj:con2.find('.desc').fadeTo(0,0).css({'margin-left':-50}), animate:{'margin-left':0, opacity:1}, delay:200, isAnimate:false },
		]);
		
		
		var con3 = $('.about_con3');
		con3.data('ani', [
			{ obj:con3.find('h4 img').fadeTo(0,0).css({'margin-left':50}), animate:{'margin-left':0, opacity:1}, delay:0, isAnimate:false },
			{ obj:con3.find('dl').fadeTo(0,0).css({'margin-left':-50}), animate:{'margin-left':0, opacity:1}, delay:200, isAnimate:false },
		]);
		
		var con4 = $('.about_con4');
		con4.data('ani', [
			{ obj:con4.find('h4 img').fadeTo(0,0).css({'margin-left':50}), animate:{'margin-left':0, opacity:1}, delay:0, isAnimate:false },
			{ obj:con4.find('.desc').fadeTo(0,0).css({'margin-left':-50}), animate:{'margin-left':0, opacity:1}, delay:200, isAnimate:false },
		]);

		$(window).scroll(scroll2);*/
	}


	
});



onLoopStart = function(){
	//alert(isFlash)
	if(ie){
		//$('.visual_container h3').show();
		//$('.visual_container .about_subtitle').show();
		//$('.visual_container .vedio_area_btn').show();
		
	}else{
		//$('.visual_container h3').stop().delay(0).animate({'margin-left':0, opacity:1}, {duration:800, easing:"easeOutQuad"});
		//$('.visual_container .about_subtitle').stop().delay(200).animate({'margin-left':0, opacity:1}, {duration:800, easing:"easeOutQuad"});
		//$('.visual_container .vedio_area_btn').stop().delay(400).animate({'margin-left':0, opacity:1}, {duration:800, easing:"easeOutQuad"});
		
	}
	
	
	setTimeout(function(){
		scroll2();
	}, 500);
	
}









	
var vedioId=["ih84x10x1Oc","Sv7K4JY4zZQ","726r80xxxb4"];
var vedioTitle=["","", ""];
var cntIndex = 0;


function aboutShowVideo(){
	$(".vedio_area").html('');
	
	$('html,body').animate({'scrollTop':351},{duration:1000, easing:"easeInOutExpo"});
	

	$(".about_section1").stop().animate({'padding':'85px 0', 'height':'415px'},{duration:1000, easing:"easeInOutExpo", complete:function(){
		aboutPlayVideo(0);
	}});
	resize();
}

function aboutCloseVideo(){

	$(".about_section1").stop().css({'height':415-85-85}).animate({'padding':'0', 'height':'0'},{duration:1000, easing:"easeInOutExpo", complete:function(){
		
	}});
	resize();
}


function aboutPlayVideo(n){
	
	
	
	var frame = '<iframe width="595" height="385" src="//www.youtube.com/embed/'+vedioId[n]+'" frameborder="0" allowfullscreen></iframe>';
	
	$(".vedio_area").html(frame);
	
}

function aboutVideoUp(){
	
}

function aboutVideoDown(){
	
}

	

	
	


function scroll2(){

	//console.time('asdf');
	if(ie)return;
	
	var hei = $(window).height();
	var top = $(window).scrollTop();
	
	for (var i=1;i<5;i++){
		
		var obj = $('.about_con'+i);
		var eTop = obj.offset().top;
		var eHei = obj.height();
		
	
		if( hei > eTop  - top + eHei-150 ){
			//console.log(obj.offset());
			animateAbout(obj);
		}
	}
	
	
	
	//console.timeEnd('asdf');
}





function animateAbout(obj){
	var arr = obj.data('ani');
	for(var i=0;i<arr.length;i++){
		var item = arr[i];
		if(!item.isAnimate){
			item.obj.stop().delay(item.delay).animate(item.animate, {duration:600, easing:"easeInOutQuad"});
			item.isAnimate = true;
		} 
	}
}
	









//ADDED BY SANGHUN
function initFlash(){
	var flashvars = {};
	var params = {};
	params.wmode = 'opaque';
	params.menu = 'false';
	params.base = '.';
	var attributes = {};
	flashvars.debug = 0;
	attributes.name = "main_flash";
	attributes.id = "main_flash";
	swfobject.embedSWF("swf/about.swf", "main_flash", "100%", "488", "10.0.0" , null, flashvars , params , attributes  );
}
//ADDED BY SANGHUN
$(function () {
	initFlash();
})