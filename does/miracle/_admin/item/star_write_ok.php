<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/top_program.php";?>
<?include_once $_SERVER["DOCUMENT_ROOT"]."/_admin/admin_include/admin_check.php";?>
<?if(!strstr($mc_login_authority,"m105")){script_alert_ok("권한이 없습니다.","/");}?>
<meta charset="UTF-8">
<?

	$cla = injection_filter_length(trim(emt($_POST,'cla')),10);

	if(CreateFolder()=="0")js_historyback('$l_fail - $l_folder ');
	else $img_url_a = CreateFolder()."/";


if($_FILES['attach1']['name']){
	$file_ext = substr(strrchr($_FILES['attach1']['name'], "."),1);
	$file_name1 = $_FILES['attach1']['name'];
	$file_path = $img_url_a.$cla."1".date("ymdHis").".".$file_ext;
	$file_path_s = $img_url_a.$cla."1".date("ymdHis")."_s.".$file_ext ;
	move_uploaded_file($_FILES['attach1']['tmp_name'], $file_path);
	$img_info = getImageSize($file_path);
	$src_img = "";
	$file = $file_path;
	if(preg_match('/png/i',$img_info['mime']))$src_img=ImageCreateFrompng($file);
	if(preg_match('/jp/i',$img_info['mime']))$src_img=ImageCreateFromJPEG($file);
	if(!$src_img){
		?>
					<script type="text/javascript">
					<!--
						alert("jpg, png 이미지만 가능합니다. 1번이미지");
						history.back();
					//-->
					</script>
					<?
		exit;
		}
	if($img_info[0]<100 || $img_info[1]<62){
		?>
					<script type="text/javascript">
					<!--
						alert("이미지 사이즈가 작습니다.  1번이미지");
						history.back();
					//-->
					</script>
		<?
		exit;
	}
	thumbnail3($file_path,str_replace("/imgs/","/thumb/",$file_path_s),"168","143");
	$file_path1 = str_replace("/home/miracle/wwwhome","",$file_path);
	$file_path_s1 = str_replace("/home/miracle/wwwhome","",str_replace("/imgs/","/thumb/",$file_path_s));
}

if($_FILES['attach2']['name']){
	$file_ext = substr(strrchr($_FILES['attach2']['name'], "."),1);
	$file_name2 = $_FILES['attach2']['name'];
	$file_path = $img_url_a.$cla."2".date("ymdHis").".".$file_ext;
	$file_path_s = $img_url_a.$cla."2".date("ymdHis")."_s.".$file_ext ;
	move_uploaded_file($_FILES['attach2']['tmp_name'], $file_path);
	$img_info = getImageSize($file_path);
	$src_img = "";
	$file = $file_path;
	if(preg_match('/png/i',$img_info['mime']))$src_img=ImageCreateFrompng($file);
	if(preg_match('/jp/i',$img_info['mime']))$src_img=ImageCreateFromJPEG($file);
	if(!$src_img){
		?>
					<script type="text/javascript">
					<!--
						alert("jpg, png 이미지만 가능합니다. 2번이미지");
						history.back();
					//-->
					</script>
					<?
		exit;
		}
	if($img_info[0]<100 || $img_info[1]<100){
		?>
					<script type="text/javascript">
					<!--
						alert("이미지 사이즈가 작습니다.  2번이미지");
						history.back();
					//-->
					</script>
		<?
		exit;
	}
	thumbnail3($file_path,str_replace("/imgs/","/thumb/",$file_path_s),"168","143");
	$file_path2 = str_replace("/home/miracle/wwwhome","",$file_path);
	$file_path_s2 = str_replace("/home/miracle/wwwhome","",str_replace("/imgs/","/thumb/",$file_path_s));
}

if($_FILES['attach3']['name']){
	$file_ext = substr(strrchr($_FILES['attach3']['name'], "."),1);
	$file_name3 = $_FILES['attach3']['name'];
	$file_path = $img_url_a.$cla."3".date("ymdHis").".".$file_ext;
	$file_path_s = $img_url_a.$cla."3".date("ymdHis")."_s.".$file_ext ;
	move_uploaded_file($_FILES['attach3']['tmp_name'], $file_path);
	$img_info = getImageSize($file_path);
	$src_img = "";
	$file = $file_path;
	if(preg_match('/png/i',$img_info['mime']))$src_img=ImageCreateFrompng($file);
	if(preg_match('/jp/i',$img_info['mime']))$src_img=ImageCreateFromJPEG($file);
	if(!$src_img){
		?>
					<script type="text/javascript">
					<!--
						alert("jpg, png 이미지만 가능합니다. 3 번이미지");
						history.back();
					//-->
					</script>
					<?
		exit;
		}
	if($img_info[0]<100 || $img_info[1]<100){
		?>
					<script type="text/javascript">
					<!--
						alert("이미지 사이즈가 작습니다. 3번이미지");
						history.back();
					//-->
					</script>
		<?
		exit;
	}
	thumbnail3($file_path,str_replace("/imgs/","/thumb/",$file_path_s),"168","143");
	$file_path3 = str_replace("/home/miracle/wwwhome","",$file_path);
	$file_path_s3 = str_replace("/home/miracle/wwwhome","",str_replace("/imgs/","/thumb/",$file_path_s));
}


	if($_FILES['attach4']['name']){
 	  	$img_url_a = str_replace("imgs/","files/",$img_url_a);
		$file_name4 = $_FILES['attach4']['name'];
		$file_ext = substr(strrchr($_FILES['attach4']['name'], "."),1);
		$file_path = $img_url_a.$cla."4".date("ymdHis").".".$file_ext;
		if($_FILES['attach4']['size']>500*1024*1024){
		?>
		<script type="text/javascript">
		<!--
			alert("500mbyte 이상 파일은 올릴수 없습니다.");
		//-->
		</script>
		<?
		exit;
		}
		move_uploaded_file($_FILES['attach4']['tmp_name'], $file_path);
		$file_path4 = str_replace("/home/miracle/wwwhome","",$file_path);
	}

