var selectAnimalNum = 0;

$(function() {
	var $allVideos = $("iframe[src^='http://www.youtube.com']"),$fluidEl = $(".about_vedio_inner");
	$allVideos.each(function() {
		$(this).data('aspectRatio', this.height / this.width).removeAttr('height').removeAttr('width');
	});
	$(window).resize(function() {
		var newWidth = $fluidEl.width()*1.0	
		$allVideos.each(function() {
			var $el = $(this);
			$el.width(newWidth).height(parseInt(newWidth * $el.data('aspectRatio')));
		});
	}).resize();
});

$(document).ready(function() {
	var titletextStr=encodeURIComponent("로스트 밸리 사파리 어드벤처");
	var textStr=encodeURIComponent("세계 최초, 수륙양용차로 즐기는 사파리 체험!\n로스트밸리 사파리 어드벤처를 탐험해보세요.");
	var imgurl="http://www.everland.com/web/lostvalley/images/facebook.jpg";
	$(".facebook a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		window.open("http://m.facebook.com/sharer.php?u=http://www.everland.com/web/lostvalley/");
	});
	$(".twitter a").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			window.open("https://twitter.com/intent/tweet?text="+textStr+"&url=http://www.everland.com/web/lostvalley/");
	});


	$(".menu_btn").toggle(function() {
		$("#gnb").slideDown(200);
	}, function() {
	$("#gnb").slideUp(200);
	});
	//alert($(window).width());

	var cnt = 0;
	$(".book .next").click(function(e){
		e.stopPropagation();
		e.preventDefault();	
		if(cnt<41){
		cnt++;
		$(".book_img img").attr('src','images/storybook/'+cnt+'.jpg' );}
	});
	
	$(".book .prev").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		if(cnt>0){		
		cnt--;
		$(".book_img img").attr('src','images/storybook/'+cnt+'.jpg' );}
	});
	
	$(".note_view_btn").toggle(function(){
		$(".note_view_btn img").attr('src', 'images/note/animal_desc_btn_over.png');
		$(".note_view_btn img").attr('alt', '동물 설명 보기');
		$(".note_view_animal_text").css('display','block');
	}, function() {
		$(".note_view_btn img").attr('src', 'images/note/animal_desc_btn.png');
		$(".note_view_btn img").attr('alt', '동물 사진 보기');
		$(".note_view_animal_text").css('display','none');		
	});

	$(".animal_btn li a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$(".animal_btn li").css("background-image", "url(images/note/animal_bg.png)"); 
		$(this).parent().css("background-image", "url(images/note/animal_bg_on.png)"); 
		selectAnimalNum = $(this).parent().index()+1;
	});

	$(".save a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		note_submit();
	});

  loginSet();

	$(".join").click(function(e){
		location.href = "https://www.everland.com/service/mobile/member/joinIndex.el";
    //alert("PC웹에서 회원가입 후 로그인 하실 수 있습니다.");
	});

  $.getJSON('/service/event/getTime.jsp', function(data){
    var time = data.time;
    if (parseInt(time) >= 2013042010) {
        $('#tvc2').show();
        $('#show1').show();
        $('#show2').show();
    }
  });
});

/* LOGIN SETTING */
var isLogin = "N";
function loginSet(){
	$.getJSON('/service/event/login_check.jsp?dummy=' + Math.random(), function(data){	
		isLogin = data.isLogin;

		if (isLogin == "Y") {
      $(".login a img").attr('src',$(".login a img").attr('src').replace("login.png", "logout.png"));
      $(".join").hide();
    }
  });

	$(".login").click(function(e){
			e.stopPropagation();
			e.preventDefault();
		  if (isLogin == "Y") {
        $.getJSON('/service/mobile/member/logoutProc.el', function(data){
          if (data.success) {
            location.replace("index.html");
          } else {
            location.replace("/service/mobile/member/login.el?returnUrl="+escape(document.URL));
          }
        });
		  } else {
  			location.replace("/service/mobile/member/login.el?returnUrl="+escape(document.URL));
		  }
	});
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
    url: "/service/mobile/lost/lostValleyStdInsProc.el",
    dataType : 'json',
    success : function(data){
      if (data.success) {
        alert("등록되었습니다.");
        location.replace("/service/mobile/lost/lostValleyMyStdList.el");
      } else {
var message = data.message;
  /*
if (message == "이미지 확장자는 jpg, jpeg, png만 가능합니다.")
{
message = "이미지 확장자는 jpg, jpeg만 가능합니다.";
}
*/
        alert(message);
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
    window.open("http://m.facebook.com/sharer.php?u="+encodeURIComponent(url));
//		window.open("http://www.facebook.com/share.php?u="+encodeURI(url)+"&t="+encodeURI(title));
	}
}

function getNowDateStrTime() {
  var _date = new Date();
  var _year = _date.getFullYear();
  var _month = ""+ (_date.getMonth() + 1);
  var _day = "" + _date.getDate();
  var _hour = "" + _date.getHours();
  if (_month.length == 1 )
  {
    _month = "0" + _month;
  }

  if (_day.length == 1 )
  {
    _day = "0" + _day;
  }

  if (_hour.length == 1 )
  {
    _day = "0" + _hour;
  }

  var nowDate = "" + _year + _month + _day + _hour;

  return nowDate;
}