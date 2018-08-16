

jQuery.fn.setImgButton = function(num, retain, leave) {
//num: 활성화 버튼, retain: 유지유무, 
       var items = $(this);
       

       items.each(function(index){
	       	if(this.index > -1){
		       	this.img.attr('src', this.off);
		    }else{
				this.index = index;
				this.img = $(this).find('img');
				this.off = this.img.attr('src');
				this.on = this.img.attr('src').replace('_off.jpg', '_on.jpg');
			 }
             
			$(this).bind('mouseenter', function(){
				this.img.attr('src', this.on);
			});
			$(this).bind('mouseleave', function(){
				if($(this).is('.active'))return;
				this.img.attr('src', this.off);
			});
			
			$(this).bind('click', function(){
				if(retain){
					//if(!leave)items.eq(num).removeClass('active').trigger('mouseenter');
					$(this).addClass('active').trigger('mouseenter');
					num = index;
				}
			});
		});
			
		if(num > -1){
			items.eq(num).trigger('click');
		}
};


jQuery.fn.transform = function(obj) {

	$(this).css({

		'-webkit-transform':obj.transform,
		'-moz-transform':obj.transform,
		'-ms-transform':obj.transform,
		'-o-transform':obj.transform,
		'transform':obj.transform

	});
	

	return $(this);

};

jQuery.fn.transition = function(obj) {

	var self = $(this);
	
	self.addClass('ease').css({

		'-webkit-transform':obj.transform,
		'-moz-transform':obj.transform,
		'-ms-transform':obj.transform,
		'-o-transform':obj.transform,
		'transform':obj.transform

	});
	

	setTimeout(function(){
		self.removeClass('ease');
		//console.log(self);
	}, 600);

	

	return self;

};







var vP = "";
if ($.browser.webkit) {
    vP = "-webkit-";
} else if ($.browser.msie) {
    vP = "-ms-";
} else if ($.browser.mozilla) {
    vP = "-moz-";
} else if ($.browser.opera) {
    vP = "-o-";
}
	


//others
var profileGetURL = "/profile_image/";
var profileSaveURL = "/proc/save_profile.jsp";

//proc
var loginCheckURL = "/proc/login_check.jsp";
var joinSubmitURL = "/proc/join_proc.jsp";
var joinEventSubmitURL = "/proc/joinEvent_proc.jsp";
var onlineBoardURL = "/proc/board_list_proc.jsp";
var onlineSubmitURL = "/proc/board_insert_proc.jsp";
var onlinelikeSubmitURL = "../proc/board_like_proc.jsp";
var countURL = "../proc/user_count_proc.jsp";
//page
var joinURL = "../join.html";
var lobbyURL = "../lobby.html";
var findURL = "../find.html";
//sns
var twLoginURL = "/twitter/tw_login.jsp";







$(document).ready(function() {
	eventToggle();
	
	
	$('a').click(function(){
		if($(this).attr('href') == "#"){
			return false;
		}
	});
	


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

	


	contents = $('#contents');
	container = $('#container');
	



	$(window).resize(resize);
	resize();

	$("#left_nav").show();
	$(".login_section").show();

})



function resize(){

	
	

	var hei = $(window).height();
	var h = $('#contents > section').height();
	var others = $('footer').height();
	
	contents.css({'min-height':h+others, 'height':hei-others});

	
	if(isMenu){
		$("#left_nav").transform({transform:'translateX(0)'});
	}else{
		$("#left_nav").transform({transform:'translateX(' + (-$('#left_nav').width()-1) + 'px)'});
	}
	if(isOnLogin){
		$(".login_section").transform({transform:'translateX(' + ($(window).width()-$('.login_section').width()) + 'px)'});
	}else{
		$(".login_section").transform({transform:'translateX(' + ($(window).width()) + 'px)'});
	}
}

function eventToggle(){
}




