<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/top_program.php";?>
<?
$id = trim($_POST[admin_id]);
$passwd = trim($_POST[admin_passwd]);
$ip = trim($_SERVER['REMOTE_ADDR']);



@$result=mysql_query("select * from MC_ADMIN where  admin_id='$id' and admin_pw = '$passwd' and del_date is null ");
@$total=mysql_affected_rows();
//$total = "1";

if($total>0){
	@$r = mysql_fetch_array($result);
	setcookie("mc_admin_id",$_POST["admin_id"],0,"/");
	setcookie("mc_admin_nm",$r["admin_nm"],0,"/");
	setcookie("mc_admin_seq",$r["num"],0,"/");
	setcookie("mc_login_authority",$r["authority"],0,"/");
	@mysql_query("update MC_ADMIN set login_date=now(),login_ip='$ip', login_qty = login_qty + 1 where admin_id='$id'");

	?>
	<SCRIPT LANGUAGE="JavaScript">
	<!--
		location.replace('item/item_list.html');
	//-->
	</SCRIPT>
	<?

}
else{
?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<SCRIPT LANGUAGE="JavaScript">
<!--
	alert('아이디나 비밀번호를 제대로 써주세요');
	history.go(-1);
//-->
</SCRIPT>
<?}?>
<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/dbclose.php";?>