var domain = true,
	plussds = "",
	strArr = [],
	motionObjArr = [],
	cntPage = 1,
	board_total_len = 0,
	appendStr = "",
	isWriteTotal = false;


var TOP_BOARD_LEN = 5,
	BOARD_LEN = 10,
	MOTION_LEN_ARR = [3, 4, 4, 2, 10, 4, 7, 3, 2, 10, 4, 10, 4],
	DEFAULT_USERNAME_ARR = ["이나리", "이선희", "이한샘", "윤재은", "김태균"],
	DEFAULT_MESSAGE_ARR = ["박태환 선수와 전 국민의 기를 받아 후회없는 경기 펼치길 바랄께요. 모태범 선수 사랑해요!",
						   "여자 쇼트트랙 대표팀의 새로운 대들보, 심석희 선수의 선전을 응원합니다! 세계 최강의 자존심을 지켜주세요.",
						   "김연아, 이상화 두 겨울 여왕의 활약상으로 가득 찰 소치 올림픽, 밤을 새더라도 꼭 지켜볼께요.",
						   "대한민국 동계 올림픽의 금밭이자 효자 종목인 쇼트트랙 국가대표팀을 응원합니다. 투혼의 레이스를 보여주세요!",
						   "올림픽 영웅들의 승전보를 기다립니다. 땀 흘리고 고생한만큼 승리의 영광이 깃들길 바라네요. 대한민국 최고!!"];


$(document).ready(function(){
	domain = GlobalData.appData().domain;
	plussds = GlobalData.appData().sds;

	if(appendStr == ""){
		//appendStr = $(".appendListArea").html();
		$(".appendListArea").empty();
	}


	Board.getData(1);

	$(".more_btn").click(function(){
		if(board_total_len <= 15){
			alert("마지막 페이지 입니다.");
			return;
		}
		appendList();
	});

	/*$(".go_btn").click(function(){
		frameMove(false);
	});*/


	//ddayCheck();
	frameMove(true);
	//motionStart();
});

function appendList(){
	cntPage++;
	Board.getData(cntPage);
}

function frameResize(){
	if(!parent.document.getElementById("iframeDiv")) return;

	var posH = $(".m-wrapper").height();

	parent.document.getElementById("iframeDiv").style.height = posH + "px";
	$("#iframecontents", parent.document).height(posH);
	//$("#wrap").css({'height':posH});
}

function frameMove(_intro){
	if(!parent.document.getElementById("iframeDiv")) return;
	
	if(_intro){
		var params = Util.getURLParameter("already");
	
		if(params == "ok") {
			$(window).load(function(){
				setTimeout(function(){
					parent.scrollmove(486, 1000);
				}, 1000);
				
			});
		}else{
			parent.scrollmove(63, 1000);
		}
	}else{
		parent.scrollmove(486, 1000);
	}
}


