$(document).ready(function(){
	
});


function movieOn(){
		$(".contents_wrap2 .videoIframe iframe").attr("src", "http://www.youtube.com/embed/02NgLcRxnd4?wmode=opaque");
		$(".contents_wrap2").fadeIn(500);
}
function movieOff(){
		$(".contents_wrap2").hide();
		$(".contents_wrap2 .videoIframe iframe").attr("src", "");
}

function campainOn(){
	$(".popup_bg").show();
	$(".star .campain_mv .campain_mv_container iframe").attr("src", "http://www.youtube.com/embed/38RL8WonRJs?wmode=opaque");
	$(".star .campain_mv").fadeIn(300);
}
function campainOff(){
	$(".star .campain_mv").hide();
	$(".popup_bg").hide();
	$(".star .campain_mv .campain_mv_container iframe").attr("src", "");
}
