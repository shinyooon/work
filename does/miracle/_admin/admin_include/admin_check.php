<?
$mc_admin_id = $_COOKIE["mc_admin_id"];
$mc_admin_nm = $_COOKIE["mc_admin_nm"];
$mc_admin_seq = $_COOKIE["mc_admin_seq"];
$mc_login_authority = $_COOKIE["mc_login_authority"];
if(!$mc_admin_seq){
	?>
	<script type="text/javascript">
	<!--
		alert("로그인을 해주세요");
	//-->
	</script>
	<?
}
?>