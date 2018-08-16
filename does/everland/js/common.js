/**
samsung everland
13.03.22 zt 
**/
var currentPageDepth,storyInterval;
$(document).ready(function() {
	initalizeDocument();
});
var initalizeDocument = function(){
	$("#skipToContent a").bind("click",function(){
		location.href = "#contents";
		if($("#contents").length){
			$('#contents').attr('tabIndex',-1).focus();
		}
		return false;
	});

	loginSet();
	pageSet();
	snsSet();
	btnOver();
	aboutSet();
	adventureSet();
	storyFlipSet();
	gallerySet();
	mycardFnc();
	mycardClickFnc();
	noteSet();
	resizeFnc();
	animal_tab();
	playerBtn();
	alert_360();	
	$(window).resize(function(){resizeFnc();});

}
/* LOGIN SETTING */
var isLogin = "N";
var myCard1=false,myCard2=false,myCard3=false,myCard4=false,myCard5=false,myCard6=false,myCard7=false;
function loginSet(){
	$.getJSON('/service/event/login_check.jsp?dummy=' + Math.random(), function(data){	
		isLogin = data.isLogin;
		eventFlg = data.eventFlg;

		if (isLogin == "Y") {
			$("#login ul li:eq(0) a img").attr('src',$("#login ul li:eq(0) a img").attr('src').replace("btn_login.png", "btn_logout.png"));
			isLogin = "Y";

			$.getJSON('/service/front/lost/lostValleyACDataLoad.el', function(data){	

				if (data.success) {
					var cardIndex = data.cardindex;
					var cardIndexList = cardIndex.split(",");

					for (var i = 0; i < cardIndexList.length; i++) {

						if (cardIndexList[i].length > 0)
						{
							// 동물카드 이벤트 셋팅
							if (cardIndexList[i] == 0) {
								$(".mycard_list li:eq(0) img").attr("src","images/common/card_1.png");
								myCard1= true;
							} else if (cardIndexList[i] == 1) {
								$(".mycard_list li:eq(1) img").attr("src","images/common/card_2.png");
								myCard2= true;
							} else if (cardIndexList[i] == 2) {
								$(".mycard_list li:eq(2) img").attr("src","images/common/card_3.png");
								myCard3= true;
							} else if (cardIndexList[i] == 3) {
								$(".mycard_list li:eq(3) img").attr("src","images/common/card_4.png");
								myCard4= true;
							} else if (cardIndexList[i] == 4) {
								$(".mycard_list li:eq(4) img").attr("src","images/common/card_5.png");
								myCard5= true;
							} else if (cardIndexList[i] == 5) {
								$(".mycard_list li:eq(5) img").attr("src","images/common/card_6.png");
								myCard6= true;
							} else if (cardIndexList[i] == 6) {
								$(".mycard_list li:eq(6) img").attr("src","images/common/card_7.png");
								myCard7= true;
							}
						}
					};

					// 탐사자격증 가능 여부
					var complete = data.complete;
					if (complete == "True")
					{
						$(".event_mycard_area").css("display","block");

						// 탐사자격증 이미지
						if (data.imageurl.length > 0)
						{
							$(".mycard_uploadimg img").attr("src", data.imageurl);
						}
						// UserName
						$(".mycard_name").html(data.userid);
					}
				} else {
					alert(data.message);
				}
			});
		}

		if (eventFlg == "1" && parseInt(getNowDateStr) <= 20130418) {
		  storyBook();
		}
  });
}

/* GET CURRENT PAGE */
function pageSet(){
	currentPageDepth = $("#contents").data("depth");
	if(currentPageDepth != -1){
		loadContent();
	}
}


/*  LOADER  */
var bodyImg = new Array;
function loadContent() {
	setLoadingDiv();
	var bodyImg = $("#contents img").map(function() {return $(this).attr("src");	});
	$.imgpreload(bodyImg,
		{
				all: function()
				{
					$("#loading").remove();
					if(currentPageDepth == 2){
						storyLoadComplete();
					}
				}
		});
}

function setLoadingDiv(){
	if($("#loading").length>0){
		$("#loading").remove();
	}else{
		var loading="<div id=\"loading\"><img src=\"images/common/loading.gif\" alt=\"loading\"/></div>"; // modified by sanghun 4/24
		//var loading="<div id=\"loading\"><img src=\"/collection/everland_new/images/common/loading.gif\" alt=\"loading\"/></div>";
		$("body").append(loading);
	}
}

