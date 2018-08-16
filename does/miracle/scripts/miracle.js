
//document.domain = "gmarket.co.kr";




var w = window;
var isContain = document.getElementById('header') ? true : false;
var headerHei = isContain ? 143-60 : 0;


/*
var header = parent.document.getElementById('miracleIframeHeader');

$(header.contentDocument).ready(function(){
	alert(header);
});
*/


var seqImages = function(obj, name, max, time){
		
	var img = null;
	var srcArr = [];
	var intervalCount = 0;
	var isStart = false;
	var isLoaded = false;
	
	
	var startInterval = function(){

		if(isStart){
			return;
		}
		isStart = true;
		
		

		var interval = setInterval(function(){
			

		
			var src = srcArr[intervalCount];
			
			//$(obj).css({'background-image': 'url('+src+')'});
			$(img).attr('src',src);
			
			if(intervalCount == max){
				clearInterval(interval);
			}
			intervalCount++;
		}, time);
	};
	
	var loadImg = function(r){
		

		for(var i = 0; i < max + 1; i++){

			var n;
			if(i < 10){
				n = '00' + i;
			}else if(i < 100){
				n = '0' + i;
			}else {
				n = i;
			}
		
			var count = 0;
			var image = new Image();
			image.onload = function(){
				if(count == max){
					isLoaded = true;
					var src = srcArr[r];
					obj.append('<img src="' + src + '" alt="" class="img_obj" />');
					img = obj.find('.img_obj');
				}else{
					count++;
				}
				
				
			};
			
			image.src = 'images/seq/' + name + '/' + name + '_00' + n + '.jpg' + '?' + Math.random();
			image.index = i;
			srcArr.push(image.src);
		}

	};
	
	loadImg(0);
	
	return {
		start : startInterval,
		isLoaded:isLoaded,
		isStart:isStart
	}

	
	
};


var miracle = (function(){
	
	var videoArea = $('.videoArea');
	var story = $('.story');
	var walking = $('.walking');
	var leftObj = seqImages($('.star .obj_left'), 'mobile01', 181, 30);
	var rightObj = seqImages($('.star .obj_right'), 'mobile02', 171, 30);
	var registration = seqImages($('.apply .circle'), 'registration', 62, 30);
	var isCnblue = false;
	var isLeftBtn = false;
	var isRightBtn = false;
	var isHeader = false;
	
	
	videoArea.css({'background-position-y': -300});
	story.css({'background-position-y': -1250});
	
	
	var bpx = parseInt(walking.css('background-position-x'), 10);
	
	setInterval(function(){
		//console.log(bpx);
		walking.css({'background-position-x': bpx-1});
		bpx = bpx + 20;
	}, 500);
	
	
	var scroll = function(e){

	
		var oy = $(w).scrollTop();
		var ot = 0;
		
		miracleNav.setNavi(oy);
		
		//143 : gmarket header hei
		if(!isHeader && oy > 143){
			w.jQuery('#header').css({'position':'fixed'});
			isHeader = true;
		}else if(isHeader && oy <= 143){
			isHeader = false;
			w.jQuery('#header').css({'position':'absolute'});
		}
		

		if(0 < oy && oy < 1200){
			videoArea.css({'background-position-y': oy * 0.3 - 300});
		}
		
		//왼쪽풍선
		if(!leftObj.isStart && !leftObj.isLoaded && headerHei + 1106 < oy){
			leftObj.start();
		}
		//오른쪽풍선
		if(!rightObj.isStart && !leftObj.isLoaded && headerHei + 1106 < oy){
			rightObj.start();
		}
		
		//gdragon
		if(!isLeftBtn && headerHei + 1500 < oy){
			$('.star_l').animate({'left' : 0}, {duration: 600, easing: 'easeOutQuad'});
			isLeftBtn = true;
		}
		//gdragon
		if(!isRightBtn && headerHei + 1500 < oy){
			$('.star_r').animate({'right' : 0}, {duration: 600, easing: 'easeOutQuad'});
			isRightBtn = true;
		}
		//registration
		if(!registration.isStart && !leftObj.isLoaded && headerHei + 2950 < oy){
			registration.start();
		}
		//cd 이미지
		if(!isCnblue && headerHei + 1106 + 430 < oy){
			$('.cnblue .cd').animate({'left' : 150}, {duration: 600, easing: 'easeOutQuad'});
			isCnblue = true;
		}
		
		if(2600 < oy && oy < 4700){
			story.css({'background-position-y': oy * 0.3 - 1250});
		}
		
		
	
	}
	
	
	var setScroll = function(num, time){
		//w.jQuery('html,body').animate({scrollTop : 1000}, {duration: 600, easing: 'easeOutQuad'});
	}
	
	
	var init = function(){
	

		w.onscroll = scroll;
		
	}
	
	
	
	init();
	
	
	
	
	return {
		
		setScroll:setScroll,
		scroll:scroll
		
	}
	
	
}());






