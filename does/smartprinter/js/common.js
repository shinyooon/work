var isS = false;
if (document.domain.toString().indexOf("samsung.com") != -1) {
	document.domain="samsung.com"; 
	isS = true;
} 



var $overMenuItem = null;
var $selectMenuItem = null;
	
function init(){
	 $menuItems = $(".menu_item img");
}
function initEventListener(){
	$menuItems.mouseenter(function(){
		if($overMenuItem != null){
			removeOverMenuItem($overMenuItem);
		}
		$overMenuItem = $(this);
		setoverMenuItem($overMenuItem);					
			

	});
	/*$menuItems.click(function(){
		$selectMenuItem = $(this);
	});*/				
	$(".menu").mouseleave(function(){
		if($overMenuItem != null){
			removeOverMenuItem($overMenuItem);
		}
          if($selectMenuItem!=null){
          	setoverMenuItem($selectMenuItem);	          
        }
              					
	});		
	$(".send_btn").mouseleave(function(){
		if($overMenuItem != null){
			removeOverMenuItem($overMenuItem);
		}
          if($selectMenuItem!=null){
          	setoverMenuItem($selectMenuItem);	          
        }
              					
	});	
}

function setoverMenuItem($menuItems){
	$menuItems.attr("src",$menuItems.attr('src').replace(".png", "_over.png"));						
}
function removeOverMenuItem($menuItems){
	$menuItems.attr("src",$menuItems.attr('src').replace("_over.png", ".png"));	
}

function alert_perpare(){
	$(".alert_pre").click(function(){
		
		alert("오픈 준비중입니다. Print Your Heart 이벤트는 6/28일 부터 참여가능합니다.");
	});

}

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
	  appId      : 496104077127484,        // App ID
	  status     : true,           // check login status
	  cookie     : true,           // enable cookies to allow the server to access the session
	  xfbml      : true            // parse page for xfbml or html5 social plugins like login button below
	});

// Put additional init code here
};




var postType = "FB";//FB이면 페이스북으로 보내기 선택, POST이면 우편으로 보내기선택
var photoType = "V";// 가로가크면 H, 세로가 크면 V
var photoURL = ''; //타입별로 업로드된 이미지 주소.
var userName = ''; //보내는사람 이름
var writeText = ''; // 편지내용
var receiverUser = {}; //FB 받는사람 Obj
var sendUser = {};//FB 보내는 사람 Ojb

var fbPhotoUploadType = 1;


var domain = isS ? "https://local.sec.samsung.com/" : "https://www.d-o-e-s.com/";
var sitePath = isS ? domain + "comLocal/event/1306_smartprinter/" : domain + "collection/1306_smartprinter/";
var imagePath = isS ? domain + "comLocal/event/1306_smartprinter/" : domain + "app/1306_smartprinter/";

$(document).ready(function(){
	$('.flash').show();
	
	list = $('.photo_list');
	
	if(parent.document.getElementById("iframecontents")){
		
	
		var doc = document.getElementById('wrap');
		if(doc.offsetHeight == 0){
		
		} else {
		  pageheight = doc.offsetHeight;
		  parent.document.getElementById("iframecontents").height = pageheight+"px";
		}
	}

	init();
	initEventListener();	
 	alert_perpare();	
	

	$('.selectphoto_content .arrow_r a').click(function(){
		if(fbPage < totalPage){
			loadImages(++fbPage);
		}
	});
	
	$('.selectphoto_content .arrow_l a').click(function(){
		if(fbPage > 1){
			loadImages(--fbPage);
		}else{
			
		}
	});
	
	
	$('a').click(function(){
		if($(this).attr('href') == '#'){
			return false;
		}
	});
	
});

// ******************************************            global            ******************************************


function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName]
    }
    else {
        return document[movieName]
    }
}





// ******************************************            main            ******************************************



function fbLogin(){
	FB.login(function(response) {

		if (response.authResponse) {
			//console.log('Welcome!  Fetching your information.... ');
			
			getUser(response);
		} else {
			//console.log('User cancelled login or did not fully authorize.');
		}
		
	}, {scope: 'user_photos,friends_photos,publish_stream'});
}

