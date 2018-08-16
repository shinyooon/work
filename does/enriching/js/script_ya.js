$(document).ready(function(){
	init();
	initOverEvent();
	
})




var $overMenuItem = null;
	
function init(){
	 $menuItems = $(".menu_item img");
}
function initOverEvent(){
	$menuItems.mouseenter(function(){
		if($overMenuItem != null){
			removeOverMenuItem($overMenuItem);
		}
		$overMenuItem = $(this);
		setoverMenuItem($overMenuItem);								
	});
	
	$(".menu_item").mouseleave(function(){
		if($overMenuItem != null){
			removeOverMenuItem($overMenuItem);
		}
              					
	});					
}
function setoverMenuItem($menuItems){
	$menuItems.attr("src",$menuItems.attr('src').replace(".png", "_over.png"));						
}
function removeOverMenuItem($menuItems){
	$menuItems.attr("src",$menuItems.attr('src').replace("_over.png", ".png"));	
}

function vedioAreaControl() {
	/*
$(".vedio_area_btn").click(function(e){
	
		alert('asdf')
	
		e.stopPropagation();
		e.preventDefault();
		
		
		
		//$('.about_section1').animate({'right':0}, {duration:1000, easing:"easeInOutExpo"});
		
	})
	$(".about_section1 .close_btn").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		
		
	})
*/
	
}



function vedioSet(){
	/*
$(".vedio_thumb li a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		var liIdx = $(this).parent().index()+1;
		cntIndex = liIdx;
		youtube="";
		youtube+="<object width=\"595\" height=\"385\" id=\"movie_change\" type='application/x-shockwave-flash' data='http://www.youtube.com/v/"+vedioId[liIdx]+"?version=3&amp;hl=en_US&amp;hd=1&amp;showinfo=0&amp;rel=0&amp;wmode=opaque'>";
		youtube+="<param name=\"movie\" value=\"http://www.youtube.com/v/"+vedioId[liIdx]+"?version=3&amp;hl=en_US&amp;hd=1&amp;showinfo=0&amp;rel=0&amp;wmode=opaque\">";
		youtube+="<param name=\"wmode\" value=\"opaque\">";
		youtube+="<param name=\"allowFullScreen\" value=\"true\">";
		youtube+="<param name=\"allowscriptaccess\" value=\"always\">";
		youtube+="<embed src=\"http://www.youtube.com/v/"+vedioId[liIdx]+"?version=3&amp;hl=en_US&amp;hd=1&amp;showinfo=0&amp;rel=0&amp;wmode=opaque\" type=\"application/x-shockwave-flash\" width=\"595\" height=\"385\" allowscriptaccess=\"always\" allowfullscreen=\"true\"></object>";
		$(".vedio_area").html(youtube);

		for(var i = 1; i < 4; ++i){
			var tempObj = $(".vedio_thumb li").eq(i).children("a").children(".thumb").children("img");
			tempObj.attr("src", tempObj.attr("src").replace("_over.png", ".png"));
		}
		
		$(this).children(".thumb").children("img").attr("src", "/images/about/video_list_thum"+(liIdx+1)+"_over.png")
		
	});
*/
}
function onlineThemeAlert (){
	alert("준비중 입니다.");
}
function offlineBtnAlert (){
	alert("아직 신청기간이 아닙니다.");
}
function  offlinePopupOpen(){
	$(".mentoring_popup").css("display","block")
	$(".popup_bg").css("display","block")
}
function  offlinePopupClose(){
	$(".mentoring_popup").css("display","none")
	$(".popup_bg").css("display","none")
}

