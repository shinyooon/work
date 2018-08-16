var webServer = "http://talkypool.cafe24.com/work/enriching";
var imgServer = "";
var wasServer = "http://talkypool.cafe24.com/work/enriching";

var loginType = "";
var pageType = "";

var isIndex = false;


var ie = getIE();
var isFlash = swfobject.hasFlashPlayerVersion("1");
var isMobile = jQuery.browser.mobile;



if(isMobile){
	window.location = "/mobile/";
}




//others
var profileGetURL = webServer + "/profile_image/";
var profileSaveURL = webServer + "/proc/save_profile.jsp";

//proc
var loginCheckURL = wasServer + "/proc/login_check.jsp";
var loginCheckURL2 = webServer + "/proc/login_check.jsp";
var logoutURL = webServer + "/proc/login_check.jsp";
var joinSubmitURL = webServer + "/proc/join_proc.jsp";
var joinEventSubmitURL = webServer + "/proc/joinEvent_proc.jsp";
//
var onlineBoardURL = webServer + "/proc/board_list_proc.jsp";
var onlineSubmitURL = webServer + "/proc/board_insert_proc.jsp";
var onlinelikeSubmitURL = webServer + "/proc/board_like_proc.jsp";
var countURL = webServer + "/proc/user_count_proc.jsp";
var onlineDeleteURL = webServer + "/proc/board_delete_proc.jsp";
//page
var joinURL = webServer + "/index2.jsp?pageType=join";
var joinEventURL = webServer + "/index2.jsp?pageType=event";
var lobbyURL = webServer + "/lobby.jsp";
var fblikeURL = webServer + "/facebook_like.jsp";
//sns
var twLoginURL = webServer + "/twitter/tw_login.jsp";

//
var eventFormURL = webServer + "/event_form.jsp";
var joinFormURL = webServer + "/join_form.jsp";
var loginFormURL = webServer + "/login_form.jsp";




$(document).ready(function(){


	


	$('a').click(function(){
		if($(this).attr('href') == "#"){
			return false;
		}
	});
	
	
	
	$('.gnb_menu').mouseenter(function(){
		$(this).find('.gnb_gif').show();
	});
	$('.gnb_menu').mouseleave(function(){
		$(this).find('.gnb_gif').hide();
	});
	
	
	
	
	
	//$('.arr_btn').append('<span class="arr" style="width:0px;height:31px;overflow:hidden;display:inline-block" ><img src="'+imgServer+'/images/common/login/btn_arr.png" alt=""  /></span>');
	
	$('.arr_btn').mouseenter(function(){
		$(this).find('span').stop().animate({width:20},{duration:300, easing:"easeOutQuad"});
	});
	$('.arr_btn').mouseleave(function(){
		$(this).find('span').stop().animate({width:0},{duration:300, easing:"easeOutQuad"});
	});

	
	//initStep1();
	//alert(ie);
	
	loginComplete = function(data){
		if(data.result == "logout"){
			window.location.reload();
		}else if(data.result == "success"){
			window.location.reload();
		}else if(data.result == "wrong"){
			alert('아이디 또는 비밀번호가 맞지 않습니다.');
		}
		
	}
	joinProcess = function(data){

		if(data.result == "goEvent"){
			eventConfirm();
		}else if(data.result == "goRegist"){
			registConfirm();
		}else if(data.result == "notLogin"){
			notLogin();
		}
	}
	
	joinComplete = function(data){

		
		
		if(data.result == "success"){
			
			if(data.type == "default"){
				alert("주주되기가 완료되었습니다.");
				$(".join_step1_section").hide();
				thisMovie('main_flash').onSignupFinish();
				//window.location = lobbyURL+"?loginCheck=1";
			}else{
				$('.join_section').hide();
				$('.event_section').show();
				
				//$(".event_section_container").load( "/ajax_event_section.jsp .event_section");
			}
			
		}else if(data.result == "already"){
			alert("이미 가입된 아이디 입니다.");
			
			
		}else if(data.result == "failed"){
			alert("가입하기가 실패했습니다.");
		}
		
		
	}

	joinEventComplete = function(data){
		//console.log(data);
		
		if(data.result == "success"){
			alert("이벤트 응모가 완료되었습니다.");
			$(".event_section").hide();
			$(".join_step1_section").hide();
			$(".join_section").hide();
			parent.thisMovie('main_flash').onSignupFinish();
			//window.location = lobbyURL+"?loginCheck=1";
		}else if(data.result == "already"){
			alert("이미 응모된 전화번호 입니다.");
		}
	}
	
	
	
	visual = $('#visual');
	contents = $('#contents');
	container = $('#container');
	
	visualHei = visual.height();
	
	var bodyPosition = $('body').css('position');

	
	$(window).scroll(function(){
		//console.log($('body').css('position'));
		if($('body').css('position') != 'relative'){
			return;
		}
		
		scroll();
		resize();
	});
	scroll();
	
	$(window).resize(function(){
		resize();
	});
	resize();
	

	$('#gotop').hide();

	
	
	
	
});

