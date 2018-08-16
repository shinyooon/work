


$(document).ready(function(){
	$('#gnb li a').setButtonGnb(1);
	onlineSort(0);

	
/*
	$('.comment_textarea').focusin(function(){
	
		if(!isFocus){
			isFocus = true;
			$(this).val('');
			if(!isLogin){
				notLogin();
				return;
			}
			if(User.level == "0"){
				eventConfirm();
				return;
			}
		}
		
		
		
	});
*/
	

	
	
	if(ie){
	

	}else{
		
		$('.visual_container h3').fadeTo(0,0).css({'margin-left':80});
	
		$('.visual_container .visual_subject').fadeTo(0,0);
	}
	
	
	if(isFlash){
		
		
	
	}else{
		onLoopStart();
		$('.flash_container').html('<img src="'+imgServer+'/images/online/online_visual_bg.jpg" alt="" />');
	}
	
	
});

onLoopStart = function(){

		if(ie){
			
			$('.visual_container h3').show();
			$('.visual_container .visual_subject').show();
			
		}else{
			
			$('.visual_container h3').stop().delay(0).animate({'margin-left':0, opacity:1}, {duration:800, easing:"easeOutQuad"});
	
			$('.visual_container .visual_subject').stop().delay(0).animate({opacity:1}, {duration:800, easing:"easeOutQuad"});
			
		}

		

	

}
	

var isFocus = false;
var onlineListPage = 1;
var onlineLikeCheck = false;
var onlineSelectChoice = "";
var isLoad = false;


function loadOnlineMeetingList(){


	var data = {};
	
	if(onlineLikeCheck){
		data.viewLike = "yes";
	}
	
	if(onlineSelectChoice > 0){
		data.selectChoice = onlineSelectChoice;
	}

	data.page = onlineListPage;
	
	$.ajax({
		type: "POST",
		url: onlineBoardURL,
		data: data,
		dataType: 'jsonp'
	});
	
	
}


function onlineLike(){

	
	onlineLikeCheck = true;
	removeOnlineList();
	$('.theme_like').attr('src', 'images/online/theme_like_on.png');
	$('.theme_new').attr('src', 'images/online/sort_latest_off.png');
	loadOnlineMeetingList();
}


function onlineSortNew(){
	onlineLikeCheck = false;
	removeOnlineList();
	$('.theme_like').attr('src', 'images/online/theme_like_off.png');
	$('.theme_new').attr('src', 'images/online/sort_latest_on.png');
	loadOnlineMeetingList();
}

function onlineSort(selected){
	removeOnlineList();
	onlineListPage = 1;
	onlineSelectChoice = selected;
	
	var url = 'images/online/theme_on.png';
	var el = '<span class="theme_arrow"><img src="'+url+'" alt="" /></span>';
	$('.theme_arrow').remove();
	$('.theme_list a').eq(selected).append(el);
	
	loadOnlineMeetingList();

}

function onlineMeetingMoreList(){

	if(!isLoad){
		
		$('.like_icon a').eq(-1).focus();
	
		isLoad = true;
		onlineListPage++;
		loadOnlineMeetingList();
	}
	 
	
}

function removeOnlineList(){
	//$('.comment_list').html('');
}


var onlinePosNum = 1;// 좌우를 결정
onlineBoardComplete = function(data){

	
	if(data.result == "max"){
		
		alert("더이상 회의 이야기가 없습니다.");
		
	}else if(data.result == "success"){
		
		for (var i=0;i<data.obj.length;i++){
			onlinePosNum ++;
		
			var item = getListItem(data.obj[i], onlinePosNum);
			$('.comment_list').append(item);
			
			if(!ie){
				var obj = $('#'+$(item).attr('id'));
				if(i%2==0){
					obj.css({'margin-left':100});
				}else{
					obj.css({'margin-left':220})
				}
				obj.fadeTo(0,0).delay(500+i*70).animate({opacity:1, 'margin-left':160},{duration:1000, easing:"easeOutExpo"});
			}
			setUserProfile(data.obj[i], item, onlinePosNum);

			
		}

		onlineListAnimate();
		
	}
}