/* SNS CLICK */
function snsSet(){
	var titletextStr=encodeURIComponent("로스트 밸리 사파리 어드벤처");
	var textStr=encodeURIComponent("세계 최초, 수륙양용차로 즐기는 사파리 체험!\n로스트밸리 사파리 어드벤처를 탐험해보세요.");
	var imgurl="http://www.everland.com/web/lostvalley/images/facebook.jpg";
	$(".btn_login").click(function(e){
			e.stopPropagation();
			e.preventDefault();
		  if (isLogin == "Y") {
			location.replace("/service/front/login.do?method=logoutUrl&returnUrl="+escape(document.URL) );
		  } else {
			location.replace("/service/front/loginView.do?returnUrl="+escape(document.URL));
			//location.replace("https://www.everland.com/service/front/loginView.do?returnUrl="+escape(document.URL));
		  }
	});

	$(".btn_facebook").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			window.open("http://www.facebook.com/sharer.php?s=100&p[url]=http://www.everland.com/web/lostvalley/&p[title]="+titletextStr+"&p[summary]="+textStr+"&p[images][0]="+imgurl);
	});

	$(".btn_twitter").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			window.open("https://twitter.com/intent/tweet?text="+textStr+"&url=http://www.everland.com/web/lostvalley/");
	});


	var titletextStr2=encodeURIComponent("로스트 밸리 탐사 자격증");
	var textStr2=encodeURIComponent("에버랜드 로스트 밸리 탐사 자격증이 발급되었습니다.\n이제 초대형 사파리 어드벤처 로스트 밸리로 진짜 모험을 떠나세요.");
	var imgurl2="http://www.everland.com/web/lostvalley/images/facebook2.jpg";

	$(".eventFacebook").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			window.open("http://www.facebook.com/sharer.php?s=100&p[url]=http://www.everland.com/web/lostvalley/event2.html&p[title]="+titletextStr2+"&p[summary]="+textStr2+"&p[images][0]="+imgurl2);
	});

	$(".eventTwitter").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			window.open("https://twitter.com/intent/tweet?text="+textStr2+"&url=http://www.everland.com/web/lostvalley/event2.html");
	});
}

/* BTN OVER */
function btnOver(){
	$(".btnOverPng a img").hover(function(){	
		var text =$(this).attr("src").substr($(this).attr("src").length-9,5);
		if($(this).hasClass("over")){
			return false;
		}else{
			if(text =="_over"){return;}
			$(this).attr("src",$(this).attr('src').replace(".png", "_over.png"));
		}
	},
		function(){	
			if($(this).hasClass("over")){
				return false;
			}else{
				$(this).attr("src",$(this).attr('src').replace("_over.png", ".png"));
			}
		}
	);

	$(".btnOverPng a").focusin(function(){
		var text =$(this).children("img").attr("src").substr($(this).children("img").attr("src").length-9,5);
		if($(this).children("img").hasClass("over")){
			return false;
		}else{
			if(text =="_over"){return;}
			$(this).children("img").attr("src",$(this).children("img").attr('src').replace(".png", "_over.png"));
		}
	}).focusout(function(){
		if($(this).children("img").hasClass("over")){
			return false;
		}else{
			$(this).children("img").attr("src",$(this).children("img").attr('src').replace("_over.png", ".png"));
		}
	});
}

function aboutSet(){
	if(currentPageDepth != 0){return;}
	
	$(".about_container ul.about_right li.btn_03").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			$(".popup_03").css("display","block");
	});

	$(".about_container ul.about_right li.btn_03 .popup_03 a.close_btn").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			$(".popup_03").css("display","none");
	});
}

/* ADVENTURE SET */
var effectInterval,effectNum=0,focusObj;
function adventureSet(){
	if(currentPageDepth != 1){return;}
	$(".popup_xbtn").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			$(".main_popup").css("display","none");
	});

	$(".adv_rock a").mouseover(function(){
		effectIntervalSet(".light_effect1 .effect");
	});

	$(".adv_fire a").mouseover(function(){
		effectIntervalSet(".light_effect2 .effect");
	});

	$(".adv_tau a").mouseover(function(){
		effectIntervalSet(".light_effect3 .effect");
	});

	$(".adv_water a").mouseover(function(){
		effectIntervalSet(".light_effect4 .effect");
	});

	$(".adv_svannah a").mouseover(function(){
		effectIntervalSet(".light_effect5 .effect");
	});

	$(".adv_red a").mouseover(function(){
		effectIntervalSet(".light_effect6 .effect");
	});

	$(".adv_peace a").mouseover(function(){
		effectIntervalSet(".light_effect7 .effect");
	});

	$(".kosik_btn a").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			$(".koshik a").attr('tabIndex',1);
			$("#wrapper").css("min-height","800px");
			$(".koshik").css("display","block");
			$(".koshik_bg").css({'opacity': '0.5', 'filter': 'alpha(opacity=50)', '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)',  '-moz-opacity': '0.5',   '-khtml-opacity': '0.5'});
			$(".koshik_bg").fadeIn(500);

	});

	$(".koshik_close").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			$(".koshik a").attr('tabIndex',-1);
			$("#wrapper").css("min-height","");
			$(".koshik").css("display","none");
			$(".koshik_bg").css("display","none");
	});
	
}

