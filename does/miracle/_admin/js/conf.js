			function list_check()
			{
				var obj1 = document.getElementsByName("check_r[]"); 
				// 체크박스 모두 선택
				if(list_f.check_l_ck.checked){
					for(var i=0; i<obj1.length; i++){ 
						obj1[i].checked = true; 
					}
				}
				else{
					for(var i=0; i<obj1.length; i++){ 
						obj1[i].checked = false; 
					}
				}
			}

			function list_all_check()
			{
				var obj1 = document.getElementsByName("check_r[]"); 
				// 체크박스 모두 선택
					for(var i=0; i<obj1.length; i++){ 
						obj1[i].checked = true; 
					}
			}

			function list_check_ok()
			{
				var checkbox_v = 1;
					var obj1 = document.getElementsByName("check_r[]"); 
					for(var i=0; i<obj1.length; i++){ 
						if(obj1[i].checked) checkbox_v = 2;          
					} 
					if(checkbox_v!=2){
						alert('CLICK CHECKBOX');
						return false;
					}
					else return true;
			}

// 테이블 마지막줄 선넣고 tr 번갈아, 손올리면 색변하게 css
$(document).ready(function(){
  $('.board_list tbody tr:odd').addClass('zebra');
  $('.board_list tbody tr:even').addClass('zebra_w');
  $('.board_list tbody tr').hover(function(){
    $(this).addClass('zebraHover');
  }, function(){
    $(this).removeClass('zebraHover');
  });;
});


// 테이블 마지막줄 선넣고 tr 번갈아, 클릭하면 색변하게 css
$(document).ready(function(){
  $('#celebs tbody tr:even').addClass('zebra');
  $('#celebs tbody tr').click(function(){
    $(this).toggleClass('zebraHover');
  });
   $('#celebs tbody tr:last').css({
    'border-bottom': '1px solid red' 
  });
});

// 테이블 마지막줄 선넣고 tr 번갈아 css
$(document).ready(function(){
  $('#celebs tbody tr:odd').css({
    'background-color': '#dddddd', 
    'color': '#666666',
    'font-size': '11pt',
    'line-height': '2.5em' 
  });
	 $('#celebs tbody tr:last').css({
    'border-bottom': '1px solid red' 
  });
});

//news 레이어 보이게 숨기기 toogle
$(function(){
	$('#toggleButton').click(function(){ //버튼 input의 ID
		$('#news').toggle();
		 if($('#news').is(':visible')){
			$(this).val('숨기기'); //버튼의 value값
		 }else{
			$(this).val('보이기')
		 };
	});
});

// 두개의 버튼으로 레이어 보이기 숨기기
$(document).ready(function() {
	$('#hideButton').click(function(){
			$('#intro').hide();
	});
});
$(function() {
	$('#showButton').click(function(){
		$('#intro').show();
	});
});


//버튼클릭시 레이어 보이기 감추기
$(function(){
	$('<input type="button" value="감추기" id="toggleButton">').insertAfter('#news');
	$('#toggleButton').click(function(){
		$('#news').toggle();
		if($('#news').is(':visible')){
			$('#toggleButton').val('감추기');
		} else {
			$('#toggleButton').val('보이기');
		}
	});
});


// 아이디 quick_rt 날개베너
$(function(){
	$(window).scroll(function(){
		$('#quick_rt')
			.stop()
			.animate({top: $(document).scrollTop()},'slow','easeOutBack');
	});
});
/*
 $(document).ready(function(){
  //1.href속성중에 특정 단어가 들어가는 링크 찾기(red적용)
     $('a[href*="naver"]').addClass('red');
  
  //2.href속성중에 com으로 끝나는 단어를 찾기(green적용)
  $('a[href$="com"]').addClass('green');
  
  //3.href속성중에 mailto로 시작하는 단어 찾기(orange적용)
  $('a[href^="mailto"]').addClass(orange);
  
  //4.모든 a태그에 밑줄 없애기
  $('a').css("textDecoration","none");
 });


/* scroll 색상 모양 변경 /js/jScrollPane.js /js/jquery.mousewheel.js jScrollPane.css 세개 필요
$(document).ready(function(){
  $('#fine_print').jScrollPane({ //아이디 fine_print의 색상변경
    scrollbarWidth: 10,
    scrollbarMargin: 10,
    showArrows: false
  });
});
*/


