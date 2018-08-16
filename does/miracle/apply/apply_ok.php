<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/top_program.php";?>
<head>
	<meta charset="utf-8">
	<title>1.25 미라클 마켓</title>
	<link rel="stylesheet" type="text/css" href="css/common.css" />
	<link rel="stylesheet" type="text/css" href="css/index.css" />
	<link rel="stylesheet" type="text/css" href="css/index_sm.css" />
	<script type="text/javascript" src="http://script.gmarket.co.kr/jQuery/1.7.1/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="scripts/jquery.easing.min.js"></script>
	<script type="text/javascript" src="scripts/modernizr.js"></script>
	<script type="text/javascript" src="scripts/TweenMax.min.js"></script>
	<script type="text/javascript" src="scripts/popup.js"></script>
	<script type="text/javascript" src="scripts/common.js"></script>
</head>
<?
	$cla = "c";

	if(CreateFolder()=="0")js_historyback('$l_fail - $l_folder ');
	else $img_url_a = CreateFolder()."/";

	if(emt($_FILES,'file1')){
 	  	$img_url_a = str_replace("imgs/","files/",$img_url_a);
		$filenm4 = $_FILES['file1']['name'];
		$file_ext = substr(strrchr($_FILES['file1']['name'], "."),1);
		$file_path = $img_url_a.$cla.date("ymdHis").".".$file_ext;
		if($_FILES['file1']['size']>500*1024*1024){
		?>
		<script type="text/javascript">
		<!--
			alert("500mbyte 이상 파일은 올릴수 없습니다.");
			parent.document.getElementById("applydiv").style.display="";
			parent.document.getElementById("divloading").style.display="none";
		//-->
		</script>
		<?
		exit;
		}
		move_uploaded_file($_FILES['file1']['tmp_name'], $file_path);
		$file_path = str_replace("/home/miracle/wwwhome","",$file_path);
	}

$c_txt = injection_filter_length(trim(emt($_POST,'c_txt')),200000000);
$attach1 = injection_filter_length(trim(emt($_POST,'attach1')),200);
$attach2 = injection_filter_length(trim(emt($_POST,'attach2')),200);
$attach3 = injection_filter_length(trim(emt($_POST,'attach3')),200);
$thumb1 = injection_filter_length(trim(emt($_POST,'thumb1')),200);
$thumb2 = injection_filter_length(trim(emt($_POST,'thumb2')),200);
$thumb3 = injection_filter_length(trim(emt($_POST,'thumb3')),200);
$filenm1 = injection_filter_length(trim(emt($_POST,'filenm1')),200);
$filenm2 = injection_filter_length(trim(emt($_POST,'filenm2')),200);
$filenm3 = injection_filter_length(trim(emt($_POST,'filenm3')),200);
$thumb1 = str_replace("/imgs/","/thumb/",$thumb1);
$thumb2 = str_replace("/imgs/","/thumb/",$thumb2);
$thumb3 = str_replace("/imgs/","/thumb/",$thumb3);
$c_mira = injection_filter_length(trim(emt($_POST,'c_mira')),100);
$ca1 = injection_filter_length(trim(emt($_POST,'ca1')),1);
$ca2 = injection_filter_length(trim(emt($_POST,'ca2')),1);
$c_nm = injection_filter_length(trim(emt($_POST,'c_nm')),100);
$tel = injection_filter_length(trim(emt($_POST,'c_t1')),3)."-".injection_filter_length(trim(emt($_POST,'c_t2')),4)."-".injection_filter_length(trim(emt($_POST,'c_t3')),4);
$c_link = injection_filter_length(trim(emt($_POST,'c_link')),250);

	if($c_mira && $c_nm && strlen($tel)>3){

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
			$sql .=",content ";
			$sql .=",ip ";
			$sql .=",input_date ";
			$sql .=") values (";
			$sql .="'$cla' ";
			$sql .=",'$ca1' ";
			$sql .=",'$ca2' ";
			$sql .=",'$c_mira' ";
			$sql .=",'$c_nm' ";
			$sql .=",'$tel' ";
			$sql .=",'$attach1' ";
			$sql .=",'$attach2' ";
			$sql .=",'$attach3' ";
			$sql .=",'$thumb1' ";
			$sql .=",'$thumb2' ";
			$sql .=",'$thumb3' ";
			$sql .=",'$filenm1' ";
			$sql .=",'$filenm2' ";
			$sql .=",'$filenm3' ";
			$sql .=",'$list1' ";
			$sql .=",'$filenm4' ";
			$sql .=",'$file_path' ";
			$sql .=",'$c_link' ";
			$sql .=",'$c_txt' ";
			$sql .=",'$ip' ";
			$sql .=",now() ";
			$sql .=") ";
			$rs = mysql_query($sql);

			if($rs){
			?>
			<script type="text/javascript">
			<!--
				document.domain = "gmarket.co.kr";
				//alert("등록완료");
				parent.applyEnd("<?=str_replace("_s.","_k.",$thumb1)?>");
			//-->
			</script>
			<?
			}
			else{
				script_view("db error");
			}

	}
	else{
		script_view("no content");
	}

?>
<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/dbclose.php";?>