/*
var loop = (function(){
		
	seqImages('mobile01', 122, '00', 150);

}());
*/

//Modernizr.csstransforms3d







var slideNav = (function(){
	
	
	var btn = $('.slideNav li a');
	var li = $('.slide li');
	var num = -1;
	var isAnimate = false;
	
	btn.click(function(){
		var index = $(this).parent().index();
		slidingObj(index);
		return false;
	});
	
	//TweenLite.set('.slideContainer .container', {transformPerspective:500});
	if(Modernizr.csstransforms3d){
		TweenLite.to($('.slide .title'), 3, {rotationY:360, ease:Power4.easeInOut});
	}
	

	
	function slidingObj(i){
	
		if(num == i){
			return;
		}
	
		if(isAnimate){
			return;
		}
		isAnimate = true;

		li.eq(i).css({'z-index':5});
		
		

		li.eq(num).stop().animate({'height' : 0}, {duration: 600, easing: 'easeInOutQuart', complete:function(){
			li.eq(num).css({'z-index':1, 'height':598});
			li.eq(i).css({'z-index':10});
			num = i;
			isAnimate = false;
		}});
		
		btn.eq(num).removeClass('on');
		btn.eq(i).addClass('on');
		
		
	}
	
	btn.eq(0).addClass('on');
	li.eq(0).css({'z-index':10});
	num = 0;
	
	
	
}());





var nanum = (function(){

	var currentNum = 0;
	
	var con = $('.con');
	
	con.eq(currentNum).show();

/*
	var conArr = [];
	for(var i = 1;i<=5;i++){
		var con = $('.star .con' + i);
		conArr.push(con);
	}
	console.log(conArr);
*/
	
	var btnL = $('.star .star_l');
	var btnR = $('.star .star_r');
	var isAnimate = false;
	
	btnL.click(function(){
	
		var n = 0;
		if(currentNum < 1){
			n = con.length - 1;
		}else{
			n = currentNum - 1;
		}
	
		btnLclick(n);
		return false;
	});
	
	btnR.click(function(){
		
		var n = 0;
		if(con.length-1 <= currentNum){
			n = 0;
		}else{
			n = currentNum + 1;
		}
	
	
		btnRclick(n);		
		return false;
	});
	
	function btnLclick(n){
		if(isAnimate || currentNum == n)return;
	
		isAnimate = true;
		con.eq(currentNum).stop().animate({'left' : 3000}, {duration: 1000, easing: 'easeInOutQuart', complete:function(){
			isAnimate = false;
			$(this).hide();
		}});

		con.eq(n).show().css({'left':-3000}).stop().animate({'left' : 0}, {duration: 1000, easing: 'easeInOutQuart'});
		
		
		currentNum = n;
	}
	
	function btnRclick(n){
		if(isAnimate || currentNum == n)return;
		
		isAnimate = true;
		con.eq(currentNum).stop().animate({'left' : -3000}, {duration: 1000, easing: 'easeInOutQuart', complete:function(){
			isAnimate = false;
			$(this).hide();
		}});
		
		con.eq(n).show().css({'left':3000}).stop().animate({'left' : 0}, {duration: 1000, easing: 'easeInOutQuart'});
		
		currentNum = n;
	}
	
	
	
	
	
	$('.starList li a').click(function(){
		//console.log($(this).parent().index());
		
		var i = $(this).parent().index();
		
		listClick(i);
		

		
		
		return false;
	});
	
	
	function listClick(i){
				
		if(isAnimate || currentNum == i)return;
		currentNum < i ? btnRclick(i) : btnLclick(i);
		
	}
	
	
	
	
	return {
		
	}
	
}());







var setting = (function(){
	
	
	$('.overbtn').mouseenter(function() {
		var src = $(this).children('img').attr('src').replace('.png', '_on.png');
		$(this).children('img').attr('src', src);
	});
	$('.overbtn').mouseleave(function() {
		var src = $(this).children('img').attr('src').replace('_on.png', '.png');
		$(this).children('img').attr('src', src);
	});
	
	return {
		
	}
	
}());



//parent.miracle = miracle;


$(document).ready(function(){

	
	
	
	
	
});

window.onload = function(){
	//alert('onload');
}





var navInterval = setInterval(function(){
	//console.log(navInterval);
	if(miracleNav){
		miracle.scroll();
		clearInterval(navInterval);
	}
}, 200);

























