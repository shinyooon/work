var fId;
var youtubeArr = ["SBwcJEApoSo", "kpQP5EFzqU0"];
var domain = "https://dev.does.kr:446/2013/"; //does
var fPic;
//var domain = "https://local.sec.samsung.com/comLocal/event/"; //sds

if(domain.indexOf('dev.does.kr') == -1) document.domain = "samsung.com";


// Load the SDK asynchronously
(function(d){
var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/ko_KR/all.js";
	ref.parentNode.insertBefore(js, ref);
}(document));

/* facebook */
window.fbAsyncInit = function() {
	FB.init({
		appId			:'253144104840448',		// appId  //does:253144104840448   / sds:504856262945438
		status			: true,					// check login status
		cookie			: true,					// enable cookies to allow the server to access the session
		xfbml			: true					// parse XFBML
	});

	/* 좋아요 callback */
	FB.Event.subscribe ('edge.create', function (response) {
		$(".contents_wrap.main").css("display","none");
		$(".contents_wrap.apply").css("display","block");
	});
	
	/* 페이스북 로그인체크 */
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			FB.api('/me',{fields: "id,name,picture"}, function(response) {
				fId = response.id;
				fPic = response.picture.data.url;
			});
		}
	});
};

/* 페이스북 로그인 */
function fb_login() {
	FB.login(function(response) {
		if (response.authResponse) {
			FB.api('/me', function(response) {
				fId = response.id;
			});
		}
	},{scope: 'user_likes, publish_stream'});
};


$(document).ready(function(){
	init();

	$('.btn_pop_close , .btn_pop_cancle').click(function(){
		$.unblockUI();
	});

	$(".main_tab ul li").click(function(){
		var idx = $(this).index();
		$(".videoSrc").attr("src", "//www.youtube.com/embed/" + youtubeArr[idx]);

		actVideoMenu(idx);
	});

	/* 이벤트 응모하기 */
	$('.apply_btn a').click(function(){
		if(form.name.value && form.phone_01.value && form.phone_02.value && form.phone_03.value && form.postalcode.value){
			if($('#agree01').is(':checked') && $('#agree02').is(':checked')){
				formPost();
			}else{
				alert('개인정보 수집/이용 및 취급위탁에 동의해주셔야 이벤트에 참여가능합니다.');
			}
		}else{
			alert('빈칸을 모두 채워주세요');
		}
	});

	/* ========= 우편번호 검색 버튼 start ========= */
	$('.btn a').click(function(){
		var url = "https://local.sec.samsung.com/comLocal/as/zipCodeList.do?zipCode=postalcode&zipGaddr=address";
		window.open(url,'zipPopup','width=395, height=290, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0');
	});
	/* ========= 우편번호 검색 버튼 end ========= */

	/* ========= 공유하기 start ========= */
	$('.btn_share').click(function(){
		setTimeout(function(){
			window.scrollTo(0, 1);
		}, 0);
		$.blockUI({ message: $('.share_pop_area'),
			css:{top:'40px',
			marginLeft:'-148px'}
		});
		$('.face').find('img').attr('src',fPic);
	});
	/* ========= 공유하기 end ========= */

	/* ========= 공유하기 버튼 start ========= */
	$('.btn_pop_share').click(function(){
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				var msg = $('.text_area textarea').val();
				autoPostToFeed(msg);
			}else{
				fb_login();
			}
		});
	});
	/* ========= 공유하기 버튼 end ========= */
	 popupControl();
});

function actVideoMenu(idx){
	$(".main_tab ul li").each(function(i){
		var imgContents = $(".main_tab ul li").eq(i).children("h2").children("a").children("img");
		imgContents.attr("src", "images/main_tab"+(i+1)+".png");
		if(idx == i) imgContents.attr("src", "images/main_tab"+(i+1)+"_over.png");
	});
}

/* 초기화 */
function init(){
	insert_count();
	form = document.form;
};

function popup_open(){
	$(".popup_btn .btn");
}

/* 공유하기 */
function autoPostToFeed(msg){
	var obj = {
		method: 'feed',
		link: 'http://www.bubbleshotbook.com',
		picture: domain + '1312_bubbleshot3_mobile/images/feed_thumb.jpg',
		name: '2013 삼성전자 S데이 버블샷3 그림책 이벤트',
		caption: '세계적인 그림책 작가 10인이 들려주는 물 이야기를 감상하시고 이벤트에 참여하시면, 선착순 5,000분께 버블샷북(1인 2권)을 드립니다.',
		description: 'http://www.bubbleshotbook.com',
		message:msg
	};

	FB.api('/me/feed', 'post', obj, function(response){
		$.unblockUI();
		share_count();
		alert('공유되었습니다.');
	});
};