function effectIntervalSet(obj){
	if(effectInterval){
		effectNum=0;
		clearInterval(effectInterval);
		$(focusObj).css("left","0px");
	}
	focusObj = obj;
	effectInterval = setInterval(effectSet,30);

}

function effectSet(){
	$(focusObj).css("left","-=144px");
	effectNum++;
	if(effectNum>40){
		clearInterval(effectInterval);
		$(focusObj).css("left","0px");
		effectNum=0;
	}
}

/* STORYBOOK SEQ SET */
function storyLoadComplete(){
	$("#story_seq").css("visibility","visible");
	storyInterval = setInterval(storySet,50);
}

var storyNum = 21
function storySet(){
	$("#story_seq img:eq("+storyNum+")").hide();
	storyNum--;
	if(storyNum<1){
		clearInterval(storyInterval);
		$("#flip-book").css("display","block");
	}
}

/* STORYBOOK FLIP SET */
function storyFlipSet(){
	if(currentPageDepth != 2){return;}
	var $flipbook = $("#flip-book ul li");
	var $leftBtn = $(".leftBtn");
	var $rightBtn = $(".rightBtn");
	var currentPage = 0;
	var imgPath = "images/storybook/";
	//var imgPath = "images/storybook/";

	$($flipbook[0]).css("display","block");
	$leftBtn.click(function(e){
		e.stopPropagation();
		e.preventDefault();
		setCurrentPage(getCurrentPage()-1);
	});

	$rightBtn.click(function(e){
		e.stopPropagation();
		e.preventDefault();
		setCurrentPage(getCurrentPage()+1);

		if(getCurrentPage() >37 && parseInt(getNowDateStr()) <= 20130418){
			//$(".story_popup").show();
			return;
		}
	});

	$(".story_popup_close a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$(".story_popup").css("display","none");
	});


	$(".story_popup_apply a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$(".story_popup_apply").hide();

		$.getJSON('/service/event/login_check.jsp?eventFlg=1&dummy=' + Math.random(), function(data){	
		  isLogin = data.isLogin;
		  chceckfg = data.checkfg;
		  if (isLogin == "Y") {
			$.getJSON('/service/event/2013/lostvalley/join_ok_book.jsp', function(data){	
			  rtn = data.rtn;
			  msg = data.msg;
			  alert(msg);
			  if (rtn == "Y") {
				$(".story_popup").css("display","none");
				setCurrentPage(1);
			  } else if (rtn == "S") {
				  location.reload();
			  }
			  $(".story_popup_apply").show();
			});
		  } else {
			alert("이벤트에 응모하려면 로그인 하셔야 합니다.");
			location.replace("https://www.everland.com/service/front/loginView.do?returnUrl="+escape(document.URL+"?eventFlg=1") );
		  }
		});
	});

	var setCurrentPage = function(page){
		if(page >38){return;}
		playFlipSnd();
		$leftBtn.unbind('click');
		$rightBtn.unbind('click');
		$($("#story_seq img")[0]).attr("src","images/storybook/99.jpg");
		//$($("#story_seq img")[0]).attr("src","images/storybook/99.jpg");
		if($flipbook.length-1 < page) page = $flipbook.length-1;
		if(0 > page) page = 0;
		currentPage = page;
		var $img = $("<img src=\"\" alt=\"\" />");
		var str_currentPage;
		if(currentPage<9)str_currentPage = "0" + (currentPage+1);
		else str_currentPage = currentPage+1;
		var path = imgPath + str_currentPage + '.jpg';
		$img.attr("src",path);
		$.imgpreload(path,function()
		{
			$leftBtn.click(function(e){
				e.stopPropagation();
				e.preventDefault();
				setCurrentPage(getCurrentPage()-1);
			});

			$rightBtn.click(function(e){
				e.stopPropagation();
				e.preventDefault();
				setCurrentPage(getCurrentPage()+1);
				if(getCurrentPage() >37 && parseInt(getNowDateStr()) <= 20130418){
					//$(".story_popup").show();
					return;
				}
			});

			for (var i = 0; i < $flipbook.length-1; i++) {
				if(i == page){
					$($flipbook[i]).html($img);
					$($flipbook[i]).fadeIn(1000);
				}else{
					$($flipbook[i]).fadeOut(1000);
				}
				
			};
		});
		
		
	}

	var getCurrentPage = function(){
		return currentPage;
	}
}

function storyBook(){
	//$(".story_popup").css("display","block");
}


function getNowDateStr() {
  var _date = new Date();
  var _year = _date.getFullYear();
  var _month = ""+ (_date.getMonth() + 1);
  var _day = "" + _date.getDate();
  if (_month.length == 1 )
  {
    _month = "0" + _month;
  }

  if (_day.length == 1 )
  {
    _day = "0" + _day;
  }

  var nowDate = "" + _year + _month + _day;

  return nowDate;
}

