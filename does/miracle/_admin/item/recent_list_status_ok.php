<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/top_program.php";?>
<?include_once $_SERVER["DOCUMENT_ROOT"]."/_admin/admin_include/admin_check.php";?>
<?if(!strstr($mc_login_authority,"m104")){script_alert_ok("권한이 없습니다.","/");}?>
<?
$seq = trim($_GET["seq"]);
$status = trim($_GET["stat"]);
if($seq && $status){
	$sqlplus = "";
	$r=mysql_fetch_array(mysql_query("select max(ranking)+1 from MC_BBS where seq='$seq' "));
	if($status=="y")$sqlplus = ", ranking = '".$r[0]."' ";
	$sql = "update MC_BBS set section = '$status' $sqlplus  where seq='$seq' ";
	$re=mysql_query($sql);
	mysql_query("insert into MC_ADMIN_LOG (sql_log,input_id,input_date,input_ip) values ('".addslashes($sql)."','$mc_admin_id',now(),'$ip')");
}
?>
<script type="text/javascript">
<!--
	parent.location.reload();
//-->
</script>
<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/dbclose.php";?>