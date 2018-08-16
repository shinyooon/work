 $(document).ready(function(){
	
	 $("ul.menu_list li.sub").click(function(){
 		  $(this).next("li.sub_list").slideToggle("slow").siblings("li.sub_list:visible").slideUp("slow");
          $(this).toggleClass("current");
          $(this).siblings("li.sub").removeClass("current");
		  return false;
     });

	 $("#paging span").last().css("background","none");

	  // 비밀번호변경 레이어 열기
	$('#password').click(function(e) {
		$('<div id="overlay" ></div>')
		  .css('opacity', '0')
		  .animate({'opacity': '0.6'}, 'slow')
		  .appendTo('body');
		
		$('.pass_wrap').show();
		return false;
	  });
	
	// 비밀번호변경 레이어 닫기
	$('#btn_close').click(function(e) {
		$('#overlay, .pass_wrap').fadeOut('slow', function() {
		  $('#overlay, .pass_wrap').hide();
		});
	  });


	
});

	

	
