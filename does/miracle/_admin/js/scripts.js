var count = 1;
var thumLen = 6;
var processLen = 5;
function thumRolling(_type){
	if(_type == "r"){
		if(count == thumLen) count = 1;
		else count++;
	}else{
	if(count == 1) count = thumLen;
		else count--;
	}

	$(".big-thum>img").attr("src", "../images/faq/info/big-thum-"+count+".jpg");
}

function processNavi(_index){
	$(".rightcontents>ul").hide();
	for(var i = 1; i <= processLen; ++i){
		if(_index == i){
			$(".p-navi" + i).attr("src", $(".p-navi" + i).attr("src").replace("off", "on"));
			$(".step" + i).show();
		}else{
			$(".p-navi" + i).attr("src", $(".p-navi" + i).attr("src").replace("on", "off"));
		}
	}
}