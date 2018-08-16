$(document).ready(function(){
	
	popupControl();
	applyControl();
	
});

function openDownload(){
	window.open('download.html','','width=780, height=570, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0');
}


function openApplyForm(){
	$('.popup.apply_form').show();
}


function popupControl(){
	popupClose();
	subpopupClose();
	popupOpen();
	subpopupOpen();
	downloadOpen();
}

function popupClose(){
	$(".popup .close_btn").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$(this).parent(".popup").hide();
	});
}

function subpopupClose(){
	$(".sub_popup .sub_close").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$(this).parent(".sub_popup").hide();
	});
}

function popupOpen(){
	$(".popup_btn").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$(this).siblings(".popup").show();
	});
}
function subpopupOpen(){
	$(".sub_btn").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$(this).siblings(".sub_popup").show();
	});
}

function downloadOpen(){
	$(".purchase_list .download a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$(".sub_popup.my_list_contents").show();
	});
}
function applyControl(){
	$(".btn_submit").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$(".step1").hide();
		$(".step2").show(); 
	});
}