function getUser(response2){
	
	FB.api('/me', function(response) {
		//setFeedImage();

		sendUser = response;
		outMain(1);
		
		//console.log(response2);
		thisMovie('flashContents').setFacebook(response2.authResponse.accessToken);
	});
}

function outMain(n){

	
	if(n == 1){
		postType = 'FB';
		$('.upload_facebook_btn').show();
	}else if(n == 2){
		postType = 'POST';
		$('.upload_facebook_btn').hide();
	}
	
/* 	$('.main_content').animate({top:-580}, {duration: 1600, easing: 'easeInOutExpo'}); */
	$('.main_content').hide();
	//setTimeout(function(){
		thisMovie('flashContents').firstPlay();
	//}, 1000);
}

function sendFacebook(){
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




function sendPost(){
	outMain(2);
}



// ******************************************            페이스북으로 보내기 사진 로드 및 업로드            ******************************************

var fbPhotoArr = [];
var fbPage = 1;
var fbGap = 18;
var list;


function fbSelect(){
	$('.selectphoto_content').show();
	
	
	loadFbPhoto();
}


//facebook에서 엘범에 있는 사진 url 가져오기
function loadFbPhoto(){
	fbPage = 1;

	FB.api('me?fields=albums.limit(100).fields(photos.fields(picture))', function(response) {
	  
		$.each($(response.albums.data), function(i, obj) {
			if(obj.photos){
				$.each(obj.photos.data, function(i,data){
					var img = '<img src="'+data.picture+'" alt=""   />';
					fbPhotoArr.push(img);
				});
			}
		});	 
		
		totalPage = Math.floor(fbPhotoArr.length / fbGap);
		totalPage += fbPhotoArr.length % fbGap > 0 ? 1 : 0;
		
		//console.log(fbPhotoArr.length,totalPage);
		
		loadImages(fbPage); 
	  
	});
}

//animation 및 contents에 li 추가하기
function loadImages(fbPage){

		var wid = 510;
	//for (var i = (fbPage-1) * fbGap; i<fbPage * fbGap; i++){
	
		if( $('.photo_list').eq(fbPage-1).length > 0 ){
			$('.photo_list_contents').animate({'left':-(fbPage-1)*wid});
		}else{
			$('.photo_list_contents').append('<ul class="photo_list" style="position:absolute;left:'+(fbPage-1)*wid+'px;top:0;"></ul>').animate({'left':-(fbPage-1)*wid});
			list = $('.photo_list').eq((fbPage-1));
			fbImgFileLoad((fbPage-1) * fbGap);
		}

	//}
	
}

//fbPhotoArr 배열에 있는 사진 로드
function fbImgFileLoad(i){

	var img = fbPhotoArr[i];
	
	$(img).load(function() {
	
	

		var li = '<li class="photo_li"><a href="javascript:fbPhotoClick('+i+');">'+img+'</a></li>';
		$(list).append(li);

		
		
		
		var image = $(list).find('img').eq(i-(fbPage-1) * fbGap);
		
		
		var w = image.width();
		var h = image.height();
		
/* 		console.log('width:' + w,'height:' + h, 'i:'+ i); */
		
		if(w > h){
			
			var per = 82/h;
			var wid = Math.floor(w*per);
			
			image.css({'width':wid, 'height':82, 'margin-left':-(wid-82)/2});
		}else{
			var per = 82/w;
			var hei = Math.floor(h*per);
			image.css({'width':82, 'height':hei, 'margin-top':-(hei-82)/2});
		}
		
		
		i++;
		
		if(i < fbPage * fbGap){
			fbImgFileLoad(i);
		}
		
		
		
		
	});
}

var currentSelect;
function fbPhotoClick(n){

	

	if(currentSelect){
		$(currentSelect).find('.active').remove();
	}
	
	if(n == -1){
		currentSelect = null;
		photoURL = '';
		return;
	}

	var li = $('.photo_li').eq(n);
	li.append('<div class="active"></div>');
	currentSelect = li;
	
	var img = li.find('img');
	
	var w = img.width();
	var h = img.height();
	
	photoURL = img.attr('src').replace('_s.', '_n.');
	
/* 	console.log('width:' + w,'height:' + h); */
	
	if(w>=h){
		photoType = "H";
	}else{
		photoType = "V";
	}

}



//facebook, pc 사진 올리기 전환
function changeSelectPhoto(n){
	if(n == 1 && fbPhotoUploadType != n){
		fbPhotoClick(-1);
		loadFbPhoto();
		
		$('.selectphoto_content').show();
		$('.selectphoto_content2').hide();
	}else if(n == 2 && fbPhotoUploadType != n){
		resetPostSelect();
		
		$('.selectphoto_content').hide();
		$('.selectphoto_content2').show();
	}
	
	fbPhotoUploadType = n;
	photoURL = '';
	photoType = '';
}

function outSelectPhoto(){

	if(photoURL == ''){
		alert('사진을 선택해주세요.');
		return;
	}

	$('.selectphoto_content').hide();
	$('.selectphoto_content2').hide();
	
	//setTimeout(function(){
		thisMovie('flashContents').outSelectPhoto(photoURL);
	//}, 1000);
	
}

//플래시에서 호출됨
var senderPostType;
function setSenderPostType(type){
	senderPostType = type;
}


function resetAllSelect(){
	
	fbPhotoUploadType = 0;
	changeSelectPhoto(1);
}



// ******************************************            우편으로 보내기 사진업로드            ******************************************

function postSelect(){
	$('.selectphoto_content2').show();
	$('.selectphoto_content2 .upload_btn').hide();
	
	resetPostSelect();
	
}

function resetPostSelect(){
	$('.upload_photo_img .select_load_img').remove();
	$('#photoUploadForm')[0].reset();
}



$('#photoUploadForm').ajaxForm({

	success : function(data) {
/* 		console.log(data); */
		var obj = jQuery.parseJSON(data);
		var src = obj.filename;
/* 		console.log(code); */
		
		
		selectPhotoLoad(src);
		
	}
});


function selectPhotoLoad(src){

	

	src = imagePath + 'movie_upload_img/' + src;

	var img = '<img src="'+src+'" alt="" class="select_load_img" style="position:absolute;z-index:-1;" />';
	$('.upload_photo_img').append(img);
	
	$(img).load(function() {
	

		
		var image = $('.upload_photo_img .select_load_img');
		image.css({'padding':'6px'});
		
		photoURL = image.attr('src');
		
		
		
		
		var w = image.width();
		var h = image.height();

		
		
		
		if(w>=h){
			photoType = "H";
		}else{
			photoType = "V";
		}
		
		setImage(image, 248, 248);
		
		
		
		
		
	});
}


function setImage(image, nw, nh){
	var w = image.width();
	var h = image.height();

	if(w/nw > h/nh){
		var per = nw/w;
		var hei = Math.floor(h*per);
		
		$(image).css({'width':nw, 'height':hei, 'margin-top':(nh-hei)/2,  'top':'0', 'left':'0', 'position':'absolute', 'z-index':'100'});
	}else{
		var per = nh/h;
		var wid = Math.floor(w*per);
		$(image).css({'width':wid, 'height':nh, 'margin-left':(nw-wid)/2, 'top':'0', 'left':'0', 'position':'absolute', 'z-index':'100'});
	}
}



// ******************************************            write            ******************************************
function writeLetter(){
	$('.write_content').show();
	
	thisMovie('flashContents').inWriteLetter();
	
	$('.write_area input').each(function(i){
		$(this).val('');
	});
	
	
	var maxLen = $('.write_area input').eq(0).attr('maxlength');
	
	$('.write_area input').keydown(function(e){
/* 		console.log(e); */
		var code = (e.keyCode ? e.keyCode : e.which);
		var next = $(this).next();
		var prev = $(this).prev();
		
		
		
		if(code == 13){
			next.focus();
		
		}else if(code == 8 && $(this).val().length < 1){
		
			prev.focus().val(prev.val() + '');
		
		}else if($(this).val().length > 9){
			
			setTimeout(function(){
				next.focus();
			}, 1000);
		}
		
	});
}


function outWrite(){

	var isCheck = true;
	$('.write_area input').each(function(i){
/* 		console.log($(this).val()); */
		if( $(this).val() == '' ){
			isCheck = true;
		}else{
			isCheck = false;
			return false;
		}
	
	});
	if(isCheck){
		alert('메시지를 작성해주세요.');
		return;
	}
	
	var txt = '';
	
	$('.write_area input').each(function(i){
		txt += $(this).val() + '\n';
	});
	writeText = txt;
	

	$('.write_content').hide();
	
	setMyLetter();
	
	
	
}





// ******************************************            myLetter            ******************************************




function setMyLetter(){

	var obj;
	var w;
	var h;
	if(photoType == "V"){
		w = 273;
		h = 366;
		obj = $('.myletter_h_content').show();
	}else if(photoType == "H"){
		w = 351;
		h = 245;
		obj = $('.myletter_v_content').show();
	}
	
	$(obj).find('.myletter_img').html('');
	
	var img = '<img src="'+photoURL+'" class="receiver_photo" alt="" />';
	
	$(img).load(function(e){
		
/*
		console.log(e);
		console.log(e.target.width, e.target.height);
*/
		
		
		$(obj).find('.myletter_img').append(img);
		
		var image = $('.receiver_photo');
		
		
		setImage(image, w, h);
	});
	
	
	
	$('.myletter_area textarea').val(writeText);
	
	
}







function reWriteLetter(){
	$('.myletter_v_content').hide();
	$('.myletter_h_content').hide();
	
	thisMovie('flashContents').reWrite();
	
	resetAllSelect();
	selectPhoto();
}

function outMyLetter(){
	$('.myletter_v_content').hide();
	$('.myletter_h_content').hide();
	
	onSendContent();

}


// ******************************************            send            ******************************************

$(document).ready(function(){

/*
	$('.main_content').hide();
	
	
	setTimeout(function(){
	onSendContent();
	}, 2000);
*/
});

function onSendContent(){
	
	
	
	
	if(postType == "FB"){
		$('.send_content').show();
		$('.send_content .sender .name').html(sendUser.name);
		loadFriends();
	}else if(postType == "POST"){
		$('.send2_content').show();
	}
}



var friendPage = 1;
var friendResponse;
var friendPageGap = 10;
var receiList;
var receiListNum;
var friendPageTotal;
var friendMaxPageNum = 5;
//facebook에서 엘범에 있는 사진 url 가져오기
function loadFriends(){
	
	receiList = $('.receiver_list');
	receiListNum = $('.receiver_list_num');

	FB.api('me/friends?fields=picture,name&limit=100', function(response) {
	
	
		friendResponse = response;
		console.log(friendResponse.data.length);
		
		if(friendResponse.data.length > 0){
			friendPageTotal = Math.floor(friendResponse.data.length / friendPageGap);
			friendPageTotal += friendResponse.data.length % friendPageGap > 0 ? 1 : 0;
			
			loadFriendPage(friendPage);
		}else{
			receiList.html('친구 목록이 없습니다.');
		}
		

	  
	});
}



function loadFriendPage(p){
/* 	console.log(p); */
	receiList.html('');
	receiListNum.html('');
	friendPage = p;

	for (var i = (p-1) * friendPageGap;i < p * friendPageGap;i++){
		if(friendResponse.data[i]){
			var url = friendResponse.data[i].picture.data.url;
			var name = friendResponse.data[i].name;

			var li = '<li><a href="javascript:friendProfileClick('+i+');"><div class="prifile_image"><img src="'+url+'" alt="" /></div><span class="id">'+name+'</span></a></li>';
			receiList.append(li);
		}
		
		
	}
	
	
	for (i=0;i < friendMaxPageNum;i++){
		
		var n = Math.floor(p/(friendMaxPageNum+1));
		var pageNum = (n*friendMaxPageNum+i+1);
		
		if(pageNum <= friendPageTotal){
	/* 		console.log((p-1) % friendMaxPageNum, i); */
			var aClass = (p-1) % friendMaxPageNum == i ? ' class="active"' : '';
			var li = '<li><a href="javascript:loadFriendPage('+pageNum+');"'+aClass+'>'+pageNum+'</a></li>';
	
			receiListNum.append(li);
		}
	}
}

var currentDiv;
function friendProfileClick(n){

	if(currentDiv){
		$(currentDiv).find('.active').remove();
	}
	
	var div = $('.prifile_image').eq(n%friendPageGap);
	var active = '<img src="images/send/f_selectbox.png" alt="" class="active" style="position:absolute;left:0;top:0;" />';
	div.append(active);
	
	receiverUser = friendResponse.data[n];
	currentDiv = div;
}


function friendPageRight(){

	if(friendPage < friendPageTotal){
		loadFriendPage(++friendPage);
	}

	
}
function friendPageLeft(){
	if(friendPage > 1){
		loadFriendPage(--friendPage);
	}
	
}

function outWriteLetter(){


	if(postType == "FB"){
	
		if(!currentDiv){
			alert("친구를 선택해주세요.");
			return;
		}
	
		$('.send_content').hide();
		thisMovie('flashContents').outWriteLetter();
		
		
	}else if(postType == "POST"){
		
		checkAddressForm();
		
	}

}


function checkAddressForm(){


	
	var name;
	var phone;
	var url;
	var userType;//'타입 : MF:모바일페북, MP:모바일편지, WF:웹페북, WP:웹편지';
	var text;
	
	if(postType == "FB"){
		name  = $('#apply_name').val();
		phone = $('#apply_number1').val() + $('#apply_number2').val() + $('#apply_number3').val();
		userType = 'WF';
		url = photoURL;
		sendName = sendUser.name;
		receiverName = receiverUser.name;
		
	}else if(postType =="POST"){
		name  = $('#send_name').val();
		phone = $('#send_phone1').val() + $('#send_phone2').val() + $('#send_phone3').val();
		userType = 'WP';
		url = photoURL;
		sendName = $('#send_name').val();
		receiverName = $('#receive_name').val();
	}
	
	text = writeText.replace(/\n/g,"-_");
	
	
	var isCheck;
	
	if(postType == "FB"){
		isCheck = checkForm1();
	}else if(postType =="POST"){
		isCheck = checkForm2();
	}
	
	
	if(isCheck){
		
		$.ajax({
		    url : sitePath + "apply_pro.jsp",
		    dataType : "jsonp",
		    jsonp : "callback",
		    data : {
		    	'username' : name,
		    	'userphone' : phone,
		    	'image_ori': url, 
		    	'image_post': url, 
		    	'message' : text,
		    	'user_type' : userType,
		    	'send_name' : sendName, 
		    	'send_zip_code' : $('#send_zip_code').val(),
		    	'send_addr1' : $('#send_addr1').val(),
		    	'send_addr2' : $('#send_addr2').val(),
		    	'send_phone' : '',
				'receive_name' : receiverName, 
		    	'receive_zip_code' : $('#receive_zip_code').val(),
		    	'receive_addr1' : $('#receive_addr1').val(),
		    	'receive_addr2' : $('#receive_addr2').val(),
		    	'receive_phone' : $('#receive_phone1').val() + $('#receive_phone2').val() + $('#receive_phone3').val()
		    },
		    success : function(d){
		        
		    }
		});	
		
	
	};
	
}

function checkForm1(){
	if($('#apply_name').val() == ''){
		alert('이름을 입력해주세요.');
		$('#apply_name').focus();
		return;
	}
	if($('#apply_number1').val() == ''){
		alert('전화번호를 입력해주세요.');
		$('#apply_number1').focus();
		return;
	}if($('#apply_number2').val() == ''){
		alert('전화번호를 입력해주세요.');
		$('#apply_number2').focus();
		return;
	}if($('#apply_number3').val() == ''){
		alert('전화번호를 입력해주세요.');
		$('#apply_number3').focus();
		return;
	}
	if($('input:radio[name=agree]:checked').val() != "y"){
		alert('개인정보 활용에 동의해 주세요.');
		$('input:radio[name=agree]').eq(0).focus();
		return;
	}
	
	
	
	return true;
}

function checkForm2(){

	if($('#send_name').val() == ''){
		alert('보내는 사람 이름을 입력해주세요.');
		$('#send_name').focus();
		return;
	}
	if(isS && $('#send_zip_code').val() == ''){
		alert('우편번호를 입력해주세요.');
		$('#send_zip_code_btn').focus();
		return;
	}
	if($('#send_addr1').val() == ''){
		alert('주소를 입력해주세요.');
		$('#send_addr1').focus();
		return;
	}
	if($('#send_addr2').val() == ''){
		alert('주소를 입력해주세요.');
		$('#send_addr2').focus();
		return;
	}
	if($('#send_phone1').val() == ''){
		alert('전화번호를 입력해주세요.');
		$('#send_phone1').focus();
		return;
	}if($('#send_phone2').val() == ''){
		alert('전화번호를 입력해주세요.');
		$('#send_phone2').focus();
		return;
	}if($('#send_phone3').val() == ''){
		alert('전화번호를 입력해주세요.');
		$('#send_phone3').focus();
		return;
	}
	
	
	
	if($('#receive_name').val() == ''){
		alert('받는 사람 이름을 입력해주세요.');
		$('#receive_name').focus();
		return;
	}
	if(isS && $('#receive_zip_code').val() == ''){
		alert('우편번호를 입력해주세요.');
		$('#receive_zip_code').focus();
		return;
	}
	if($('#receive_addr1').val() == ''){
		alert('주소를 입력해주세요.');
		$('#receive_addr1').focus();
		return;
	}
	if($('#receive_addr2').val() == ''){
		alert('주소를 입력해주세요.');
		$('#receive_addr2').focus();
		return;
	}
	if($('#receive_phone1').val() == ''){
		alert('전화번호를 입력해주세요.');
		$('#receive_phone1').focus();
		return;
	}if($('#receive_phone2').val() == ''){
		alert('전화번호를 입력해주세요.');
		$('#receive_phone2').focus();
		return;
	}if($('#receive_phone3').val() == ''){
		alert('전화번호를 입력해주세요.');
		$('#receive_phone3').focus();
		return;
	}
	
	if($('input:radio[name=post_agree]:checked').val() != "y"){
		alert('개인정보 활용에 동의해 주세요.');
		$('input#post_agree').focus();
		return;
	}
	
	return true;
	
}



applyComplete = function(num){

	
	if(postType == "FB"){
		alert('응모가 완료되었습니다.');
		$('.apply_content').hide();
		$('.more_content').show();
		thisMovie('flashContents').uploadImage(sitePath, writeText);
		
		
		
	}else if(postType =="POST"){
		
		alert('응모가 완료되었습니다.');
		$('.send2_content').hide();
		thisMovie('flashContents').outWriteLetter();
	}
	
	
	
	
		
}
$(document).ready(function(){
	
	
	//setTimeout(setFeedImage, 2000);
	
});

function setFeedImage(fbImage){
	

	
	var imgURL = imagePath + 'movie_upload_img/' + fbImage;

    //FB.api('/'+receiverUser.id+'/photos', 'post', {
    FB.api('/me/photos', 'post', {
        message: 'photo description',
        access_token: accessToken, 
        url: imgURL
    }, function (response) {

        if (!response || response.error) {
           // alert('Error occured:' + response);
        } else {
            //alert('Post ID: ' + response.id);
        }

    });   
	
}



function openZipCode1(){
	var url = "http://local.sec.samsung.com/comLocal/as/zipCodeList.do?zipCode=send_zip_code&zipGaddr=send_addr1";
	window.open(url,'zipPopup','width=395, height=290, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0');
	return false;
}

function openZipCode2(){
	var url = "http://local.sec.samsung.com/comLocal/as/zipCodeList.do?zipCode=receive_zip_code&zipGaddr=receive_addr1";
	window.open(url,'zipPopup','width=395, height=290, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0');
	return false;
}















// ******************************************            event finished            ******************************************


//플래시 영상 끝까지가면 실행
function eventFinished(){
	


	if(postType == "FB"){
		$('.apply_content').show();
		$('.apply_receiver_name').html(receiverUser.name);
	}else if(postType == "POST"){
		$('.more_content').show();
	}
}




function applyContent(){

	
	checkAddressForm();
	
	
}

function closeApplyContent(){
	$('.apply_content').hide();
	$('.more_content').show();
}










// ******************************************            ExternalInterface.call            ******************************************




function selectPhoto(){
	if(postType == "FB"){
		fbSelect();
	}else if(postType == "POST"){
		postSelect();
	}
	
}







// ******************************************            receiver            ******************************************

var receiverPostType;

$(document).ready(function(){
	
	

});


function receiverStart(){
	$('.receiver1_content').animate({opacity:0}, {duration: 1600, easing: 'easeInOutExpo'});
	setTimeout(function(){
		$('.receiver1_content').hide();
		thisMovie('flashContents').receiverStart(receiveData.image_ori);
	}, 1600);
}

//플래시에서 호출됨
function setReceiverPostType(type){
	receiverPostType = type;
}
function setSenderPostType(type){
	senderPostType = type;
}


function readPost(){
	if(receiverPostType == "V"){
		$('.receiver2_h_content').show();
		
	}else if(receiverPostType == "H"){
		$('.receiver2_v_content').show();
	}
	
	setTimeout(function(){
		$('.receiver3_content').fadeTo(0,0).animate({opacity:1}, {duration: 1600, easing: 'easeInOutExpo'});
	}, 5000);
	
	
	
	var message = receiveData.message.replace(/(-_| )/g,"\n");
	
	
	if(receiverPostType == "H"){
	//가로 이미지
	
	
		$('.receiver2_v_img').html('');
		var img = '<img src="'+receiveData.image_ori+'" class="receiver2_v_img_item" alt="" />';
		
		$(img).load(function(e){

			$('.receiver2_v_img').append(img);
			
			var image = $('.receiver2_v_img_item');
			
			
			setImage(image, 290, 214);
		});		
		$('.receiver2_v_area textarea').val(message);
	
	
		
	}else if(receiverPostType == "V"){
	//세로 이미지
	
		$('.receiver2_h_img').html('');
		var img = '<img src="'+receiveData.image_ori+'" class="receiver2_h_img_item" alt="" />';
		
		$(img).load(function(e){

			$('.receiver2_h_img').append(img);
			
			var image = $('.receiver2_h_img_item');
			
			
			setImage(image, 270, 366);
		});	
		
		$('.receiver2_h_area textarea').val(message);
		
	
		
	}
	
	
	
	
	
}





var receiveData;

function getSeqNumber(){

	var num = parseInt(getURLParameter('num'));

	if(num > 0){
	
		$.ajax({
		    url : sitePath + "getuserinfo.jsp",
		    dataType : "jsonp",
		    data : {
		    	'num' : num
		    },
		    success : function(d){
		        
		    }
		});	
	}
	
}

getSeqComplete = function(data){
	receiveData = data;
	
	
	

	initReceiver();
}


function initReceiver(){

	$('.receiver1_title .from').html(receiveData.send_name);
	$('.receiver1_title .to').html(receiveData.receive_name);

	$('.receiver1_content').fadeTo(0,0).delay(1500).animate({opacity:1}, {duration: 1600, easing: 'easeInOutExpo'});
	
	
	
	
	
	
	
	
}


/*


$("#photoUploadForm").submit(function() {
					

	function showResponse(xml, statusText, xhr, $form)  { 	
		var obj = jQuery.parseJSON(xml);
		var result = obj.result;
		

		
	} 
	
	var options = {
		success:showResponse
    };
	
	$(this).ajaxSubmit(options);
	
	
	return false;
});

*/






function getURLParameter(name) {
	//if(getURLParameter('p') == 'event')
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}















