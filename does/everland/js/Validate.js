// Is Number?
function IsNumber(s)
{
	if(s == null) return false;
	
	s = Trim(s);
	if(s.length == 0) return false;
	
	for(var i = 0; i < s.length; i++)
	{
		var c = s.charCodeAt(i);
		if(c >= "0".charCodeAt(0) && c <= "9".charCodeAt(0)) continue;
		else return false;
	}
	return true;
}

// Is English?
function IsEnglish(s)
{
	if(s == null) return false;
	
	s = Trim(s);
	if(s.length == 0) return false;
	
	for(var i = 0; i < s.length; i++)
	{
		var c = s.charCodeAt(i);
		if(c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) continue;
		else if(c >= 'A'.charCodeAt(0) && c <= 'Z'.charCodeAt(0)) continue;
		else return false;
	}
	return true;
}

// Is English, Number, Dash, Underscore 
function IsNumEnglishDashUnderbar(s)
{
	if(s == null) return false;
		
	s = Trim(s);
	if(s.length == 0 ) return false;
	
	for(var i = 0; i < s.length; i++)
	{
		var c = s.charCodeAt(i);
		if(c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) continue;
		else if(c >= 'A'.charCodeAt(0) && c <= 'Z'.charCodeAt(0)) continue;
		else if(c >= "0".charCodeAt(0) && c <= "9".charCodeAt(0)) continue;
		else if(c == "-".charCodeAt(0) || c == "_".charCodeAt(0)) continue;
		else return false;
	}
	return true;
}

// Is ASCII? code < 127
function IsASCII(s)
{
	if(s == null) return false;
	
	s = Trim(s);
	if(s.length == 0) return false;
	
	for(i = 0; i < s.length; i++)
	{
		var c = s.charCodeAt(i);
		if(c <= 127) continue;
		else return false;
	}
	return true;
}

// Is DateTime?
function IsDate(s)
{	
	if(s == null) return false;
	
	s = Trim(s);
	// only support "yyyy-MM-dd"
	if(s.length != 10) return false;
	if(s.charCodeAt(4) != "-".charCodeAt(0)) return false;
	if(s.charCodeAt(7) != "-".charCodeAt(0)) return false;
	
	var year = s.substr(0,4);	
	var month = s.substr(5,2) - 1;	
	var date = s.substr(8,2);	
	var calDate = new Date(year, month, date);
	if ( calDate.getFullYear() != year || 
		calDate.getMonth() != month ||
		calDate.getDate() != date) 
	{
		return false;
	} 
	else 
	{
		return true;
	}
}

// IsEmail?
function IsEmail(s)
{	
	if(s == null) return false;
			
	s = Trim(s);
	if(s.search(/^\s*[\w\~\-\.\|]+\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/g) >= 0)
		return true;
	else 
		return false;	
}

// is valid resident number
function IsResidentNumber(s)
{
	return isValid_socno(s)
}

// has Content?
function HasContent(s)
{	
	if(s == null) return false;
	
	s = Trim(s);
	if(s.length != 0) return true;
	else return false;	
}

// check box is checked?
function IsChecked(grp)
{
	if(grp == null) return false;
	
	for(var i=0; i < grp.length ; i++)
	{
		if(grp[i].checked)
			return true;
	}
	return false;
}

// check alpha & num 
function isUniChar(passwd) {
	var uniOK = false;
	var existEng = false;
	var existNum = false;
	var existSpec = false;
	
	if(isExistAlpha(passwd)) {
		existEng = true;
	}
	
	if(isExistNum(passwd)) {
		existNum = true;
	}
	
	if((existEng == true && existNum == true)) {
		uniOK = true;
	}
	
	return uniOK;
}


function isExistAlpha(str) {
	var existOK = false;
	
	str = str.toLowerCase();
	
	for (var i=0; i<str.length; i++) {
		if (  (str.charAt(i) >= 'a')  && (str.charAt(i) <= 'z') ) {
			existOK = true;
			break;
		}
	}
	
	return existOK;
}

function isExistNum( str ) {
	var existOK = false;
	
	for (var i=0; i<str.length; i++) {
		if (  (str.charAt(i) >= '0')  && (str.charAt(i) <= '9') ) {
			existOK = true;
			break;
		}
	}
	
	return existOK;
}



