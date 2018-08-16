
$(document).ready(function(){
	webtoonContentsShow();
	$('#gnb li a').setButtonGnb(4);
	
	if(ie){
		return;
	}
});

function writerPopupOpen(){
	$(".popup_bg").css("display" ,"block");
	$(".contents_container .writer_popup").css("display" ,"block");
	$(".writer_popup .close_btn a").focus();
}
function writerPopupClose(){
	$(".popup_bg").css("display" ,"none");
	$(".contents_container .writer_popup").css("display" ,"none");
	$(".webtoon_btn .li1 a").focus();
}

function webtoonContentsShow(){
	$(".webtoon_list_thumb .thumb a").click(function(e){
		
		$('.webtoon_contents_inner').focus();
		
		e.stopPropagation();
		e.preventDefault();
		$(".webtoon_list_middle.webtoon_list_thumb").css("display","none");
		$(".webtoon_list_middle.webtoon_contents").css("display","block");
		$(".webtoon_btn li.li2").css("display","block");
		$(".thumbnail_list_container").css("display","block");
		resize();
	});
}
function webtoonContentsClose(){
		$(".webtoon_list_middle.webtoon_list_thumb").css("display","block");
		$(".webtoon_list_middle.webtoon_contents").css("display","none");
		$(".webtoon_btn li.li2").css("display","none");
		$(".thumbnail_list_container").css("display","none");
}





function showMusic(){
	$('.music .contents_detail').slideToggle({duration:2000, easing:"easeInOutExpo", step:resize});

	

}

function hideMusic(){
	$('.music .contents_detail').slideToggle({duration:2000, easing:"easeInOutExpo", step:resize});
	$('.music .contents_btn a').focus();
	
}


function showWebtoon(){
	webtoonContentsClose();
	$('.webtoon .contents_detail').slideToggle({duration:2000, easing:"easeInOutExpo", step:resize});
}


function hideWebtoon(){
	
	$('.webtoon .contents_detail').slideToggle({duration:2000, easing:"easeInOutExpo", step:resize})
	$('.webtoon .contents_btn a').focus();
}