var tvcId=["8uUf8FH9tTU","NtfrTckCZko", "-BeQ0CpX-tY"];
function gallerySet(){
	if(currentPageDepth != 5){return;}
	$(".tvc_menu ul li a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		var liIdx = $(this).parent().index();
		youtube="";
		youtube+="<object width=\"547\" height=\"337\" id=\"movie_change\" type='application/x-shockwave-flash' data='http://www.youtube.com/v/"+tvcId[liIdx]+"?version=3&amp;hl=en_US&amp;hd=1&amp;showinfo=0&amp;rel=0&amp;wmode=opaque'>";
		youtube+="<param name=\"movie\" value=\"http://www.youtube.com/v/"+tvcId[liIdx]+"?version=3&amp;hl=en_US&amp;hd=1&amp;showinfo=0&amp;rel=0&amp;wmode=opaque\">";
		youtube+="<param name=\"wmode\" value=\"opaque\">";
		youtube+="<param name=\"allowFullScreen\" value=\"true\">";
		youtube+="<param name=\"allowscriptaccess\" value=\"always\">";
		youtube+="<embed src=\"http://www.youtube.com/v/"+tvcId[liIdx]+"?version=3&amp;hl=en_US&amp;hd=1&amp;showinfo=0&amp;rel=0&amp;wmode=opaque\" type=\"application/x-shockwave-flash\" width=\"547\" height=\"337\" allowscriptaccess=\"always\" allowfullscreen=\"true\"></object>";
		$(".tvc_youtube").html(youtube);
		$(".tvc_youtube").focus();

		$(".tvc_menu ul li a img").removeClass('over');
		$(".tvc_menu ul li a img").trigger('mouseout');

		$(this).children("img").addClass('over');
		var text =$(this).children("img").attr("src").substr($(this).children("img").attr("src").length-9,5);
		if(text =="_over"){return;}
		$(this).children("img").attr("src",$(this).children("img").attr('src').replace(".png", "_over.png"));
	});

	$(".gallery_thumb_menu ul li:eq(0) a .thumb_black").hide();
	$(".gallery_thumb_menu ul li a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		var liIdx = $(this).parent().index()+1;
		$(".gallery_img_area img").attr("src","images/gallery/img"+liIdx+".jpg");
		//$(".gallery_img_area img").attr("src","images/gallery/img"+liIdx+".jpg");
		//$(".gallery_img_area img").attr("title",tvcTitle[liIdx]);
		$(".gallery_thumb_menu ul li a .thumb_black").css({'opacity': '0.7', 'filter': 'alpha(opacity=70)', '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=70)',  '-moz-opacity': '0.7',   '-khtml-opacity': '0.7'});
		$(".gallery_thumb_menu ul li a .thumb_black").fadeIn(100);
		$(this).children(".thumb_black").stop().fadeOut(300);
	});

}

var cardOpen = false;
function mycardFnc(){
	if(cardOpen){
		$(".card_event a").attr('tabIndex',1);
	}else{
		$(".card_event a").attr('tabIndex',-1);
	}
	$(".mycard_btn a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		mycardOpen();
	});

}

function mycardOpen(){
	var tgY = 600;
	if(currentPageDepth==-1)tgY
	if(cardOpen == false){
		$("#mycard").stop().animate({ 'top': 445}, tgY, 'easeOutCubic');
		cardOpen = true;
		$(".card_event a").attr('tabIndex',0);			
	}else{
		$("#mycard").stop().animate({ 'top': tgY}, tgY, 'easeOutCubic');
		cardOpen = false;
		$(".card_event a").attr('tabIndex',-1);
	}
}