// combo box is selected?
function IsSelected(grp)
{
	if(grp == null) return false;
	
	for(var i=0; i < grp.length ; i++)
	{
		if(grp[i].selected && grp[i].value!="")
			return true;
	}
	return false;
}

// get Byte length of string 
function GetByteLength(s)
{
	if(s == null) return false;
	
	var count = 0;
	for(i = 0; i < s.length; i++)
	{
		var c = s.charCodeAt(i);
		if(c <= 127) count = count + 1;
		else count = count + 2;
	}
	return count;
}

function Trim(a){
    return(LTrim(RTrim(a)));
}

 

function LTrim(a){
    var i;
    i = 0;
    while (a.substring(i,i+1) == ' ')  i = i + 1;

    return a.substring(i);
}


function RTrim(a){
    var b;
    var i = a.length - 1;
    while (i >= 0 && a.substring(i,i+1) == ' ') i = i - 1;
    return a.substring(0,i+1);
}



//============================================================


// Validation Check 에 관련된 UI 에 독립적인 함수들 모음  
// 주민번호 7번째 자리의 규칙 ########################
// 1800년대: 남자 9, 여자 0
// 1900년대: 남자 1, 여자 2
// 2000년대: 남자 3, 여자 4
// 2100년대: 남자 5, 여자 6
// 외국인 등록번호: 남자 7, 여자 8

function isValid_socno(socno)
{
	var socnoStr = socno.toString();
     a = socnoStr.substring(0, 1);
     b = socnoStr.substring(1, 2);
     c = socnoStr.substring(2, 3);
     d = socnoStr.substring(3, 4);
     e = socnoStr.substring(4, 5);
     f = socnoStr.substring(5, 6);
     g = socnoStr.substring(6, 7);
     h = socnoStr.substring(7, 8);
     i = socnoStr.substring(8, 9);
     j = socnoStr.substring(9, 10);
     k = socnoStr.substring(10, 11);
     l = socnoStr.substring(11, 12);
     m = socnoStr.substring(12, 13);
	 month = socnoStr.substring(2,4);
	 day = socnoStr.substring(4,6);
	 socnoStr1 = socnoStr.substring(0, 7);
	 socnoStr2 = socnoStr.substring(7, 13);

	 // 월,일 Validation Check
	 if(month <= 0 || month > 12) { return false; }
	 if(day <= 0 || day > 31) { return false; }

	 // 주민등록번호에 공백이 들어가도 가입이 되는 경우가 발생하지 않도록 한다.
	 if (isNaN(socnoStr1) || isNaN(socnoStr2))  { return false; }

     temp=a*2+b*3+c*4+d*5+e*6+f*7+g*8+h*9+i*2+j*3+k*4+l*5;
     temp=temp%11;
     temp=11-temp;
     temp=temp%10;

     if(temp == m) {
        return true;
     } else {
        return isValid_fgnno;
     }
}

function isValid_fgnno(socno)
{
	var total =0;
	var parity = 0;

	var fgnNo = new Array(13);

	for(i=0;i < 13;i++) fgnNo[i] = parseInt(socno.charAt(i));

	if(fgnNo[11] < 6) return false;

	if((parity = fgnNo[7]*10 + fgnNo[8])&1) return false;


	var weight = 2;

	for(i=0,total=0;i < 12;i++)
	{
		var sum = fgnNo[i] * weight;
		total += sum;

		if(++weight > 9) weight=2;
	}

	if((total = 11 - (total%11)) >= 10) total -= 10;
	if((total += 2) >= 10) total -= 10;
	if(total != fgnNo[12]) return false;

	return true;
}

function isValid_id( str )
{
     // check whether input value is included space or not
     if( str == ""){
     	alert("아이디를 입력하세요.");
     	return false;
     }

	// 아이디 가운데 빈 공간이 없도록 체크한다.
     var retVal = checkSpace( str );
     if( retVal ) {
         alert("아이디는 빈 공간 없이 연속된 영문 소문자와 숫자만 사용할 수 있습니다.");
         return false;
     }

     // 아이디는 '-' 로 시작할 수 없다.
	if( str.charAt(0) == '_') {
		alert("아이디의 첫문자는 '_'로 시작할수 없습니다.");
		return false;
	}

     // 길이와 허용 문자를 체크한다.
     var isID = /^[a-z0-9_-]{4,12}$/;
     if( !isID.test(str) ) {
         alert("아이디는 3~12자의 영문 소문자와 숫자,특수기호(_,-)만 사용할 수 있습니다.");
         return false;
     }
     return true;
}