var visualHei;


var visual;
var contents;
var container;





function scroll(){
	var top = $(window).scrollTop()/2;
	//console.log(top);
	var hei = visualHei-top;
	
	hei = hei < 350 ? 350 : visualHei-top;
	
	
	//console.log( $(document).height()+top );
	
	//visual.height(hei);
	visual.css({'height':hei});
	
	
		
	initGoTop();
}



function resize(){
	var hei = $(window).height();
	var h = visual.height() + container.height();
	contents.css({'min-height':h+117, 'height':hei-117});
}


function initGoTop(){
	if($(window).scrollTop() > 100) {
		$('#gotop').fadeIn();
	}else{
		$('#gotop').fadeOut();
	}
}


function eventConfirm(){
	if (confirm("주주가입 이벤트에 응모하지 않으셨습니다. 응모하시겠습니까?") == true){
		window.location =  joinURL;
		
	}else{
		
		 if(isLogin){
			 
		 }else{
		 	if(isIndex){
			 	window.location =  lobbyURL;
		 	}else{
				window.location.reload();	
		 	}
			 
		 }
		 
		//window.location.reload();//온라인미팅에서 새로고침되면 안됨
	}
}

function registConfirm(){
	if (confirm("가입되어 있지 않은 계정입니다. 주주가입을 하시겠습니까?") == true){
		window.location =  joinURL;
	}else{ 
		return;
	}
}
function notLogin(){
	
	if (confirm("로그인 되어있지 않거나 주주가입이 필요합니다. 주주가입을 하시겠습니까?") == true){
		window.location =  joinURL;
	}else{ 
		return;
	}
}

function loadUserCount(){
	$.ajax({
	  type: "POST",
	  url: countURL,
	  data: { } ,
	  dataType: 'jsonp'
	});
	
	userCountComplete = function(data){
	

		
		if(data.result == "success"){
		
			userTotalCount = parseInt(data.obj.userTotalCount);
			var n1 = parseInt(data.obj.firstType)/userTotalCount*100;
			var n2 = parseInt(data.obj.secondType)/userTotalCount*100;
			var n3 = parseInt(data.obj.thirdType)/userTotalCount*100;
			var n4 = parseInt(data.obj.fourthType)/userTotalCount*100;

			var per1 = $('.percent').eq(0);
			var per2 = $('.percent').eq(1);
			var per3 = $('.percent').eq(2);
			var per4 = $('.percent').eq(3);
			
			$('.bar').eq(0).delay(200).animate({width:n1+"%"},{duration:1000, easing:"easeInOutExpo", step:function(now,fx){    per1.html( Math.floor(now)+"%" );      }});
			$('.bar').eq(1).delay(400).animate({width:n2+"%"},{duration:1000, easing:"easeInOutExpo", step:function(now,fx){    per2.html( Math.floor(now)+"%" );      }});
			$('.bar').eq(2).delay(600).animate({width:n3+"%"},{duration:1000, easing:"easeInOutExpo", step:function(now,fx){    per3.html( Math.floor(now)+"%" );      }});
			$('.bar').eq(3).delay(800).animate({width:n4+"%"},{duration:1000, easing:"easeInOutExpo", step:function(now,fx){    per4.html( Math.floor(now)+"%" );      }});
			
			
			setCounter();
		
		}
		
	}
}


function setCounter(){

	var total = userTotalCount;

	total = "123239";
			
	total = Math.floor(Math.random()*999999).toString();
	//console.log(total);
	
	if(total.length < 6){
		var s = "";
		for(var i = 0;i < 6 - total.length;i++){
			s += "0";
		}
		total = s + total;
	}
	
	for(var i = 0;i < total.length;i++){
		var str = total.substr(i,1);
		var n = parseInt(str);
		/* console.log(str); */
		$('.count').eq(i).delay(i*200).animate({'background-position-y':-450-(n*45)}, {duration:1500, easing:"easeInOutExpo"});	
	}
}


onLoopStart = function(){
	
}



function moveTop(){
	$('body,html').animate({'scrollTop':0},{duration:600, easing:"easeOutExpo"});
}





// ------------------------------------------------------ 로그인 / 가입하기 ------------------------------------------------------