/* 동물 카드 모으기 */
function mycardClickFnc(){
	$(".licence_close a").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			$(".licence_close a").attr('tabIndex',-1);
			$(".licence_popup").css("display","none");
			$(".koshik_bg").css("display","none");
	});

	// 모은 동물 카드 저장
	$(".animal_cardbtn a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		var clickName = $(this).attr("href").substring(1);

		$(".animal_cardbtn").hide();

		$.getJSON('/service/event/login_check.jsp?eventFlg=1&dummy=' + Math.random(), function(data){	
			isLogin = data.isLogin;
			chceckfg = data.checkfg;

			if(isLogin == "Y"){
				
				isLogin = "Y";
				$.getJSON('/service/front/lost/lostValleyACDataSaveProc.el?clickName='+clickName, function(data){	
					if (data.success) {

						mycardOpen();

						switch(clickName){
						 case "babarysheep":
							 if(myCard1== true){
								alert("이미 모은 동물 카드 입니다.");
							 }else{
								 $(".mycard_list li:eq(0) img").attr("src","images/common/card_1.png");
								 myCard1= true;
							 }
							 break;
						 case "elephant":
							  if(myCard2== true){
								alert("이미 모은 동물 카드 입니다.");
							 }else{
								 $(".mycard_list li:eq(1) img").attr("src","images/common/card_2.png");
								 myCard2= true;
							 }
							 break;
						 case "whitelion":
							  if(myCard3== true){
								alert("이미 모은 동물 카드 입니다.");
							 }else{
								 $(".mycard_list li:eq(2) img").attr("src","images/common/card_3.png");
								 myCard3= true;
							 }
							 break;
						 case "giraffe":
							  if(myCard4== true){
								alert("이미 모은 동물 카드 입니다.");
							 }else{
								 $(".mycard_list li:eq(3) img").attr("src","images/common/card_4.png");
								 myCard4= true;
							 }
							 break;
						 case "sableantelope":
							  if(myCard5== true){
								alert("이미 모은 동물 카드 입니다.");
							 }else{
								 $(".mycard_list li:eq(4) img").attr("src","images/common/card_5.png");
								 myCard5= true;
							 }
							 break;
						 case "flamingo":
							  if(myCard6== true){
								alert("이미 모은 동물 카드 입니다.");
							 }else{
								 $(".mycard_list li:eq(5) img").attr("src","images/common/card_6.png");
								 myCard6= true;
							 }
							 break;
						 case "cheetah":
							  if(myCard7== true){
								alert("이미 모은 동물 카드 입니다.");
							 }else{
								 $(".mycard_list li:eq(6) img").attr("src","images/common/card_7.png");
								 myCard7= true;
							 }
							 break;
						}

						// 탐사자격증 가능 여부
						var complete = data.complete;
						if (complete == "True")
						{
							$(".licence_popup").css("display","block");
							$(".koshik_bg").css({'opacity': '0.5', 'filter': 'alpha(opacity=50)', '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)',  '-moz-opacity': '0.5',   '-khtml-opacity': '0.5'});
							$(".koshik_bg").fadeIn(500);
						}
					} else {
						alert(data.message);
					}
				});
			}else{
				alert("동물카드를 모으시려면 로그인을 먼저 하셔야 합니다.");
				// TODO
				location.replace("/service/front/loginView.do?returnUrl="+escape(document.URL));
				//location.replace("https://www.everland.com/service/front/loginView.do?returnUrl="+escape(document.URL));
			}
		});

		$(".animal_cardbtn").show();
	});

	// 탐사 자격증 사진 저장
	$(".mycard_save a").click(function(e){
		e.stopPropagation();
		e.preventDefault();

		var frm = document.forms["form"];
		
		if(!frm.filename.value) {
			alert("사진을 선택해 주십시오");
			frm.filename.focus();
			return;
		}

		$("form#form").ajaxSubmit({
			url: "/service/front/lost/lostValleyACUserImgUdtProc.el",
			dataType : 'json',
			success : function(data){
				if (data.success) {
					$(".mycard_uploadimg img").attr("src", data.imageurl);
					//alert('사진 저장 하였습니다.');
				} else {
					alert(data.message);
				}
			}, 
			error : function(){
				alert('사진 업로드 중 문제가 발생했습니다.');
			}
		});
	});

	// 탐사 자격증 출력
	$(".mycard_print a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		
		var uploadimg = $(".mycard_uploadimg img").attr("src");

		if(uploadimg.length <= 0 || uploadimg == "images/event/user_img.jpg") {
			alert("사진 업로드 후 저장하기 버튼을 눌러주세요.");
			document.forms["form"].filename.focus();
			return;
		}

		$.getJSON('/service/front/lost/lostValleyACUserMergeImgProc.el?uploadimg=' + uploadimg + '&kind=print', function(data){	
			if (data.success) {
				var mergepath = data.mergepath;
				window.open('/service/jsp/common/lvac01.jsp?mergepath=' + mergepath,'','width=202,height=379');
			} else {
				alert(data.message);
			}
		});
	});

	// 탐사 자격증 저장
	$(".mycard_filesave a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		
		var uploadimg = $(".mycard_uploadimg img").attr("src");

		if(uploadimg.length <= 0 || uploadimg == "images/event/user_img.jpg") {
			alert("사진 업로드 후 저장하기 버튼을 눌러주세요.");
			document.forms["form"].filename.focus();
			return;
		}

		var frm = document.frm1;

		frm.target = "myimage";
		frm.uploadimg.value=uploadimg;
		frm.action="/service/front/lost/lostValleyACUserMergeImgProc.el";
		frm.submit();
	});
}