/* board */
var Board = {
	page:1, //현재 페이지
	listDataArr:[],
	getData:function(_page){
		Board.page = _page;
		var dataLoadurl = domain + "app/list_event_mobile"+plussds+".jsp?callback=?&page=" + _page + "&tempnum=" + parseInt(Math.random() * 10000);
		$.getJSON(dataLoadurl, function(data){});

		getUserInfo = function(data){
			board_total_len = data.totalcount;

			if(typeof board_total_len == "undefined") board_total_len = 0;
			else board_total_len = board_total_len;
			
			if(!isWriteTotal){
				isWriteTotal = true;
				$(".count").html(board_total_len);
			}
			
			if(data.result == "max"){
				alert("마지막 페이지 입니다.");
				return;
			}

			if(board_total_len == 0){
				return;
			}

			Board.listDataArr = [];
			Board.listDataArr = data.obj;
			if(Board.page == 1) Board.setTopBoard();
			Board.setAppendBoard();
		}
	},
	setTopBoard:function(){
		var i = 0;
		for(i = 0; i < TOP_BOARD_LEN; ++i){
			Board.setListImg($(".top_load .sns_list li").eq(i+1), i, Board.listDataArr);
		}
	},
	setAppendBoard:function(){
		var dataArr = Board.listDataArr;
		if(dataArr < BOARD_LEN){
			//추가
		}
		
		var appendStrs = '<div class="repeat_list"><div class="repeat_bg"></div><div class="comment comment1"><span class="comment_name">장준영</span><p>당첨상품은상품은당첨상품은당품은당품은당첨상품은</p><img class="arrow" src="images/event1/comment_arrow.png" alt="" /><!-- <a href="javascript:" class="plus_btn" style="display:none"><img src="images/event1/comment_plus.png" alt="말풍선 더보기" /></a><a href="#" class="minus_btn" ><img src="images/event1/comment_minus.png" alt="말풍선 줄이기" /></a>	 -->	</div>	<div class="comment comment2"><span class="comment_name">장준영</span><p>당첨상품은당첨상품은당첨상품은당첨상품은당첨상품은당첨상품은</p><img class="arrow" src="images/event1/comment_arrow.png" alt="" /><!-- <a href="#" class="plus_btn"><img src="images/event1/comment_plus.png" alt="말풍선 더보기" /></a><a href="#" class="minus_btn" style="display:none"><img src="images/event1/comment_minus.png" alt="말풍선 줄이기" /></a> -->	</div><ul class="sns_list"><li><img src="images/event1/sample_img.jpg" alt="프로필 이미지" /></li><li><img src="images/event1/sample_img.jpg" alt="프로필 이미지" /></li><li><img src="images/event1/sample_img.jpg" alt="프로필 이미지" /></li><li><img src="images/event1/sample_img.jpg" alt="프로필 이미지" /></li><li><img src="images/event1/sample_img.jpg" alt="프로필 이미지" /></li><li><img src="images/event1/sample_img.jpg" alt="프로필 이미지" /></li><li><img src="images/event1/sample_img.jpg" alt="프로필 이미지" /></li><li><img src="images/event1/sample_img.jpg" alt="프로필 이미지" /></li><li><img src="images/event1/sample_img.jpg" alt="프로필 이미지" /></li><li><img src="images/event1/sample_img.jpg" alt="프로필 이미지" /></li></ul></div>';
		$(".appendListArea").append(appendStrs).hide();

		var i = 0,
			mcount = 0,
			putDataArr = [],
			plusNum = (Board.page == 1)?TOP_BOARD_LEN:0;
		for(i = 0; i < BOARD_LEN; ++i){
			Board.setListImg($(".repeat_list:eq("+(Board.page-1)+") .sns_list li").eq(i), i + plusNum, Board.listDataArr);
			
			var myCount = 0;
			if(i == myCount || i == 1 || i == 5){
				if(i == myCount && Board.page != 1) continue;

				if(Board.page == 1 && i == 1){
					$(".comment1").addClass("topComment");
				}

				var messageArea = null,
					plusNumCheck = 0;
				if(i == myCount) {
					plusNumCheck = 0;
					messageArea = $(".mycomment");
				} else {
					plusNumCheck = plusNum;
					messageArea = $(".repeat_list:eq("+(Board.page-1)+") .comment").eq(mcount);
				}

				var userName = messageArea.children("span.comment_name"),
					usermsg = messageArea.children("p"),
					usernameStr = "",
					messageStr = "";

				/*var messageArea = $(".repeat_list:eq("+(Board.page-1)+") .comment").eq(mcount),
					userName = messageArea.children("span.comment_name"),
					usermsg = messageArea.children("p"),
					usernameStr = "",
					messageStr = "";*/
				
				if(typeof dataArr[i+plusNumCheck] == "undefined") {
					usernameStr = DEFAULT_USERNAME_ARR[mcount];
					messageStr = DEFAULT_MESSAGE_ARR[mcount]
				}else {
					usernameStr = dataArr[i+plusNumCheck].sns_name;
					messageStr = dataArr[i+plusNumCheck].content;
				}

				userName.html(usernameStr);

				if(messageStr.length > 37){
					var shortmessageStr = messageStr.substr(0, 37) + "...";
					var usernameAppendStr = '<a href="javascript:Board.extendMessage('+Board.page+', '+i+');" class="plus_btn"><img src="images/event1/comment_plus.png" alt="말풍선 더보기" /></a><a href="javascript:Board.extendMessage('+Board.page+', '+i+');" class="minus_btn" style="display:none"><img src="images/event1/comment_minus.png" alt="말풍선 줄이기" /></a>';

					messageArea.append(usernameAppendStr);

					usermsg.html(shortmessageStr);
					
					var iconImgArea = userName.children("a").children("img");
					putDataArr[i] = {shortStr:shortmessageStr, originStr:messageStr, isActive:false, usermsg:usermsg, iconImgArea:iconImgArea, messageArea:messageArea};
				}else{
					usermsg.html(messageStr);
				}

				if(i != myCount) mcount++;
			}

		}

		strArr[Board.page] = putDataArr;
		$(".appendListArea").show();

		frameResize();
	},
	setListImg:function(_scope, _i){
		var cntData = Board.listDataArr[_i];
			profile = _scope.children("img");
		
		var imgurl = "";
		if(typeof cntData == "undefined") imgurl = "../images/photo_saple.png";
		else imgurl = cntData.image_profile;

		profile.attr("src", imgurl);
	},
	extendMessage:function(_i, _j){
		if(!strArr[_i][_j].isActive){
			strArr[_i][_j].isActive = true;
			
			$(strArr[_i][_j].usermsg).html(strArr[_i][_j].originStr);
			$(strArr[_i][_j].messageArea).children(".plus_btn").hide();
			$(strArr[_i][_j].messageArea).children(".minus_btn").show();
		}else{
			strArr[_i][_j].isActive = false;

			$(strArr[_i][_j].usermsg).html(strArr[_i][_j].shortStr);
			$(strArr[_i][_j].messageArea).children(".plus_btn").show();
			$(strArr[_i][_j].messageArea).children(".minus_btn").hide();
		}
	}
}

/* global data */
var GlobalData = {
	appData:function(){
		var returnData = {}
		var fulldomain = document.location.href;
		if(fulldomain.indexOf('does.kr') == -1) { //sds
			returnData.domain = "http://local.sec.samsung.com/comLocal/event/1401_sochievent/";
			//returnData.domain = "http://local.dvsecaccnt.samsung.com/comLocal/event/1401_sochievent/";
			returnData.sds = "_sds";
			document.domain = "samsung.com";
		}else{  //does
			returnData.domain = "http://dev.does.kr/2014/1401_sochievent/";
			returnData.sds = "";
			//document.domain = "does.kr";
		}

		return returnData;
	}
}

/* util */
var Util = {
	getURLParameter:function(name){
		return decodeURI(
			(RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
		);
	}
}