function isValid_passwd( str )
{
     var cnt = 0;
     if( str == ""){
     	alert("비밀번호를 입력하세요.");
     	return false;
     }

    /* check whether input value is included space or not  */
     var retVal = checkSpace( str );
     if( retVal ) {
         alert("비밀번호에는 공백이 있으면 안됩니다.");
         return false;
     }
     for( var i=0; i < str.length; ++i)
     {
         if( str.charAt(0) == str.substring( i, i+1 ) ) ++cnt;
     }
     if( cnt == str.length ) {
         alert("보안상의 이유로 한 문자로 연속된 비밀번호는 허용하지 않습니다.");
         return false;
     }

     var isPW = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{6,16}$/;
     if( !isPW.test(str) ) {
         alert("비밀번호는 6~16자의 영문 대소문자와 숫자, 특수문자를 사용할 수 있습니다.");
         return false;
     }
     return true;
}

function isValid_email( str )
{
     /* check whether input value is included space or not  */
     if(str == ""){
     	alert("이메일 주소를 입력하세요.");
     	return false;
     }
     var retVal = checkSpace( str );
     if( retVal ) {
         alert("이메일 주소를 빈공간 없이 넣으세요.");
         return false;
     }

     /* checkFormat */
     var isEmail = /[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*@[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*/;
     if( !isEmail.test(str) ) {
         alert("이메일 형식이 잘못 되었습니다.");
         return false;
     }
     if( str.length > 60 ) {
         alert("이메일 주소는 60자까지 유효합니다.");
         return false;
     }

     return true;
}

function isValid_name(str)
{
    str = str.replace(/(^\s*)|(\s*$)/g, "");
     if( str == '' ){
     	 alert("이름을 입력하세요");
         return false;
     }

     var retVal = checkSpace( str );
     if( retVal ){
         alert("이름은 띄어쓰기 없이 입력하세요.");
         return false;
     }
     if( !isHangul(str) ) {
         alert("이름을 한글로 입력하세요.");
         return false;
     }
     if( str.length > 10 ) {
         alert("이름은 7자까지만 사용할 수 있습니다.");
         return false;
     }
     return true;
}

function isValid_ForeignName( str )
{
    /* check format */
    var isENAME = /^[A-Z  ]{3,40}$/;

    if( !isENAME.test( str ) ) { return false; }

    return true;
}
// Validation Check 에 관련된 UI 에 독립적인 함수들 모음 

// 데이터 판단을 위한 UI 에 독립적인 함수들 모음
function isXP()
{
	var agent = window.navigator.userAgent;
	if(agent.indexOf("MSIE")!= -1 && agent.indexOf("5.1") !=-1)
	    return true;     //SP1
    else
        return false;
}

function isXPSP2()
{
    var tmp_MSIE = window.navigator.userAgent.indexOf("MSIE");
    if(tmp_MSIE && window.navigator.userAgent.indexOf("SV1") > tmp_MSIE){
        return true;     //SP2
    }else{
        return false;
    }
}

function isIE7()
{
	var agent = window.navigator.userAgent;
	if(agent.indexOf("MSIE 7")!= -1)
	    return true;
    else
        return false;
}

function isIE()
{
	var agent = window.navigator.userAgent;
	if(agent.indexOf("MSIE")!= -1)
	    return true;
    else
        return false;
}

function isNumeric(s)
{
     var isNum = /\d/;
     if( !isNum.test(s) ) { return false; }
     else { return true; }
}

function isHangul(s)
{
     var len;
     len = s.length;

     for (var i = 0; i < len; i++)  {
         if (s.charCodeAt(i) != 32 && (s.charCodeAt(i) < 44032 || s.charCodeAt(i) > 55203))
         		return false;
     }

     return true;
}

// space 가 있으면 true, 없으면 false
function checkSpace( str )
{
     if(str.search(/\s/) != -1){
     	return true;
     } else {
        return false;
     }
}
