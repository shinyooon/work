<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/top_program.php";?>
<?include_once $_SERVER["DOCUMENT_ROOT"]."/_include/dbclose.php";?>
<meta charset="utf-8">
<?
$cla = "P";
if(CreateFolder()=="0"){
//	js_historyback('folder 생성실패');
?>폴더생성실패<?
	exit;
}
else $img_url_a = CreateFolder()."/";

$idx = injection_filter_length(emt($_POST,'idx'),1);

if(emt($_FILES,'a_file')){
	$file_ext = substr(strrchr($_FILES['a_file']['name'], "."),1);
	$file_name = $_FILES['a_file']['name'];
	$file_path = $img_url_a.$cla.date("ymdHis").".".$file_ext;
	$file_path_s = $img_url_a.$cla.date("ymdHis")."_s.".$file_ext ;
	$file_path_k = $img_url_a.$cla.date("ymdHis")."_k.".$file_ext ;
	move_uploaded_file($_FILES['a_file']['tmp_name'], $file_path);
	$img_info = getImageSize($file_path);
	$src_img = "";
	$file = $file_path;
	if(preg_match('/png/i',$img_info['mime']))$src_img=ImageCreateFrompng($file);
	if(preg_match('/jp/i',$img_info['mime']))$src_img=ImageCreateFromJPEG($file);
	if(!$src_img){
		?>
					<script type="text/javascript">
					<!--
						alert("jpg, png 이미지만 가능합니다.");
						location.replace('index_iframe.html?idx=<?=$idx?>');
					//-->
					</script>
					<?
		exit;
		}
	if($img_info[0]<100 || $img_info[1]<100){
		?>
					<script type="text/javascript">
					<!--
						alert("이미지 사이즈가 작습니다.");
						location.replace('index_iframe.html?idx=<?=$idx?>');
					//-->
					</script>
		<?
		exit;
	}
	thumbnail3($file_path,str_replace("/imgs/","/thumb/",$file_path_s),"168","143");
	thumbnail3($file_path,str_replace("/imgs/","/thumb/",$file_path_k),"267","267");
	$file_path = str_replace("/home/miracle/wwwhome","",$file_path);
	$file_path_s = str_replace("/home/miracle/wwwhome","",str_replace("/item/","/thumb/",$file_path_s));
}

?>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8">
	<title>1.25 미라클 마켓</title>
	<link rel="stylesheet" type="text/css" href="css/common.css" />
	<link rel="stylesheet" type="text/css" href="css/index.css" />
	<link rel="stylesheet" type="text/css" href="css/index_sm.css" />
</head>
<style>
.img_area2{width:90px; height:90px; display:block; position:absolute; top:0; left:0; z-index:20;}
.img_area2 a {position:absolute; display:block; width:22px; height:22px; top:2px; right:2px;}
</style>

<body style="margin:0px">
	<span class="img_area2">
		<img style="width:90px; height:90px;" src="<?=$file_path?>" alt="나의 콘텐츠 이미지" />
		<a href="index_iframe.html?idx=<?=$idx?>"><img src="/images/common/popup_close_btn.png" alt="나의 콘텐츠 이미지 삭제하기" border=0 /></a>
	</span>
</body>
</html>
<script type="text/javascript">
<!--
	document.domain = "gmarket.co.kr";
	parent.document.input_f.attach<?=$idx?>.value="<?=$file_path?>";
	parent.document.input_f.thumb<?=$idx?>.value="<?=$file_path_s?>";
	parent.document.input_f.filenm<?=$idx?>.value="<?=$file_name?>";
//-->
</script>