// 5초 간격으로 이미지 변경하기
$(document).ready(function(){
  slideShow();
  $('#photos .show')
});
function slideShow() {
  var current = $('#photos .show');
  var next = current.next().length ? current.next() : current.parent().children(':first');
  
  current.hide().removeClass('show');
  next.fadeIn('slow').addClass('show');
  
  setTimeout(slideShow, 5000);
}


// div 열기 /js/jquery.easing.1.3.js 필요 http://www.elaza.co.kr/jquery/code/chapter_03/07_bouncy_content_panes/
$(document).ready(function(){
  $( '#bio > div:first' ).show(); //첫번째 div 열어놓고 시작하기
  
  $('#bio h3').click(function() {
	$( '#bio > div' ).hide();  //모든 div 닫기. 해당 줄 삭제해도됨
    $(this).next().animate( 
	    {'height':'toggle'}, 'slow', 'easeOutBounce' //클릭된 div 열기
    );
  });
});


//클릭하면 천천히 보였다 안보였다 하고 alert띄우기
$(document).ready(function(){
  $('#toggleButton').click(function(){
    $('#disclaimer').slideToggle('slow', function(){
      alert('The slide has finished sliding!')
    });
  });
});


//배경색 변경시키기 jquery.color.js 필요
$(document).ready(function(){
  $('#disclaimer').animate({'backgroundColor':'red'}, 2000),
  $('#intro').animate({'backgroundColor':'blue'},300);
});


//h2클릭시 전체 화면 불투명 overlay를 body바로 다음에 위치 시키기 http://www.elaza.co.kr/jquery/code/chapter_04/01_lightbox/index.html
$(document).ready(function(){
  $('h2:first').click(function(e) {
    $('body').css('overflow-y', 'hidden'); // hide scrollbars!
    $('<div id="overlay"></div>')
      .css('top', $(document).scrollTop())
      .css('opacity', '0')
      .animate({'opacity': '0.5'}, 'slow')
      .appendTo('body');
  });
});


/*p나 h2앞에 임의의 html이나 글자 삽입하기
$(document).ready(function(){
  $('p').html('<img src="http://static.naver.net/www/u/2010/0611/nmms_215646753.gif">333');
  $('h2').text('5555555555555555555');
});


//div 뒤에 html을 삽입하기
$(function(){
	$('<b>11111111</b>').prependTo('#news');
	$('<div style="border-top:1px solid red;width:100%;"></div>').appendTo('#news, #intro');
});



//갤러리에서 썸네일 클릭시 이미지 레이어로 띄우기
$(document).ready(function(){
  $('a.lightbox').click(function(e) {
    $('body').css('overflow-y', 'hidden'); // hide scrollbars!
    $('<div id="overlay"></div>')
      .css('top', $(document).scrollTop())
      .css('opacity', '0')
      .animate({'opacity': '0.5'}, 'slow')
      .appendTo('body');
    $('<div id="lightbox"></div>')
      .hide()
      .appendTo('body');
    $('<img />')
      .attr('src', $(this).attr('href'))
      .load(function() {
        positionLightboxImage();
      })
      .click(function() {
        removeLightbox();
      })
      .appendTo('#lightbox');
    return false;;
  });
});

function positionLightboxImage() {
  var top = ($(window).height() - $('#lightbox').height()) / 2;
  var left = ($(window).width() - $('#lightbox').width()) / 2;
  alert(top);
   alert(left);
  $('#lightbox')
    .css({
      'top': top + $(document).scrollTop(),
      'left': left
    })
    .fadeIn();
}

function removeLightbox() {
  $('#overlay, #lightbox')
    .fadeOut('slow', function() {
      $(this).remove();
      $('body').css('overflow-y', 'auto'); // show scrollbars!
    });
}

/*로딩 이미지. http://www.elaza.co.kr/jquery/js/preloadCssImages.jQuery_v5.js 필요. http://elaza.co.kr/jquery/img/ajaxLoader.gif*/
$(document).ready(function() {
		jQuery.preloadCssImages();
		jQuery(".loadingPage").fadeOut(500);
		$().UItoTop({easingType: 'easeOutQuart' });
		
	});
	