function join(){
	if(isIndex){
		goLogin();
	}else{
		window.location =  joinURL;
	}
}

function mypage(){
	window.location =  lobbyURL;
}

function findID(){
	//popup = window.open(url,'TwitterLogin','width=700, height=550, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0');
	window.open(wasServer + '/findid.jsp', '', 'width=360, height=440, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200' );
}

function findPW(){
	window.open(wasServer + '/findpw.jsp', '', 'width=360, height=440, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200' );
}
function closeFind(){
	$('.findid_step1').hide();
	$('.findpw_step1').hide();
}



var isLoginOn = false;
function login(){
	if(isLoginOn){
		closeLoginPopup();
	}else{
		openLoginPopup();
	}
	
}

function openLoginPopup(){
	$('.login_container').show();
	$('.login_section').stop().animate({'margin-top':'0'}, {duration:1000, easing:"easeInOutExpo"});
	isLoginOn = true;
}

function closeLoginPopup(){
	
	$('.login_section').stop().animate({'margin-top':'-260px'}, {duration:1000, easing:"easeInOutExpo"});
	setTimeout(function(){
		$('.login_container').hide();
	}, 1000);
	isLoginOn = false;
}


function logout(){
	
	$.ajax({
	  type: "POST",
	  url: logoutURL,
	  data: { type: "logout" } ,
	 // success: twitterLoginComplete2,
	  dataType: 'jsonp'
	});
}

function goLogin(){
	
	$('.main_popup').animate({'right':-300}, {duration:1000, easing:"easeInOutExpo"});
	$('.main_popup a').attr('tabindex', -1);
	
	try{
		thisMovie('main_flash').goLogin();
	}catch(e){

	}
	
}



// ------------------------------------------------------ Default ------------------------------------------------------



function loginDefault(type){
	
	loginType = type;
	
	var image = imgServer + "/images/join/face50x50.jpg";
	
	if(type == "join"){
		setJoinIcon("", "default", "");
		setProfileImage(image);
		
	}else{
	

		if(!checkLoginId( $('#user_id') )){
			return;
		}
		if(!checkLoginPassword( $('#user_pw') )){
			return;
		}


		
		
		
		getLoginCheck("default", $('#user_id').val(), $('#user_pw').val(), image, "");
		
		
		
	}
	
	
}

// ------------------------------------------------------ index / Lobby ------------------------------------------------------


var indexArrNum = 0;
function initIndexContents(){
	$('.con2_list .more').focusin(function(e){

		indexArrNum = $('.con2_list .more').index(this);
		$('.con2_list').css({left:-indexArrNum*270});
		return false;
	});
}




function indexContentsLeft(){

	$('.con2_arrow .left a').css({'cursor':'default'});

	indexArrNum = indexArrNum <= 0 ? 0 : indexArrNum-1;
	//console.log(indexArrNum);
	$('.con2_list').stop().animate({left:-indexArrNum*270}, {duration:1000, easing:"easeInOutExpo"});
	
	
	setIndexContentsArrow(indexArrNum);
}

function indexContentsRight(){
	indexArrNum = indexArrNum >= 2 ? 2 : indexArrNum+1;
	//console.log(indexArrNum);
	$('.con2_list').stop().animate({left:-indexArrNum*270}, {duration:1000, easing:"easeInOutExpo"});
	
	setIndexContentsArrow(indexArrNum);
}

function setIndexContentsArrow(index){
	if(index == 0){
		$('.con2_arrow .left a').css({'cursor':'default'});
		$('.con2_arrow .right a').css({'cursor':'auto'});
	}else if(index == 1){
		$('.con2_arrow .left a').css({'cursor':'auto'});
		$('.con2_arrow .right a').css({'cursor':'auto'});
	}else if(index == 2){
		$('.con2_arrow .left a').css({'cursor':'auto'});
		$('.con2_arrow .right a').css({'cursor':'default'});
	}
}




//------------------------------------------------------------------------------------------------------
$(function () {
	$(".play_btn").hide();
	
	setPlayBtn(1);
});

var onClickPlayBtn = function(){
	thisMovie('main_flash').onClickPlayBtn();
}

var showPlayBtn = function () {
	$(".play_btn").fadeIn();
}

var hidePlayBtn = function () {
	$(".play_btn").fadeOut();	
}

var setPlayBtn = function (attr) {
	if(attr == 0 ){
		$(".play_btn a img").eq(0).hide();
		$(".play_btn a img").eq(1).show();
	}else{
		$(".play_btn a img").eq(0).show();
		$(".play_btn a img").eq(1).hide();
	}
}

function getUserData(){
	return User.type+","+User.image;
}

