<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/include/global.jsp" %>
<%@ include file="/include/get_session.jsp" %>
<%
	
	String parentType = request.getParameter("type");
	String parentChoice = request.getParameter("choice");
	String parentImage = request.getParameter("image");
	
	if(parentType == null){
		parentType = "";
	}
	if(parentChoice == null){
		parentChoice = "";
	}
	if(parentImage == null){
		parentImage = "";
	}
	
%>
<%
	//String srvNo    = "007013";//index
	//String srvNo    = "007011";//index2
	String srvNo    = "007018";//join_form
	
%>
<%@ include file="/include/pcc.jsp" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">

	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>인리칭 컨텐츠 - Enriching Company</title>
		<link rel="stylesheet" type="text/css" href="<%=imgServer%>/css/common.css"  />
		<link rel="stylesheet" type="text/css" href="<%=imgServer%>/css/index.css"  />
		<style>
			html,body{background: transparent !important; position:absolute !important;width: 100%;}


		</style>
		<%@ include file="/include/header_script.jsp" %>
		<script src="<%=wasServer%>/js/modernizr.js" type="text/javascript" charset="utf-8"></script>
		<script src="<%=wasServer%>/js/jquery-1.9.0.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="<%=wasServer%>/js/jquery.form.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="<%=wasServer%>/js/jquery.easing.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="<%=wasServer%>/js/swfobject.js" type="text/javascript" charset="utf-8"></script>
		<script src="<%=wasServer%>/js/global.js" type="text/javascript" charset="utf-8"></script>
		<script src="<%=wasServer%>/js/common.js" type="text/javascript" charset="utf-8"></script>
		<script src="<%=wasServer%>/js/script_ya.js" type="text/javascript" charset="utf-8"></script>
	</head>
	
	<body>
		<div id="visual" style="height:auto;">
		
		
			<div class="join_step1_section_item">
			
			
						<h3><img src="<%=imgServer%>/images/join/join2_title.png" alt="join us. 인리칭 컴퍼니 주주 가입하기" tabindex="-1" class="join_step1_section_title" /></h3>


						<form name="reqPCCForm" method="post" action = "" onsubmit="return openPCCWindow()">
							<input type="hidden" name="reqInfo"     value = "<%=reqInfo%>">
							<input type="hidden" name="retUrl"      value = "<%=retUrl%>">
						</form>
						<form id="joinFrom" method="post" accept-charset="utf-8" action="<%=wasServer%>/proc/joinEvent_proc.jsp">
							<fieldset class="step1_left">
								<legend>주주 가입하기 개인정보 입력</legend>
								<ul>
									<li class="join_name" >
										<span class="title">
											<label for="join_name">
												<img src="<%=imgServer%>/images/join/join2_name.png" alt="이름" />
											</label>
										</span>
										<input type="text" id="join_name" name="userName" maxlength="10" />
									</li>
	
	
									<li class="join_num">
										<span class="title"><label for="join_phone1"><img src="<%=imgServer%>/images/join/join2_number.png" alt="연락처" /></label></span>
										<input type="text" id="join_phone1" name="userPhone1" maxlength="3"  title="휴대폰 첫자리" readonly="readonly" />
										<input type="text" id="join_phone2" name="userPhone2" maxlength="4" title="휴대폰 중간 자리" readonly="readonly" />
										<input type="text" id="join_phone3" name="userPhone3" maxlength="4" title="휴대폰 끝자리" readonly="readonly" />
										<span><a href="javascript:openPCCWindow();" title="새창열림"><img src="<%=imgServer%>/images/join/join2_num_btn.png" alt="휴대폰 인증" /></a></span>
	
										<!-- <input type="submit" value="본인확인서비스V3 요청" >	-->
									</li>
	
	
									<li class="join_id">
										<span class="title"><label for="join_id"><img src="<%=imgServer%>/images/join/join2_id.png" alt="아이디" /></label></span>
										<input type="text" id="join_id" name="id" maxlength="10" />	
									</li>
									<li class="join_pw">
										<span class="title"><label for="join_pw"><img src="<%=imgServer%>/images/join/join2_pw.png" alt="비밀번호" /></label></span>
										<input type="password" id="join_pw" name="password" maxlength="12" />
										<span class="text"><img src="<%=imgServer%>/images/join/join2_id_text.png" alt="* 영문/숫자/특수문자 혼용 6~12자 가능, 영문 대소문자를 구별합니다." /></span>
									</li>
									<li class="join_pw_chk">
										<span class="title"><label for="join_pw_check"><img src="<%=imgServer%>/images/join/join2_pw2.png" alt="비밀번호 확인" /></label></span>
										<input type="password" id="join_pw_check" name="" maxlength="12" />
										<span class="text"><img src="<%=imgServer%>/images/join/join2_pw_text.png" alt="* 비밀번호 확인을 위해 동일한 비밀번호를 한 번 더 입력해주세요." /></span>
									</li>
									<li>
										<input type="hidden" name="type" id="join_type" value="<%=parentType%>" />
										<input type="hidden" name="choice" id="join_choice" value="<%=parentChoice%>" />
										<input type="hidden" name="image" id="join_image" value="<%=parentImage%>" />
										<input type="hidden" name="redirect" value="<%=webServer%>/join_form.jsp" />
										
									</li>
								</ul>
							</fieldset>
							
							<fieldset class="step1_right">
								<legend>개인정보 수집 및 이용 동의</legend>
								<p class="agree_text"><img src="<%=imgServer%>/images/join/privacy.png" alt="개인정보 수집 및 이용에 동의하셔야 인리칭 컴퍼니 활동 및 이벤트 응모가 가능합니다." /></p>
								<ul class="agree_check">
									<li><input type="radio" id="join_agree" name="join_agree" value="y" /><span class="agree_t"><label for="join_agree">동의</label></span></li>
									<li><input type="radio" id="join_disagree" name="join_agree" value="n" checked="checked" /><span class="agree_t"><label for="join_disagree">동의 안함</label></span></li>
								</ul>
								<div class="privacy_con_area" tabindex="0">
									<p class="title">개인정보 수집/이용에 대한 동의</p>
									<p>㈜롯데는 본 이벤트를 위하여 다음과 같이 고객님의 개인정보를 수집 및 이용합니다.</p>
									<ul>
										<li> - 수집이용목적 : 인리칭 컴퍼니 이벤트 참여 및 SMS 안내</li>
										<li> - 수집항목 : 이름, 휴대폰 번호</li>
										<li> - 보유/이용기간 : 이벤트 종료일로부터 60일간</li>
									</ul>
									<p>* 고객은 개인정보 수집을 거부할 수 있습니다. 다만, 거부할 경우 본 이벤트에 참여하실 수 없습니다.</p>
									<p class="title">개인정보 취급위탁에 대한 동의</p>
									<p>㈜롯데는 서비스 향상과 원활한 진행을 위하여 개인정보 처리 업무를 외부 전문업체에 위탁하여 처리하고 있습니다.</p>
									<ul>
										<li>- 취급 위탁 받는 자 : ㈜ 대홍기획, ㈜더즈 인터랙티브.</li>
										<li>- 취급 위탁하는 업무 : 이벤트 당첨자 확인 및 경품 배송<br />운영사무국 : 00-0000-0000</li>
										</ul>
									<p>* 개인정보 수집 이용 및 취급위탁 미동의 시 이벤트 참여가 제한될 수 있습니다.</p>
								</div>
							</fieldset>
						</form>
						
						<div class="join2_btn"><a href="javascript:joinSubmitDefault();" class="login_btn_a arr_btn"><img src="<%=imgServer%>/images/join/join_btn_txt.png" alt="인리칭 컴퍼니 주주되기" /><span><img src="<%=imgServer%>/images/join/join_arr.png" alt="" /></span></a></div>
					</div>
					<!-- join_step1 end-->
		</div>			
	</body>
</html>


<%

	String result = request.getParameter("result");
	String callback = request.getParameter("callback");

	if(result != null && callback != null){

		out.print("<script>parent."+callback+"({'result':'"+result+"'})</script>");

	}


%>
<script type="text/javascript" charset="utf-8">
	
	getPhoneNumber = function(data){
	
		if(data.result == "Y"){
			$('#join_phone1').val(data.phone.p1);
			$('#join_phone2').val(data.phone.p2);
			$('#join_phone3').val(data.phone.p3);
	
			$('#join_id').focus();
		}
		

	}

	
	
</script>