/* 학습노트 */
var selectAnimalNum=0;
function noteSet(){
	if(currentPageDepth != 3){return;}
	var titletextStr="로스트 밸리 사파리 어드벤처",textStr="로스트 밸리에서의 즐겁고 신났던 기억을 여러분들만의 학습노트로 만들어보세요.",imgurl="";
	var shareurl=String(window.location);
  /*
	$(".noteview_facebook").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			window.open("http://www.facebook.com/sharer.php?s=100&p[url]="+shareurl+"&p[title]="+titletextStr+"&p[summary]="+textStr+"&p[images][0]="+imgurl);
	});

	$(".noteview_twitter").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			window.open("https://twitter.com/intent/tweet?text="+textStr+"&url="+shareurl);
	});
*/
	var animalBtnClick = false;
	$(".note_view_animal_btn").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			if(animalBtnClick){
				$(".note_view_animal").css("display","block");
				$(".note_view_animal_text").css("display","none");
				$(".note_view_animal_btn a img").attr("src","images/note/btn_txt.png");
				$(".note_view_animal_btn a img").attr("alt","동물 설명 보기");
				animalBtnClick = false;
			}else{
				$(".note_view_animal").css("display","none");
				$(".note_view_animal_text").css("display","block");
				$(".note_view_animal_btn a img").attr("src","images/note/btn_img.png");
				$(".note_view_animal_btn a img").attr("alt","동물 사진 보기");
				animalBtnClick = true;
			}
	});

	var $select;
	$(".select_animal a").click(function(e){
		e.stopPropagation();
		e.preventDefault();

		if($(".select_animal a").hasClass("over")){
			$(".select_animal a.over img").attr('src',$(".select_animal a.over img").attr('src').replace("_over.png", ".png"));
			$(".select_animal a").removeClass("over");
			selectAnimalNum = 0;
		}

		if($(this).hasClass("over")){
			$(this).children("img").attr('src',$(this).children("img").attr('src').replace("_over.png", ".png"));
			$(this).removeClass("over");
			selectAnimalNum = 0;
			return;
		}

		$(this).addClass("over");
		$(this).children("img").attr('src',$(this).children("img").attr('src').replace(".png", "_over.png"));
		selectAnimalNum = $(this).attr("href").substring(1);
		//alert(selectAnimalNum);

		if ($("#dataIdx").val() != undefined) {
      $("#dataIdx").val(selectAnimalNum);
    }
	});

        $("textarea[maxlength]").live('keyup change', function() {
		var str = $(this).val();
		var mx = 200;
			if (str.length > mx) {
			   $(this).val(str.substr(0, mx));
				return false;
			}
	});

	$(".note_write_save_btn a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		note_submit();
	});
}

/* WINDOW RESIZE FUNCTION */
var resizeFirst = false;
function resizeFnc() {
	var winSizeW = $(window).width();
	var winSizeH = $(window).height();
	var margin;
	var marginBaseW = 1120;
	var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
	switch(filename){
		case "":
		case "index.html":
			marginBaseW = 1340;
			break;
	}
	if(winSizeW < marginBaseW){
		var marginLeft = (marginBaseW - winSizeW)/2;
		
		if(filename == "" || filename == "index.html"){
			
		}else{
			if(marginLeft > 61){ marginLeft = 61; }
		}
		
		var popupX = (winSizeW-420);
		if(popupX < 620){ popupX = 620; }
		$("#container").css("margin-left",-marginLeft);

		if(winSizeW <1050){
			var bridgeX =20+(marginBaseW - winSizeW)/2;
			if(bridgeX > 80){ bridgeX = 80;}
			//$(".bridge_contents1").css("left",bridgeX);
			//$(".bridge_contents2").css("left",bridgeX);
			//$(".bridge_contents3").css("left",bridgeX);
			//$(".bridge_contents4").css("left",bridgeX);
			//$(".bridge_contents5").css("left",bridgeX);
			//$(".bridge_contents6").css("left",bridgeX);
			//$(".bridge_contents7").css("left",bridgeX);

			$(".btn_prev").css("margin-left",marginLeft-40);
			$(".btn_next").css("margin-left",-marginLeft+30);
			$(".samsunglife").css("margin-left",marginLeft);
		}

	}else{
		$("#container").css("margin-left",0);

		//$(".bridge_contents1").css("left",60);
		//$(".bridge_contents2").css("left",60);
		//$(".bridge_contents3").css("left",60);
		//$(".bridge_contents4").css("left",60);
		//$(".bridge_contents5").css("left",60);
		//$(".bridge_contents6").css("left",60);
		//$(".bridge_contents7").css("left",60);

		$(".btn_prev").css("margin-left",0);
		$(".btn_next").css("margin-left",0);
		$(".samsunglife").css("margin-left",0);
	}

	var contentsHeight = winSizeH-115;
	if(contentsHeight <620){contentsHeight =620;}
	var containerTop = (contentsHeight-640)/2;
	if(containerTop <0){containerTop =0;}
	$("#contents").css("height",contentsHeight);
	$("#container").css("top",containerTop);
	$("#bg_pillar_left").css("top",containerTop-5);
	$("#bg_pillar_right").css("top",containerTop-5);
	$(".main_pop1").css("top",containerTop+460);
	$(".main_pop2").css("top",containerTop+460);
	$("#map_btn").css("top",containerTop+550);
	resizeFirst = true;
}	


