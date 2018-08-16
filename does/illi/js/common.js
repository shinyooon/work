$(document).ready(function() {
	scrollTopBtn();
})



function scrollTopBtn(){
	$(".top_btn a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$("html, body").scrollTop(0);
	})
}


function checkAlert(){
	form = document.quiz_event_apply;

	if(form.user_name.value == ""){
		alert("이름을 입력해 주세요.");
		form.user_name.focus();
		return;
	}
	if(form.user_number.value == ""){
		alert("휴대전화번호를 입력해 주세요.");
		form.user_number.focus();
		return;
	}
	if(form.user_number.value.length<3){
		alert("휴대전화번호를 정확히 입력해 주세요.");
		form.user_number.focus();
		return;
	}
	if(form.user_number2.value == ""){
		alert("휴대전화번호를 입력해 주세요.");
		form.user_number2.focus();
		return;
	}
	if(form.user_number2.value.length<3){
		alert("휴대전화번호를 정확히 입력해 주세요.");
		form.user_number2.focus();
		return;
	}
	if(form.user_number3.value == ""){
		alert("휴대전화번호를 입력해 주세요.");
		form.user_number3.focus();
		return;
	}
	if(form.user_number3.value.length<4){
		alert("휴대전화번호를 정확히 입력해 주세요.");
		form.user_number3.focus();
		return;
	}
	if(form.user_addr.value == ""){
		alert("주소를 정확히 입력해 주세요.");
		form.user_addr.focus();
		return;
	}
	if(form.user_addr2.value == ""){
		alert("주소를 정확히 입력해 주세요.");
		form.user_addr2.focus();
		return;
	}
	if(form.user_addr3.value == "" ){
		alert("주소를 정확히 입력해 주세요.");
		form.user_addr33.focus();
		return;
	}
	if(form.user_addr4.value == ""){
		alert("주소를 정확히 입력해 주세요.");
		form.user_addr4.focus();
		return;
	}
	if(document.getElementById("disagree").checked){
		alert("개인정보 수집, 이용, 취급 위탁 동의 후 참여가 가능합니다.");
		document.getElementById("agree").focus();
		return;
	}
	location.href="review.html"
}
function fromReset(){
	form = document.quiz_event_apply;
	
	if (confirm("응모 기록이 초기화 됩니다.이벤트 응모를 중단하시겠습니까? ") == true  ) { 
		form.reset();
	}
	
}

function onlyNumber(event) {
	var key = window.event ? event.keyCode : event.which;    
	
	if(key == 9){
		return;
	}
	if ((event.shiftKey == false) && ((key > 47 && key < 58) || (key > 95 && key < 106)
	|| key  == 35 || key  == 36 || key  == 37 || key  == 39  // 방향키 좌우,home,end  
	|| key  == 8  || key  == 46 ) // del, back space
	) {
		return true;
	}else {
		return false;
	}    
};


function checkImgSet(){
	$(".quiz_ox .check a").click(function(e){
	})
}
/*function checkImg(){
	$(".quiz_ox .check a").toggle(function(){
		$(".quiz_ox .check a img").attr('src', 'images/event_check.png');
	}, function() {
		$(".quiz_ox .check a img").attr('src', 'images/event_uncheck.png');
	});
}*/

function zipcodPopupOpen(){
	$("section#find_zipcode").show();
}
function zipcodPopupClose(){
	$("section#find_zipcode").hide();
}

var step1Check = -1;
var step2Check = -1;
var step3Check = -1;

function quizCheck(step, _btnNum){
	if(_btnNum==1){
		$(".quiz"+step+"_1 .check a img").attr('src', 'images/event_check.png');
		$(".quiz"+step+"_2 .check a img").attr('src', 'images/event_uncheck.png');
	}else{
		$(".quiz"+step+"_1 .check a img").attr('src', 'images/event_uncheck.png');
		$(".quiz"+step+"_2 .check a img").attr('src', 'images/event_check.png');
		alert("오답 입니다!")
	}
	
	if (step ==1){
		step1Check = _btnNum;
	}
	else if(step ==2){
		step2Check = _btnNum;
	}
	else{
		step3Check = _btnNum;
	}
}

function resultFnc(){
	if(step1Check == -1 || step2Check == -1 ||step3Check == -1){
		alert("퀴즈문제를 모두 풀어주세요!");
	}else if(step1Check == 1 && step2Check == 1 && step3Check == 1){
		location.href="event_apply.html"
	}
	else {
		alert("정답을 입력해 주세요.");
	}
}

function findZipcode(){
	var dong = $("#search_zipcode").val();
	
	$.post("zipcode.jsp", { dong:dong })
		.done(function(data) {
		// console.log("data:::", data);
	 	 $(".zipcode_list").html(data);
		});
}

function setZipCode(_zipcode, _address){
	form = document.quiz_event_apply;
	$("section#find_zipcode").hide();
	var zipcodeArr = _zipcode.split("-");
	form.user_addr.value = zipcodeArr[0];
	form.user_addr2.value = zipcodeArr[1];
	form.user_addr3.value = _address;
	
}