function onlineListAnimate(){
	
	//console.log($('.comment_list').height());
	
	var height = $('.comment_list').height(); 
	$('.comment_container').animate({'height':height+50},{duration:1000, easing:"easeInOutExpo", step:function(){
		resize();//footer 정렬을 위해서 리사이즈
	}, complete:function(){
		resize();//footer 정렬을 위해서 리사이즈
		isLoad = false;
	}});



}


function setUserProfile(obj, item, onlinePosNum){

	var seq = obj.boardSeq;
	var image = obj.image;
	var choice = obj.choice;
	
	
	var way = "";
	if(onlinePosNum % 2 == 0){
		way = "l";
	}else{
		way = "r";
	}
	
	
	
	
	
	var div = $('#user_profile_'+seq);
	
	
	
	if(Modernizr.csstransforms){
	
		var style;

		if(way == "l"){
			style = {'style':'width:23px;height:31px;position:absolute;left:85px;top:16px;-webkit-transform:skew(0deg, -22deg);-moz-transform:skew(0deg, -22deg);-ms-transform:skew(0deg, -22deg);-o-transform:skew(0deg, -22deg);transform:skew(0deg, -22deg);'};
		}else if(way == "r"){
			style = {'style':'width:23px;height:31px;position:absolute;left:47px;top:17px;-webkit-transform:skew(0deg, 22deg);-moz-transform:skew(0deg, 22deg);-ms-transform:skew(0deg, 22deg);-o-transform:skew(0deg, 22deg);transform:skew(0deg, 22deg);'};
		}
			
		var profile = '<img src="'+image+'" alt="프로필 사진"  id="user_profile_image_'+seq+'" />';
		div.append(profile);
		$('#user_profile_image_'+seq).attr(style);
	
	}else{
	
		var filename;
		var style;
		
		if(way == "l"){
			filename = "online_profile_left.swf";
			style = "margin-left:43px;";
		}else{
			filename = "online_profile_right.swf";
			style = "margin-left:30px;";
		}
	
		var container = '<div id="user_profile_box_'+seq+'"></div>';
		div.append(container);
	
		var params = {};
		params.allowScriptAccess = "always";
		params.allowFullScreen = "true";
		params.wmode = "transparent";
		var attributes = {};
		attributes.style = style;
		attributes.tabindex = "-1";
		swfobject.embedSWF(webServer + "/swf/"+filename+"?image="+image, "user_profile_box_"+seq, '100%', '100%', "10.0.0", null, null, params, attributes);
	}
			

	
	
}


function getScalePropertyLeft(){
	return '{"transformMatrix":{"a":1, "b":0, "c":0, "d":1, "tx":84, "ty":21, "skewY":-22}, "width":24, "height":32}';
	//return '{"x":33,"y":38,"width":"37","scaleX":.5,"scaleY":.5, "height":66, "transformMatrix":{"skewY":-22} }';
}
function getScalePropertyRight(){
	return '{"transformMatrix":{"a":1, "b":0, "c":0, "d":1, "tx":46, "ty":11, "skewY":22}, "width":24, "height":32}';
	//return '{"x":33,"y":38,"width":"37","scaleX":.5,"scaleY":.5, "height":66, "transformMatrix":{"skewY":-22} }';
}




