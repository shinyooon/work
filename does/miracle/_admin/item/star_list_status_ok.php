<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/top_program.php";?>
<?include_once $_SERVER["DOCUMENT_ROOT"]."/_admin/admin_include/admin_check.php";?>
<?if(!strstr($mc_login_authority,"m105")){script_alert_ok("권한이 없습니다.","/");}?>
<?
$seq = trim($_GET["seq"]);
$status = trim($_GET["stat"]);
if($seq && $status){
	if($status=="y"){
		$r=mysql_fetch_array(mysql_query("select * from MC_BBS where seq='$seq'  "));
		if(!$r['gmarketseq'] && !$r['gmarketurl']){
			?>
			<script type="text/javascript">
			<!--
				alert("지마켓에 등록후 등록완료로 바꾸실수 있습니다.");
				parent.location.reload();
			//-->
			</script>
			<?
			exit;
		}
	}
	$sql = "update MC_BBS set status = '$status'  where seq='$seq' ";
	$re=mysql_query($sql);
	mysql_query("insert into MC_ADMIN_LOG (sql_log,input_id,input_date,input_ip) values ('".addslashes($sql)."','$mc_admin_id',now(),'$ip')");
}
?>
<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/dbclose.php";?>