var userTotalCount;
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

			var per1 = $('.bar-wrap strong').eq(0);
			var per2 = $('.bar-wrap strong').eq(1);
			var per3 = $('.bar-wrap strong').eq(2);
			var per4 = $('.bar-wrap strong').eq(3);
			
			$('.bar-wrap span').eq(0).delay(200).animate({width:n1+"%"},{duration:1000, easing:"easeInOutExpo", step:function(now,fx){    per1.html( Math.floor(now)+"%" );      }});
			$('.bar-wrap span').eq(1).delay(400).animate({width:n2+"%"},{duration:1000, easing:"easeInOutExpo", step:function(now,fx){    per2.html( Math.floor(now)+"%" );      }});
			$('.bar-wrap span').eq(2).delay(600).animate({width:n3+"%"},{duration:1000, easing:"easeInOutExpo", step:function(now,fx){    per3.html( Math.floor(now)+"%" );      }});
			$('.bar-wrap span').eq(3).delay(800).animate({width:n4+"%"},{duration:1000, easing:"easeInOutExpo", step:function(now,fx){    per4.html( Math.floor(now)+"%" );      }});
			
			setCounter();
		
		}
		
	}
}

function setCounter(type){

	var total = "123239";
	
	
	
	if(type != "resize"){
		
	

		
	
		total = "123239";
				
		//total = Math.floor(Math.random()*999999).toString();
		//console.log(total);
		
		if(total.length < 6){
			var s = "";
			for(var j = 0;j < 6 - total.length;j++){
				s += "0";
			}
			total = s + total;
		}
	}
	
	var h = 33.3;
	//console.log(total);
	
	for(var i = 0;i < total.length;i++){
		var str = total.substr(i,1);
		var n = parseInt(str);
		/* console.log(str); */
		//console.log(h);
		
		if(type == "resize"){
			$('.count').eq(i).css({'background-position-y':-h*10-(n*h)});	
		}else{
			$('.count').eq(i).stop().delay(i*200).animate({'background-position-y':-h*10-(n*h)}, {duration:1500, easing:"easeInOutExpo"});	
		}
		
	}
}


// ------------------------------------------------------ 메뉴 ------------------------------------------------------



var isMenu = false;
function onMenu(){
	if(isMenu){
		closeMenu();
		animateContents(0);
	}else{
		openMenu();
		closeLogin();
		animateContents($('#left_nav').width());
	}
	
}


function openMenu(){
	$("#left_nav").transition({'transform':'translateX(' + 0 + 'px)'});
	isMenu = true;
	
}

function closeMenu(){
	$("#left_nav").transition({'transform':'translateX(' + $('#left_nav').width()*-1 + 'px)'});
	isMenu = false;
	
}


var isOnLogin = false;
function onLogin(){
	if(isOnLogin){
		closeLogin();
		animateContents(0);
	}else{
		openLogin();
		closeMenu();
		animateContents($('.login_section').width()*-1);
	}
}

function animateContents(n){
	$("#contents").transition({'transform':'translateX(' + n + 'px)'});
}


function openLogin(){
	$(".login_section").transition({'transform':'translateX(' + ($(window).width()-$('.login_section').width()) + 'px)'});
	isOnLogin = true;
	
}


function closeLogin(){
	$(".login_section").transition({'transform':'translateX(' + $(window).width() + 'px)'});
	isOnLogin = false;
	
}









function getLoginCheck(type, id, password, image, name){

	var data;
	if(type == "default"){
		
		data = { type: "default", id:$('#user_id').val(), password:$('#user_pw').val(), image:image, displayName:name, device:"m" };
		
	}else if(type == "fb"){
		
		data = { id: id, type: "fb", image:image, displayName:name, device:"m" };
		
	}else if(type == "tw"){
		
		data = { id: id, type: "tw", image:image, displayName:name, device:"m" };
		
	}

	$.ajax({
	  type: "POST",
	  url: loginCheckURL,
	  data: data ,
	  dataType: 'jsonp'
	});

	
}







// ------------------------------------------------------ 로그인 / 로그아웃 / 아이디찾기 / 가입하기 ------------------------------------------------------

function join(){
		window.location =  joinURL;
}

function mypage(){
	window.location =  lobbyURL;
}


function logout(){
	
	$.ajax({
	  type: "POST",
	  url: loginCheckURL,
	  data: { type: "logout" } ,
	  dataType: 'jsonp'
	});
}