function getListItem(obj, onlinePosNum){

	var location = imgServer;
	var name = obj.userName;
	var like = obj.likeCount;
	var date = obj.registerDate;
	var choice = obj.choice;
	var seq = obj.boardSeq;
	var content = obj.uContent;
	var image = obj.image;
	var id = obj.userID;
	
	var color = "";
	var alt = "";
	if(choice == "1"){
		color = "red";
		alt = "소상공인 돕기";
	}else if(choice == "2"){
		color = "yellow";
		alt = "다문화가정 후원";
	}else if(choice == "3"){
		color = "blue";
		alt = "세대 격차 줄이기";
	}else if(choice == "4"){
		color = "green";
		alt = "자연환경 돌보기";
	}
	
	var way = "";
	if(onlinePosNum % 2 == 0){
		way = "l";
	}else{
		way = "r";
	}
	
	
	
	var deleteBtn = "";
	if(User.id == id){
		deleteBtn = '<a href="javascript:onlineDeleteList('+seq+');"><img src="images/online/delete_btn.png" alt="삭제하기" /></a>';
	}
	
	
	
	var item = '';
	
	item += 	'<div class="comment_all comment_'+color+' comment_'+color+'_'+way+'" id="comment_'+seq+'" >';
	item += 		'<div class="user_icon" style="overflow:hidden;"><img src="' + location + '/images/online/' + color + '_icon_'+way+'.png" alt="" /><div id="user_profile_'+seq+'" class="user_profile" style="position:absolute;left:0;top:0;"></div></div>';
	item += 		'<div class="comment_section">';
	item += 			'<div class="comment_top"></div>';
	item += 			'<div class="comment_contents">';
	item += 				'<span class="arrow"></span>';
	item += 				'<div class="user_comment_theme"><img src="' + location + '/images/online/theme0' + choice + '_t.png" alt="'+alt+'" /></div>';
	item += 				'<div class="user_comment_contents">';
	item += 					'<div class="user_comment_contents_top">';
	item += 						'<div class="user_name">' + name + '</div>';
	item += 							'<div class="comment_like">';
	item +=									'<span class="like_icon">';
	item +=										'<a href="javascript:onlineLikeSubmit(' + seq + ');">';
	item +=											'<img src="' + location + '/images/online/like_icon.png" alt="좋아요" />';
	item +=										'</a>';
	item +=									'</span>';
	item +=									'<span class="like_num like_num_'+seq+'">' + like + '</span>';
	item +=								'</div>';
	item += 							'<span class="delete">'+deleteBtn+'</span>';
	item += 							'<span class="date">' + date + '</span>';
	item += 					'</div>';
	item += 					'<p class="desc">'+content+'</p>';
	item += 				'</div>';
	item += 			'</div>';
	item += 			'<div class="comment_bottom"></div>';
	item += 		'</div>';
	item += 	'</div>';

	return item;
	
	
}


function onlineDeleteList(seq){
	$.ajax({
		type: "POST",
		url: onlineDeleteURL,
		data: { board_seq:seq } ,
		dataType: 'jsonp'
	});

}

deleteComplete = function(data){
	
	if(data.result == "success"){
		
		alert("게시물이 삭제 되었습니다.");
		$('#comment_'+data.seq).hide();
		
		var hei = $('#comment_'+data.seq).height();
		
		
		$('.comment_container').height( $('.comment_container').height() - hei );
		
	}
}


function onlineMeetingSubmit(){

	var num = $(".comment_select").children("option:selected").val();
	var content = $('.comment_textarea').val();
	

	if(num == "0"){
		alert("회의안건을 선택해 주세요.");
		$('.comment_select').focus();
		return;
	}
	if(!isFocus || content == "" || trim(content)=="" || content.length < 20){
		alert("댓글을 20글자 이상 입력해 주세요.");
		$('.comment_textarea').focus();
		return;
	}
	
	content = content.replace(/\n/g," ");
	
	if(!inputCheckSpecial(content)){
		return;
	}


	$.ajax({
		type: "POST",
		url: onlineSubmitURL,
		data: { selectChoice:num, content:content } ,
		dataType: 'jsonp'
	});

	boardSubmitComplete = function(data){
		
		window.location.reload();
		
	}

	
}




function onlineLikeSubmit(seq){
	
	
	
	$.ajax({
		type: "POST",
		url: onlinelikeSubmitURL,
		data: { board_seq:seq } ,
		dataType: 'jsonp'
	});

}

likeComplete = function(data){
	
	if(data.result == "success"){
		
		$('.like_num_'+data.seq).html(data.likeTotalCount);
		
		
		
		
	} else if(data.result == "failed"){
		
	} else if(data.result == "already"){
		alert("이미 '좋아요'를 누르셨습니다.");
	} 
	
}