function event_submit(){
	alert("파일 업로드");
}


function note_submit(){
	var frm =document.forms["form"];

	if(!frm.filename.value) {
		alert("사진을 선택해 주십시오");
		frm.filename.focus();
		return;
	}

  if(!frm.contents.value) {
		alert("내용을 입력해 주십시오");
		frm.contents.focus();
		return;
	} else if(frm.contents.value == '200자 이내로 입력해주세요.') {
		alert("내용을 새로 입력해 주십시오.");
		frm.contents.focus();
    return;
  } else if(frm.contents.value.length > 200) {
		alert("200자 이내로 입력해주세요.");
		frm.contents.focus();
    return;
  }

	if(selectAnimalNum < 1) {
		alert("동물을 선택해 주십시오.");
		return;
	}
  frm.dataIdx.value = selectAnimalNum;
  frm.submitCont.value = encodeURIComponent(frm.contents.value); 

  if(frm.disagree.checked == false && frm.aagree.checked == false){
		alert("학습노트 게시 관련하여\n동의 함 / 동의 안 함 버튼 중 하나를 선택해주세요.");
		return;
	} else {
    if (frm.disagree.checked ) {
      frm.viewAgree.value = "N";
    } else {
      frm.viewAgree.value = "Y";
    }
  }

  $("form#form").ajaxSubmit({
    url: "/service/front/lost/lostValleyStdInsProc.el",
    dataType : 'json',
    success : function(data){
      if (data.success) {
        alert("등록되었습니다.");
        location.replace("/service/front/lost/lostValleyMyStdList.el");
      } else {
        alert(data.message);
      }
    }, 
    error : function(){
      alert('사진 업로드 중 문제가 발생했습니다.');
    }
  });

}

/*
 * Sns연동
 * type : 연동 sns 타입, title : 제목, url : 본문글 url
 */
function goSns(type, title, url) {
	var titletextStr=encodeURIComponent("로스트 밸리 학습노트");
	var textStr=encodeURIComponent("로스트 밸리에서의 즐겁고 신났던 기억을 여러분들만의 학습노트로 만들어보세요.");
	var imgurl="http://www.everland.com/web/lostvalley/images/facebook3.jpg";

	if (type == "1") {		//트위터
//		window.open("http://twitter.com/?status="+encodeURI(title+" "+url));
    window.open("https://twitter.com/intent/tweet?text="+textStr+"&url="+url);
	} else if (type == "2") {	//페이스북
    window.open("http://www.facebook.com/sharer.php?s=100&p[url]="+url+"&p[title]="+titletextStr+"&p[summary]="+textStr+"&p[images][0]="+imgurl);
//		window.open("http://www.facebook.com/share.php?u="+encodeURI(url)+"&t="+encodeURI(title));
	}
}

/* 입력 텍스트의 바이트 수 체크
 * 예) if(!check_msglen(frm.htl_comid, 15, "공급업체 상품코드")) return;
 */
function check_msglen(obj, maxlen, msg)
{
    var length = calculate_msglen(obj.value);
    if (length > maxlen) {
        //alert("[" + objName + "]" + COM_MSG_00003 + " " + maxlen + " " + COM_MSG_00003 + "\n" + COM_MSG_00004 + " " + length + " " + COM_MSG_00005);
        alert(msg + " [Max : " + maxlen + ", Now : " + length + "]");
        //obj.select();
        obj.focus();
        return false;
    }
    return true;
}