function eventConfirm(){
	if (confirm("주주가입 이벤트에 응모하지 않으셨습니다. 응모하시겠습니까?") == true){
		window.location =  joinURL+"?type=event";
		
	}else{
		
		 if(isLogin){
			 
		 }else{
			 window.location.reload();
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



function findID(){
	window.location =  findURL;
}



function setProfileImage(url){

	if(url == "null"){
		return;
	}
	
	User.image = url;

	
	if(Modernizr.csstransforms){
		var profile = '<img src="'+url+'" alt=""  class="user_profile_image"  />';
		$('#user_profiles').append(profile);
		$('.user_profile_image').attr({'style':'width:37px;height:48px;position:absolute;left:92px;top:61px;transform: skew(0deg, -22deg) ;-webkit-transform: skew(0deg, -22deg);'});

	}else{
		var params = {};
		params.allowScriptAccess = "always";
		params.allowFullScreen = "true" ;
		params.wmode = "transparent" ;
		swfobject.embedSWF(webServer + "/swf/profile.swf?image="+url, "user_profiles", '100%', '100%', "10.0.0", null, null, params, null);
	}


	
	

}



function setJoinIcon(id, type, name){

	User.id = id;
	User.type = type;
	User.name = name;
	
	loginType = "";
	
	
	
	$('.join_step').hide();
	$('.join_step2').show();
	
	
	
	
}



function joinSubmit(){
	
	if(User.type == "default"){
		$('.join_step2').hide();
		$('.join_step1').show();
	}else{
		$.ajax({
		  type: "POST",
		  url: joinSubmitURL,
		  data: { id: User.id, type: User.type, choice:$("input[name=join_select]:checked").val(), image:User.image, displayName:User.name } ,
		  dataType: 'jsonp'
		});
	}
	
	
	
}
joinComplete = function(data){
		
	if(data.result == "success"){
		alert("주주되기가 완료되었습니다.");
		if(User.type == "default"){
			$('.join_step2').hide();
			$('.join_step1').show();
		}else{
			$('.join_step2').hide();
			$('.join_event').show();
		}
			
	}else if(data.result == "already"){
		alert("이미 가입된 아이디 입니다.");
		
		
	}else if(data.result == "failed"){
		alert("가입하기가 실패했습니다.");
	}
	
	
}







function joinSubmitDefault(){

	if(!checkUserName( $('#join2_name') )){
		return;
	}
	if(!checkAuthPhone( $('#join2_phone1'), $('#join2_phone2'), $('#join2_phone3'), $('.num_btn a') )){
		return;
	}
	if(!checkId( $('#join2_id') )){
		return;
	}
	if(!checkPassword( $('#join2_pw'), $('#join2_pw2') )){
		return;
	}

	if(!checkAgree( $("input[name=join_agree1]:checked"),1 )){
		return;
	}
	if(!checkAgree( $("input[name=join_agree2]:checked"),2 )){
		return;
	}
	



	$.ajax({
	  type: "POST",
	  url: joinEventSubmitURL,
	  data: { 
	  	id: $('#join2_id').val(),
	  	userName:$('#join2_name').val(), 
	  	password:$('#join2_pw').val(),
	  	choice:$("input[name=join_select]:checked").val(), 
	  	userPhone1:$('#join2_phone1').val(), 
	  	userPhone2:$('#join2_phone2').val(), 
	  	userPhone3:$('#join2_phone3').val(), 
	  	type:"default",
	  	device:"m", 
	  	image:User.image 
	  } ,
	  dataType: 'jsonp'
	});
	
}


function cancelJoinSubmitDefault(){
	
	$('.join_step').show();
	$('.join_step1').hide();
	
}



function offlinePopupShow(){
	$('.offline_contents1 .popup_bg').show();
	$('.mentoring_popup').show();
}
function offlinePopupHide(){
	$('.offline_contents1 .popup_bg').hide();
	$('.mentoring_popup').hide();
}




function submitEvent(){





	if(!checkUserName( $('#event_name') )){
		return;
	}
	if(!checkPhone( $('#event_phone1'), $('#event_phone2'), $('#event_phone3') )){
		return;
	}
	if(!checkAgree( $("input[name=event_agree1]:checked"), 1 )){
		return;
	}
	if(!checkAgree( $("input[name=event_agree2]:checked"), 2 )){
		return;
	}




	$.ajax({
	  type: "POST",
	  url: joinEventSubmitURL,
	  data: { 
	  	device:"m",
	  	id: User.id, 
	  	type: User.type, 
	  	userName:$('#event_name').val(), 
	  	userPhone1:$('#join2_phone1').val(), 
	  	userPhone2:$('#join2_phone2').val(), 
	  	userPhone3:$('#join2_phone3').val(), 
	  } ,
	  dataType: 'jsonp'
	});

	
}


joinEventComplete = function(data){
	//console.log(data);
	
	if(data.result == "success"){
		alert("이벤트 응모가 완료되었습니다.");
		window.location = lobbyURL;
	}else if(data.result == "already"){
		alert("이미 응모된 전화번호 입니다.");
	}
}

function cancelSubmitEvent(){
	
	window.location = lobbyURL;
}




// ------------------------------------------------------ 페이스북 ------------------------------------------------------



// Load the SDK Asynchronously
(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/all.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


window.fbAsyncInit = function() {
	FB.init({
		appId      : '593070714069553',
		status     : true,
		xfbml      : true
	});
}


function fbLogin(){
	FB.login(function(response) {

		if (response.authResponse) {
			//console.log('Welcome!  Fetching your information.... ');
			
			getUser(response);
		} else {
			//console.log('User cancelled login or did not fully authorize.');
		}
		
	}, {scope: 'user_photos, publish_stream, email'});
}

function getUser(response){

	
	
	FB.api('/me?fields=email,picture,name', function(response) {
	
		var name = response.name;
		var id = response.email;
		var image = response.picture.data.url;
		
		
		
		if(loginType == "join"){
			
			setJoinIcon(id, "fb", name);
			setProfileImage(image);
			return;
		}
		
		getLoginCheck("fb", id, "", image, name);

		
	});
}

function loginFB(type){


	loginType = type;


	FB.getLoginStatus(function(response) {

		if (response.status === 'connected') {
			// the user is logged in and has authenticated your
			// app, and response.authResponse supplies
			// the user's ID, a valid access token, a signed
			// request, and the time the access token 
			// and signed request each expire
			var uid = response.authResponse.userID;
			accessToken = response.authResponse.accessToken;
			getUser(response);
		} else if (response.status === 'not_authorized') {
			// the user is logged in to Facebook, 
			// but has not authenticated your app
			fbLogin();
		} else {
			// the user isn't logged in to Facebook.
			fbLogin();
		}
	});
}


// ------------------------------------------------------ 트위터 ------------------------------------------------------


function loginTW(type){

	loginType = type;

	var url = twLoginURL;
	popup = window.open(url,'TwitterLogin','width=700, height=550, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0');
	
	
}


function twitterLoginComplete(response){

	$.ajax({
		type: "POST",
		url: profileSaveURL,
		data: {  id:response.id, profile:response.profile},
		dataType: 'jsonp'
	});
		
	profileSaveComplete = function(data){

		var id = data.id;
		var image = profileGetURL + data.filename;
		
		if(loginType == "join"){
			setJoinIcon(id, "tw", id);
			
			setProfileImage(image);
			return;
		}
		getLoginCheck("tw", id, "", image, id);
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
		
		if($('#user_id').val() == ""){
			alert("아이디를 입력해 주세요.");
			$('#user_id').focus();
			return false;
		}
		
		if( !fnCheckUserId($('#user_id').val()) ){
			$('#user_id').focus();
			return;
		}

		
		if($('#user_pw').val() == ""){
			alert("비밀번호를 입력해 주세요.");
			$('#user_pw').focus();
			return false;
		}
		
		if( !fnCheckPassword($('#user_id').val(), $('#user_pw').val()) ){
			$('#user_pw').focus();
			return;
		}
		
		getLoginCheck("default", $('#user_id').val(), $('#user_pw').val(), image, "");
		
		
		
	}
	
	
}

// ---------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------ Default ------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

var imgCount = 0;
var beforeImgCount = 0;
function loopInterval(){
	setInterval(function(){
		$('#loop_img_'+beforeImgCount).hide();
		imgCount++;
		$('#loop_img_'+imgCount).show();
		beforeImgCount = imgCount;
		if(imgCount == imgTotal){
			imgCount = 0;
		}
	}, 300);
	
}



