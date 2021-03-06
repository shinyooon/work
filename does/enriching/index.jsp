<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>Enriching Company</title>
		
<? include "include/header.html" ?>

			<div id="contents">
				<div id="visual">
					<div class="visul_con">
						<div class="flash_container"><div id="main_flash"></div><div class="hiddenText">마음을 모아 세상을 풍요롭게 </div></div>
					</div>
					
					<!--popup-->
					<div class="main_popup">
						<p class="popup_text"><img src="images/index/popup/popup_text.png" alt="인리칭 컴퍼니 주주가 되어 주세요. 따뜻한 마음만 있다면 누구라도 인리칭 컴퍼니의 주주가 될수 있습니다. 지금 당신의 마음을 투자해 주세요." /></p>
						<div class="popup_btn"><a href="javascript:goLogin();" title="인리칭 컴퍼니 주주 가입 바로가기" class="login_btn_a arr_btn"><img src="images/index/popup/popup_btn_txt.png" alt="인리칭 컴퍼니 주주되기" /><span><img src="images/index/popup/popup_arr.png" alt="" /></span></a></div>
					</div>
					<? include "include/join.html" ?>
					<!-- <div class="join_iframe"><iframe src="<%=webServer%>/join.jsp" width="740" height="460" frameborder="0" scrolling="no" allowtransparency="true"></iframe></div> -->
					<!-- popup end-->
					<div class="visual_container">
					</div>
					<div class="play_btn">
						<a href="javascript:onClickPlayBtn();" title="영상 재생">
							<img src="images/common/play_btn_on.png" alt="메인 배경 플래시 Stop" />
							<img src="images/common/play_btn_off.png" alt="메인 배경 플래시 Play" />
						</a>
					</div>
					
					
					
				</div>
				<!--visual end-->
				<div id="container" class="index">
					<? include "include/index_contents.html" ?>
				</div>
				<!-- container end-->
<? include "include/footer.html" ?>
<script src="js/page_index.js" type="text/javascript" charset="utf-8"></script>