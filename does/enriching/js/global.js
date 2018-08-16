

document.domain = 'talkypool.cafe24.com';



function checkLoginId(obj){
	
	if($(obj).val() == ""){
		alert("아이디를 입력해 주세요.");
		$(obj).focus();
		return false;
	}
	
	return true;
}

function checkLoginPassword(obj){
	if($(obj).val() == ""){
		alert("비밀번호를 입력해 주세요.");
		$(obj).focus();
		return false;
	}
	
	return true;
}


function checkUserName(obj){
	
	
	if($(obj).val() == ""){
		alert("이름을 입력해 주세요.");
		$(obj).focus();
		return false;
	}
	
	
	return true;
	
}
function checkPhone(obj1, obj2, obj3){
	
	
	if($(obj1).val() == ""){
		alert("전화번호 첫째자리를 입력해 주세요.");
		$(obj1).focus();
		return false;
	}
	if($(obj2).val() == ""){
		alert("전화번호 둘째자리를 입력해 주세요.");
		$(obj2).focus();
		return false;
	}
	if($(obj3).val() == ""){
		alert("전화번호 셋째자리를 입력해 주세요.");
		$(obj3).focus();
		return false;
	}

	
	
	return true;
	
}
function checkAuthPhone(obj1, obj2, obj3, btn){
	
	
	if($(obj1).val() == "" || $(obj2).val() == "" || $(obj3).val() == "" ){
		$(btn).focus();
		alert("휴대폰 인증을 해주세요.");
		return false;
	}
	
	
	return true;
	
}
function checkId(obj){
	
	
	if($(obj).val() == ""){
		alert("아이디를 입력해 주세요.");
		$(obj).focus();
		return false;
	}
	
	var uid = $(obj).val();
	if(!/^[a-zA-Z0-9]{4,10}$/.test(uid)){ 
        alert('아이디는 숫자와 영문자 조합으로 4~10자리를 사용해야 합니다.'); 
        return false;
    }
	var chk_num = uid.search(/[0-9]/g); 
    var chk_eng = uid.search(/[a-z]/ig);
    if(chk_eng < 0){ 
        alert('아이디는 숫자와 영문자를 사용하여야 합니다.'); 
        return false;
    }
	
	
	return true;
	
}
function checkPassword(obj, obj2){
	
	
	if($(obj).val() == ""){
		alert("비밀번호를 입력해 주세요.");
		$(obj).focus();
		return false;
	}
	
	
	
	var upw = $(obj).val();
	
	if(!/^[a-zA-Z0-9!@\#$%^&*\()\-=+_']{6,12}$/.test(upw)){ 
        alert('비밀번호는 숫자, 영문자와 특수문자를 혼용해 6~12자리를 사용해야 합니다.'); 
        return false;
    }
  
    var chk_num = upw.search(/[0-9]/g); 
    var chk_eng = upw.search(/[a-z]/ig);
    
    if(chk_num < 0 || chk_eng < 0){ 
    	
        alert('비밀번호는 숫자와 영문자를 혼용하여야 합니다.'); 
        return false;
    }
    
    if($(obj2).val() == ""){
		alert("동일한 비밀번호를 한번 더 입력해 주세요.");
		$(obj2).focus();
		return false;
	}
	
	if($(obj).val() != $(obj2).val()){
		alert("비밀번호 확인칸과 동일한 비밀번호를 입력해 주세요.");
		$(obj2).focus();
		return false;
	}
	
	
	return true;
	
}
function checkAgree(obj, n){
	
	if($(obj).val() == "n"){
	
		if(n == 1){
			alert("개인정보 수집에 동의해 주세요.");
		}else if(n == 2){
			alert("개인정보 취급위탁에 동의해 주세요.");
		}

		$(obj).focus();
		return false;
	}
	return true;
	
}


function fnCheckUserId(uid){
    if(!/^[a-zA-Z0-9]{4,10}$/.test(uid))
    { 
        alert('아이디는 숫자와 영문자 조합으로 4~10자리를 사용해야 합니다.'); 
        return false;
    }
	var chk_num = uid.search(/[0-9]/g); 
    var chk_eng = uid.search(/[a-z]/ig);
    if(chk_eng < 0)
    { 
        alert('아이디는 숫자와 영문자를 사용하여야 합니다.'); 
        return false;
    }
    

    return true;
}

function fnCheckPassword(uid, upw){
    if(!/^[a-zA-Z0-9!@\#$%^&*\()\-=+_']{6,12}$/.test(upw))
    { 
        alert('비밀번호는 숫자, 영문자와 특수문자를 혼용해 6~12자리를 사용해야 합니다.'); 
        return false;
    }
  
    var chk_num = upw.search(/[0-9]/g); 
    var chk_eng = upw.search(/[a-z]/ig);
    var chk_spe = upw.search(/[!@\#$%^&*\()\-=+_']/ig);
    
    if(chk_num < 0 || chk_eng < 0)
    { 
    	
        alert('비밀번호는 숫자와 영문자를 혼용하여야 합니다.'); 
        return false;
    }
    
/*
    if(/(\w)\1\1\1/.test(upw))
    {
        alert('비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.'); 
        return false;
    }
*/
/*
    if(upw.search(uid)>-1)
    {
        alert('ID가 포함된 비밀번호는 사용하실 수 없습니다.'); 
        return false;
    }
*/

    return true;
}


/*공백 사용 제거*/
function trim(strSource)  {
	var re = /^\s+|\s+$/g;
	return strSource.replace(re, '');
}
/*
 if(name=="" || trim(name)==""){}
*/
/*특수문자사용못하게*/
 function inputCheckSpecial(str){
	var strobj = str;
	//alert(strobj);
	var re = /[@\#$%^&*\()\=+_']/gi;
	if(re.test(strobj)){
		alert("특수문자는 입력하실수 없습니다.");
		return false;
	}
	return true;
}
 
/*
if(!inputCheckSpecial(name))return;
*/

// ------------------------------------------------------ Others ------------------------------------------------------





var PCC_window; 

function openPCCWindow(){ 
    var PCC_window = window.open('', 'PCCV3Window', 'width=430, height=560, resizable=1, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200' );

    if(PCC_window == null){ 
		 alert(" ※ 윈도우 XP SP2 또는 인터넷 익스플로러 7 사용자일 경우에는 \n    화면 상단에 있는 팝업 차단 알림줄을 클릭하여 팝업을 허용해 주시기 바랍니다. \n\n※ MSN,야후,구글 팝업 차단 툴바가 설치된 경우 팝업허용을 해주시기 바랍니다.");
    }

    document.reqPCCForm.action = 'https://pcc.siren24.com/pcc_V3/jsp/pcc_V3_j10.jsp';
    document.reqPCCForm.target = 'PCCV3Window';
	document.reqPCCForm.submit();


}	

$.fn.setButtonGnb = function(num) {
//num: 활성화 버튼, retain: 유지유무, 
	
	

	for (var i=0;i<5;i++){
		$('#gnb li a').eq(i).data("index", i).mouseenter(function(){
		
			var i = $(this).data("index");
			
			
			
			if(chk){
				setObject(i, true);
			}else{
				setObject(i, false);
				chk = true;
			}
			
		});
	}
	
	$('#gnb').mouseleave(function(){
		if(num > -1){
			setObject(num, true);
		}else{
			chk = false;
			$('.move_bar').stop().animate({bottom:-3},{duration:200, easing:"easeOutQuad"});
		}
		
	});
	//$('#gnb li a').eq(num).trigger('mouseenter');	
	
	if(num > -1){
		setObject(num, false);
		var chk = true;
	}else{
		var chk = false;
	}
	
	function setObject(i, animate){
		
		$('.move_bar').show();
		
		var obj;
	
		if(i == 0){
			obj = {left:5, width:112};
		}else if(i == 1){
			obj = {left:157, width:113};
		}else if(i == 2){
			obj = {left:310, width:125};
		}else if(i == 3){
			obj = {left:475, width:110};
		}else if(i == 4){
			obj = {left:626, width:110};
		}
			
		if(animate){
			$('.move_bar').stop().animate(obj,{duration:400, easing:"easeOutQuad"});
		}else{
			$('.move_bar').css(obj);
			$('.move_bar').stop().animate({bottom:0},{duration:200, easing:"easeOutQuad"});
		}
		
		
	}
	
	

};

$.fn.setImgButton = function(num, retain, leave) {
//num: 활성화 버튼, retain: 유지유무, 
       var items = $(this);
       
 
       items.each(function(index){
	       	if(this.index > -1){
		       	this.img.attr('src', this.off);
		    }else{
				this.index = index;
				this.img = $(this).find('img');
				this.off = this.img.attr('src');
				this.on = this.img.attr('src').replace('.png', '_over.png');
			 }
             
			$(this).bind('mouseenter', function(){
				this.img.attr('src', this.on);
			});
			$(this).bind('mouseleave', function(){
				if($(this).is('.active'))return;
				this.img.attr('src', this.off);
			});
			
			$(this).bind('click', function(){
				if(retain){
					if(!leave)items.eq(num).removeClass('active').trigger('mouseleave');
					$(this).addClass('active').trigger('mouseenter');
					num = index;
				}
			});
		});
			
		if(num > -1){
			items.eq(num).trigger('click');
		}
};

$.fn.setImgButton2 = function(num) {
       var items = $(this);
     

       items.each(function(index){


			this.img = $(this).find('img');
			this.off = this.img.attr('src');
			this.on = this.img.attr('src').replace('_off', '_on');
			
             
			$(this).bind('mouseenter', function(){
				this.img.attr('src', this.on);
			});
			$(this).bind('mouseleave', function(){
				if($(this).is('.active'))return;
				this.img.attr('src', this.off);
			});
			$(this).bind('click2', function(){

				items.eq(num).removeClass('active').trigger('mouseleave');
				$(this).addClass('active').trigger('mouseenter');
				num = index;

			});
		});
			

};
function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName]
    }
    else {
        return document[movieName]
    }
}

function getURLParameter(name) {
     //if(getURLParameter('p') == 'event')
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}


function getInternetExplorerVersion() {   
     var rv = -1; // Return value assumes failure.   
     if (navigator.appName == 'Microsoft Internet Explorer') {       
          var ua = navigator.userAgent;       
          var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");       
          if (re.exec(ua) != null)           
              rv = parseFloat(RegExp.$1);   
         }   
     return rv;
}

function getIE(){
	
	var n = getInternetExplorerVersion();
	
	if(-1 < n && n < 9){
		return true;
	}else{
		return false;
	}
	
}