/* feed 보내기 */
function share_count(){
	$.ajax({
		type:'GET',
		url:domain + '1312_bubbleshot3/app/insert_feed_count_sds.jsp',
		success:function(data){
			//insert_count();
			$(".contents_wrap.main").css("display","none");
			$(".contents_wrap.apply").css("display","block");
		}
	});
};

/* feed 받기 */
function insert_count(){
	if(typeof $('.share_count') == 'undefined') return;
	$.ajax({
		type:'GET',
		url:domain + '1312_bubbleshot3/app/get_feed_count_sds.jsp',
		success:function(data){
			$('.share_count').html(data);
		}
	});
};

/* form 보내기 */
function formPost(){
	if(!fId){
		alert("이벤트 참여를 위해서는 앱 허용이 필요합니다.");
		location.href = "index.html";
		return;
	}

	var formData = {
		username: $('#name').val(),
		userphone: $('#phone_01').val()+$('#phone_02').val()+$('#phone_03').val(),
		fb_id: fId,
		zip_code: $('#postalcode').val(),
		addr1: $('#address').val(),
		addr2: $('#addr_02').val(),
		device: 'm'
	};

	postSendDB(domain + "1312_bubbleshot3/app/insert_sds.jsp", formData, true);

	tracker("MOBILE_ENTRY_BTN");
};

/* send db */
function closeIframe(result){
	if(result){
		alert('이벤트에 정상 응모되셨습니다.');
		location.href = domain + "1312_bubbleshot3_mobile/index.html";
	}else{
	}
}

function postSendDB(_url, _data, _isTarget){
	if (/MSIE/.test(navigator.userAgent)) {
		document.charset = 'euc-kr';
	}
				
	var postform = document.createElement("form");
	postform.setAttribute("name", "forms");
	postform.setAttribute("method", "post");
	postform.setAttribute("action", _url);

	if(_isTarget) {
		postform.setAttribute("target", "iframe1");
	}
	postform.setAttribute("accept-charset", "euc-kr");

	for(var key in _data) {
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", key);
		hiddenField.setAttribute("value", _data[key]);
		postform.appendChild(hiddenField);
	}

	/*submit*/
	document.body.appendChild(postform);
	postform.submit();
	document.body.removeChild(postform);
};

var liIdx = 0;
function popupControl(){
	popupOpen();
	popupClose();
	writerIntro();
	bookControl();
}
function popupOpen(){
	$(".popup_btn li .btn").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		liIdx = $(this).parent().index();
		$(this).parent().children(".popup").css("display", "block")
		$(this).focus();
	})
}
function popupClose(){
	$(".popup_btn li .popup_close_btn a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$(".popup").css("display", "none");
		$(this).parents("li").children(".btn").focus();
	})
}
var index = 0;
function writerIntro(){
	$(".wirter_contents li").eq(0).css("display", "block");
	$(".writer .popup_arrow .arrow_r").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		if(index==9)index=-1;
		index ++;
		$(".wirter_contents li").each(function(){
			$(".wirter_contents li").css("display","none");
		});
		$(".wirter_contents li").eq(index).fadeIn(500);
	});
	$(".writer .popup_arrow .arrow_l").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		if(index==0) index=10;
		index --;
		$(".wirter_contents li").each(function(){
			$(".wirter_contents li").css("display","none");
		});
		$(".wirter_contents li").eq(index).fadeIn(500);
	});
}
function bookControl(){
	$(".book_img li").eq(0).css("display", "block");
	$(".book .arrow_r").click(function(e){
		e.stopPropagation();
		e.preventDefault();

			$(".book .arrow_r").hide();
			$(".book .arrow_l").show();
		$(".book_img li").each(function(){
			$(".book_img li").css("display","none");
		});
		$(".book_img li").eq(1).fadeIn(500);
	});
	$(".book .arrow_l").click(function(e){
		e.stopPropagation();
		e.preventDefault();

			 $(".book .arrow_l").hide();
			 $(".book .arrow_r").show();
		$(".book_img li").each(function(){
			$(".book_img li").css("display","none");
		});
		$(".book_img li").eq(0).fadeIn(500);
	});
}