$content = injection_filter_length(trim(emt($_POST,'content')),200000000);
$title = injection_filter_length(trim(emt($_POST,'title')),100);
$ca1 = injection_filter_length(trim(emt($_POST,'ca1')),1);
$ca2 = injection_filter_length(trim(emt($_POST,'ca2')),1);
$unm = injection_filter_length(trim(emt($_POST,'unm')),100);
$tel = injection_filter_length(trim(emt($_POST,'t1')),3)."-".injection_filter_length(trim(emt($_POST,'t2')),4)."-".injection_filter_length(trim(emt($_POST,'t3')),4);
$ulink = injection_filter_length(trim(emt($_POST,'ulink')),250);
$gmarketseq = injection_filter_length(trim(emt($_POST,'gmarketseq')),250);
$gmarketurl = injection_filter_length(trim(emt($_POST,'gmarketurl')),250);
$seq = injection_filter_length(trim(emt($_POST,'seq')),10);
$status = injection_filter_length(trim(emt($_POST,'status')),10);
if($gmarketseq &&  $gmarketurl){
	if($status!="r") $status = "y";
}

if($seq){
			$sql = "update MC_BBS set ";

			$sql .="cate1 ='$ca1' ";
			$sql .=",cate2='$ca2'  ";
			$sql .=",title='$title'  ";
			$sql .=",unm='$unm'   ";
			$sql .=",utel='$tel'   ";
			if($file_path1){
			$sql .=",attach1='$file_path1'   ";
			$sql .=",thumb1='$file_path_s1'    ";
			$sql .=",filename1='$file_name1'    ";
			}
			if($file_path2){
			$sql .=",attach2='$file_path2'   ";
			$sql .=",thumb2='$file_path_s2'    ";
			$sql .=",filename2='$file_name2'    ";
			}
			if($file_path3){
			$sql .=",attach3='$file_path3'   ";
			$sql .=",thumb3='$file_path_s3'    ";
			$sql .=",filename3='$file_name3'    ";
			}
			if($file_path4){
			$sql .=",afile='$file_path4'   ";
			$sql .=",filename4='$file_name4'    ";
			}
			$sql .=",ulink='$ulink'   ";
			$sql .=",status='$status'   ";
			$sql .=",content='$content'   ";
			$sql .=",gmarketseq='$gmarketseq'   ";
			$sql .=",gmarketurl='$gmarketurl'   ";
			$sql .="where seq='$seq' ";
			$rs = mysql_query($sql);

			if($rs){
			?>
			<script type="text/javascript">
			<!--
				alert("재능이 수정되었습니다..");
				location.replace('star_list.html');
			//-->
			</script>
			<?

				mysql_query("insert into MC_ADMIN_LOG (sql_log,input_id,input_date,input_ip) values ('".addslashes($sql)."','$mc_admin_id',now(),'$ip')");
			}
			else{
				script_view("db error");
			}

}
else{
	if($title  ){

			$sql = "insert into MC_BBS (";
			$sql .="cla ";
			$sql .=",cate1 ";
			$sql .=",cate2 ";
			$sql .=",title ";
			$sql .=",unm ";
			$sql .=",utel ";
			$sql .=",attach1 ";
			$sql .=",attach2 ";
			$sql .=",attach3 ";
			$sql .=",thumb1  ";
			$sql .=",thumb2  ";
			$sql .=",thumb3  ";
			$sql .=",filename1  ";
			$sql .=",filename2  ";
			$sql .=",filename3  ";
			$sql .=",list1 ";
			$sql .=",filename4  ";
			$sql .=",afile ";
			$sql .=",ulink ";
			$sql .=",status ";
			$sql .=",content ";
			$sql .=",gmarketseq ";
			$sql .=",gmarketurl ";
			$sql .=",ip ";
			$sql .=",input_date ";
			$sql .=") values (";
			$sql .="'$cla' ";
			$sql .=",'$ca1' ";
			$sql .=",'$ca2' ";
			$sql .=",'$title' ";
			$sql .=",'$unm' ";
			$sql .=",'$tel' ";
			$sql .=",'$file_path1' ";
			$sql .=",'$file_path2' ";
			$sql .=",'$file_path3' ";
			$sql .=",'$file_path_s1' ";
			$sql .=",'$file_path_s2' ";
			$sql .=",'$file_path_s3' ";
			$sql .=",'$file_name1' ";
			$sql .=",'$file_name2' ";
			$sql .=",'$file_name3' ";
			$sql .=",'$list1' ";
			$sql .=",'$file_name4' ";
			$sql .=",'$file_path4' ";
			$sql .=",'$ulink' ";
			$sql .=",'$status' ";
			$sql .=",'$content' ";
			$sql .=",'$gmarketseq' ";
			$sql .=",'$gmarketurl' ";
			$sql .=",'$ip' ";
			$sql .=",now() ";
			$sql .=") ";
			$rs = mysql_query($sql);

			if($rs){
			?>
			<script type="text/javascript">
			<!--
				alert("재능이 등록되었습니다.");
				location.replace('star_list.html');
			//-->
			</script>
			<?

				mysql_query("insert into MC_ADMIN_LOG (sql_log,input_id,input_date,input_ip) values ('".addslashes($sql)."','$mc_admin_id',now(),'$ip')");
			}
			else{
				script_view("db error");
			}

	}
	else{
		script_view("no content");
	}
}
?>
<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/dbclose.php";?>