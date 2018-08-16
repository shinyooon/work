var fId;
var youtubeArr = ["SBwcJEApoSo", "kpQP5EFzqU0"];
var domain = "https://dev.does.kr:446/2013/"; //does
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
		location.href = domain+'1312_bubbleshot3_mobile/index.html';
	});

	FB.Event.subscribe ('edge.remove', function (response) {
		location.href = domain+'1312_bubbleshot3_mobile/index.html';
	});

	
	/* 페이스북 로그인체크 */
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			FB.api('/me', function(response) {
				fId = response.id;
				FB.api({
					method:     'fql.query',											/*sds:311785955591634    does:108902469220606 */
					query:  'SELECT page_id FROM page_fan WHERE uid='+fId+' AND page_id=311785955591634'}, function(resp) {
						if (resp.length) {
							$('.wrap_bg').hide();
							$('.like_txt').hide();
						} else {
							$('.wrap_bg').show();
							$('.like_txt').show();
						}

						$(".login").hide();
						$(".like").show();
						//$(".like_txt").show();
						$(".like_txt img").attr("src", "images/like_txt.png");
					}
				);
			});
		}else{
			$(".login").show();
			$(".like").hide();
			$(".like_txt").show();
			$(".like_txt img").attr("src", "images/login_text.png");
		}
	});
};

/* 페이스북 로그인 */
function fb_login() {
	FB.login(function(response) {
		if (response.authResponse) {
			
			/*$(".login").hide();
			$(".like").show();

			FB.api('/me', function(response) {
				fId = response.id;
				FB.api({
					method:     'fql.query', 
					query:  'SELECT page_id FROM page_fan WHERE uid='+fId+' AND page_id=311785955591634'}, function(resp) {
						if (resp.length) {
							$('.wrap_bg').hide();
							$('.like_txt').hide();
						} else {
							$('.wrap_bg').show();
							$('.like_txt').show();
						}
					}
				);
			});*/

			location.href = "index.html";
		}
	},{scope: 'user_likes, publish_stream'});
};