/*2013.04.23 yuna*/
function animal_tab(){
 	$(".animal_tab_1").click(function(e){
		e.stopPropagation();
		e.preventDefault(); 		
		$('.animal_feature_2').css('display','none');
		$('.animal_feature_1').css('display','block');
		$('.page2').css('display','none');
		$('.page1').css('display','block');	
		$(".page1_btn a img").attr('src', 'images/adventure/animal/page1_btn_over.png');
		$(".page2_btn a img").attr('src', 'images/adventure/animal/page2_btn.png');		
		var text =$(".animal_tab_1 a img").attr("src").substr($(".animal_tab_1 a img").attr("src").length-9,5);
		$(".animal_tab_2 a img").attr("src",$(".animal_tab_2 a img").attr('src').replace("_over.png", ".png"));
		if(text =="_over"){return;}
		$(".animal_tab_1 a img").attr("src",$(".animal_tab_1 a img").attr('src').replace(".png", "_over.png"));				
		
	});

	 $(".animal_tab_2").click(function(e){
		e.stopPropagation();
		e.preventDefault();	 	 	
		$('.animal_feature_1').css('display','none');
		$('.animal_feature_2').css('display','block');	
		$('.page1').css('display','block');
		$('.page2').css('display','none');
		$(".page1_btn a img").attr('src', 'images/adventure/animal/page1_btn_over.png');
		$(".page2_btn a img").attr('src', 'images/adventure/animal/page2_btn.png');			 	
		 var text =$(".animal_tab_2 a img").attr("src").substr($(".animal_tab_2 a img").attr("src").length-9,5);	
		 $(".animal_tab_1 a img").attr("src",$(".animal_tab_1 a img").attr('src').replace("_over.png", ".png"));	
		 if(text =="_over"){return;}
		 $(".animal_tab_2 a img").attr("src",$(".animal_tab_2 a img").attr('src').replace(".png", "_over.png"));				
	 });

	
	$(".page1_btn").click(function(e){
		e.stopPropagation();
		e.preventDefault();		
		$('.page2').css('display','none');
		$('.page1').css('display','block');	
		 $(".page2_btn a img").attr("src",$(".page2_btn a img").attr('src').replace("_over.png", ".png"));	
		 var text =$(".page1_btn a img").attr("src").substr($(".page1_btn a img").attr("src").length-9,5);	
		 if(text =="_over"){return;}
		 $(".page1_btn a img").attr("src",$(".page1_btn a img").attr('src').replace(".png", "_over.png"));
	});
	
	$(".page2_btn").click(function(e){
		e.stopPropagation();
		e.preventDefault();		
		$('.page1').css('display','none');
		$('.page2').css('display','block');
		$(".page1_btn a img").attr("src",$(".page1_btn a img").attr('src').replace("_over.png", ".png"));	
		 var text =$(".page2_btn a img").attr("src").substr($(".page2_btn a img").attr("src").length-9,5);	
		 if(text =="_over"){return;}
		 $(".page2_btn a img").attr("src",$(".page2_btn a img").attr('src').replace(".png", "_over.png"));
	});	
	
 }
 
 function playerBtn(){
	$(".video_btn_img").click(function(e){
	e.stopPropagation();
	e.preventDefault();		
	$('.animal_player').css('display','block');
	});
	$(".player_closebtn").click(function(e){
		e.stopPropagation();
		e.preventDefault();		
		$('.animal_player').css('display','none');
	});
	$(".event2_winner .close_btn").click(function(e){
		e.stopPropagation();
		e.preventDefault();		
		$('.event2_winner').css('display','none');
	});
	$(".event3_winner .close_btn").click(function(e){
		e.stopPropagation();
		e.preventDefault();		
		$('.event3_winner').css('display','none');
	});	
 }
 
function alert_360(){
	$(".advcamera_360").parent().click(function(e){
		e.stopPropagation();
		e.preventDefault();		
		alert("곧 만날 수 있습니다.")
	});
}
function closeMovie(){
	$('.animal_player').hide();
}

/*4/24 added by sanghun*/
$(function(){
	if($.browser.msie  && parseInt($.browser.version, 10) === 7){
		return;
	}
	var selectEffectInterval,selectEffectNum=0;
	var $effectTarget = $(".select_effect .effect");
	var onAnimalBtnOver = function(e){
			selectEffectIntervalSet();
			var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			switch(filename){
				case "rhinoceros.html":
				case "rhinoceros.html#":
				case "cheetah.html":
				case "cheetah.html#":
						$(".select_effect").css("top","26px");
						break;
				case "whitelion.html":
				case "whitelion.html#":
						$(".select_effect").css("top","16px");
						break;
			}
	}
	var onAnimalBtnOut = function(e){
		
		selectEffectNum=0;
		clearInterval(selectEffectInterval);
		$(".select_effect .effect").css("left","0px");
	}
	$(".animalBtn a img").hover(
		function(e){
			var $tg = $(e.currentTarget);
			if($tg.hasClass('over'))return;
			$(".select_effect").prependTo($tg.parent().parent());
		},function(e){
			var $tg = $(e.currentTarget);
			if($tg.hasClass('over'))return;
		}
	);

	$(".select_effect").hover(
	 	function(e){
	 		var $tg = $($($($(e.target).parent()).parent()).parent().children()[1]).children();
	 		var _url = $($(e.currentTarget).parent().children()[1]).attr("href");
	 		$(".select_effect a").attr("href",_url);
	 		$tg.click(function(e){
	 			e.stopPropagation();
				e.preventDefault();	
	 			window.location.href = _url;
	 		});
	 		onAnimalBtnOver({currentTarget:$tg});
	 	},
	 	function(e){
			var $tg = $($($($(e.target).parent()).parent()).parent().children()[1]).children();
	 		onAnimalBtnOut({currentTarget:$tg});
	 	}
	 )
	
	function selectEffectIntervalSet(){
		if(selectEffectInterval){
			selectEffectNum=0;
			clearInterval(selectEffectInterval);
		}
		selectEffectInterval = setInterval(selectEffectSet,30);
	}
	function selectEffectSet(){
		$effectTarget.css("left","-=90px");
		selectEffectNum++;
		if(selectEffectNum > 13){
			clearInterval(selectEffectInterval);
			selectEffectNum=0;
		}
	}
})