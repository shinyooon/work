<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
/**************************************************************************************************************************
* Program Name  : 본인확인 요청 Sample JSP (Real)  
* File Name     : pcc_V3_sample_seed.jsp
* Comment       : 
* History       : 
*
**************************************************************************************************************************/
%>
<%@ page import ="java.util.*,java.text.SimpleDateFormat"%>
<%
        //날짜 생성
        Calendar today = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String day = sdf.format(today.getTime());

        java.util.Random ran = new Random();
        //랜덤 문자 길이
        int numLength = 6;
        String randomStr = "";

        for (int i = 0; i < numLength; i++) {
            //0 ~ 9 랜덤 숫자 생성
            randomStr += ran.nextInt(10);
        }

		//reqNum은 최대 40byte 까지 사용 가능
        String reqNum = day + randomStr;
		String certDate=day;
%>
<%
    response.setHeader("Pragma", "no-cache" );
    response.setDateHeader("Expires", 0);
    response.setHeader("Pragma", "no-store");
    response.setHeader("Cache-Control", "no-cache" );
%>
<%@ page import = "java.util.*"%> 
<%
	
    String does_id  = "SYZA001";                               // 본인실명확인 회원사 아이디
    //String srvNo    = "007013";                            // 본인실명확인 서비스번호
//  String reqNum   = reqNum;                           // 본인실명확인 요청번호
	String exVar    = "0000000000000000";                                       // 복호화용 임시필드

    String retUrl   = "32https://www.enriching.co.kr/result.jsp";                           // 본인실명확인 결과수신 URL
//	String certDate	= request.getParameter("certDate");                         // 본인실명확인 요청시간
	String certGb	= "H";                           // 본인실명확인 본인확인 인증수단
	String addVar	= "";                           // 본인실명확인 추가 파라메터

	/**
	*
	* reqNum 값은 최종 결과값 복호화를 위한 SecuKey로 활용 되므로 중요합니다.
	* reqNum 은 본인 확인 요청시 항상 새로운 값으로 중복 되지 않게 생성 해야 합니다.
	* 쿠키 또는 Session및 기타 방법을 사용해서 reqNum 값을 
	* pcc_V3_result_seed.jsp에서 가져 올 수 있도록 해야 함.
	* 샘플을 위해서 쿠키를 사용한 것이므로 참고 하시길 바랍니다.
	*
	*/
	Cookie c = new Cookie("reqNum", reqNum);
	//c.setMaxAge(1800);  // <== 필요시 설정(초단위로 설정됩니다)
	response.addCookie(c);

    //01. 암호화 모듈 선언
	com.sci.v2.pcc.secu.SciSecuManager seed  = new com.sci.v2.pcc.secu.SciSecuManager();

	//02. 1차 암호화
	String encStr = "";
	String reqInfo      = does_id+"^"+srvNo+"^"+reqNum+"^"+certDate+"^"+certGb+"^"+addVar+"^"+exVar;  // 데이터 암호화
	encStr              = seed.getEncPublic(reqInfo);

	//03. 위변조 검증 값 생성
	com.sci.v2.pcc.secu.hmac.SciHmac hmac = new com.sci.v2.pcc.secu.hmac.SciHmac();
	String hmacMsg = hmac.HMacEncriptPublic(encStr);

	//03. 2차 암호화
	reqInfo  = seed.getEncPublic(encStr + "^" + hmacMsg + "^" + "0000000000000000");  //2차암호화
%>