			function list_check()
			{
				var obj1 = document.getElementsByName("check_r[]"); 
				// üũ�ڽ� ��� ����
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
				// üũ�ڽ� ��� ����
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

// ���̺� �������� ���ְ� tr ������, �տø��� �����ϰ� css
$(document).ready(function(){
  $('.board_list tbody tr:odd').addClass('zebra');
  $('.board_list tbody tr:even').addClass('zebra_w');
  $('.board_list tbody tr').hover(function(){
    $(this).addClass('zebraHover');
  }, function(){
    $(this).removeClass('zebraHover');
  });;
});


// ���̺� �������� ���ְ� tr ������, Ŭ���ϸ� �����ϰ� css
$(document).ready(function(){
  $('#celebs tbody tr:even').addClass('zebra');
  $('#celebs tbody tr').click(function(){
    $(this).toggleClass('zebraHover');
  });
   $('#celebs tbody tr:last').css({
    'border-bottom': '1px solid red' 
  });
});

// ���̺� �������� ���ְ� tr ������ css
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

//news ���̾� ���̰� ����� toogle
$(function(){
	$('#toggleButton').click(function(){ //��ư input�� ID
		$('#news').toggle();
		 if($('#news').is(':visible')){
			$(this).val('�����'); //��ư�� value��
		 }else{
			$(this).val('���̱�')
		 };
	});
});

// �ΰ��� ��ư���� ���̾� ���̱� �����
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


//��ưŬ���� ���̾� ���̱� ���߱�
$(function(){
	$('<input type="button" value="���߱�" id="toggleButton">').insertAfter('#news');
	$('#toggleButton').click(function(){
		$('#news').toggle();
		if($('#news').is(':visible')){
			$('#toggleButton').val('���߱�');
		} else {
			$('#toggleButton').val('���̱�');
		}
	});
});


// ���̵� quick_rt ��������
$(function(){
	$(window).scroll(function(){
		$('#quick_rt')
			.stop()
			.animate({top: $(document).scrollTop()},'slow','easeOutBack');
	});
});
/*
 $(document).ready(function(){
  //1.href�Ӽ��߿� Ư�� �ܾ ���� ��ũ ã��(red����)
     $('a[href*="naver"]').addClass('red');
  
  //2.href�Ӽ��߿� com���� ������ �ܾ ã��(green����)
  $('a[href$="com"]').addClass('green');
  
  //3.href�Ӽ��߿� mailto�� �����ϴ� �ܾ� ã��(orange����)
  $('a[href^="mailto"]').addClass(orange);
  
  //4.��� a�±׿� ���� ���ֱ�
  $('a').css("textDecoration","none");
 });


/* scroll ���� ��� ���� /js/jScrollPane.js /js/jquery.mousewheel.js jScrollPane.css ���� �ʿ�
$(document).ready(function(){
  $('#fine_print').jScrollPane({ //���̵� fine_print�� ���󺯰�
    scrollbarWidth: 10,
    scrollbarMargin: 10,
    showArrows: false
  });
});
*/


// 5�� �������� �̹��� �����ϱ�
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


// div ���� /js/jquery.easing.1.3.js �ʿ� http://www.elaza.co.kr/jquery/code/chapter_03/07_bouncy_content_panes/
$(document).ready(function(){
  $( '#bio > div:first' ).show(); //ù��° div ������� �����ϱ�
  
  $('#bio h3').click(function() {
	$( '#bio > div' ).hide();  //��� div �ݱ�. �ش� �� �����ص���
    $(this).next().animate( 
	    {'height':'toggle'}, 'slow', 'easeOutBounce' //Ŭ���� div ����
    );
  });
});


//Ŭ���ϸ� õõ�� ������ �Ⱥ����� �ϰ� alert����
$(document).ready(function(){
  $('#toggleButton').click(function(){
    $('#disclaimer').slideToggle('slow', function(){
      alert('The slide has finished sliding!')
    });
  });
});


//���� �����Ű�� jquery.color.js �ʿ�
$(document).ready(function(){
  $('#disclaimer').animate({'backgroundColor':'red'}, 2000),
  $('#intro').animate({'backgroundColor':'blue'},300);
});


//h2Ŭ���� ��ü ȭ�� ������ overlay�� body�ٷ� ������ ��ġ ��Ű�� http://www.elaza.co.kr/jquery/code/chapter_04/01_lightbox/index.html
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


/*p�� h2�տ� ������ html�̳� ���� �����ϱ�
$(document).ready(function(){
  $('p').html('<img src="http://static.naver.net/www/u/2010/0611/nmms_215646753.gif">333');
  $('h2').text('5555555555555555555');
});


//div �ڿ� html�� �����ϱ�
$(function(){
	$('<b>11111111</b>').prependTo('#news');
	$('<div style="border-top:1px solid red;width:100%;"></div>').appendTo('#news, #intro');
});



//���������� ����� Ŭ���� �̹��� ���̾�� ����
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

/*�ε� �̹���. http://www.elaza.co.kr/jquery/js/preloadCssImages.jQuery_v5.js �ʿ�. http://elaza.co.kr/jquery/img/ajaxLoader.gif*/
$(document).ready(function() {
		jQuery.preloadCssImages();
		jQuery(".loadingPage").fadeOut(500);
		$().UItoTop({easingType: 'easeOutQuart' });
		
	});
	


