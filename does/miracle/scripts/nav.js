

//document.domain = "gmarket.co.kr";



var w = parent.window;
var isContain = document.getElementById('header') ? true : false;
var miracleContent = document.getElementById('contents');
var miracle = function(){
	return miracleContent.contentWindow.miracle;
};
var headerHei = function(){
	return miracleContent.contentWindow.headerHei;
}

jQuery('#header').height(90);


var nav = (function(){
	
	var back = $('#nav li .back');
	var btn = $('#nav li');
	var navTime = 600;
	var navEasing = 'easeInOutQuad';
	var currentNum = -1;
	var posArr = [706, 2538, 3548, 4400];

	
	btn.mouseenter(function(){
		var i = $(this).index();
		mouseOver(i);
	});
	
	
	
	btn.mouseleave(function(){
		var i = $(this).index();
		if(currentNum == i)return;
		mouseOut(i);
	});
	btn.click(function(){
		if(currentNum != -1){
			mouseOut(currentNum);
		}
		var i = $(this).index();
		currentNum = i;

	});
	
	
	var setNavi = function(oy){
		//console.log("oy:"+oy);
		
		if(currentNum != -1 && oy < posArr[0]){
			mouseOut(currentNum);
			currentNum = -1;
		}else if(currentNum != 0 && posArr[0] < oy && oy < posArr[1]){
			mouseOut(currentNum);
			mouseOver(0);
			currentNum = 0;
		}else if(currentNum != 1 && posArr[1] < oy && oy < posArr[2]){
			mouseOut(currentNum);
			mouseOver(1);
			currentNum = 1;
		}else if(currentNum != 2 && posArr[2] < oy && oy < posArr[3]){
			mouseOut(currentNum);
			mouseOver(2);
			currentNum = 2;
		}else if(currentNum != 3 && posArr[3] < oy){
			mouseOut(currentNum);
			mouseOver(3);
			currentNum = 3;
		}
	}
	function mouseOver(i){
		var b = back.eq(i);
		//if(b.height() == 0){
			b.stop().animate({'height' : 54}, {duration: 300, easing: 'easeOutQuart'});
		//}
		
	}
	
	function mouseOut(i){
		var b = back.eq(i);
		//if(b.height() == 54){
			b.stop().animate({'height' : 0}, {duration: 300, easing: 'easeOutQuart'});
		//}
		
	
	}
	
	
	
	btn.eq(0).click(function(){
		w.jQuery('html,body').stop().animate({scrollTop : headerHei+posArr[0]}, {duration: navTime, easing: navEasing});
		return false;
	});
	btn.eq(1).click(function(){
		w.jQuery('html,body').stop().animate({scrollTop : headerHei+posArr[1]}, {duration: navTime, easing: navEasing});
		return false;
	});
	btn.eq(2).click(function(){
		w.jQuery('html,body').stop().animate({scrollTop : headerHei+posArr[2]}, {duration: navTime, easing: navEasing});
		return false;
	});
	btn.eq(3).click(function(){
		w.jQuery('html,body').stop().animate({scrollTop : headerHei+posArr[3]}, {duration: navTime, easing: navEasing});
		return false;
	});
	

	
	return {
		setNavi:setNavi
		
	}
	
	
}());

miracleNav = nav;


$(document).ready(function(){

	
	
	//alert('ready');
	
});

window.onload = function(){
	//alert('onload');
}



















