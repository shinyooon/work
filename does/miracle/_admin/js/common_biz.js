function comReadURLImage(input,presrc) {
   	if (input.files && input.files[0]) {
 		var reader = new FileReader();
		reader.onload = function (e) {
			$('#'+presrc).attr('src', e.target.result);
  		};
		reader.readAsDataURL(input.files[0]);
	}
}
function comCheckNull(objName,alertMsg,bFocus){
	var obj = $(objName);
	var ret = true;
	if( bFocus == undefined){
		bFocus = true;
	}
	if(obj != undefined){
		if( obj.val() == ""){		
			ret = true;
		}else{
			ret = false;
		}
	}else{
		ret = true;
	} 
	
	if( ret == true){
		if( alertMsg != undefined && alertMsg != "" ){
			alert(alertMsg);
			if( bFocus ){
				obj.focus();
			}
		}
	}
	return ret;
	
}



function comSetRadioValue(name,value){
 	comSetValue("radio",name,value);
}
function comSetTextValue(name,value){
	comSetValue("text",name,value);
}
function comSetTextAreaValue(name,value){
	comSetValue("textarea",name,value);
}
function comSetSelectBoxValue(name,value){
	comSetValue("selectbox",name,value);
}
function comSetCheckBoxValue(name,value){
	comSetValue("checkbox",name,value);
}
function comSetValue(type,name,value){
	switch(type){
	case "radio":
		$("input[name=\""+name+"\"][value=\""+value+"\"]").attr("checked","checked");
		break;
	case "selectbox":
		$("select[name="+name+"]").val(value);
		break;		
	case "checkbox":
		$("input[name="+name+"][value="+value+"]").attr("checked","checked");
		break;	
	case "text":
		$("input[name="+name+"]").val(value);
		break;	
	case "textarea":
		$("textarea[name="+name+"]").val(value);
		break;	
	}	
 }

function comMaskDate(dateObj,msg ){
	dateObj.datepicker({
		dateFormat: "yy-mm-dd"
		,showOtherMonths: true
		,selectOtherMonths: true
		//,numberOfMonths: 3
		,showButtonPanel: true
		,regional:"kr"
 		
	});
	
	 
	dateObj.change(function(){
		var v = $(this).val();
		v=v.replace(/[-_]/gi, '');
 		if( v != "" && Date.parseExact($(this).val(), "yyyy-M-d") == null ){
			alert(msg);
			$(this).focus();
		}			
	});
	dateObj.mask("9999-99-99");
		
}

function comGetToday(){
	return Date.today ();
}

function comAddDays(dayNum, baseDate){
   	if( typeof(baseDate) == "undefined"){
		return 	Date.today().addDays(dayNum);
	}else{
		return baseDate.addDays(dayNum);
	}
	
}

function comAddWeeks(weekNum,baseDate){
   	if( typeof(baseDate) == "undefined"){
		return 	Date.today().addWeeks(weekNum);
	}else{
		return baseDate.addWeeks(weekNum);
	}	
}
function comAddMonths(monthNum,baseDate){
   	if( typeof(baseDate) == "undefined"){
 		return 	Date.today().addMonths(monthNum);
	}else{
		return baseDate.addMonths(monthNum);
	}		
}
/*
 * -1: 두번째 파라메터가 에 값이 클때
 * 0 : 값이 같을때
 * 1 : 첫번째 파라메터가 에 값이 클때
 */
function comCompareDate(date1,date2){
	var tt = date1.compareTo (date2 );	
 	return tt ;
}


function comReadOnlyObject(obj, flg){
	alert(1)
	if( flg ){
		alert(2)
		obj.attr("readonly", "readonly") ;
alert(3)
	}else{
		obj.removeAttr("readonly") ;
	
	}
}
function comDisableObject(obj, flg){
	if( flg ){
		obj.attr("disabled", true) ;
	}else{
		obj.removeAttr("disabled") ;

	}
}


