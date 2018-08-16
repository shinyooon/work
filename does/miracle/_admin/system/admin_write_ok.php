<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/top_program.php";?>
<?include_once $_SERVER["DOCUMENT_ROOT"]."/_admin/admin_include/admin_check.php";?>
<?if(!strstr($mc_login_authority,"m201")){script_alert_ok("권한이 없습니다.","/");}?>
<?
$authority = "";
foreach($_POST['chk'] as $key => $value){
	//echo "$key : $value <br>";
	$authority .= $value .", ";
}
//echo $authority;
//exit;


$admin_id = injection_filter_length(trim($_POST['admin_id']),20);
$admin_pw = injection_filter_length(trim($_POST['admin_pw']),20);
$admin_nm = injection_filter_length(trim($_POST['admin_nm']),20);
$admin_email = injection_filter_length(trim($_POST['admin_email']),100);
$content = injection_filter_length(trim($_POST['content']),300);
$num = injection_filter_int(trim($_POST['num']));

if ($num){

			$sql = "update MC_ADMIN set ";
			$sql .="admin_pw = '$admin_pw' ";
			$sql .=",admin_nm = '$admin_nm' ";
			$sql .=",admin_email = '$admin_email' ";
			$sql .=",content = '$content' ";
			$sql .=",authority = '$authority' ";
			$sql .=" where num=$num ";

			$rs = mysql_query($sql);
			if($rs){
				script_alert_ok("수정이 완료되었습니다. \\n권한 수정후에는 다시 로그인하셔야 메뉴가 변경됩니다.","admin_list.html");
			}
			else{
				js_historyback("error modify");
			}

}
else{

			@$r = mysql_fetch_array(mysql_query("select count(*) from MC_ADMIN where admin_id = '$admin_id' and del_date is null "));
			if($r[0]>0){script_alert("중복된아이디가 있습니다.");}

			$sql = "insert into MC_ADMIN (";
			$sql .="admin_id ";
			$sql .=",cla ";
			$sql .=",admin_pw ";
			$sql .=",admin_nm ";
			$sql .=",admin_email ";
			$sql .=",content ";
			$sql .=",authority ";
			$sql .=",write_id ";
			$sql .=",write_date ";
			$sql .=",write_ip ";
			$sql .=") values (";
			$sql .="'$admin_id' ";
			$sql .=",'s' ";
			$sql .=",'$admin_pw' ";
			$sql .=",'$admin_nm' ";
			$sql .=",'$admin_email' ";
			$sql .=",'$content' ";
			$sql .=",'$authority' ";
			$sql .=",'$mc_admin_id' ";
			$sql .=",now() ";
			$sql .=",'$ip' ";
			$sql .=") ";


			$rs = mysql_query($sql);
			if($rs){
				script_alert_ok("등록이 완료되었습니다.","admin_list.html");
			}
			else{
				js_historyback("error insert");
			}
}
?>