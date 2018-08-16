<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/include/global.jsp" %>
<%@ include file="/include/get_session.jsp" %>
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
			<div class="event_section_item">
			
						<h3><img src="<%=imgServer%>/images/join/event_title.png" alt="WELCOME! 인리칭 컴퍼니 주주가 되신걸 환영합니다." tabindex="-1" class="event_section_title" /></h3>
						
						
						
							<form id="eventFrom" method="post" accept-charset="utf-8" action="<%=wasServer%>/proc/joinEvent_proc.jsp">
								<fieldset class="event_left">
									<legend>이벤트 응모를 위한 개인정보 입력</legend>
									<div class="event_left_top">
										<p class="event_text1" ><img src="<%=imgServer%>/images/join/event_text1.png" alt="주주가입 이벤트에 응모해보세요. 응모하신 분들에게 선착순으로 선물을 드립니다." /></p>
										<p class="event_text2" ><img src="<%=imgServer%>/images/join/event_text2.png" alt="응모기간 : 10월 1일 ~ 세상이 풍요로워질 때까지. 경품 : 선착순 1만 명, 롯데 레쓰비 마일드 모바일 기프티콘" /></p>
									</div>
									<ul class="event_input">
										<li class="event_name">
											<span class="title">
												<label for="event_name">
													<img src="<%=imgServer%>/images/join/event_name.png" alt="이름" />
												</label>
											</span>
											<input type="text" id="event_name" name="userName" maxlength="10" />
										</li>
										<li class="event_number"><span class="title"><label for="event_phone1">
											<img src="<%=imgServer%>/images/join/event_number.png" alt="연락처" /></label></span>
											<input type="text" id="event_phone1" name="userPhone1" title="휴대폰 첫자리" maxlength="3" />
											<input type="text" id="event_phone2" name="userPhone2" title="휴대폰 중간자리" maxlength="4" />
											<input type="text" id="event_phone3" name="userPhone3" title="휴대폰 끝자리" maxlength="4" />
										</li>
										<li>
											<input type="hidden" name="redirect" value="<%=webServer%>/event_form.jsp" />
										</li>
									</ul>
								</fieldset>	
								<fieldset class="event_right">
									<legend>개인정보 활용 동의</legend>
									<p class="event_agree_text"><img src="<%=imgServer%>/images/join/event_privacy.png" alt="개인정보 수집 및 이용에 동의하셔야 인리칭 컴퍼니 활동 및 이벤트 응모가 가능합니다." /></p>
									<ul class="agree_check">
										<li><input type="radio" id="event_agree" name="event_agree" value="y" /><span class="agree_t"><label for="event_agree">동의</label></span></li>
										<li><input type="radio" id="event_disagree" name="event_agree" checked="checked" value="n" /><span class="agree_t"><label for="event_disagree">동의 안함</label></span></li>
									</ul>
									<div class="privacy_con_area">
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
						<ul class="event_btn">
							<li class="first"><a href="javascript:joinEventNotSubmit();" class="login_btn_a arr_btn"><img src="<%=imgServer%>/images/join/event_btn01_txt.png" alt="응모하지 않고 입장하기" /><span><img src="<%=imgServer%>/images/join/event_btn01_arr.png" alt="" /></span></a></li>
							<li class="last"><a href="javascript:joinEventSubmit();" class="login_btn_a arr_btn"><img src="<%=imgServer%>/images/join/event_btn02_txt.png" alt="이벤트 응모 완료" /><span><img src="<%=imgServer%>/images/join/event_btn01_arr.png" alt="" /></span></a></li>
						</ul>
						
			</div>
		</div>			
	</body>
</html>


<%

	String result = request.getParameter("result");
	String callback = request.getParameter("callback");

	if(result != null && callback != null){

		out.print("<script>parent."+callback+"({'result':'"+result+"'})</script>");

	}
	
	if(callback != null && callback.equals("joinEventNotSubmitParent")){
		out.print("<script>parent.joinEventNotSubmitParent();</script>");
	}



%>





