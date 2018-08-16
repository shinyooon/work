<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/top_program.php";?>
<?include_once $_SERVER["DOCUMENT_ROOT"]."/_admin/admin_include/admin_check.php";?>
<?
$passwd = trim($_POST["passwd"]);
if($passwd && $mc_admin_seq){
	$sql = "update MC_ADMIN set admin_pw = '$passwd'  where num='$mc_admin_seq'  ";
	$re=mysql_query($sql);
	if($re){
		script_alert_ok("변경되었습니다","password.html");
	}
	else{
		script_alert("db error");
	}
}
else{
	script_alert("password error");
}
?>
<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/dbclose.php";?>